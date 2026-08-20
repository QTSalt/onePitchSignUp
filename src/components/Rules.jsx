export default function Rules({ tournament }) {
  return (
    <section id="rules" className="bg-stone-100 border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-field-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">
            Know Before You Go
          </p>
          <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">Tournament Rules</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {tournament.rules.map((rule) => (
            <div key={rule.title} className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-sun-500/20 text-sun-600 text-xl">
                  {rule.icon}
                </span>
                <div>
                  <h3 className="font-bold text-field-950 text-lg mb-1">{rule.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{rule.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-stone-500 text-sm mt-8">
          {tournament.rulesReference.note}{' '}
          <a
            href={tournament.rulesReference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-field-700 hover:text-field-600 underline underline-offset-2"
          >
            Official USA Softball Rulebook →
          </a>
        </p>
      </div>
    </section>
  )
}
