import type { Step } from "../Types/info";

const steps: Step[] = [
  {
    num: 1,
    title: "List your item",
    desc: "Snap a few photos and write a short description. Takes only a few minutes to go live.",
  },
  {
    num: 2,
    title: "Choose your price",
    desc: "Set a Fixed Price, start a Bidding war, or offer it for Free to your community.",
  },
  {
    num: 3,
    title: "Connect locally",
    desc: "Chat through the platform and arrange a safe local pickup with your neighbor.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-10 md:px-20 xl:px-30 py-20 bg-white font-[Inter]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900">How it Works</h2>
        <p className="text-slate-500 mt-2 max-w-sm mx-auto">
          Getting started with GarageSwap is simple, secure, and
          neighborhood-focused.
        </p>
      </div>

      <div className="grid gri-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step: Step) => (
          <div
            key={step.num}
            className="bg-[#f5f0e8] rounded-2xl p-8 text-center w-full"
          >
            {/* Step number circle instead of emoji */}
            <div className="w-14 h-14 bg-[#F48C25] rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">{step.num}</span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              {step.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
