import RegisterForm from './RegisterForm.jsx'

export default function RegisterSection({ tournament }) {
  return (
    <section id="register" className="bg-gradient-to-b from-stone-100 to-stone-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10">
          <p className="text-field-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">Last Step</p>
          <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">Register Your Team</h2>
          <p className="text-stone-500 mt-3">
            Fill out the form below, then send payment to reserve your spot. Remember:{' '}
            {tournament.registrationPolicy.coreRule}.
          </p>
        </div>

        <RegisterForm tournament={tournament} />
      </div>
    </section>
  )
}
