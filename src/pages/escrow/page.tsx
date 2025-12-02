import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

// Main Escrow Page
const EscrowPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSuspicious, setShowSuspicious] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const productId = searchParams.get('product');

  const steps = [
    { id: 1, label: 'Escrow locked', icon: 'ri-lock-line' },
    { id: 2, label: 'Waiting for confirmation', icon: 'ri-time-line' },
    { id: 3, label: 'Completed', icon: 'ri-check-line' },
  ];

  const handleConfirm = () => {
    if (!isConfirmed) return;
    
    setIsCompleted(true);
    setCurrentStep(3);
    
    setTimeout(() => {
      navigate('/profile?from=escrow');
    }, 1200);
  };

  useEffect(() => {
    // Simulate waiting for other party confirmation
    const timer = setTimeout(() => {
      setIsConfirmed(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!productId) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1B1B1B' }}>
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
              Transaction unavailable
            </h2>
            <p className="mb-8" style={{ color: '#B3ADA7' }}>
              Please check your wallet activity.
            </p>
            <button
              onClick={() => navigate('/listings')}
              className="px-6 py-3 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1B1B1B' }}>
      <Header />

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Title Block */}
          <div className="text-center mb-16" style={{ paddingTop: '60px' }}>
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
              Escrow in progress
            </h1>
            <p className="text-lg" style={{ color: '#B3ADA7' }}>
              Your payment is securely held until both sides confirm.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1 flex flex-col items-center relative z-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all"
                    style={{
                      backgroundColor: currentStep >= step.id ? '#FF8C42' : '#4A4A4A',
                      color: '#FFFFFF',
                    }}
                  >
                    <i className={`${step.icon} text-2xl`}></i>
                  </div>
                  <p
                    className="text-sm font-medium text-center"
                    style={{
                      color: currentStep >= step.id ? '#F5F3F0' : '#8F8A84',
                      fontWeight: currentStep >= step.id ? 'bold' : 'normal',
                    }}
                  >
                    {step.label}
                  </p>
                  {index < steps.length - 1 && (
                    <div
                      className="absolute top-8 left-1/2 w-full h-0.5"
                      style={{
                        backgroundColor: currentStep > step.id ? '#FF8C42' : '#3A3A3A',
                        zIndex: -1,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Safety Check Card */}
          <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: '#1F1F1F' }}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {showSuspicious ? (
                  <i className="ri-alert-line text-2xl" style={{ color: '#FFA500' }}></i>
                ) : (
                  <i className="ri-shield-check-line text-2xl" style={{ color: '#4CAF50' }}></i>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-2" style={{ color: '#F5F3F0' }}>
                  {showSuspicious ? '⚠ Suspicious pattern detected' : '✅ No suspicious activity detected'}
                </p>
                <p className="text-sm" style={{ color: '#B3ADA7' }}>
                  {showSuspicious
                    ? 'Sent to DAO for review. Final decision will be made by community validators.'
                    : 'AI continuously monitors transaction patterns.'}
                </p>
              </div>
              <button
                onClick={() => setShowSuspicious(!showSuspicious)}
                className="px-3 py-1 rounded text-xs cursor-pointer transition-all hover:opacity-80"
                style={{ backgroundColor: '#262626', color: '#B3ADA7' }}
              >
                Toggle Demo
              </button>
            </div>
          </div>

          {/* Transaction Details Card */}
          <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: '#1F1F1F' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#F5F3F0' }}>
              Transaction Details
            </h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span style={{ color: '#B3ADA7' }}>Item:</span>
                <span className="font-medium" style={{ color: '#F5F3F0' }}>Nintendo Switch OLED – White</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#B3ADA7' }}>Buyer:</span>
                <span className="font-mono text-sm" style={{ color: '#F5F3F0' }}>0xA3...91c5</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#B3ADA7' }}>Seller:</span>
                <span className="font-mono text-sm" style={{ color: '#F5F3F0' }}>0xA4...92b1</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#B3ADA7' }}>Amount held:</span>
                <span className="font-semibold text-lg" style={{ color: '#FF8C42' }}>$260 in escrow</span>
              </div>
            </div>
            <div className="pt-4" style={{ borderTop: '1px solid #2B2B2B' }}>
              <p className="text-xs" style={{ color: '#8F8A84' }}>
                Funds cannot be released or canceled without on-chain confirmation.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="relative mb-8">
            <button
              onClick={handleConfirm}
              onMouseEnter={() => !isConfirmed && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              disabled={!isConfirmed}
              className="w-full py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all disabled:cursor-not-allowed"
              style={{
                backgroundColor: isConfirmed ? '#FF8C42' : '#3A3A3A',
                color: isConfirmed ? '#FFFFFF' : '#8F8A84',
                opacity: isConfirmed ? 1 : 0.6,
              }}
            >
              {isCompleted ? '✅ Transaction completed' : 'Confirm transaction'}
            </button>
            {showTooltip && !isConfirmed && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                style={{ backgroundColor: '#262626', color: '#F5F3F0' }}
              >
                Waiting for the other party to confirm.
              </div>
            )}
          </div>

          {/* Completion State */}
          {isCompleted && (
            <div
              className="rounded-2xl p-6 mb-8 text-center animate-pulse"
              style={{ backgroundColor: '#2E4B36' }}
            >
              <i className="ri-check-double-line text-4xl mb-2" style={{ color: '#4CAF50' }}></i>
              <p className="font-semibold" style={{ color: '#F5F3F0' }}>
                Reputation has been updated.
              </p>
            </div>
          )}

          {/* Safety Notice */}
          <div className="rounded-xl p-5" style={{ backgroundColor: '#262626' }}>
            <div className="flex items-start gap-3">
              <i className="ri-shield-check-line text-xl flex-shrink-0" style={{ color: '#4CAF50' }}></i>
              <div>
                <p className="text-sm leading-relaxed" style={{ color: '#B3ADA7' }}>
                  No off-platform messaging required.<br />
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
