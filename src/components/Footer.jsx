export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-field-950 text-field-200/70 border-t border-field-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p>© {year} The One Pitch Showdown. All bats subject to umpire inspection.</p>
        <p>Questions? Reach out to the Tournament Director.</p>
      </div>
    </footer>
  )
}
