import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";
import { copyText } from "../../utils/clipboard";

// Toast Component
const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg animate-slide-in-right"
      style={{ backgroundColor: "#2E4B36" }}
    >
      <div className="flex items-center gap-3">
        <i
          className="ri-check-circle-line text-xl"
          style={{ color: "#4CAF50" }}
        ></i>
        <span className="font-medium" style={{ color: "#F5F3F0" }}>
          {message}
        </span>
      </div>
    </div>
  );
};

// Main Profile Page
const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [copiedTransaction, setCopiedTransaction] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);

  const fromEscrow = searchParams.get("from") === "escrow";
  const hash = searchParams.get("hash") || "";
  const txUrl = import.meta.env.SCAN_URL + hash;

  useEffect(() => {
    if (fromEscrow) {
      setShowToast(true);
      setBadgePulse(true);

      const pulseTimer = setTimeout(() => {
        setBadgePulse(false);
      }, 150);

      return () => clearTimeout(pulseTimer);
    }
  }, [fromEscrow]);

  const handleCopyTransaction = () => {
    if (hash) {
      void copyText(txUrl);
    }
    setCopiedTransaction(true);
    setTimeout(() => setCopiedTransaction(false), 2000);
  };

  const recentActivities = [
    {
      icon: "ri-check-circle-line",
      color: "#4CAF50",
      title: "Completed transaction — Nintendo Switch OLED",
      time: "Today",
    },
    {
      icon: "ri-edit-line",
      color: "#FF8C42",
      title: "Review pending",
      time: "Write a review",
      action: true,
    },
    {
      icon: "ri-trophy-line",
      color: "#FFB84D",
      title: "Community quest eligible",
      time: "View details",
      action: true,
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      {showToast && (
        <Toast
          message="Reputation updated"
          onClose={() => setShowToast(false)}
        />
      )}

      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title Block */}
          <div className="text-center mb-16" style={{ paddingTop: "60px" }}>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Your Transaction is Success
            </h1>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Your transaction is successful.
            </p>
          </div>

          {/* Main Profile Card */}
          <div
            className="rounded-3xl p-8 mb-8"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#F5F3F0" }}
                >
                  VanillaLatte
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <a
                    href={txUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "#60A5FA" }}
                  >
                    view explorer
                    <i className="ri-external-link-line"></i>
                  </a>
                </div>
              </div>

              <div
                className={`px-4 py-2 rounded-full transition-all ${
                  badgePulse ? "animate-pulse" : ""
                }`}
                style={{ backgroundColor: "#E8F0E6", color: "#6E8B5E" }}
              >
                <span className="font-semibold text-sm">
                  ✅ Trusted Neighbor
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm" style={{ color: "#B3ADA7" }}>
                txHash: {hash}
              </span>
              <button
                onClick={handleCopyTransaction}
                className="w-6 h-6 flex items-center justify-center cursor-pointer transition-colors hover:text-[#FF8C42]"
                style={{ color: copiedTransaction ? "#4CAF50" : "#8F8A84" }}
              >
                <i
                  className={
                    copiedTransaction ? "ri-check-line" : "ri-file-copy-line"
                  }
                ></i>
              </button>
            </div>

            <p className="text-sm" style={{ color: "#B3ADA7" }}>
              Your trust score increased after a successful transaction.
            </p>
          </div>

          {/* Reputation Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: "#262626" }}
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#FF8C42" }}
              >
                13
              </div>
              <div className="text-sm mb-1" style={{ color: "#F5F3F0" }}>
                Completed trades
              </div>
              <div className="text-xs" style={{ color: "#8F8A84" }}>
                On-chain verified ✅
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: "#262626" }}
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#FF8C42" }}
              >
                4
              </div>
              <div className="text-sm mb-1" style={{ color: "#F5F3F0" }}>
                Reviews written
              </div>
              <div className="text-xs" style={{ color: "#8F8A84" }}>
                On-chain verified ✅
              </div>
            </div>

            <div
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: "#262626" }}
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#FF8C42" }}
              >
                3
              </div>
              <div className="text-sm mb-1" style={{ color: "#F5F3F0" }}>
                Community contributions
              </div>
              <div className="text-xs" style={{ color: "#8F8A84" }}>
                On-chain verified ✅
              </div>
            </div>
          </div>

          {/* New SBT Badge */}
          <div className="mb-8">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              New reputation badge earned
            </h3>
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#1F1F1F" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#2E4B36" }}
                >
                  <i
                    className="ri-shield-check-line text-2xl"
                    style={{ color: "#4CAF50" }}
                  ></i>
                </div>
                <div className="flex-1">
                  <h4
                    className="text-lg font-semibold mb-1"
                    style={{ color: "#F5F3F0" }}
                  >
                    Safe Trader SBT
                  </h4>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm" style={{ color: "#B3ADA7" }}>
                      Issued: Today
                    </span>
                    <span className="text-sm" style={{ color: "#4CAF50" }}>
                      Status: Non-transferable ✅
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#8F8A84" }}>
                    Badges are permanently bound to your wallet and cannot be
                    moved.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="mb-16">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#F5F3F0" }}
            >
              Recent activity
            </h2>
            <div className="space-y-4">
              <div
                className="rounded-2xl p-6 flex items-center justify-between"
                style={{ backgroundColor: "#1F1F1F" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#2E4B36" }}
                  >
                    <i
                      className="ri-check-line text-xl"
                      style={{ color: "#4CAF50" }}
                    ></i>
                  </div>
                  <div>
                    <p
                      className="font-medium mb-1"
                      style={{ color: "#F5F3F0" }}
                    >
                      Completed transaction — Nintendo Switch OLED
                    </p>
                    <p className="text-sm" style={{ color: "#B3ADA7" }}>
                      Today
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6 flex items-center justify-between"
                style={{ backgroundColor: "#1F1F1F" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#3A3A3A" }}
                  >
                    <i
                      className="ri-edit-line text-xl"
                      style={{ color: "#FF8C42" }}
                    ></i>
                  </div>
                  <div>
                    <p
                      className="font-medium mb-1"
                      style={{ color: "#F5F3F0" }}
                    >
                      Review pending
                    </p>
                    <p className="text-sm" style={{ color: "#B3ADA7" }}>
                      Share your experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/review?product=1")}
                  className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                  style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
                >
                  Write a review
                </button>
              </div>

              <div
                className="rounded-2xl p-6 flex items-center justify-between"
                style={{ backgroundColor: "#1F1F1F" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#3A3A3A" }}
                  >
                    <i
                      className="ri-trophy-line text-xl"
                      style={{ color: "#FFD700" }}
                    ></i>
                  </div>
                  <div>
                    <p
                      className="font-medium mb-1"
                      style={{ color: "#F5F3F0" }}
                    >
                      Community quest eligible
                    </p>
                    <p className="text-sm" style={{ color: "#B3ADA7" }}>
                      Earn rewards
                    </p>
                  </div>
                </div>
                <button
                  className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                  style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                >
                  View details
                </button>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate("/listings")}
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Back to marketplace
            </button>
            <button
              onClick={() => navigate("/badges")}
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
            >
              View my badges
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
