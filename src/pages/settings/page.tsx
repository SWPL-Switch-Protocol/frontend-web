import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";

// Toggle Switch Component
const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
        enabled ? "bg-orange-500" : "bg-zinc-700"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
          enabled ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
};

// Section Header Component
const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold mb-4" style={{ color: "#F5F3F0" }}>
    {title}
  </h2>
);

// Setting Item Component
const SettingItem = ({
  icon,
  label,
  value,
  onClick,
  toggle,
  onToggle,
}: {
  icon: string;
  label: string;
  value?: string;
  onClick?: () => void;
  toggle?: boolean;
  onToggle?: (value: boolean) => void;
}) => (
  <div
    className={`flex items-center justify-between py-4 border-b ${
      onClick ? "cursor-pointer hover:bg-zinc-800/30" : ""
    }`}
    style={{ borderColor: "#2A2A2A" }}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center">
        <i className={icon} style={{ color: "#FF8C42", fontSize: "20px" }}></i>
      </div>
      <div>
        <div className="font-medium" style={{ color: "#F5F3F0" }}>
          {label}
        </div>
        {value && (
          <div className="text-sm" style={{ color: "#8F8A84" }}>
            {value}
          </div>
        )}
      </div>
    </div>
    {toggle !== undefined && onToggle && (
      <Toggle enabled={toggle} onChange={onToggle} />
    )}
    {onClick && (
      <i
        className="ri-arrow-right-s-line"
        style={{ color: "#8F8A84", fontSize: "20px" }}
      ></i>
    )}
  </div>
);

