export default function RegisterSection() {
  return (
    <section id="register" className="bg-gradient-to-b from-stone-100 to-stone-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="rounded-2xl bg-white border border-stone-200 shadow-lg p-8 sm:p-10 text-center">
          <p className="text-field-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">Registration</p>
          <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">Registration Closed</h2>
          <p className="text-stone-600 mt-4 max-w-md mx-auto">
            Please contact me if you need assistance. My contact info is at the{' '}
            <a
              href="#contact"
              className="font-semibold text-field-700 hover:text-field-600 underline underline-offset-2"
            >
              bottom of the page
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
