export default function Nav({ tournament }) {
  return (
    <nav className="sticky top-0 z-50 bg-field-950/95 backdrop-blur supports-[backdrop-filter]:bg-field-950/90 border-b border-field-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2 text-white font-display text-lg sm:text-xl tracking-wide">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sun-500 text-field-950 text-sm">
              ⚾
            </span>
            {tournament.organizationName}
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-field-100">
            <a href="#format" className="hover:text-sun-400 transition-colors">Format</a>
            <a href="#rules" className="hover:text-sun-400 transition-colors">Rules</a>
            <a href="#tiebreakers" className="hover:text-sun-400 transition-colors">Tie-Breakers</a>
            <a href="#pricing" className="hover:text-sun-400 transition-colors">Pricing</a>
          </div>
          <a
            href="#register"
            className="inline-flex items-center rounded-full bg-sun-500 hover:bg-sun-400 text-field-950 font-bold text-sm px-4 py-2 transition-colors shadow-md"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  )
}
