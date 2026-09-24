export default function Footer({ tournament }) {
  const year = new Date().getFullYear()
  const { contact } = tournament
  const telHref = `tel:${contact.phone.replace(/[^0-9+]/g, '')}`

  return (
    <footer id="contact" className="bg-field-950 text-field-200/70 border-t border-field-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} {tournament.organizationName}. All bats subject to umpire inspection.</p>
          <p>Includes the Charity Swing-Off fundraiser — swing for a cause.</p>
          <p>Questions? Reach out to {contact.name}.</p>
        </div>
        <div className="mt-4 pt-4 border-t border-field-800 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs">
          <span className="text-field-200/50">Liability waivers:</span>
          <a
            href="/waivers/slowpitch-waiver.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-field-100 hover:text-sun-400 underline underline-offset-2 transition-colors"
          >
            View Tournament Waiver
          </a>
          <a
            href="/waivers/fastpitch-waiver.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-field-100 hover:text-sun-400 underline underline-offset-2 transition-colors"
          >
            View Charity Swing-Off Waiver
          </a>
        </div>
        <div className="mt-4 pt-4 border-t border-field-800 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs">
          <span className="text-field-200/50">Contact {contact.name}:</span>
          <a
            href={`mailto:${contact.email}`}
            className="font-semibold text-field-100 hover:text-sun-400 underline underline-offset-2 transition-colors"
          >
            {contact.email}
          </a>
          <a
            href={telHref}
            className="font-semibold text-field-100 hover:text-sun-400 underline underline-offset-2 transition-colors"
          >
            {contact.phone}
          </a>
        </div>
      </div>
    </footer>
  )
}
