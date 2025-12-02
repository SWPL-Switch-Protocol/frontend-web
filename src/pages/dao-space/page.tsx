import { useState } from 'react';
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

// Main DAO Space Page
const DAOSpacePage = () => {
  const navigate = useNavigate();
  const [hasAccess] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'proposals' | 'voting' | 'members'>('feed');
  const [selectedVote, setSelectedVote] = useState<string>('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const tabs = [
    { id: 'feed' as const, label: 'Feed', icon: 'ri-home-line' },
    { id: 'proposals' as const, label: 'Proposals', icon: 'ri-file-list-line' },
    { id: 'voting' as const, label: 'Voting results', icon: 'ri-pie-chart-line' },
    { id: 'members' as const, label: 'Members', icon: 'ri-group-line' },
  ];

  const feedPosts = [
    {
      type: 'meetup',
      title: 'Community meetup announced',
      host: 'HarborJack',
      location: 'Domino Park',
      date: 'Saturday at 3PM',
      icon: 'ri-calendar-event-line',
      proposalId: 1,
    },
    {
      type: 'verification',
      title: 'New listing verification request',
      item: 'Trek FX3 Bike',
      description: 'Trusted members can confirm authenticity',
      icon: 'ri-shield-check-line',
    },
    {
      type: 'welcome',
      title: 'Welcome new verified members',
      description: '3 new residents joined today 🎉',
      icon: 'ri-user-add-line',
    },
  ];

  const proposals = [
    {
      id: 1,
      title: 'Add a weekly community meetup',
      creator: 'LunaBeans',
      status: 'Open for voting',
      timeRemaining: '48h remaining',
      description: 'Host a recurring Saturday meetup in Domino Park.',
      createdDate: 'Today',
    },
    {
      id: 2,
      title: 'Improve listing verification process',
      creator: 'HarborJack',
      status: 'Draft',
      timeRemaining: null,
      description: 'Streamline the verification workflow for faster approvals.',
      createdDate: '2 days ago',
    },
  ];

  const members = [
    { name: 'HarborJack', badge: 'Verified Resident ✅', avatar: 'HJ' },
    { name: 'PixelPanda', badge: 'Top Contributor 🥇', avatar: 'PP' },
    { name: 'LunaBeans', badge: 'Proposal Creator', avatar: 'LB' },
    { name: 'VanillaLatte', badge: 'Verified Resident ✅', avatar: 'VL' },
  ];

  const handleVoteSubmit = () => {
    if (selectedVote) {
      setVoteSubmitted(true);
      setTimeout(() => {
        setVoteSubmitted(false);
        setSelectedVote('');
      }, 2000);
    }
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1B1B1B' }}>
        <Header />

        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
              DAO access restricted
            </h2>
            <p className="text-lg mb-8" style={{ color: '#B3ADA7' }}>
              Only trusted residents can enter this community space.
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
        <div className="max-w-[1200px] mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12" style={{ paddingTop: '50px' }}>
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#F5F3F0' }}>
              Williamsburg DAO
            </h1>
            <p className="text-lg" style={{ color: '#B3ADA7' }}>
              A reputation-based community space for trusted local members.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8" style={{ borderBottom: '1px solid #2B2B2B' }}>
            <div className="flex items-center gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 pb-4 cursor-pointer transition-all whitespace-nowrap"
                  style={{
                    color: activeTab === tab.id ? '#FF8C42' : '#B3ADA7',
                    borderBottom: activeTab === tab.id ? '2px solid #FF8C42' : '2px solid transparent',
                    fontWeight: activeTab === tab.id ? '600' : '400',
                  }}
                >
                  <i className={tab.icon}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Feed Tab */}
              {activeTab === 'feed' && (
                <div className="space-y-5">
                  {feedPosts.map((post, index) => (
                    <div
                      key={index}
                      className="rounded-2xl p-6"
                      style={{ backgroundColor: '#1F1F1F' }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#262626' }}
                        >
                          <i className={post.icon} style={{ color: '#FF8C42', fontSize: '20px' }}></i>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2" style={{ color: '#F5F3F0' }}>
                            {post.title}
                          </h3>
                          {post.type === 'meetup' && (
                            <>
                              <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>
                                Host: <span style={{ color: '#F5F3F0' }}>{post.host}</span>
                              </p>
                              <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>
                                Location: <span style={{ color: '#F5F3F0' }}>{post.location}</span>
                              </p>
                              <p className="text-sm mb-4" style={{ color: '#B3ADA7' }}>
                                Date: <span style={{ color: '#F5F3F0' }}>{post.date}</span>
                              </p>
                              <button
                                className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                                style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
                                onClick={() => navigate('/proposal/1')}
                              >
                                RSVP
                              </button>
                            </>
                          )}
                          {post.type === 'verification' && (
                            <>
                              <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>
                                Item: <span style={{ color: '#F5F3F0' }}>{post.item}</span>
                              </p>
                              <p className="text-sm mb-4" style={{ color: '#B3ADA7' }}>
                                {post.description}
                              </p>
                              <button
                                className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                                style={{ backgroundColor: '#262626', color: '#F5F3F0' }}
                              >
                                Review and verify
                              </button>
                            </>
                          )}
                          {post.type === 'welcome' && (
                            <p className="text-sm" style={{ color: '#B3ADA7' }}>
                              {post.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Proposals Tab */}
              {activeTab === 'proposals' && (
                <div className="space-y-5">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="rounded-2xl p-6"
                      style={{ backgroundColor: '#1F1F1F' }}
                    >
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#F5F3F0' }}>
                        {proposal.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm" style={{ color: '#B3ADA7' }}>
                          Created: <span style={{ color: '#F5F3F0' }}>{proposal.createdDate}</span>
                        </p>
                        <p className="text-sm" style={{ color: '#B3ADA7' }}>
                          Created by: <span style={{ color: '#F5F3F0' }}>{proposal.creator}</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: '#B3ADA7' }}>Status:</span>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: proposal.status === 'Open for voting' ? '#E8F0E6' : '#3A3A3A',
                              color: proposal.status === 'Open for voting' ? '#6E8B5E' : '#B3ADA7',
                            }}
                          >
                            {proposal.status}
                          </span>
                          {proposal.timeRemaining && (
                            <span className="text-xs" style={{ color: '#FF8C42' }}>
                              ({proposal.timeRemaining})
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm mb-4" style={{ color: '#D8D2CD' }}>
                        {proposal.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/proposal/${proposal.id}`)}
                          className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                          style={{ backgroundColor: '#262626', color: '#F5F3F0' }}
                        >
                          View details
                        </button>
                        {proposal.status === 'Open for voting' && (
                          <button
                            onClick={() => navigate(`/proposal/${proposal.id}`)}
                            className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                            style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
                          >
                            Vote now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Voting Tab */}
              {activeTab === 'voting' && (
                <div className="space-y-5">
                  <div
                    className="rounded-2xl p-6"
                    style={{ backgroundColor: '#1F1F1F' }}
                  >
                    {!voteSubmitted ? (
                      <>
                        <h3 className="text-xl font-semibold mb-6" style={{ color: '#F5F3F0' }}>
                          Should we enable item verification rewards?
                        </h3>
                        <div className="space-y-3 mb-6">
                          <label
                            className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:brightness-110"
                            style={{
                              backgroundColor: selectedVote === 'yes' ? '#262626' : 'transparent',
                              border: `1px solid ${selectedVote === 'yes' ? '#FF8C42' : '#3A3A3A'}`,
                            }}
                          >
                            <input
                              type="radio"
                              name="vote"
                              value="yes"
                              checked={selectedVote === 'yes'}
                              onChange={(e) => setSelectedVote(e.target.value)}
                              className="w-5 h-5 cursor-pointer"
                              style={{ accentColor: '#FF8C42' }}
                            />
                            <span className="text-base" style={{ color: '#F5F3F0' }}>
                              Yes — reward active verifiers
                            </span>
                          </label>
                          <label
                            className="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:brightness-110"
                            style={{
                              backgroundColor: selectedVote === 'no' ? '#262626' : 'transparent',
                              border: `1px solid ${selectedVote === 'no' ? '#FF8C42' : '#3A3A3A'}`,
                            }}
                          >
                            <input
                              type="radio"
                              name="vote"
                              value="no"
                              checked={selectedVote === 'no'}
                              onChange={(e) => setSelectedVote(e.target.value)}
                              className="w-5 h-5 cursor-pointer"
                              style={{ accentColor: '#FF8C42' }}
                            />
                            <span className="text-base" style={{ color: '#F5F3F0' }}>
                              No — keep current system
                            </span>
                          </label>
                        </div>
                        <button
                          onClick={handleVoteSubmit}
                          disabled={!selectedVote}
                          className="w-full py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
                        >
                          Submit vote
                        </button>
                        <p className="text-xs mt-4 text-center" style={{ color: '#8F8A84' }}>
                          Your vote weight is based on reputation score.
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold mb-2" style={{ color: '#F5F3F0' }}>
                          Vote submitted
                        </h3>
                        <p className="text-base" style={{ color: '#B3ADA7' }}>
                          Your vote has been recorded on-chain.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Members Tab */}
              {activeTab === 'members' && (
                <div className="space-y-3">
                  {members.map((member, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-5 flex items-center gap-4"
                      style={{ backgroundColor: '#1F1F1F' }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-semibold flex-shrink-0"
                        style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1" style={{ color: '#F5F3F0' }}>
                          {member.name}
                        </h4>
                        <p className="text-sm" style={{ color: '#B3ADA7' }}>
                          {member.badge}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar - DAO Metrics */}
            <div className="lg:col-span-1">
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{ backgroundColor: '#1F1F1F' }}
              >
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#F5F3F0' }}>
                  DAO statistics
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>Members:</p>
                    <p className="text-2xl font-bold" style={{ color: '#F5F3F0' }}>128 residents</p>
                  </div>
                  <div>
                    <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>Verified contributors:</p>
                    <p className="text-2xl font-bold" style={{ color: '#F5F3F0' }}>32</p>
                  </div>
                  <div>
                    <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>Proposal success rate:</p>
                    <p className="text-2xl font-bold" style={{ color: '#FF8C42' }}>87%</p>
                  </div>
                  <div>
                    <p className="text-sm mb-1" style={{ color: '#B3ADA7' }}>Treasury balance:</p>
                    <p className="text-2xl font-bold" style={{ color: '#F5F3F0' }}>$2,450</p>
                  </div>
                </div>
                <p className="text-xs mt-6" style={{ color: '#8F8A84' }}>
                  All data is reputation-based and non-transferable.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTA Area */}
          <div className="flex items-center justify-center gap-8 mt-16 mb-16">
            <button
              onClick={() => navigate('/create-proposal')}
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
            >
              Create proposal
            </button>
            <button
              onClick={() => navigate('/treasury')}
              className="px-8 py-4 rounded-full font-semibold text-lg whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: 'transparent', color: '#F5F3F0', border: '1px solid #3A3A3A' }}
            >
              View treasury
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DAOSpacePage;
