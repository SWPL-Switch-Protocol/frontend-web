import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function QuestPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStartVerification = () => {
    setIsCompleted(true);
  };

  const handleBackToDAO = () => {
    navigate('/dao');
  };

  const handleViewBadges = () => {
    navigate('/badges');
  };

  const handleViewListing = () => {
    navigate('/listings');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#262626' }}>
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <h1 className="text-lg font-semibold" style={{ color: '#f5f3f0' }}>
              Quest Complete
            </h1>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Success Content */}
        <main className="pt-20 pb-8 px-4">
          <div className="max-w-md mx-auto text-center">
            {/* Confetti Animation */}
            <div className="mb-8 text-6xl animate-bounce">
              🎉
            </div>

            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
              <i className="ri-check-line text-4xl text-white"></i>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#f5f3f0' }}>
              Quest completed!
            </h2>

            <p className="text-lg mb-8" style={{ color: '#a8a29e' }}>
              Your reputation has been updated and your badge has been issued.
            </p>

            {/* Reward Summary */}
            <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: '#262626' }}>
              <h3 className="text-sm font-medium mb-4" style={{ color: '#a8a29e' }}>
                You earned
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                      <i className="ri-arrow-up-line text-white"></i>
                    </div>
                    <span className="font-medium" style={{ color: '#f5f3f0' }}>
                      +1 Reputation
                    </span>
                  </div>
                  <i className="ri-check-line text-xl" style={{ color: '#10b981' }}></i>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                      <i className="ri-medal-line text-white"></i>
                    </div>
                    <span className="font-medium" style={{ color: '#f5f3f0' }}>
                      Verified Contributor SBT
                    </span>
                  </div>
                  <i className="ri-check-line text-xl" style={{ color: '#10b981' }}></i>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBackToDAO}
                className="w-full px-8 py-4 rounded-full font-semibold text-lg transition-all hover:brightness-110"
                style={{ backgroundColor: '#f5f3f0', color: '#1a1a1a' }}
              >
                Back to DAO
              </button>
              <button
                onClick={handleViewBadges}
                className="w-full px-8 py-4 rounded-full font-semibold text-lg transition-all hover:brightness-110"
                style={{ backgroundColor: '#262626', color: '#f5f3f0' }}
              >
                View my badges
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#262626' }}>
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>
          <h1 className="text-lg font-semibold" style={{ color: '#f5f3f0' }}>
            Community Quest
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#f5f3f0' }}>
              Community quest unlocked 🎉
            </h2>
            <p className="text-lg" style={{ color: '#a8a29e' }}>
              Earn rewards by contributing to your neighborhood.
            </p>
          </div>

          {/* Quest Summary Card */}
          <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: '#262626' }}>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#f5f3f0' }}>
              Verify a new listing
            </h3>
            <p className="mb-6" style={{ color: '#a8a29e' }}>
              Trusted members can help confirm authenticity of newly posted items in your area.
            </p>

            {/* Requirements */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <i className="ri-checkbox-circle-fill text-xl" style={{ color: '#10b981' }}></i>
                <span style={{ color: '#f5f3f0' }}>Verified Resident</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-checkbox-circle-fill text-xl" style={{ color: '#10b981' }}></i>
                <span style={{ color: '#f5f3f0' }}>On-chain reputation active</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-checkbox-blank-circle-line text-xl" style={{ color: '#a8a29e' }}></i>
                <span style={{ color: '#a8a29e' }}>Quest not yet completed</span>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="flex items-center gap-2 mb-6">
              <i className="ri-time-line" style={{ color: '#a8a29e' }}></i>
              <span className="text-sm" style={{ color: '#a8a29e' }}>
                Estimated time: 2 minutes
              </span>
            </div>

            {/* Badge Preview */}
            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: '#1a1a1a' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                  <i className="ri-medal-line text-xl text-white"></i>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: '#f5f3f0' }}>
                    Reward: Verified Contributor SBT
                  </p>
                </div>
              </div>
            </div>

            {/* SBT Notice */}
            <p className="text-xs" style={{ color: '#78716c' }}>
              Badges are non-transferable and permanently bound to your wallet.
            </p>
          </div>

          {/* Action CTA */}
          <div className="mb-8 space-y-3">
            <button
              onClick={handleStartVerification}
              className="w-full px-8 py-4 rounded-full font-semibold text-lg transition-all hover:brightness-110"
              style={{ backgroundColor: '#f5f3f0', color: '#1a1a1a' }}
            >
              Start verification
            </button>
            <button
              onClick={handleViewListing}
              className="w-full text-center py-2 font-medium transition-all hover:opacity-80"
              style={{ color: '#a8a29e' }}
            >
              View listing first
            </button>
          </div>

          {/* What You Will Earn */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#f5f3f0' }}>
              Rewards
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{ backgroundColor: '#262626' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#10b981' }}>
                  <i className="ri-arrow-up-line text-xl text-white"></i>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#f5f3f0' }}>
                  +1 reputation
                </h4>
                <p className="text-sm" style={{ color: '#a8a29e' }}>
                  Your trust score increases on-chain.
                </p>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: '#262626' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#f59e0b' }}>
                  <i className="ri-medal-line text-xl text-white"></i>
                </div>
                <h4 className="font-semibold mb-2" style={{ color: '#f5f3f0' }}>
                  Verified Contributor badge
                </h4>
                <p className="text-sm" style={{ color: '#a8a29e' }}>
                  Unlocks advanced responsibilities in your neighborhood DAO.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#f5f3f0' }}>
              Progress
            </h3>
            <div className="rounded-xl p-6" style={{ backgroundColor: '#262626' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}>
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: '#f5f3f0' }}>
                      Review listing
                    </p>
                    <p className="text-sm" style={{ color: '#a8a29e' }}>
                      Pending
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#44403c' }}>
                    <i className="ri-lock-line text-sm" style={{ color: '#78716c' }}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: '#78716c' }}>
                      Submit verification
                    </p>
                    <p className="text-sm" style={{ color: '#78716c' }}>
                      Locked
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#44403c' }}>
                    <i className="ri-lock-line text-sm" style={{ color: '#78716c' }}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: '#78716c' }}>
                      DAO confirmation
                    </p>
                    <p className="text-sm" style={{ color: '#78716c' }}>
                      Auto
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-4" style={{ color: '#a8a29e' }}>
                Your action will be reviewed by other trusted members.
              </p>
            </div>
          </div>

          {/* Safety & Integrity Notice */}
          <div className="rounded-xl p-4 flex gap-3" style={{ backgroundColor: '#262626', borderLeft: '4px solid #f59e0b' }}>
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-check-line text-xl" style={{ color: '#f59e0b' }}></i>
            </div>
            <p className="text-sm" style={{ color: '#a8a29e' }}>
              All verification actions are monitored by AI to detect fraud and unusual behavior. Misuse may decrease reputation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
