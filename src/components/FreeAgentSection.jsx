import FreeAgentForm from './FreeAgentForm.jsx'

export default function FreeAgentSection({ tournament }) {
  const { freeAgentProgram } = tournament

  return (
    <section id="free-agents" className="bg-white border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <p className="text-field-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">
            Don't Have A Full Team?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">Free Agent Pool</h2>
          <p className="text-stone-500 mt-3">{freeAgentProgram.tagline}</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-stone-600 leading-relaxed text-center">{freeAgentProgram.description}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6 shadow-sm">
              <h3 className="font-bold text-field-950 text-lg mb-3">How It Works</h3>
              <ol className="space-y-3">
                {freeAgentProgram.howItWorks.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-stone-600 leading-relaxed">
                    <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-field-100 text-field-700 font-display text-xs">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-field-950 text-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-sun-400 mb-1">Sign-Up Fee</p>
              <p className="font-display text-4xl mb-2">${freeAgentProgram.feeUSD}</p>
              <p className="text-field-100/90 text-sm leading-relaxed">
                Only charged once you're placed on a team — nothing is due at sign-up.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <FreeAgentForm tournament={tournament} />
          </div>
        </div>
      </div>
    </section>
  )
}
