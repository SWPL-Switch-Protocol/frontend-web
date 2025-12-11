import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";

// Badge Card Component
const BadgeCard = ({
  icon,
  name,
  description,
  earned,
}: {
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}) => {
  return (
    <div
      className="rounded-2xl p-6 transition-all hover:brightness-110"
      style={{
        backgroundColor: earned ? "#1F1F1F" : "#1A1A1A",
        opacity: earned ? 1 : 0.6,
        border: earned ? "1px solid #3A3A3A" : "1px solid #262626",
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{
            backgroundColor: earned ? "#2E4B36" : "#2A2A2A",
          }}
        >
          <i
            className={`${icon} text-3xl`}
            style={{ color: earned ? "#4CAF50" : "#5A5A5A" }}
          ></i>
        </div>

        <div className="mb-2">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: earned ? "#E8F0E6" : "#2A2A2A",
              color: earned ? "#6E8B5E" : "#6A6A6A",
            }}
          >
            {earned ? "Earned" : "Locked"}
          </span>
        </div>

        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: earned ? "#F5F3F0" : "#6A6A6A" }}
        >
          {name}
        </h3>

        <p
          className="text-sm"
          style={{ color: earned ? "#B3ADA7" : "#5A5A5A" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

// Main Badges Page
const BadgesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Trading");

  const tabs = [
    "Trading",
    "Community",
    "DAO participation",
    "Location",
    "Special",
  ];

  const badgesData = {
    Trading: [
      {
        icon: "ri-shield-check-line",
        name: "Safe Trader SBT",
        description: "Completed your first safe transaction.",
        earned: true,
      },
      {
        icon: "ri-store-line",
        name: "Consistent Seller",
        description: "Complete 5 successful sales.",
        earned: false,
      },
      {
        icon: "ri-award-line",
        name: "Zero Dispute Record",
        description: "Finish 10 trades with no disputes.",
        earned: false,
      },
    ],
    Community: [
      {
        icon: "ri-chat-check-line",
        name: "Helpful Reviewer",
        description: "Submitted 3 verified reviews.",
        earned: true,
      },
      {
        icon: "ri-hand-heart-line",
        name: "Community Helper",
        description: "Assist in 5 listing verifications.",
        earned: false,
      },
      {
        icon: "ri-user-star-line",
        name: "Trusted Neighbor",
        description: "Maintain high reputation for 30 days.",
        earned: false,
      },
    ],
    "DAO participation": [
      {
        icon: "ri-checkbox-circle-line",
        name: "Active Voter",
        description: "Participated in 3 proposals.",
        earned: true,
      },
      {
        icon: "ri-file-edit-line",
        name: "Proposal Author",
        description: "Create your first proposal.",
        earned: false,
      },
      {
        icon: "ri-team-line",
        name: "DAO Leader",
        description: "Lead 5 successful proposals.",
        earned: false,
      },
    ],
    Location: [
      {
        icon: "ri-map-pin-line",
        name: "Williamsburg Resident",
        description: "Verified and completed a local transaction.",
        earned: true,
      },
      {
        icon: "ri-community-line",
        name: "Brooklyn Ambassador",
        description: "Complete 10 trades in Brooklyn.",
        earned: false,
      },
      {
        icon: "ri-building-line",
        name: "NYC Connector",
        description: "Trade across all 5 boroughs.",
        earned: false,
      },
    ],
    Special: [
      {
        icon: "ri-rocket-line",
        name: "Early Resident",
        description: "Joined during launch period.",
        earned: true,
      },
      {
        icon: "ri-gift-line",
        name: "Community Supporter",
        description: "Contributed to platform development.",
        earned: false,
      },
      {
        icon: "ri-vip-crown-line",
        name: "Founding Member",
        description: "Special recognition for early adopters.",
        earned: false,
      },
    ],
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12" style={{ paddingTop: "60px" }}>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Your badges
            </h1>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Badges are non-transferable SBTs permanently linked to your
              wallet.
            </p>
          </div>

          {/* Wallet Info Strip */}
          <div
            className="rounded-2xl p-6 mb-12"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FF8C42" }}
                >
                  <i
                    className="ri-wallet-line text-xl"
                    style={{ color: "#FFFFFF" }}
                  ></i>
                </div>
                <div>
                  <p
                    className="font-mono text-sm mb-1"
                    style={{ color: "#B3ADA7" }}
                  >
                    0xA3...91c5
                  </p>
                  <p className="text-xs" style={{ color: "#8F8A84" }}>
                    Reputation updates on-chain automatically
                  </p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ color: "#FF8C42" }}
                >
                  13
                </p>
                <p className="text-sm" style={{ color: "#B3ADA7" }}>
                  Current reputation score
                </p>
              </div>
            </div>
          </div>

          {/* Badge Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                  style={{
                    backgroundColor: activeTab === tab ? "#FF8C42" : "#262626",
                    color: activeTab === tab ? "#FFFFFF" : "#B3ADA7",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {badgesData[activeTab as keyof typeof badgesData].map(
              (badge, index) => (
                <BadgeCard
                  key={index}
                  icon={badge.icon}
                  name={badge.name}
                  description={badge.description}
                  earned={badge.earned}
                />
              )
            )}
          </div>

          {/* Locked Badge Explainer */}
          <div
            className="rounded-2xl p-6 mb-12"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#3A3A3A" }}
              >
                <i
                  className="ri-lock-line text-xl"
                  style={{ color: "#8F8A84" }}
                ></i>
              </div>
              <div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#F5F3F0" }}
                >
                  About locked badges
                </h3>
                <p className="text-sm" style={{ color: "#B3ADA7" }}>
                  Locked badges show what you can unlock next through trusted
                  activity.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#F5F3F0" }}
            >
              Want to earn more?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/quest/1")}
                className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
              >
                View community quests
              </button>
              <button
                onClick={() => navigate("/dao")}
                className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
              >
                Go to your DAO
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BadgesPage;
