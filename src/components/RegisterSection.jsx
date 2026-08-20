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

        <div className="mb-8 rounded-2xl bg-field-50 border border-field-200 p-5 text-sm text-stone-600 text-center">
          Short a player or two? Once you're registered, you'll have access to our{' '}
          <a
            href="#free-agents"
            className="font-semibold text-field-700 hover:text-field-600 underline underline-offset-2"
          >
            Free Agent pool
          </a>{' '}
          to help fill out your roster.
        </div>

        <RegisterForm tournament={tournament} />
      </div>
    </section>
  )
}
