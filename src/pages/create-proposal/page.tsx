import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";

// Main Create Proposal Page
const CreateProposalPage = () => {
  const navigate = useNavigate();
  const [isWalletConnected] = useState(true);
  const [hasAccess] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    treasuryAmount: "",
    supportingLink: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
  });

  const categories = [
    "Local activities (meetups)",
    "Community improvements",
    "Listing verification process",
    "Hobbies & clubs (e.g., bonsai group)",
    "Treasury spending request",
    "Safety & trust policies",
  ];

  const requirements = [
    { label: "Verified reputation", met: true },
    { label: "Wallet DID active", met: true },
    { label: "Minimum 1 completed transaction", met: true },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      category: "",
      description: "",
    };

    if (!formData.title || formData.title.length < 10) {
      newErrors.title = "Title is required (minimum 10 characters)";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.description || formData.description.length < 50) {
      newErrors.description = "Description is required (minimum 50 characters)";
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.category && !newErrors.description;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/dao-space");
      }, 2000);
    }
  };

  const isFormValid =
    formData.title.length >= 10 &&
    formData.category &&
    formData.description.length >= 50;

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#1B1B1B" }}>
        <Header />

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🔌</div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Connect your wallet to create a proposal
            </h2>
            <button
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Connect Wallet
            </button>
          </div>
        </main>

        <footer className="py-20" style={{ backgroundColor: "#2B2522" }}>
          <Footer />
        </footer>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#1B1B1B" }}>
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
              Proposal creation restricted
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
                Minimum 1 safe transaction
              </li>
            </ul>
            <button
              onClick={() => navigate("/dao-space")}
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Back to DAO
            </button>
          </div>
        </main>

        <footer className="py-20" style={{ backgroundColor: "#2B2522" }}>
          <Footer />
        </footer>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#1B1B1B" }}>
        <Header />

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div
            className="text-center max-w-md rounded-2xl p-10"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <div className="text-6xl mb-6">✅</div>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Proposal submitted
            </h2>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Your proposal is now open for community review.
            </p>
          </div>
        </main>

        <footer className="py-20" style={{ backgroundColor: "#2B2522" }}>
          <Footer />
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1B1B1B" }}>
      <Header />

      <main className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-[900px] mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8" style={{ paddingTop: "48px" }}>
            <h1
              className="text-4xl font-bold mb-3"
              style={{ color: "#F5F3F0" }}
            >
              Create a new proposal
            </h1>
            <p className="text-lg" style={{ color: "#B3ADA7" }}>
              Submit ideas for your neighborhood. Proposals require approval
              from trusted residents.
            </p>
          </div>

          <div
            className="mb-8"
            style={{ borderBottom: "1px solid #2B2B2B" }}
          ></div>

          {/* Guidance Section */}
          <div
            className="mb-8 rounded-2xl p-6"
            style={{ backgroundColor: "#1F1F1F" }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: "#F5F3F0" }}
            >
              Not sure where to start?
            </h3>
            <p className="text-sm mb-4" style={{ color: "#B3ADA7" }}>
              Examples:
            </p>
            <ul className="space-y-2 mb-4">
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: "#D8D2CD" }}
              >
                <span>🌿</span>
                <span>Host a monthly bonsai workshop</span>
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: "#D8D2CD" }}
              >
                <span>✅</span>
                <span>Improve listing verification flow</span>
              </li>
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: "#D8D2CD" }}
              >
                <span>🎉</span>
                <span>Request funding for community meetup</span>
              </li>
            </ul>
            <button
              className="text-sm font-medium cursor-pointer transition-colors hover:opacity-80"
              style={{ color: "#FF8C42" }}
            >
              View proposal examples →
            </button>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit}>
            <div
              className="rounded-2xl p-8 space-y-6"
              style={{ backgroundColor: "#1F1F1F" }}
            >
              {/* Title Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#F5F3F0" }}
                >
                  Proposal title <span style={{ color: "#FF8C42" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Add a weekly community meetup"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                />
                {errors.title && (
                  <p className="text-xs mt-1" style={{ color: "#FF6B6B" }}>
                    {errors.title}
                  </p>
                )}
                <p className="text-xs mt-1" style={{ color: "#8F8A84" }}>
                  Minimum 10 characters
                </p>
              </div>

              {/* Category Dropdown */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#F5F3F0" }}
                >
                  Category <span style={{ color: "#FF8C42" }}>*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 pr-8 rounded-lg text-sm outline-none cursor-pointer"
                  style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs mt-1" style={{ color: "#FF6B6B" }}>
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#F5F3F0" }}
                >
                  Description <span style={{ color: "#FF8C42" }}>*</span>
                </label>
                <textarea
                  placeholder="Describe what you want to propose, why it matters, and how the community will benefit."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                  style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                ></textarea>
                {errors.description && (
                  <p className="text-xs mt-1" style={{ color: "#FF6B6B" }}>
                    {errors.description}
                  </p>
                )}
                <p className="text-xs mt-1" style={{ color: "#8F8A84" }}>
                  Minimum 50 characters
                </p>
              </div>

              {/* Optional Fields Section */}
              <div className="pt-4" style={{ borderTop: "1px solid #2B2B2B" }}>
                <h3
                  className="text-base font-semibold mb-4"
                  style={{ color: "#F5F3F0" }}
                >
                  Optional details
                </h3>

                {/* Location */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#D8D2CD" }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Domino Park"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                  />
                </div>

                {/* Treasury Amount */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#D8D2CD" }}
                  >
                    Requested treasury amount
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., $80 for meetup supplies"
                    value={formData.treasuryAmount}
                    onChange={(e) =>
                      handleInputChange("treasuryAmount", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                  />
                  <p className="text-xs mt-1" style={{ color: "#8F8A84" }}>
                    Funds can only be used after voting approval.
                  </p>
                </div>

                {/* Supporting Link */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#D8D2CD" }}
                  >
                    Supporting link
                  </label>
                  <input
                    type="url"
                    placeholder="Add reference link or document"
                    value={formData.supportingLink}
                    onChange={(e) =>
                      handleInputChange("supportingLink", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                  />
                </div>
              </div>

              {/* Requirements Check */}
              <div className="pt-6" style={{ borderTop: "1px solid #2B2B2B" }}>
                <h3
                  className="text-base font-semibold mb-3"
                  style={{ color: "#F5F3F0" }}
                >
                  Requirements check
                </h3>
                <div className="space-y-2 mb-3">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <i
                        className={
                          req.met
                            ? "ri-checkbox-circle-fill"
                            : "ri-close-circle-line"
                        }
                        style={{ color: req.met ? "#6E8B5E" : "#8F8A84" }}
                      ></i>
                      <span
                        className="text-sm"
                        style={{ color: req.met ? "#D8D2CD" : "#8F8A84" }}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#8F8A84" }}>
                  Access is based on trust — not follower count.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
                >
                  Submit proposal
                </button>
                {!isFormValid && (
                  <p
                    className="text-xs mt-2 text-center"
                    style={{ color: "#8F8A84" }}
                  >
                    Complete all required fields to continue.
                  </p>
                )}
              </div>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => navigate("/dao-space")}
                className="w-full py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
              >
                Back to DAO home
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20" style={{ backgroundColor: "#2B2522" }}>
        <Footer />
      </footer>
    </div>
  );
};

export default CreateProposalPage;
