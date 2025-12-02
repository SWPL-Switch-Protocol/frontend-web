import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';

// Footer Component
const Footer = () => {
  return (
    <footer className="px-6 py-20" style={{ backgroundColor: '#2B2522' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#FF8C42' }}>
              SWITCH SOCIAL MARKET
            </h3>
            <p className="text-sm" style={{ color: '#B3ADA7' }}>
              © 2025 Switch Foundation.<br />All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#F5F3F0' }}>Switch</h4>
            <ul className="space-y-2">
              {['About', 'Team', 'Vision', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm cursor-pointer transition-colors hover:text-[#FF8C42]" style={{ color: '#B3ADA7' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#F5F3F0' }}>Community</h4>
            <ul className="space-y-2">
              {['Discord', 'Telegram', 'Twitter(X)', 'Announcements', 'Apply as Local Leader'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm cursor-pointer transition-colors hover:text-[#FF8C42]" style={{ color: '#B3ADA7' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#F5F3F0' }}>Legal</h4>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm cursor-pointer transition-colors hover:text-[#FF8C42]" style={{ color: '#B3ADA7' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-8" style={{ borderTop: '1px solid #3A3A3A' }}>
          {[
            { icon: 'ri-youtube-line', label: 'YouTube' },
            { icon: 'ri-twitter-x-line', label: 'X' },
            { icon: 'ri-discord-line', label: 'Discord' },
            { icon: 'ri-reddit-line', label: 'Reddit' },
            { icon: 'ri-github-line', label: 'GitHub' },
            { icon: 'ri-telegram-line', label: 'Telegram' },
          ].map((social) => (
            <a
              key={social.label}
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors hover:text-[#FF8C42]"
              style={{ backgroundColor: '#3A3A3A', color: '#B3ADA7' }}
              aria-label={social.label}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a 
            href="https://readdy.ai/?origin=logo" 
            className="text-xs cursor-pointer transition-colors hover:text-[#FF8C42]" 
            style={{ color: '#B3ADA7' }}
          >
            Powered by Readdy
          </a>
        </div>
      </div>
    </footer>
  );
};

// Main DAO Page
const DAOPage = () => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    {
      icon: 'ri-vote-line',
      title: 'Participate in local votes',
      description: 'Help shape your community decisions.',
    },
    {
      icon: 'ri-group-line',
      title: 'Host & join local meetups',
      description: 'Trusted members can organize events.',
    },
    {
      icon: 'ri-medal-line',
      title: 'Community recognition badges',
      description: 'Earn reputation through contributions.',
    },
  ];

  const leaderboard = [
    { rank: '🥇', name: 'PixelPanda', contributions: 8 },
    { rank: '🥈', name: 'HarborJack', contributions: 6 },
    { rank: '🥉', name: 'LunaBeans', contributions: 5 },
  ];

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1B1B1B' }}>
        <Header />

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
              Access locked
            </h2>
            <p className="text-lg mb-8" style={{ color: '#B3ADA7' }}>
              Complete a safe transaction to join your local DAO.
            </p>
            <button
              onClick={() => navigate('/listings')}
              className="px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
            >
              Back to marketplace
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1B1B1B' }}>
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Success Block */}
          <div className="text-center mb-16" style={{ paddingTop: '60px' }}>
            <div
              className={`rounded-3xl p-10 mx-auto transition-all ${showConfetti ? 'animate-pulse-once' : ''}`}
              style={{ backgroundColor: '#1F1F1F', maxWidth: '680px' }}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
                You've unlocked your local DAO
              </h1>
              <p className="text-lg" style={{ color: '#B3ADA7' }}>
                Your successful transaction increased your trust level and granted access to your neighborhood community.
              </p>
            </div>
          </div>

          {/* DAO Access Status Card */}
          <div className="rounded-2xl p-8 mb-12" style={{ backgroundColor: '#1F1F1F' }}>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2" style={{ color: '#B3ADA7' }}>
                Neighborhood DAO:
              </h3>
              <p className="text-2xl font-bold" style={{ color: '#F5F3F0' }}>
                Williamsburg, Brooklyn 🏙️
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2" style={{ color: '#B3ADA7' }}>
                Your role:
              </h3>
              <div
                className="inline-block px-4 py-2 rounded-full"
                style={{ backgroundColor: '#E8F0E6', color: '#6E8B5E' }}
              >
                <span className="font-semibold text-sm">✅ Verified Resident</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: '#B3ADA7' }}>
                Requirements completed:
              </h3>
              <ul className="space-y-2">
                {[
                  'Minimum 1 safe transaction',
                  'On-chain reputation verified',
                  'Wallet DID active',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <i className="ri-checkbox-circle-fill" style={{ color: '#4CAF50', fontSize: '18px' }}></i>
                    <span className="text-sm" style={{ color: '#D8D2CD' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs" style={{ color: '#8F8A84' }}>
              Access is based on reputation — not follower count or invites.
            </p>
          </div>

          {/* DAO Benefits Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#F5F3F0' }}>
              What you can do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: '#262626' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#3A3A3A' }}
                  >
                    <i className={benefit.icon} style={{ color: '#FF8C42', fontSize: '24px' }}></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F3F0' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm" style={{ color: '#B3ADA7' }}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DAO Treasury Preview */}
          <div className="rounded-2xl p-8 mb-12" style={{ backgroundColor: '#1F1F1F' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#F5F3F0' }}>
              Community treasury
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div>
                <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>Balance:</p>
                <p className="text-2xl font-bold" style={{ color: '#FF8C42' }}>$2,450</p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>Members:</p>
                <p className="text-2xl font-bold" style={{ color: '#F5F3F0' }}>128 residents</p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>Last funded:</p>
                <p className="text-2xl font-bold" style={{ color: '#F5F3F0' }}>3 days ago</p>
              </div>
            </div>
            <p className="text-xs" style={{ color: '#8F8A84' }}>
              Treasury funds and voting are simulated for demo purposes.
            </p>
          </div>

          {/* Leaderboard Preview */}
          <div className="rounded-2xl p-8 mb-12" style={{ backgroundColor: '#1F1F1F' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#F5F3F0' }}>
              Top contributors
            </h2>
            <div className="space-y-4 mb-6">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: '#262626' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{user.rank}</span>
                    <span className="font-semibold" style={{ color: '#F5F3F0' }}>
                      {user.name}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: '#B3ADA7' }}>
                    {user.contributions} contributions
                  </span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: '#262626', color: '#F5F3F0' }}
            >
              View full leaderboard
            </button>
          </div>

          {/* Quest Unlock Strip */}
          <div
            className="rounded-xl p-6 mb-12 flex items-start justify-between gap-4"
            style={{ backgroundColor: '#2B2B2B' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-semibold" style={{ color: '#F5F3F0' }}>
                  New community quest available
                </h3>
              </div>
              <p className="text-sm" style={{ color: '#B3ADA7' }}>
                Help verify local listings and earn contribution points.
              </p>
            </div>
            <button
              className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90 flex-shrink-0"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
            >
              View quest
            </button>
          </div>

          {/* Action CTA Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate('/dao-space')}
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
            >
              Enter DAO space
            </button>
            <button
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: 'transparent', color: '#F5F3F0', border: '1px solid #3A3A3A' }}
            >
              Learn how it works
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes pulse-once {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        .animate-pulse-once {
          animation: pulse-once 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DAOPage;
