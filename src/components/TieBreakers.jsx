export default function TieBreakers({ tournament }) {
  const { tieBreakers } = tournament

  return (
    <section id="tiebreakers" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-4">
        <p className="text-field-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">Seeding</p>
        <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">Tie-Breaker Rules</h2>
        <p className="text-stone-500 mt-3">{tieBreakers.context}</p>
      </div>

      <div className="mt-12 space-y-5 max-w-3xl mx-auto">
        {tieBreakers.orderOfOperations.map((tb) => {
          const isLast = tb.step === tieBreakers.orderOfOperations.length
          return (
            <div
              key={tb.step}
              className={
                isLast
                  ? 'flex gap-5 items-start rounded-2xl border-2 border-sun-500 bg-sun-500/10 p-6 shadow-sm'
                  : 'flex gap-5 items-start rounded-2xl border border-stone-200 bg-white p-6 shadow-sm'
              }
            >
              <span
                className={
                  isLast
                    ? 'shrink-0 font-display text-3xl text-sun-600 w-10 text-center'
                    : 'shrink-0 font-display text-3xl text-field-700 w-10 text-center'
                }
              >
                {tb.step}
              </span>
              <div>
                <h3 className="font-bold text-field-950 text-lg">
                  {tb.name}
                  {isLast ? ' 🪨📄✂️' : ''}
                </h3>
                <p className="text-stone-600 text-sm mt-1">{tb.rule}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
