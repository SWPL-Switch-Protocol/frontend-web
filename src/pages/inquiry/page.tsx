import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/feature/Header";
import Footer from "../../components/feature/Footer";

interface Message {
  id: string;
  sender: "buyer" | "seller" | "system";
  text: string;
  timestamp: string;
  attachment?: string;
}

interface ProductInfo {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  trustLevel: "High Trust" | "Medium Trust" | "New User";
}

export default function InquiryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product") || "7";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messageText, setMessageText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEscrowCTA, setShowEscrowCTA] = useState(false);
  const [hasAutoSent, setHasAutoSent] = useState(false);

  const productInfo: ProductInfo = {
    id: "7",
    title: "Pokémon Card Collection (50+ cards)",
    price: 95,
    image: "/images/readdy-listing7.jpg",
    seller: "0xG1...98h7",
    trustLevel: "New User",
  };

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Auto-send first message (Daangn style)
  useEffect(() => {
    if (!hasAutoSent) {
      setTimeout(() => {
        const autoMessage: Message = {
          id: "auto-1",
          sender: "buyer",
          text: "Hello! Is this still available?",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages([autoMessage]);
        setHasAutoSent(true);

        // Auto seller response
        setTimeout(() => {
          const sellerResponse: Message = {
            id: "auto-2",
            sender: "seller",
            text: "Yes, it's available 🙂 All cards are in great condition!",
            timestamp: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, sellerResponse]);
          setShowEscrowCTA(true);

          // System safety message
          setTimeout(() => {
            const systemMessage: Message = {
              id: "system-1",
              sender: "system",
              text: "Stay safe — keep all communication inside SWITCH. Messages are encrypted.",
              timestamp: "",
            };
            setMessages((prev) => [...prev, systemMessage]);
          }, 1500);
        }, 2500);
      }, 1000);
    }
  }, [hasAutoSent]);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() && !attachment) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "buyer",
      text: messageText,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachment: attachment ? URL.createObjectURL(attachment) : undefined,
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
    setAttachment(null);

    // Check if seller confirms availability
    const lowerText = messageText.toLowerCase();
    if (
      lowerText.includes("available") ||
      lowerText.includes("yes") ||
      lowerText.includes("ok")
    ) {
      setShowEscrowCTA(true);
    }
  };

  const handleProceedToEscrow = () => {
    navigate(`/escrow?product=${productId}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1B1B1B" }}
    >
      <Header />

      <main className="flex-1 flex flex-col max-w-[900px] mx-auto w-full px-6 py-8">
        {/* Fixed Product Mini Card (Daangn style) */}
        <div
          className="rounded-xl p-4 mb-4 flex items-center gap-3 sticky top-0 z-10"
          style={{ backgroundColor: "#1F1F1F", border: "1px solid #2B2B2B" }}
        >
          <img
            src={productInfo.image}
            alt={productInfo.title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            style={{ backgroundColor: "#262626" }}
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder-na.svg";
            }}
          />
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-semibold mb-1 truncate"
              style={{ color: "#F5F3F0" }}
            >
              {productInfo.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-base font-bold"
                style={{ color: "#FF8C42" }}
              >
                ${productInfo.price}
              </span>
              <span className="text-xs" style={{ color: "#8F8A84" }}>
                •
              </span>
              <span className="text-xs" style={{ color: "#A6A19B" }}>
                {productInfo.seller}
              </span>
              <div className="flex items-center gap-1">
                <i
                  className="ri-checkbox-circle-fill text-xs"
                  style={{ color: getTrustColor(productInfo.trustLevel) }}
                ></i>
                <span
                  className="text-xs font-medium"
                  style={{ color: getTrustColor(productInfo.trustLevel) }}
                >
                  {productInfo.trustLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Thread (Daangn style bubbles) */}
        <div
          className="flex-1 overflow-y-auto mb-4 space-y-4 px-2"
          style={{ minHeight: "400px" }}
        >
          {messages.map((message) => {
            if (message.sender === "system") {
              return (
                <div key={message.id} className="flex justify-center">
                  <div
                    className="max-w-[80%] px-4 py-2 rounded-full text-center"
                    style={{ backgroundColor: "#262626" }}
                  >
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "#8F8A84" }}
                    >
                      {message.text}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "buyer" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="max-w-[70%] rounded-2xl px-4 py-3"
                  style={{
                    backgroundColor:
                      message.sender === "buyer" ? "#FF8C42" : "#272727",
                    borderRadius:
                      message.sender === "buyer"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                  }}
                >
                  {message.attachment && (
                    <img
                      src={message.attachment}
                      alt="Attachment"
                      className="rounded-lg mb-2 max-w-full"
                      style={{ maxHeight: "200px" }}
                    />
                  )}
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: message.sender === "buyer" ? "#FFFFFF" : "#F5F3F0",
                    }}
                  >
                    {message.text}
                  </p>
                  {message.timestamp && (
                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          message.sender === "buyer"
                            ? "rgba(255,255,255,0.7)"
                            : "#8F8A84",
                      }}
                    >
                      {message.timestamp}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Escrow CTA (appears after seller confirms) */}
        {showEscrowCTA && (
          <div
            className="rounded-xl p-4 mb-4 flex items-center gap-4"
            style={{ backgroundColor: "#1F1F1F", border: "1px solid #FF8C42" }}
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <i
                className="ri-shield-check-fill text-2xl"
                style={{ color: "#4ADE80" }}
              ></i>
            </div>
            <div className="flex-1">
              <h4
                className="text-sm font-semibold mb-1"
                style={{ color: "#F5F3F0" }}
              >
                Ready to purchase?
              </h4>
              <p className="text-xs" style={{ color: "#A6A19B" }}>
                Payment is securely held in escrow until both sides confirm.
              </p>
            </div>
            <button
              onClick={handleProceedToEscrow}
              className="px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Escrow Payment
            </button>
          </div>
        )}

        {/* Message Input Bar (Daangn style) */}
        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: "#1F1F1F", border: "1px solid #2B2B2B" }}
        >
          {attachment && (
            <div
              className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ backgroundColor: "#262626" }}
            >
              <i
                className="ri-image-line text-sm"
                style={{ color: "#A6A19B" }}
              ></i>
              <span
                className="text-xs flex-1 truncate"
                style={{ color: "#F5F3F0" }}
              >
                {attachment.name}
              </span>
              <button
                onClick={() => setAttachment(null)}
                className="cursor-pointer"
              >
                <i
                  className="ri-close-line text-sm"
                  style={{ color: "#A6A19B" }}
                ></i>
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <label
              className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-all hover:brightness-110 flex-shrink-0"
              style={{ backgroundColor: "#262626" }}
            >
              <i
                className="ri-add-line text-xl"
                style={{ color: "#A6A19B" }}
              ></i>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="메시지를 입력하세요…"
              className="flex-1 px-4 py-2.5 rounded-lg text-sm"
              style={{
                backgroundColor: "#262626",
                color: "#F5F3F0",
                border: "none",
                outline: "none",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />

            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim() && !attachment}
              className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              style={{ backgroundColor: "#FF8C42" }}
            >
              <i
                className="ri-send-plane-fill text-lg"
                style={{ color: "#FFFFFF" }}
              ></i>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
