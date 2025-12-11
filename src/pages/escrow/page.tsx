import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { useAccount } from "wagmi";
import {
  BrowserProvider,
  Contract,
  ethers,
  type Eip1193Provider,
} from "ethers";

// Main Escrow Page
const EscrowPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSuspicious, setShowSuspicious] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { connect, isConnected } = useWeb3AuthConnect();
  const [myEscrowAmount, setMyEscrowAmount] = useState<string>("0");
  const { address } = useAccount();

  const productId = searchParams.get("product");

  const steps = [
    { id: 1, label: "Escrow locked", icon: "ri-lock-line" },
    { id: 2, label: "Waiting for confirmation", icon: "ri-time-line" },
    { id: 3, label: "Completed", icon: "ri-check-line" },
  ];

  const sbtContractAddress = "0x60E86B953f5EBA20917cF18aB96C70D076EcA5Cb";
  const sbtTokenAddress = "0x7C4d10a7d5890786fc001bF57407e2Fbd4580293";

  const erc20Abi = [
    "function decimals() view returns (uint8)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
  ];

  const sbtContractAbi = [
    "function transferWithSBT(address receiver, uint256 amount, string memory uri) external",
  ];

  // Header 함수 안
  const handleTestSend = async () => {
    if (!isConnected) {
      alert("지갑을 먼저 연결해주세요!");
      return;
    }

    if (isCompleted) {
      alert("Transaction already completed");
      return;
    }

    setIsLoading(true);
    try {
      const provider = await connect(); // Web3Auth provider 반환

      if (!provider) {
        throw new Error("Provider not found");
      }

      const ethersProvider = new BrowserProvider(provider as Eip1193Provider);
      const signer = await ethersProvider.getSigner();

      const token = new Contract(sbtTokenAddress, erc20Abi, signer);

      const decimals = await token.decimals();
      const amountWei = ethers.parseUnits("260", decimals);

      // allowance check
      const allowed = await token.allowance(address, sbtContractAddress);

      //허가된 갯수 이상인지 체크
      if (allowed < amountWei) {
        //사용할 토큰 갯수만큼만 approve 요청
        const MAX_UINT256 = 2n ** 256n - 1n;

        const approveTx = await token.approve(sbtContractAddress, MAX_UINT256);
        await approveTx.wait();
      }

      //Custom Function Call
      const sbtContract = new Contract(
        sbtContractAddress,
        sbtContractAbi,
        signer
      );

      //TransferWithSBT 실행
      const tx = await sbtContract.transferWithSBT(
        "0x96804D391383fd850cb2d632C20082780896Ba01",
        amountWei,
        "https://gnfd-testnet-sp1.nodereal.io/view/metadata-bucket/SBTTransfer_meta_data.json"
      );

      //Transaction 대기
      const receipt = await tx.wait();

      alert("Confirm: 서명이 완료되었습니다!");
      handleConfirm(receipt.hash);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message?.includes("User rejected")) {
          console.log("사용자가 서명을 취소함");
          alert("Cancel: 사용자가 서명을 취소했습니다.");
        } else {
          console.error("오류 발생:", err);
          alert("Error: 서명 중 오류가 발생했습니다.");
        }
      } else {
        console.error("오류 발생:", err);
        alert("Error: 서명 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = (hash: string) => {
    if (!isConfirmed) return;

    setIsCompleted(true);
    setCurrentStep(3);

    setTimeout(() => {
      navigate("/escrow-success?from=escrow&hash=" + hash);
    }, 1200);
  };

  const getButtonBackgroundColor = () => {
    if (isLoading) return "#5A5A5A";
    if (isConfirmed) return "#FF8C42";
    return "#3A3A3A";
  };

  const getButtonTextColor = () => {
    if (isLoading) return "#B3ADA7";
    if (isConfirmed) return "#FFFFFF";
    return "#8F8A84";
  };

  const getButtonOpacity = () => {
    if (isLoading) return 0.7;
    if (isConfirmed) return 1;
    return 0.6;
  };

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (isCompleted) return "✅ Transaction completed";
    return "Confirm transaction";
  };

  useEffect(() => {
    // Simulate waiting for other party confirmation
    const timer = setTimeout(() => {
      setIsConfirmed(true);
      setCurrentStep(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getMyEscrowAmount = async () => {
      const provider = await connect(); // Web3Auth provider 반환

      if (!provider) {
        throw new Error("Provider not found");
      }

      const ethersProvider = new BrowserProvider(provider as Eip1193Provider);
      const signer = await ethersProvider.getSigner();

      const token = new Contract(sbtTokenAddress, erc20Abi, signer);

      const balance = await token.balanceOf(address);
      const decimals = await token.decimals();
      const balanceWithDecimals = parseFloat(
        ethers.formatUnits(balance, decimals)
      );

      const formattedBalance = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }).format(balanceWithDecimals);

      setMyEscrowAmount(formattedBalance);
    };

    if (address) {
      void getMyEscrowAmount();
    }
  }, [address]);

  if (!productId) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#1B1B1B" }}
      >
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Transaction unavailable
            </h2>
            <p className="mb-8" style={{ color: "#B3ADA7" }}>
              Please check your wallet activity.
            </p>
            <button
              onClick={() => navigate("/listings")}
              className="px-6 py-3 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Back to Listings
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Title Block */}
          <div className="text-center mb-16" style={{ paddingTop: "60px" }}>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Escrow in progress
            </h1>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Your payment is securely held until both sides confirm.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex-1 flex flex-col items-center relative z-10"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all"
                    style={{
                      backgroundColor:
                        currentStep >= step.id ? "#FF8C42" : "#4A4A4A",
                      color: "#FFFFFF",
                    }}
                  >
                    <i className={`${step.icon} text-2xl`}></i>
                  </div>
                  <p
                    className="text-sm font-medium text-center"
                    style={{
                      color: currentStep >= step.id ? "#F5F3F0" : "#8F8A84",
                      fontWeight: currentStep >= step.id ? "bold" : "normal",
                    }}
                  >
                    {step.label}
                  </p>
                  {index < steps.length - 1 && (
                    <div
                      className="absolute top-8 left-1/2 w-full h-0.5"
                      style={{
                        backgroundColor:
                          currentStep > step.id ? "#FF8C42" : "#3A3A3A",
                        zIndex: -1,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Safety Check Card */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {showSuspicious ? (
                  <i
                    className="ri-alert-line text-2xl"
                    style={{ color: "#FFA500" }}
                  ></i>
                ) : (
                  <i
                    className="ri-shield-check-line text-2xl"
                    style={{ color: "#4CAF50" }}
                  ></i>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-2" style={{ color: "#F5F3F0" }}>
                  {showSuspicious
                    ? "⚠ Suspicious pattern detected"
                    : "✅ No suspicious activity detected"}
                </p>
                <p className="text-sm" style={{ color: "#B3ADA7" }}>
                  {showSuspicious
                    ? "Sent to DAO for review. Final decision will be made by community validators."
                    : "AI continuously monitors transaction patterns."}
                </p>
              </div>
              <button
                onClick={() => setShowSuspicious(!showSuspicious)}
                className="px-3 py-1 rounded text-xs cursor-pointer transition-all hover:opacity-80"
                style={{ backgroundColor: "#262626", color: "#B3ADA7" }}
              >
                Toggle Demo
              </button>
            </div>
          </div>

          {/* Transaction Details Card */}
          <div
            className="rounded-2xl p-6 mb-8"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Transaction Details
            </h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span style={{ color: "#B3ADA7" }}>Item:</span>
                <span className="font-medium" style={{ color: "#F5F3F0" }}>
                  Nintendo Switch OLED – White
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#B3ADA7" }}>Buyer:</span>
                <span
                  className="font-mono text-sm"
                  style={{ color: "#F5F3F0" }}
                >
                  {address}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#B3ADA7" }}>Seller:</span>
                <span
                  className="font-mono text-sm"
                  style={{ color: "#F5F3F0" }}
                >
                  {"0x96804d391383fd850cb2d632c20082780896ba01"}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#B3ADA7" }}>My Escrow Amount:</span>
                <span
                  className="font-semibold text-lg"
                  style={{ color: "#FF8C42" }}
                >
                  {myEscrowAmount} SBT
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#B3ADA7" }}>Amount held:</span>
                <span
                  className="font-semibold text-lg"
                  style={{ color: "#FF8C42" }}
                >
                  260 SBT
                </span>
              </div>
            </div>
            <div className="pt-4" style={{ borderTop: "1px solid #2B2B2B" }}>
              <p className="text-xs" style={{ color: "#8F8A84" }}>
                Funds cannot be released or canceled without on-chain
                confirmation.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="relative mb-8">
            <button
              onClick={handleTestSend}
              onMouseEnter={() => !isConfirmed && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              disabled={!isConfirmed || isLoading}
              className="w-full py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all disabled:cursor-not-allowed"
              style={{
                backgroundColor: getButtonBackgroundColor(),
                color: getButtonTextColor(),
                opacity: getButtonOpacity(),
              }}
            >
              {getButtonText()}
            </button>
            {showTooltip && !isConfirmed && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
              >
                Waiting for the other party to confirm.
              </div>
            )}
          </div>

          {/* Completion State */}
          {isCompleted && (
            <div
              className="rounded-2xl p-6 mb-8 text-center animate-pulse"
              style={{ backgroundColor: "#2E4B36" }}
            >
              <i
                className="ri-check-double-line text-4xl mb-2"
                style={{ color: "#4CAF50" }}
              ></i>
              <p className="font-semibold" style={{ color: "#F5F3F0" }}>
                Reputation has been updated.
              </p>
            </div>
          )}

          {/* Safety Notice */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#262626" }}
          >
            <div className="flex items-start gap-3">
              <i
                className="ri-shield-check-line text-xl flex-shrink-0"
                style={{ color: "#4CAF50" }}
              ></i>
              <div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#B3ADA7" }}
                >
                  No off-platform messaging required.
                  <br />
                  Escrow prevents meetup scams and disappearing sellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EscrowPage;
