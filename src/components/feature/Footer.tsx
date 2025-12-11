export default function Footer() {
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
}
