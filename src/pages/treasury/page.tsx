import { useNavigate } from "react-router-dom";
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
              © 2025 Switch Foundation.&lt;br /&gt;All rights reserved.
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

// Main Treasury Page
const TreasuryPage = () => {
  const navigate = useNavigate();

  const recentTransactions = [
    {
      type: "income",
      title: "Funds added",
      amount: "+$350",
      description: "Weekly community contributions",
      timestamp: "Today",
      status: null,
      icon: "ri-arrow-down-circle-line",
      iconColor: "#4CAF50",
    },
    {
      type: "expense",
      title: "Meetup event budget approved",
      amount: "-$120",
      description: "Passed proposal",
      timestamp: "2 days ago",
      status: "Passed",
      icon: "ri-arrow-up-circle-line",
      iconColor: "#FF8C42",
    },
    {
      type: "expense",
      title: "Verification tooling grant",
      amount: "-$180",
      description: "Pending execution",
      timestamp: "4 days ago",
      status: "Pending",
      icon: "ri-arrow-up-circle-line",
      iconColor: "#FF8C42",
    },
  ];

  const allocationData = [
    { category: "Community events", percentage: 45, color: "#FF8C42" },
    { category: "Verification incentives", percentage: 30, color: "#FFB366" },
    { category: "Platform maintenance", percentage: 15, color: "#FFCC99" },
    { category: "Emergency reserve", percentage: 10, color: "#FFE5CC" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-[1000px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12" style={{ paddingTop: "50px" }}>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Community Treasury
            </h1>
            <p
              className="text-lg max-w-[700px] mx-auto"
              style={{ color: "#B3ADA7" }}
            >
              Funds are governed by reputation-based voting and cannot be
              withdrawn without proposal approval.
            </p>
          </div>

          {/* Treasury Balance Card */}
          <div
            className="rounded-2xl p-10 mb-12"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="text-center mb-8">
              <p className="text-sm mb-2" style={{ color: "#B3ADA7" }}>
                Current balance
              </p>
              <h2
                className="text-6xl font-bold mb-6"
                style={{ color: "#FF8C42" }}
              >
                $2,450
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-sm mb-1" style={{ color: "#B3ADA7" }}>
                  Last funded:
                </p>
                <p
                  className="text-xl font-semibold"
                  style={{ color: "#F5F3F0" }}
                >
                  3 days ago
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-1" style={{ color: "#B3ADA7" }}>
                  Total contributors:
                </p>
                <p
                  className="text-xl font-semibold"
                  style={{ color: "#F5F3F0" }}
                >
                  32
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm mb-1" style={{ color: "#B3ADA7" }}>
                  Current proposals affecting funds:
                </p>
                <p
                  className="text-xl font-semibold"
                  style={{ color: "#F5F3F0" }}
                >
                  1 active
                </p>
              </div>
            </div>

            <p className="text-xs text-center" style={{ color: "#8F8A84" }}>
              All data is non-transferable and simulated for demo purposes.
            </p>
          </div>

          {/* Recent Transactions Section */}
          <div className="mb-12">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "#F5F3F0" }}
            >
              Recent activity
            </h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="rounded-xl p-6 cursor-pointer transition-all hover:brightness-110"
                  style={{ backgroundColor: "#1F1F1F" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#262626" }}
                      >
                        <i
                          className={transaction.icon}
                          style={{
                            color: transaction.iconColor,
                            fontSize: "24px",
                          }}
                        ></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4
                            className="text-lg font-semibold"
                            style={{ color: "#F5F3F0" }}
                          >
                            {transaction.title}
                          </h4>
                          {transaction.status && (
                            <span
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor:
                                  transaction.status === "Passed"
                                    ? "#E8F0E6"
                                    : "#FFF4E6",
                                color:
                                  transaction.status === "Passed"
                                    ? "#6E8B5E"
                                    : "#D97706",
                              }}
                            >
                              {transaction.status}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-sm mb-1"
                          style={{ color: "#B3ADA7" }}
                        >
                          {transaction.description}
                        </p>
                        <p className="text-xs" style={{ color: "#8F8A84" }}>
                          {transaction.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className="text-2xl font-bold"
                        style={{
                          color:
                            transaction.type === "income"
                              ? "#4CAF50"
                              : "#F5F3F0",
                        }}
                      >
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Breakdown Section */}
          <div className="mb-12">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "#F5F3F0" }}
            >
              How funds are used
            </h3>
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "#1F1F1F" }}
            >
              {/* Horizontal Bar */}
              <div className="mb-8">
                <div
                  className="flex h-12 rounded-full overflow-hidden"
                  style={{ backgroundColor: "#262626" }}
                >
                  {allocationData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center text-sm font-semibold transition-all hover:brightness-110 cursor-pointer"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                        color: "#1B1B1B",
                      }}
                      title={`${item.category}: ${item.percentage}%`}
                    >
                      {item.percentage}%
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allocationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-md flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#F5F3F0" }}
                      >
                        {item.category}
                      </p>
                      <p className="text-xs" style={{ color: "#B3ADA7" }}>
                        {item.percentage}% of total funds
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Proposal Interaction Callout */}
          <div
            className="rounded-2xl p-8 mb-16"
            style={{ backgroundColor: "#262626", border: "1px solid #3A3A3A" }}
          >
            <div className="text-center mb-6">
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "#F5F3F0" }}
              >
                Want to propose a fund allocation?
              </h3>
              <p
                className="text-base max-w-[600px] mx-auto"
                style={{ color: "#B3ADA7" }}
              >
                Only verified residents with on-chain reputation can submit
                treasury proposals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/create-proposal")}
                className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
              >
                Create proposal
              </button>
              <button
                onClick={() => navigate("/dao-space")}
                className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{
                  backgroundColor: "transparent",
                  color: "#F5F3F0",
                  border: "1px solid #3A3A3A",
                }}
              >
                View proposals
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TreasuryPage;
