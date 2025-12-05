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

// Main Seller Profile Page
const SellerProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showAIDemo, setShowAIDemo] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const sellerData = {
    username: "HarborJack",
    walletAddress: "0xA4...92b1",
    trustLevel: "High Trust Seller",
    joined: "2025",
    completedTrades: 18,
    positiveReviews: 15,
    disputesResolved: 0,
    badges: [
      {
        name: "Safe Trader SBT",
        issued: "Jan 2025",
        status: "Non-transferable ✅",
      },
      {
        name: "Community Helper SBT",
        issued: "Feb 2025",
        status: "Non-transferable ✅",
      },
      {
        name: "Top Neighborhood Contributor",
        issued: "Mar 2025",
        status: "Non-transferable ✅",
      },
    ],
    listings: [
      {
        id: "13",
        image: "/images/readdy-seller-listing1.jpg",
        title: "Nintendo Switch Lite – Yellow",
        price: 160,
        distance: "1.2 mi away",
      },
      {
        id: "14",
        image: "/images/readdy-seller-listing2.jpg",
        title: "PS5 Controller – White",
        price: 55,
        distance: "0.9 mi away",
      },
      {
        id: "15",
        image: "/images/readdy-seller-listing3.jpg",
        title: "Pokémon Trading Card Set",
        price: 85,
        distance: "1.5 mi away",
      },
    ],
    recentActivity: [
      {
        icon: "ri-check-circle-line",
        color: "#4CAF50",
        title: "Completed transaction — Apple iPad Mini",
        time: "2 days ago",
      },
      {
        icon: "ri-star-line",
        color: "#FFB84D",
        title: "Received positive review",
        subtitle: '"Fast and friendly"',
        time: "3 days ago",
      },
      {
        icon: "ri-group-line",
        color: "#FF8C42",
        title: "Hosted local meetup",
        subtitle: "Williamsburg community",
        time: "1 week ago",
      },
    ],
    dao: {
      neighborhood: "Williamsburg, Brooklyn",
      role: "Verified Resident ✅",
      contributions: 5,
    },
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(sellerData.walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSaveSeller = () => {
    setIsSaved(!isSaved);
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title Block */}
          <div className="text-center mb-16" style={{ paddingTop: "60px" }}>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Seller profile
            </h1>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Reputation is recorded on-chain and cannot be altered.
            </p>
          </div>

          {/* Seller Profile Header Card */}
          <div
            className="rounded-3xl p-8 mb-8"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="flex items-start gap-6 mb-6">
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold"
                style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
              >
                {getInitials(sellerData.username)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#F5F3F0" }}
                >
                  {sellerData.username}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-mono text-sm"
                    style={{ color: "#B3ADA7" }}
                  >
                    {sellerData.walletAddress}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="w-6 h-6 flex items-center justify-center cursor-pointer transition-colors hover:text-[#FF8C42]"
                    style={{ color: copiedAddress ? "#4CAF50" : "#8F8A84" }}
                  >
                    <i
                      className={
                        copiedAddress ? "ri-check-line" : "ri-file-copy-line"
                      }
                    ></i>
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#E8F0E6", color: "#6E8B5E" }}
                  >
                    <span className="font-semibold text-sm">
                      ✅ {sellerData.trustLevel}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: "#B3ADA7" }}>
                    Joined: {sellerData.joined}
                  </span>
                </div>

                <p className="text-sm" style={{ color: "#B3ADA7" }}>
                  This seller's reputation is verified on-chain.
                </p>
              </div>
            </div>
          </div>

          {/* Reputation Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: "#262626" }}
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: "#FF8C42" }}
              >
                {sellerData.completedTrades}
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
                {sellerData.positiveReviews}
              </div>
              <div className="text-sm mb-1" style={{ color: "#F5F3F0" }}>
                Positive reviews
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
                {sellerData.disputesResolved}
              </div>
              <div className="text-sm mb-1" style={{ color: "#F5F3F0" }}>
                Disputes resolved
              </div>
              <div className="text-xs" style={{ color: "#8F8A84" }}>
                On-chain verified ✅
              </div>
            </div>
          </div>

          {/* Seller Badges (SBT) Section */}
          <div className="mb-8">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Reputation badges (SBT)
            </h3>
            <div className="space-y-4">
              {sellerData.badges.map((badge, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-6 flex items-start gap-4"
                  style={{ backgroundColor: "#1F1F1F" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#2E4B36" }}
                  >
                    <i
                      className="ri-shield-check-line text-xl"
                      style={{ color: "#4CAF50" }}
                    ></i>
                  </div>
                  <div className="flex-1">
                    <h4
                      className="text-lg font-semibold mb-1"
                      style={{ color: "#F5F3F0" }}
                    >
                      {badge.name}
                    </h4>
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-sm" style={{ color: "#B3ADA7" }}>
                        Issued: {badge.issued}
                      </span>
                      <span className="text-sm" style={{ color: "#4CAF50" }}>
                        Status: {badge.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: "#8F8A84" }}>
              Badges are permanently bound to the seller's wallet.
            </p>
          </div>

          {/* Active Listings Section */}
          <div className="mb-8">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "#F5F3F0" }}
            >
              Items for sale
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sellerData.listings.map((listing) => (
                <div
                  key={listing.id}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:brightness-110"
                  style={{ backgroundColor: "#1F1F1F", padding: "16px" }}
                  onClick={() => navigate(`/product/${listing.id}`)}
                >
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full rounded-xl mb-4 object-cover"
                    style={{ aspectRatio: "1/1" }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/unsplash-1546435770.jpg";
                    }}
                  />
                  <h4
                    className="text-base font-semibold mb-2 line-clamp-2"
                    style={{ color: "#F5F3F0" }}
                  >
                    {listing.title}
                  </h4>
                  <p
                    className="text-2xl font-bold mb-2"
                    style={{ color: "#FF8C42" }}
                  >
                    ${listing.price}
                  </p>
                  <p className="text-sm" style={{ color: "#B3ADA7" }}>
                    📍 {listing.distance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mb-8">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "#F5F3F0" }}
            >
              Recent activity
            </h3>
            <div className="space-y-4">
              {sellerData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-6 flex items-center justify-between"
                  style={{ backgroundColor: "#1F1F1F" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#3A3A3A" }}
                    >
                      <i
                        className={activity.icon}
                        style={{ color: activity.color, fontSize: "20px" }}
                      ></i>
                    </div>
                    <div>
                      <p
                        className="font-medium mb-1"
                        style={{ color: "#F5F3F0" }}
                      >
                        {activity.title}
                      </p>
                      {activity.subtitle && (
                        <p
                          className="text-sm mb-1"
                          style={{ color: "#B3ADA7" }}
                        >
                          {activity.subtitle}
                        </p>
                      )}
                      <p className="text-sm" style={{ color: "#8F8A84" }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Participation Block */}
          <div
            className="rounded-2xl p-6 mb-8"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Community participation
            </h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#B3ADA7" }}>
                  Neighborhood DAO:
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#F5F3F0" }}
                >
                  {sellerData.dao.neighborhood}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#B3ADA7" }}>
                  Role:
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#F5F3F0" }}
                >
                  {sellerData.dao.role}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#B3ADA7" }}>
                  Contributions:
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#F5F3F0" }}
                >
                  {sellerData.dao.contributions} community actions
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/dao")}
              className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              View DAO space
            </button>
          </div>

          {/* AI Safety Indicator */}
          <div
            className="rounded-xl p-4 mb-8 flex items-start gap-3"
            style={{ backgroundColor: "#2B2B2B" }}
          >
            <div className="flex-1">
              {!showAIDemo ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <i
                      className="ri-check-circle-line text-lg"
                      style={{ color: "#4CAF50" }}
                    ></i>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#F5F3F0" }}
                    >
                      No suspicious activity detected
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#B3ADA7" }}>
                    AI continuously monitors patterns and reviews.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <i
                      className="ri-alert-line text-lg"
                      style={{ color: "#FFB84D" }}
                    ></i>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "#F5F3F0" }}
                    >
                      Unusual behavior flagged
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#B3ADA7" }}>
                    This account is under DAO review.
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => setShowAIDemo(!showAIDemo)}
              className="px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: "#3A3A3A", color: "#F5F3F0" }}
            >
              Toggle demo
            </button>
          </div>

          {/* Follow / Save Seller CTA */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <button
              onClick={handleSaveSeller}
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{
                backgroundColor: isSaved ? "#4CAF50" : "#FF8C42",
                color: "#FFFFFF",
                width: "240px",
                height: "54px",
              }}
            >
              {isSaved ? "✓ Saved" : "Save seller"}
            </button>
            <p className="text-xs text-center" style={{ color: "#B3ADA7" }}>
              Saving a seller lets you quickly find them again.
            </p>
            <button
              className="text-sm cursor-pointer transition-colors hover:opacity-80"
              style={{ color: "#EF4444" }}
            >
              Report seller
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerProfilePage;
