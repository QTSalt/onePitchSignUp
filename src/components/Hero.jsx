export default function Hero({ tournament }) {
  const { logistics } = tournament

  return (
    <header
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-field-900 via-field-950 to-field-950 text-white"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 sm:pt-24 sm:pb-20 text-center">
        <p className="inline-block text-sun-400 font-bold tracking-[0.25em] text-xs sm:text-sm uppercase mb-4 border border-sun-500/40 rounded-full px-4 py-1.5">
          Slowpitch Softball · One Pitch Tournament
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-none uppercase mb-4">
          The One Pitch <span className="text-sun-400">Showdown</span>
        </h1>

        <p className="text-field-100/90 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          One pitch. One chance. Eight teams battle it out for bragging rights in a fast, furious, all-day crossover format.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-sun-400 text-[11px] font-bold uppercase tracking-wide mb-1">Date</p>
            <p className="font-semibold text-sm sm:text-base">{logistics.date}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-sun-400 text-[11px] font-bold uppercase tracking-wide mb-1">Time</p>
            <p className="font-semibold text-sm sm:text-base">
              {logistics.startTime} – {logistics.endTime}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-sun-400 text-[11px] font-bold uppercase tracking-wide mb-1">Location</p>
            <p className="font-semibold text-sm sm:text-base">{logistics.location.parkName}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-sun-400 text-[11px] font-bold uppercase tracking-wide mb-1">Fields</p>
            <p className="font-semibold text-sm sm:text-base">{logistics.location.fields.join(' & ')}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <a
            href="#register"
            className="inline-flex items-center gap-2 rounded-full bg-sun-500 hover:bg-sun-400 text-field-950 font-bold px-7 py-3.5 text-base shadow-lg shadow-sun-500/20 transition-transform hover:scale-[1.03]"
          >
            Register Your Team →
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3.5 text-base transition-colors"
          >
            See Pricing
          </a>
        </div>

        <p className="mt-5 text-xs text-field-200/70 font-semibold uppercase tracking-wide">
          Only 8 team spots · No Pay, No Play
        </p>
      </div>

      <div className="stitch-divider" />
    </header>
  )
}
