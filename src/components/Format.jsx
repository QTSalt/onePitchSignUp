export default function Format({ tournament }) {
  const { format } = tournament

  return (
    <section id="format" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-field-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">
          Tournament Format
        </p>
        <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">{format.name}</h2>
        <p className="text-stone-500 mt-3">
          Every team is guaranteed at least {format.guaranteedGames} games — 3 in pool play, plus at least 1 in the
          afternoon single-elimination bracket. Win your semifinal and you play a {format.maxGames}th game for the
          bracket title. Every game is capped at {format.gameTimeLimitMinutes} minutes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {format.phases.map((phase, i) => (
          <div
            key={phase.name}
            className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-field-100 text-field-700 font-display text-lg">
                {i + 1}
              </span>
              <h3 className="font-display text-xl uppercase text-field-950">{phase.name}</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">{phase.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
