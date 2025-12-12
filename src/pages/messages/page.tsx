import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";

interface Thread {
  threadId: string;
  product: {
    id: string;
    name: string;
    thumbnail: string;
  };
  counterparty: {
    did: string;
    trust: "High Trust" | "Medium Trust" | "New User";
  };
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  status:
    | "In Progress"
    | "Payment Pending"
    | "Meetup Scheduled"
    | "Completed"
    | "Cancelled";
}

export default function MessagesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const mockThreads: Thread[] = [
    {
      threadId: "4831",
      product: {
        id: "7",
        name: "Pokémon Card Collection (50+ cards)",
        thumbnail: "/images/readdy-listing7.jpg",
      },
      counterparty: {
        did: "0xG1...98h7",
        trust: "New User",
      },
      lastMessage: "Yes, it's available 🙂 All cards are in great condition!",
      timestamp: "2 min ago",
      unread: true,
      status: "In Progress",
    },
    {
      threadId: "4832",
      product: {
        id: "3",
        name: "PlayStation 5 Console + Controller",
        thumbnail: "/images/readdy-listing3.jpg",
      },
      counterparty: {
        did: "0xC9...84d3",
        trust: "Medium Trust",
      },
      lastMessage: "Can we meet near Williamsburg station?",
      timestamp: "1 hour ago",
      unread: false,
      status: "Meetup Scheduled",
    },
    {
      threadId: "4833",
      product: {
        id: "1",
        name: "Nintendo Switch OLED – White",
        thumbnail: "/images/readdy-listing1.jpg",
      },
      counterparty: {
        did: "0xA4...92b1",
        trust: "High Trust",
      },
      lastMessage: "Payment confirmed! See you tomorrow.",
      timestamp: "Yesterday",
      unread: false,
      status: "Payment Pending",
    },
    {
      threadId: "4834",
      product: {
        id: "9",
        name: "MacBook Air M1 (2020) 256GB",
        thumbnail: "/images/readdy-listing9.jpg",
      },
      counterparty: {
        did: "0xI7...10j9",
        trust: "High Trust",
      },
      lastMessage: "Transaction completed. Thanks!",
      timestamp: "Dec 20",
      unread: false,
      status: "Completed",
    },
    {
      threadId: "4835",
      product: {
        id: "6",
        name: 'Trek Mountain Bike – 29" Wheels',
        thumbnail: "/images/readdy-listing6.jpg",
      },
      counterparty: {
        did: "0xF8...87g6",
        trust: "Medium Trust",
      },
      lastMessage: "Sorry, already sold to someone else.",
      timestamp: "Dec 18",
      unread: false,
      status: "Cancelled",
    },
  ];

  const getTrustColor = (level: string) => {
    switch (level) {
      case "High Trust":
        return "#4ADE80";
      case "Medium Trust":
        return "#FBBF24";
      case "New User":
        return "#94A3B8";
      default:
        return "#94A3B8";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "#FF8C42";
      case "Payment Pending":
        return "#FF8C42";
      case "Meetup Scheduled":
        return "#4ADE80";
      case "Completed":
        return "#8F8A84";
      case "Cancelled":
        return "#EF4444";
      default:
        return "#8F8A84";
    }
  };

  const filteredThreads = mockThreads.filter(
    (thread) =>
      thread.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.counterparty.did.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto w-full px-6 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#F5F3F0" }}>
            Messages
          </h1>
          <p className="text-sm" style={{ color: "#A6A19B" }}>
            All your conversations in one place
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations…"
              className="w-full px-4 py-3 pl-12 rounded-xl text-sm"
              style={{
                backgroundColor: "#262626",
                color: "#F5F3F0",
                border: "1px solid #2B2B2B",
                outline: "none",
              }}
            />
            <i
              className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-xl"
              style={{ color: "#A6A19B" }}
            ></i>
          </div>
        </div>

        {/* Conversation List */}
        <div className="space-y-3">
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => (
              <div
                key={thread.threadId}
                onClick={() =>
                  navigate(`/inquiry?product=${thread.product.id}`)
                }
                className="rounded-xl p-4 cursor-pointer transition-all hover:brightness-110"
                style={{
                  backgroundColor: "#1F1F1F",
                  border: thread.unread
                    ? "1px solid #FF8C42"
                    : "1px solid #2B2B2B",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Product Thumbnail */}
                  <img
                    src={thread.product.thumbnail}
                    alt={thread.product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    style={{ backgroundColor: "#262626" }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder-na.svg";
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Product Name */}
                    <h3
                      className="text-sm font-semibold mb-1 truncate"
                      style={{ color: "#F5F3F0" }}
                    >
                      {thread.product.name}
                    </h3>

                    {/* Counterparty Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs" style={{ color: "#A6A19B" }}>
                        {thread.counterparty.did}
                      </span>
                      <div className="flex items-center gap-1">
                        <i
                          className="ri-checkbox-circle-fill text-xs"
                          style={{
                            color: getTrustColor(thread.counterparty.trust),
                          }}
                        ></i>
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: getTrustColor(thread.counterparty.trust),
                          }}
                        >
                          {thread.counterparty.trust}
                        </span>
                      </div>
                    </div>

                    {/* Last Message Preview */}
                    <p
                      className="text-sm mb-2 line-clamp-1"
                      style={{
                        color: thread.unread ? "#F5F3F0" : "#8F8A84",
                        fontWeight: thread.unread ? 500 : 400,
                      }}
                    >
                      {thread.lastMessage}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${getStatusColor(thread.status)}20`,
                          color: getStatusColor(thread.status),
                        }}
                      >
                        {thread.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Timestamp + Unread Badge */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs" style={{ color: "#8F8A84" }}>
                      {thread.timestamp}
                    </span>
                    {thread.unread && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#FF8C42" }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full"
                style={{ backgroundColor: "#262626" }}
              >
                <i
                  className="ri-message-3-line text-3xl"
                  style={{ color: "#8F8A84" }}
                ></i>
              </div>
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "#F5F3F0" }}
              >
                No conversations found
              </p>
              <p className="text-sm" style={{ color: "#A6A19B" }}>
                Start chatting with sellers to see your messages here
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