// Main Settings Page
const SettingsPage = () => {
  const navigate = useNavigate();
  const [showDisplayNameModal, setShowDisplayNameModal] = useState(false);
  const [displayName, setDisplayName] = useState("VanillaLatte");
  const [tempDisplayName, setTempDisplayName] = useState("VanillaLatte");

  const handleSaveDisplayName = () => {
    setDisplayName(tempDisplayName);
    setShowDisplayNameModal(false);
  };

  // State for toggles
  const [notifications, setNotifications] = useState({
    messages: true,
    sellerResponses: true,
    escrowUpdates: true,
    listingUpdates: true,
    reputationUpdates: true,
    proposalNotifications: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    showReputation: true,
    showTradeHistory: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto" style={{ paddingTop: "60px" }}>
          {/* Page Header */}
          <div className="mb-12">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Settings
            </h1>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Manage your account, security, and preferences
            </p>
          </div>

          {/* 1) Account Section */}
          <div
            className="rounded-3xl p-8 mb-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <SectionHeader title="Account" />
            <div>
              <div
                className="flex items-center justify-between py-4 border-b border-zinc-700 cursor-pointer hover:bg-zinc-800/30 transition-colors"
                onClick={() => {
                  setTempDisplayName(displayName);
                  setShowDisplayNameModal(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <i className="ri-user-line text-orange-500 text-xl"></i>
                  </div>
                  <div>
                    <div className="font-medium text-zinc-100">
                      Display name
                    </div>
                    <div className="text-sm text-zinc-400">{displayName}</div>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-zinc-400 text-xl"></i>
              </div>
              <SettingItem
                icon="ri-image-line"
                label="Profile photo"
                value="Change photo"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-mail-line"
                label="Email"
                value="Optional"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-global-line"
                label="Language"
                value="English"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-map-pin-line"
                label="Region"
                value="United States"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* 2) Wallet & Security Section */}
          <div
            className="rounded-3xl p-8 mb-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <SectionHeader title="Wallet &amp; Security" />
            <div>
              <SettingItem
                icon="ri-wallet-line"
                label="Connected wallets"
                value="0xA3...91c5 (Primary)"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-add-circle-line"
                label="Add another wallet"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-key-line"
                label="Backup key status"
                value="Secured"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-shield-check-line"
                label="Two-factor authentication"
                toggle={twoFactorEnabled}
                onToggle={setTwoFactorEnabled}
              />
              <SettingItem
                icon="ri-device-line"
                label="Active login sessions"
                value="2 devices"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* 3) Notifications Section */}
          <div
            className="rounded-3xl p-8 mb-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <SectionHeader title="Notifications" />
            <div>
              <SettingItem
                icon="ri-message-3-line"
                label="New message alerts"
                toggle={notifications.messages}
                onToggle={(value) =>
                  setNotifications({ ...notifications, messages: value })
                }
              />
              <SettingItem
                icon="ri-chat-check-line"
                label="Seller response alerts"
                toggle={notifications.sellerResponses}
                onToggle={(value) =>
                  setNotifications({ ...notifications, sellerResponses: value })
                }
              />
              <SettingItem
                icon="ri-safe-line"
                label="Escrow payment updates"
                toggle={notifications.escrowUpdates}
                onToggle={(value) =>
                  setNotifications({ ...notifications, escrowUpdates: value })
                }
              />
              <SettingItem
                icon="ri-price-tag-3-line"
                label="Listing status updates"
                toggle={notifications.listingUpdates}
                onToggle={(value) =>
                  setNotifications({ ...notifications, listingUpdates: value })
                }
              />
              <SettingItem
                icon="ri-trophy-line"
                label="Reputation / badge updates"
                toggle={notifications.reputationUpdates}
                onToggle={(value) =>
                  setNotifications({
                    ...notifications,
                    reputationUpdates: value,
                  })
                }
              />
              <SettingItem
                icon="ri-government-line"
                label="Proposal vote results"
                toggle={notifications.proposalNotifications}
                onToggle={(value) =>
                  setNotifications({
                    ...notifications,
                    proposalNotifications: value,
                  })
                }
              />
              <SettingItem
                icon="ri-megaphone-line"
                label="Marketing notifications"
                toggle={notifications.marketing}
                onToggle={(value) =>
                  setNotifications({ ...notifications, marketing: value })
                }
              />
            </div>
          </div>

          {/* 4) Marketplace Preferences Section */}
          <div
            className="rounded-3xl p-8 mb-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <SectionHeader title="Marketplace Preferences" />
            <div>
              <SettingItem
                icon="ri-map-pin-user-line"
                label="My location"
                value="Brooklyn, NY"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-radar-line"
                label="Trading radius"
                value="5 km"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-hand-heart-line"
                label="Preferred meetup method"
                value="Public place"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-money-dollar-circle-line"
                label="Currency display"
                value="USD"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* 5) Privacy & Data Control Section */}
          <div
            className="rounded-3xl p-8 mb-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <SectionHeader title="Privacy &amp; Data Control" />
            <div>
              <SettingItem
                icon="ri-eye-line"
                label="Show my reputation score"
                toggle={privacy.showReputation}
                onToggle={(value) =>
                  setPrivacy({ ...privacy, showReputation: value })
                }
              />
              <SettingItem
                icon="ri-history-line"
                label="Show my past trades"
                toggle={privacy.showTradeHistory}
                onToggle={(value) =>
                  setPrivacy({ ...privacy, showTradeHistory: value })
                }
              />
              <SettingItem
                icon="ri-download-cloud-line"
                label="Export my data"
                value="Download all data"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-database-2-line"
                label="Off-chain storage disclosure"
                value="View details"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-robot-line"
                label="AI fraud detection data usage"
                value="Learn more"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-delete-bin-line"
                label="Delete account"
                value="Permanently delete"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* 6) About / Support / Legal Section */}
          <div
            className="rounded-3xl p-8 mb-12"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <SectionHeader title="About / Support / Legal" />
            <div>
              <SettingItem
                icon="ri-question-line"
                label="Help Center"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-customer-service-line"
                label="Contact support"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-file-text-line"
                label="Terms of Use"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-shield-user-line"
                label="Privacy Policy"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-money-dollar-box-line"
                label="Fee policy"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-book-open-line"
                label="Switch Protocol Whitepaper"
                onClick={() => {}}
              />
              <SettingItem
                icon="ri-information-line"
                label="App version"
                value="v1.0.2"
              />
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mb-16">
            <button
              onClick={() => navigate("/profile")}
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
            >
              Back to profile
            </button>
          </div>
        </div>
      </main>

      {/* Display Name Modal */}
      {showDisplayNameModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">
          <div className="bg-zinc-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Edit Display Name</h3>
              <button
                onClick={() => setShowDisplayNameModal(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-zinc-700 rounded-full cursor-pointer transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Display name
              </label>
              <input
                type="text"
                value={tempDisplayName}
                onChange={(e) => setTempDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Enter your display name"
                maxLength={30}
              />
              <p className="text-xs text-zinc-400 mt-2">
                This is how other users will see you on Switch
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDisplayNameModal(false)}
                className="flex-1 px-4 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDisplayName}
                disabled={!tempDisplayName.trim()}
                className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SettingsPage;
