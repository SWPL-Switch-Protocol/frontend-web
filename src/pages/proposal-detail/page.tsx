import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/feature/Header";

// Footer Component
const Footer = () => {
  return (
    <footer className="px-6 py-20" style={{ backgroundColor: "#2B2522" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: "#FF8C42" }}>
              SWITCH SOCIAL MARKET
            </h3>
            <p className="text-sm" style={{ color: "#B3ADA7" }}>
              © 2025 Switch Foundation.
              <br />
              All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#F5F3F0" }}>
              Switch
            </h4>
            <ul className="space-y-2">
              {["About", "Team", "Vision", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm cursor-pointer transition-colors hover:text-[#FF8C42]"
                    style={{ color: "#B3ADA7" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#F5F3F0" }}>
              Community
            </h4>
            <ul className="space-y-2">
              {[
                "Discord",
                "Telegram",
                "Twitter(X)",
                "Announcements",
                "Apply as Local Leader",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm cursor-pointer transition-colors hover:text-[#FF8C42]"
                    style={{ color: "#B3ADA7" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#F5F3F0" }}>
              Legal
            </h4>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm cursor-pointer transition-colors hover:text-[#FF8C42]"
                    style={{ color: "#B3ADA7" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex items-center gap-4 pt-8"
          style={{ borderTop: "1px solid #3A3A3A" }}
        >
          {[
            { icon: "ri-youtube-line", label: "YouTube" },
            { icon: "ri-twitter-x-line", label: "X" },
            { icon: "ri-discord-line", label: "Discord" },
            { icon: "ri-reddit-line", label: "Reddit" },
            { icon: "ri-github-line", label: "GitHub" },
            { icon: "ri-telegram-line", label: "Telegram" },
          ].map((social) => (
            <a
              key={social.label}
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:text-[#FF8C42]"
              style={{ backgroundColor: "#3A3A3A", color: "#B3ADA7" }}
              aria-label={social.label}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// Main Proposal Detail Page
const ProposalDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isWalletConnected] = useState(true);
  const [hasAccess] = useState(true);
  const [selectedVote, setSelectedVote] = useState<string>("");
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Sample proposals data
  const proposals = [
    {
      id: "1",
      title: "Add a weekly community meetup",
      creator: "LunaBeans",
      createdDate: "Today",
      status: "Open for voting",
      timeRemaining: "48h remaining",
      description:
        "Host a recurring Saturday meetup in Domino Park for verified neighbors — focused on sharing local updates, helping newcomers, and strengthening community trust.",
      category: "Local activities → Meetups",
      currentSupport: 62,
      totalVoters: 18,
      requiredThreshold: 60,
      stage: "Execution pending",
    },
    {
      id: "2",
      title: "Start a neighborhood bonsai club",
      creator: "HarborJack",
      createdDate: "2 days ago",
      status: "Open for voting",
      timeRemaining: "72h remaining",
      description:
        "A monthly bonsai workshop hosted at a local garden space. Members can bring plants, share tips, and earn recognition badges for contributions.",
      category: "Community hobbies",
      currentSupport: 78,
      totalVoters: 23,
      requiredThreshold: 60,
      stage: "Active voting",
    },
  ];

  const proposal = proposals.find((p) => p.id === id) || proposals[0];

  const handleVoteSubmit = () => {
    if (selectedVote) {
      setVoteSubmitted(true);
      setTimeout(() => {
        navigate("/dao-space");
      }, 2000);
    }
  };

  if (!isWalletConnected) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#1B1B1B" }}
      >
        <Header />

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🔌</div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Connect your wallet to participate
            </h2>
            <button
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Connect Wallet
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#1B1B1B" }}
      >
        <Header />

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div
            className="text-center max-w-md rounded-2xl p-8"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="text-6xl mb-6">🔒</div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Voting not available
            </h2>
            <p className="text-lg mb-6" style={{ color: "#B3ADA7" }}>
              You need:
            </p>
            <ul className="text-left mb-8 space-y-2">
              <li
                className="flex items-center gap-2"
                style={{ color: "#D8D2CD" }}
              >
                <i
                  className="ri-checkbox-circle-line"
                  style={{ color: "#FF8C42" }}
                ></i>
                Verified reputation
              </li>
              <li
                className="flex items-center gap-2"
                style={{ color: "#D8D2CD" }}
              >
                <i
                  className="ri-checkbox-circle-line"
                  style={{ color: "#FF8C42" }}
                ></i>
                Minimum 1 completed transaction
              </li>
            </ul>
            <button
              onClick={() => navigate("/dao-space")}
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Back to DAO home
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
        <div className="max-w-[900px] mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8" style={{ paddingTop: "40px" }}>
            <h1
              className="text-4xl font-bold mb-3"
              style={{ color: "#F5F3F0" }}
            >
              Proposal details
            </h1>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Community proposals require verification and voting from trusted
              residents.
            </p>
          </div>

          <div
            className="mb-8"
            style={{ borderBottom: "1px solid #2B2B2B" }}
          ></div>

          {/* Proposal Content Section */}
          <div
            className="rounded-2xl p-8 mb-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: "#F5F3F0" }}
            >
              {proposal.title}
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#B3ADA7" }}>
                  Created by:
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#F5F3F0" }}
                >
                  {proposal.creator}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#B3ADA7" }}>
                  Created:
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#F5F3F0" }}
                >
                  {proposal.createdDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#B3ADA7" }}>
                  Status:
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "#E8F0E6",
                    color: "#6E8B5E",
                  }}
                >
                  {proposal.status}
                </span>
                <span className="text-xs" style={{ color: "#FF8C42" }}>
                  ({proposal.timeRemaining})
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#F5F3F0" }}
              >
                Proposal description
              </h3>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#D8D2CD" }}
              >
                {proposal.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#B3ADA7" }}>
                  Category:
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#FF8C42" }}
                >
                  {proposal.category}
                </span>
              </div>
            </div>

            {/* Proposal Metrics */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
              style={{ borderTop: "1px solid #2B2B2B" }}
            >
              <div>
                <p className="text-xs mb-1" style={{ color: "#8F8A84" }}>
                  Current support:
                </p>
                <p className="text-xl font-bold" style={{ color: "#FF8C42" }}>
                  {proposal.currentSupport}% Yes
                </p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "#8F8A84" }}>
                  Total voters:
                </p>
                <p className="text-xl font-bold" style={{ color: "#F5F3F0" }}>
                  {proposal.totalVoters} residents
                </p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "#8F8A84" }}>
                  Required threshold:
                </p>
                <p className="text-xl font-bold" style={{ color: "#F5F3F0" }}>
                  {" "}
                  &gt; {proposal.requiredThreshold}% Yes
                </p>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "#8F8A84" }}>
                  Proposal stage:
                </p>
                <p className="text-xl font-bold" style={{ color: "#F5F3F0" }}>
                  {proposal.stage}
                </p>
              </div>
            </div>
          </div>

          {/* Voting UI Block */}
          {!voteSubmitted ? (
            <div
              className="rounded-2xl p-7 mb-6"
              style={{ backgroundColor: "#262626" }}
            >
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "#F5F3F0" }}
              >
                Cast your vote
              </h3>
              <p className="text-sm mb-6" style={{ color: "#B3ADA7" }}>
                Your vote weight is based on your reputation score.
              </p>

              <div className="space-y-3 mb-6">
                <label
                  className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:brightness-110"
                  style={{
                    backgroundColor:
                      selectedVote === "yes" ? "#1F1F1F" : "transparent",
                    border: `1px solid ${
                      selectedVote === "yes" ? "#FF8C42" : "#3A3A3A"
                    }`,
                  }}
                >
                  <input
                    type="radio"
                    name="vote"
                    value="yes"
                    checked={selectedVote === "yes"}
                    onChange={(e) => setSelectedVote(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                    style={{ accentColor: "#FF8C42" }}
                  />
                  <span className="text-base" style={{ color: "#F5F3F0" }}>
                    ✅ Yes — approve this proposal
                  </span>
                </label>

                <label
                  className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:brightness-110"
                  style={{
                    backgroundColor:
                      selectedVote === "no" ? "#1F1F1F" : "transparent",
                    border: `1px solid ${
                      selectedVote === "no" ? "#FF8C42" : "#3A3A3A"
                    }`,
                  }}
                >
                  <input
                    type="radio"
                    name="vote"
                    value="no"
                    checked={selectedVote === "no"}
                    onChange={(e) => setSelectedVote(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                    style={{ accentColor: "#FF8C42" }}
                  />
                  <span className="text-base" style={{ color: "#F5F3F0" }}>
                    ❌ No — reject this proposal
                  </span>
                </label>

                <label
                  className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:brightness-110"
                  style={{
                    backgroundColor:
                      selectedVote === "abstain" ? "#1F1F1F" : "transparent",
                    border: `1px solid ${
                      selectedVote === "abstain" ? "#FF8C42" : "#3A3A3A"
                    }`,
                  }}
                >
                  <input
                    type="radio"
                    name="vote"
                    value="abstain"
                    checked={selectedVote === "abstain"}
                    onChange={(e) => setSelectedVote(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                    style={{ accentColor: "#FF8C42" }}
                  />
                  <span className="text-base" style={{ color: "#F5F3F0" }}>
                    🕒 Abstain
                  </span>
                </label>
              </div>

              <button
                onClick={handleVoteSubmit}
                disabled={!selectedVote}
                className="w-full py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
              >
                Submit vote
              </button>

              <p
                className="text-xs mt-4 text-center"
                style={{ color: "#8F8A84" }}
              >
                Voting closes in {proposal.timeRemaining.toLowerCase()}.
              </p>
            </div>
          ) : (
            <div
              className="rounded-2xl p-10 mb-6 text-center"
              style={{ backgroundColor: "#262626" }}
            >
              <div className="text-5xl mb-4">✅</div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "#F5F3F0" }}
              >
                Vote submitted
              </h3>
              <p className="text-base" style={{ color: "#B3ADA7" }}>
                Your decision has been recorded on-chain.
              </p>
            </div>
          )}

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
            >
              View discussion
            </button>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{
                backgroundColor: isFollowing ? "#E8F0E6" : "#262626",
                color: isFollowing ? "#6E8B5E" : "#F5F3F0",
              }}
            >
              {isFollowing ? "✓ Following proposal" : "Follow proposal"}
            </button>
            <button
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
            >
              Share with community
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProposalDetailPage;
