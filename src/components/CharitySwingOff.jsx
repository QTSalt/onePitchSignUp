export default function CharitySwingOff({ tournament }) {
  const { charityEvent } = tournament

  return (
    <section id="charity" className="bg-dirt-50 border-y border-dirt-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <p className="inline-block bg-white text-dirt-700 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2 border border-dirt-300 rounded-full px-4 py-1.5">
            Charity Event
          </p>
          <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">{charityEvent.name}</h2>
          <p className="text-stone-600 mt-3">{charityEvent.tagline}</p>
          <p className="text-stone-500 text-sm mt-2 font-semibold">{charityEvent.timing}</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-stone-600 leading-relaxed text-center">{charityEvent.description}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl bg-white border border-dirt-200 p-6 shadow-sm">
              <h3 className="font-bold text-field-950 text-lg mb-2">How It Works</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{charityEvent.pledgeModel.summary}</p>
            </div>

            <div className="rounded-2xl bg-white border-2 border-sun-500 p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-dirt-700 mb-1">Pitcher Bonus</p>
              <p className="font-display text-3xl text-dirt-700 mb-2">{charityEvent.pitcherStrikeoutBonus.label}</p>
              <p className="text-stone-600 text-sm leading-relaxed">
                {charityEvent.pitcherStrikeoutBonus.description}
              </p>
            </div>

            <div className="rounded-2xl bg-dirt-900 text-white p-6 shadow-sm">
              <h3 className="font-bold text-sun-400 text-xs uppercase tracking-wide mb-2">Example</h3>
              <p className="text-dirt-50/90 text-sm leading-relaxed">{charityEvent.pledgeModel.example}</p>
            </div>

            <div className="rounded-2xl bg-white border border-dirt-200 p-6 shadow-sm">
              <h3 className="font-bold text-field-950 text-lg mb-1">Benefiting</h3>
              <p className="text-stone-600 text-sm">{charityEvent.beneficiary}</p>
              <p className="text-stone-400 text-xs mt-1">Beneficiary to be finalized and announced.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white border border-dirt-200 shadow-sm overflow-hidden">
              {charityEvent.scoringTiers.map((tier, i) => {
                const isHomeRun = tier.matchPercent === 100
                const rowClasses = [
                  'flex items-center justify-between gap-4 px-6 py-4 border-b border-stone-100 last:border-b-0',
                  isHomeRun ? 'bg-sun-500/10' : i % 2 === 1 ? 'bg-stone-50' : 'bg-white',
                ].join(' ')

                return (
                  <div key={tier.outcome} className={rowClasses}>
                    <div>
                      <p className={isHomeRun ? 'font-bold text-field-950' : 'font-semibold text-field-950'}>
                        {tier.outcome}
                      </p>
                      <p className="text-stone-500 text-xs mt-0.5">{tier.description}</p>
                    </div>
                    <p
                      className={
                        isHomeRun
                          ? 'font-display text-2xl text-sun-600 shrink-0'
                          : 'font-display text-xl text-field-700 shrink-0'
                      }
                    >
                      {tier.matchPercent}%
                    </p>
                  </div>
                )
              })}
            </div>
            <p className="text-stone-400 text-xs mt-3">{charityEvent.scoringNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
