export default function StatsStrip({ tournament }) {
  const { format, logistics } = tournament

  const stats = [
    { value: format.guaranteedGames, label: 'Guaranteed Games' },
    { value: format.gameTimeLimitMinutes, label: 'Min Game Limit' },
    { value: 8, label: 'Teams Max' },
    { value: `$${logistics.pricing.entryFeeUSD}`, label: 'Entry Fee' },
  ]

  return (
    <section className="bg-field-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl sm:text-4xl text-sun-400">{stat.value}</p>
            <p className="text-xs sm:text-sm uppercase tracking-wide font-semibold text-field-100/90">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
