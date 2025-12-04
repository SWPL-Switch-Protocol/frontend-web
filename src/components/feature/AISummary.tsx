import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface AISummaryProps {
    productId: string;
    productTitle: string;
    productPrice: number;
    productCondition: string;
}

interface AnalysisData {
    summary: string;
    priceAnalysis: {
        text: string;
        min: number;
        max: number;
    };
    sellerTrust: {
        title: string;
        subtitle: string;
    };
    checklist: string[];
}

const MOCK_ANALYSIS: Record<string, AnalysisData> = {
    '1': {
        summary: "This Nintendo Switch OLED is listed in Like-new condition. The price is competitive for the OLED model. Photos show a well-maintained screen which is critical for value.",
        priceAnalysis: {
            text: "Fair Market Value",
            min: 240,
            max: 280
        },
        sellerTrust: {
            title: "High Trust Seller",
            subtitle: "12+ completed trades"
        },
        checklist: [
            "Check for Joy-Con drift in settings.",
            "Verify screen has no scratches or dead pixels.",
            "Ensure console is not banned from online services."
        ]
    },
    '2': {
        summary: "AirPods Pro (2nd Gen) are high-target items for counterfeits. This listing's price is consistent with genuine used units. Seller reputation is crucial here.",
        priceAnalysis: {
            text: "Good Deal",
            min: 160,
            max: 190
        },
        sellerTrust: {
            title: "Verified Seller",
            subtitle: "Consistent positive feedback"
        },
        checklist: [
            "Verify serial number on Apple's coverage website.",
            "Test Active Noise Cancellation and Transparency mode.",
            "Check for seamless pairing animation on iPhone."
        ]
    },
    '3': {
        summary: "PlayStation 5 pricing has stabilized. This unit includes a controller, adding ~$40 value. Ensure it's the Disc Edition if that's what you need.",
        priceAnalysis: {
            text: "Market Average",
            min: 425,
            max: 475
        },
        sellerTrust: {
            title: "Medium Trust",
            subtitle: "Newer seller, use Escrow"
        },
        checklist: [
            "Test the disc drive with a game disc.",
            "Check for overheating or loud fan noise.",
            "Verify controller haptic feedback and triggers."
        ]
    },
    '4': {
        summary: "Canon T7 is a solid entry-level DSLR. Value depends heavily on shutter count and lens condition. Included kit lens is standard.",
        priceAnalysis: {
            text: "Fair Price",
            min: 300,
            max: 350
        },
        sellerTrust: {
            title: "High Trust Seller",
            subtitle: "Photography enthusiast"
        },
        checklist: [
            "Inspect lens glass for fungus, haze, or scratches.",
            "Test autofocus speed and accuracy.",
            "Check sensor for dust spots (take a photo of sky)."
        ]
    },
    '5': {
        summary: "iPad Pro M1 11-inch holds value well. 128GB is the base model. Check for any chassis bending which can occur in these thin models.",
        priceAnalysis: {
            text: "Competitive",
            min: 500,
            max: 600
        },
        sellerTrust: {
            title: "Top Rated",
            subtitle: "20+ successful sales"
        },
        checklist: [
            "Test FaceID functionality.",
            "Check screen for white spots or dead pixels.",
            "Verify iCloud activation lock is removed."
        ]
    },
    '6': {
        summary: "Trek bikes retain value if maintained. 29\" wheels are desirable for trail riding. Check for rust or frame damage.",
        priceAnalysis: {
            text: "Good Value",
            min: 350,
            max: 450
        },
        sellerTrust: {
            title: "Medium Trust",
            subtitle: "Local rider"
        },
        checklist: [
            "Inspect frame welding points for cracks.",
            "Test gear shifting smoothness.",
            "Check hydraulic brakes (if applicable) and tire tread."
        ]
    },
    '7': {
        summary: "Pokémon card collections are hard to value without individual inspection. '50+ cards' suggests a bulk lot. Look for specific holos mentioned.",
        priceAnalysis: {
            text: "Variable",
            min: 80,
            max: 120
        },
        sellerTrust: {
            title: "New User",
            subtitle: "Verify cards in person"
        },
        checklist: [
            "Inspect holographic cards for scratches.",
            "Check for 'proxy' or fake cards (light test).",
            "Verify the count of rare/holo cards."
        ]
    },
    '8': {
        summary: "Used furniture value is subjective. Modern fabric sofas resell well if clean. Hygiene and structural integrity are main concerns.",
        priceAnalysis: {
            text: "Fair Offer",
            min: 350,
            max: 500
        },
        sellerTrust: {
            title: "High Trust",
            subtitle: "Home goods seller"
        },
        checklist: [
            "Check for stains, tears, or odors.",
            "Sit to test cushion firmness and frame squeaks.",
            "Measure dimensions to ensure it fits your vehicle."
        ]
    },
    '9': {
        summary: "MacBook Air M1 is a very popular laptop. 8GB/256GB is the standard config. Battery health cycle count is the most important hidden factor.",
        priceAnalysis: {
            text: "Market Standard",
            min: 700,
            max: 800
        },
        sellerTrust: {
            title: "Trusted Seller",
            subtitle: "Tech reseller"
        },
        checklist: [
            "Check Battery Health % in System Settings.",
            "Verify all keyboard keys work (butterfly switch check).",
            "Look for anti-reflective coating wear on screen."
        ]
    },
    '10': {
        summary: "Camping gear like this Coleman tent is seasonal. Ensure waterproofing is intact. Missing stakes are common but cheap to replace.",
        priceAnalysis: {
            text: "Great Deal",
            min: 70,
            max: 100
        },
        sellerTrust: {
            title: "Medium Trust",
            subtitle: "Outdoor enthusiast"
        },
        checklist: [
            "Unroll to check for mold or mildew smell.",
            "Verify all poles are present and not cracked.",
            "Check zippers on doors and windows."
        ]
    },
    '11': {
        summary: "Bose QC45s are durable. Main wear points are the ear cushions and headband. ANC function must be tested.",
        priceAnalysis: {
            text: "Fair Price",
            min: 180,
            max: 230
        },
        sellerTrust: {
            title: "High Trust",
            subtitle: "Audio equipment seller"
        },
        checklist: [
            "Test noise cancellation effectiveness.",
            "Check ear pads for flaking (common issue).",
            "Verify charging port connection is tight."
        ]
    },
    '12': {
        summary: "Solid wood dining sets are heavy and durable. Scratches can often be refinished. Chair joint stability is the main thing to check.",
        priceAnalysis: {
            text: "Good Value",
            min: 300,
            max: 450
        },
        sellerTrust: {
            title: "Medium Trust",
            subtitle: "Moving sale"
        },
        checklist: [
            "Wobble test the table and all chairs.",
            "Inspect surface for deep scratches or heat marks.",
            "Check underneath for structural repairs."
        ]
    }
};

