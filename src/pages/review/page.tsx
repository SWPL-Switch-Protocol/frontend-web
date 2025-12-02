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

// Main Review Page
const ReviewPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showSuspicious, setShowSuspicious] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWalletConnected] = useState(true);

  const productId = searchParams.get('product') || '1';
  const maxChars = 240;

  const ratingLabels = ['', 'Unacceptable', 'Poor', 'Average', 'Good', 'Excellent'];

  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim().length === 0) return;

    setIsSubmitted(true);

    setTimeout(() => {
      navigate('/profile?from=review');
    }, 1200);
  };

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1B1B1B' }}>
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
              Connect your wallet to leave a review.
            </h2>
            <button
              className="px-6 py-3 rounded-full font-medium whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
            >
              Connect Wallet
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1B1B1B' }}>
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#2E4B36' }}
            >
              <i className="ri-check-line text-4xl" style={{ color: '#4CAF50' }}></i>
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#F5F3F0' }}>
              Review submitted
            </h2>
            <p className="text-lg mb-8" style={{ color: '#B3ADA7' }}>
              Your feedback has been added to your reputation history.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3 rounded-full font-medium whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
            >
              View my reputation
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
        <div className="max-w-[600px] mx-auto">
          {/* Title Block */}
          <div className="text-center mb-16" style={{ paddingTop: '60px' }}>
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
              Leave a review
            </h1>
            <p className="text-lg" style={{ color: '#B3ADA7' }}>
              Your feedback helps build trusted local communities.
            </p>
          </div>

          {/* Transaction Summary Card */}
          <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: '#1F1F1F' }}>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span style={{ color: '#B3ADA7' }}>Item:</span>
                <span className="font-medium" style={{ color: '#F5F3F0' }}>Nintendo Switch OLED — White</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#B3ADA7' }}>Seller:</span>
                <span className="font-mono text-sm" style={{ color: '#F5F3F0' }}>0xA4...92b1</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#B3ADA7' }}>Completed:</span>
                <span className="font-medium" style={{ color: '#F5F3F0' }}>Today</span>
              </div>
            </div>
            <div className="pt-4" style={{ borderTop: '1px solid #2B2B2B' }}>
              <p className="text-xs" style={{ color: '#8F8A84' }}>
                Your review will be recorded as part of your on-chain reputation.
              </p>
            </div>
          </div>

          {/* Rating Input Section */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4" style={{ color: '#F5F3F0' }}>
              Rate your experience
            </label>
            <div className="flex items-center gap-3 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="w-12 h-12 flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                >
                  <i
                    className={star <= (hoverRating || rating) ? 'ri-star-fill' : 'ri-star-line'}
                    style={{
                      color: star <= (hoverRating || rating) ? '#FF8C42' : '#5A5A5A',
                      fontSize: '32px',
                    }}
                  ></i>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-base font-medium" style={{ color: '#FF8C42' }}>
                {ratingLabels[rating]}
              </p>
            )}
          </div>

          {/* Review Text Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-4" style={{ color: '#F5F3F0' }}>
              Write a short review
            </label>
            <div className="relative">
              <textarea
                value={reviewText}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setReviewText(e.target.value);
                  }
                }}
                placeholder="Tell others about your experience…"
                className="w-full px-4 py-4 rounded-xl text-sm outline-none resize-none"
                style={{
                  backgroundColor: '#262626',
                  color: '#F5F3F0',
                  height: '140px',
                }}
              />
              <div
                className="absolute bottom-3 right-3 text-xs"
                style={{ color: '#8F8A84' }}
              >
                {reviewText.length}/{maxChars}
              </div>
            </div>
          </div>

          {/* AI Safety Check Strip */}
          <div className="rounded-xl p-4 mb-8" style={{ backgroundColor: '#2B2B2B' }}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {showSuspicious ? (
                  <i className="ri-alert-line text-xl" style={{ color: '#FFA500' }}></i>
                ) : (
                  <i className="ri-shield-check-line text-xl" style={{ color: '#4CAF50' }}></i>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1" style={{ color: '#F5F3F0' }}>
                  {showSuspicious ? '⚠ Potential harmful content detected' : '✅ No issues detected'}
                </p>
                <p className="text-xs mb-2" style={{ color: '#B3ADA7' }}>
                  {showSuspicious
                    ? 'This review will be flagged for DAO verification.'
                    : 'Your message looks safe.'}
                </p>
                <p className="text-xs" style={{ color: '#8F8A84' }}>
                  AI checks toxicity and scam patterns before publishing.
                </p>
              </div>
              <button
                onClick={() => setShowSuspicious(!showSuspicious)}
                className="px-3 py-1 rounded text-xs cursor-pointer transition-all hover:opacity-80"
                style={{ backgroundColor: '#1F1F1F', color: '#B3ADA7' }}
              >
                Toggle Demo
              </button>
            </div>
          </div>

          {/* Submit Button Area */}
          <div className="mb-4">
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || reviewText.trim().length === 0}
              className="w-full py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all disabled:cursor-not-allowed"
              style={{
                backgroundColor: rating === 0 || reviewText.trim().length === 0 ? '#3A3A3A' : '#FF8C42',
                color: rating === 0 || reviewText.trim().length === 0 ? '#8F8A84' : '#FFFFFF',
                opacity: rating === 0 || reviewText.trim().length === 0 ? 0.6 : 1,
                height: '54px',
              }}
            >
              Submit review
            </button>
          </div>

          {/* Microcopy */}
          <p className="text-center text-xs" style={{ color: '#8F8A84' }}>
            Your review cannot be edited after submission.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewPage;
