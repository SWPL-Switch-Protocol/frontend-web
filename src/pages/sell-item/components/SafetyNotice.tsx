
export default function SafetyNotice() {
  return (
    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="ri-shield-check-fill text-white text-lg"></i>
        </div>
        <div>
          <h4 className="font-semibold text-green-400 mb-2">Safety & Trust</h4>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Your listing will be linked to your on-chain reputation. Trusted members are prioritized in search results.
          </p>
        </div>
      </div>
    </div>
  );
}