export default function AISummary({ productId, productTitle, productPrice, productCondition }: AISummaryProps) {
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');

    // Get specific data or fallback to generic
    const data = MOCK_ANALYSIS[productId] || {
        summary: `This ${productTitle} is listed in ${productCondition} condition. Based on the description, it appears to be a genuine listing.`,
        priceAnalysis: {
            text: "Analyzing...",
            min: Math.floor(productPrice * 0.9),
            max: Math.floor(productPrice * 1.1)
        },
        sellerTrust: {
            title: "Seller Analysis",
            subtitle: "Based on history"
        },
        checklist: [
            "Verify item matches description.",
            "Check for physical damage.",
            "Test functionality before confirming."
        ]
    };

    useEffect(() => {
        // Reset status when product changes
        setStatus('idle');

        // Auto-start analysis
        const timer = setTimeout(() => {
            setStatus('analyzing');
        }, 500);
        return () => clearTimeout(timer);
    }, [productId]);

    useEffect(() => {
        if (status === 'analyzing') {
            const timer = setTimeout(() => {
                setStatus('complete');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    if (status === 'idle') return null;

    return (
        <div className="rounded-xl p-[1px] mb-6 bg-gradient-to-r from-[#FF8C42] via-[#FF5F6D] to-[#FFC371]">
            <div className="bg-[#1F1F1F] rounded-xl p-5 h-full relative overflow-hidden">

                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br from-[#FF8C42] to-[#FF5F6D] ${status === 'analyzing' ? 'animate-pulse' : ''}`}>
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF8C42] to-[#FF5F6D]">
                        AI Smart Analysis
                    </h3>
                </div>

                {status === 'analyzing' ? (
                    <div className="space-y-4 py-4">
                        <div className="flex items-center gap-3 text-[#A6A19B]">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Analyzing market data...</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#A6A19B] opacity-50">
                            <Loader2 className="w-4 h-4" />
                            <span className="text-sm">Checking seller reputation...</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#A6A19B] opacity-25">
                            <Loader2 className="w-4 h-4" />
                            <span className="text-sm">Generating safety checklist...</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">

                        {/* 1. Summary */}
                        <div className="text-sm text-[#D8D2CD] leading-relaxed">
                            {data.summary}
                        </div>

                        {/* Grid for Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Price Analysis */}
                            <div className="bg-[#262626] p-3 rounded-lg border border-[#3A3A3A]">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-3.5 h-3.5 text-[#4ADE80]" />
                                    <span className="text-xs font-medium text-[#A6A19B]">Price Analysis</span>
                                </div>
                                <div className="text-sm font-semibold text-[#F5F3F0]">{data.priceAnalysis.text}</div>
                                <div className="text-xs text-[#A6A19B] mt-1">Avg. range: ${data.priceAnalysis.min} - ${data.priceAnalysis.max}</div>
                            </div>

                            {/* Seller Reputation */}
                            <div className="bg-[#262626] p-3 rounded-lg border border-[#3A3A3A]">
                                <div className="flex items-center gap-2 mb-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF8C42]" />
                                    <span className="text-xs font-medium text-[#A6A19B]">Seller Trust</span>
                                </div>
                                <div className="text-sm font-semibold text-[#F5F3F0]">{data.sellerTrust.title}</div>
                                <div className="text-xs text-[#A6A19B] mt-1">{data.sellerTrust.subtitle}</div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="bg-[#262626] p-4 rounded-lg border border-[#3A3A3A]">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertCircle className="w-3.5 h-3.5 text-[#FBBF24]" />
                                <span className="text-xs font-bold text-[#A6A19B] uppercase tracking-wider">Pre-Trade Checklist</span>
                            </div>
                            <ul className="space-y-2">
                                {data.checklist.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80] mt-0.5 flex-shrink-0" />
                                        <span className="text-xs text-[#D8D2CD]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
