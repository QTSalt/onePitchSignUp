import { useState } from 'react'
import { SCRIPT_URL, SCRIPT_URL_CONFIGURED } from '../lib/scriptUrl.js'

const initialForm = {
  teamName: '',
  coachName: '',
  email: '',
  phone: '',
  notes: '',
  agree: false,
}

export default function RegisterForm({ tournament }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const paymentMethods = tournament.registrationPolicy.paymentMethods
  const payment = paymentMethods[0]
  const paymentAppNames = paymentMethods.map((m) => m.app)
  const paymentAppsText =
    paymentAppNames.length > 1
      ? `${paymentAppNames.slice(0, -1).join(', ')} or ${paymentAppNames[paymentAppNames.length - 1]}`
      : paymentAppNames[0]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const payload = new URLSearchParams({
      formType: 'team',
      teamName: form.teamName.trim(),
      coachName: form.coachName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
    })

    if (!SCRIPT_URL_CONFIGURED) {
      // No Sheet connected yet — show the confirmation locally so the form
      // is still usable while setup is finished.
      console.warn(
        'SCRIPT_URL is not configured — registrations are not being saved anywhere yet. See src/lib/scriptUrl.js.'
      )
      setStatus('success')
      return
    }

    try {
      // Apps Script web apps don't return CORS headers we can read from the
      // browser, so we send with mode: 'no-cors'. The request still reaches
      // the script and appends the row — we just can't inspect the
      // response, so a fetch that doesn't throw counts as success.
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      })
      setStatus('success')
    } catch (err) {
      console.error('Registration submit failed:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-field-700 text-white p-8 text-center shadow-lg">
        <p className="text-3xl mb-2">🎉</p>
        <h3 className="font-display text-2xl uppercase mb-2">You're On The List!</h3>
        <p className="text-field-100/90 text-sm max-w-md mx-auto mb-5">
          Thanks, <span className="font-semibold">{form.teamName || 'your team'}</span>! Now send your $
          {tournament.logistics.pricing.entryFeeUSD} entry fee with the memo "{payment.requiredMemoNote}" to lock in
          your spot before <strong>{tournament.registrationPolicy.deadline}</strong>. Remember —{' '}
          {tournament.registrationPolicy.coreRule}.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {paymentMethods.map((method) =>
            method.url ? (
              <a
                key={method.app}
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-sm font-semibold transition-colors"
              >
                Pay via {method.app} →
              </a>
            ) : (
              <span
                key={method.app}
                className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"
              >
                {method.app}: {method.handle}
              </span>
            )
          )}
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-stone-200 shadow-lg p-6 sm:p-10 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="teamName" className="block text-sm font-semibold text-stone-700 mb-1.5">
            Team Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            id="teamName"
            name="teamName"
            value={form.teamName}
            onChange={handleChange}
            placeholder="e.g. Diamond Dogs"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
          />
        </div>
        <div>
          <label htmlFor="coachName" className="block text-sm font-semibold text-stone-700 mb-1.5">
            Coach's Full Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            id="coachName"
            name="coachName"
            value={form.coachName}
            onChange={handleChange}
            placeholder="e.g. Jordan Alvarez"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 555-5555"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-semibold text-stone-700 mb-1.5">
          Anything else we should know? <span className="text-stone-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={handleChange}
          placeholder="Roster size, jersey colors, questions, etc."
          className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-stone-600 pt-1">
        <input
          required
          type="checkbox"
          id="agree"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 rounded border-stone-300 text-field-600 focus:ring-field-500"
        />
        <span>
          I understand my team's spot is <strong>not guaranteed</strong> until the ${tournament.logistics.pricing.entryFeeUSD}{' '}
          entry fee is paid in full via <strong>{paymentAppsText}</strong> (memo: "{payment.requiredMemoNote}")
          before the registration deadline of <strong>{tournament.registrationPolicy.deadline}</strong>.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-field-700 hover:bg-field-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-8 py-4 shadow-lg transition-colors"
      >
        {status === 'submitting' ? 'Submitting…' : '🥎 Submit Registration'}
      </button>

      <p className="text-xs text-stone-400 pt-1">
        Submitting this form reserves nothing on its own — payment confirms your spot. We'll follow up by email with
        payment confirmation once received.
      </p>

      {status === 'error' && (
        <p className="text-xs text-red-600 font-semibold pt-1">
          Something went wrong sending your registration. Please try again, or contact the Tournament Director
          directly.
        </p>
      )}
    </form>
  )
}
