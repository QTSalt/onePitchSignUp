import { useState } from 'react'
import { SCRIPT_URL, SCRIPT_URL_CONFIGURED } from '../lib/scriptUrl.js'

const initialForm = {
  playerName: '',
  email: '',
  phone: '',
  notes: '',
  agree: false,
}

export default function FreeAgentForm({ tournament }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const feeUSD = tournament.freeAgentProgram.feeUSD

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const payload = new URLSearchParams({
      formType: 'freeAgent',
      playerName: form.playerName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
    })

    if (!SCRIPT_URL_CONFIGURED) {
      // No Sheet connected yet — show the confirmation locally so the form
      // is still usable while setup is finished.
      console.warn(
        'SCRIPT_URL is not configured — free agent sign-ups are not being saved anywhere yet. See src/lib/scriptUrl.js.'
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
      console.error('Free agent submit failed:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-field-700 text-white p-8 text-center shadow-lg">
        <p className="text-3xl mb-2">🙋</p>
        <h3 className="font-display text-2xl uppercase mb-2">You're In The Pool!</h3>
        <p className="text-field-100/90 text-sm max-w-md mx-auto">
          Thanks, <span className="font-semibold">{form.playerName || 'friend'}</span>! Team captains short on
          players can now reach out to you directly, and if enough free agents sign up we'll group you into a team
          of your own. Nothing to pay yet — your ${feeUSD} fee is only due once you're actually placed on a team.
        </p>
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
          <label htmlFor="playerName" className="block text-sm font-semibold text-stone-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="text"
            id="playerName"
            name="playerName"
            value={form.playerName}
            onChange={handleChange}
            placeholder="e.g. Sam Rivera"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
          />
        </div>
        <div>
          <label htmlFor="fa-phone" className="block text-sm font-semibold text-stone-700 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="tel"
            id="fa-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 555-5555"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="fa-email" className="block text-sm font-semibold text-stone-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="email"
          id="fa-email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
          className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
        />
      </div>

      <div>
        <label htmlFor="fa-notes" className="block text-sm font-semibold text-stone-700 mb-1.5">
          Position(s) &amp; experience <span className="text-stone-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="fa-notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={handleChange}
          placeholder="e.g. Outfield/2B, played rec league for 3 years"
          className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-field-500 focus:border-field-500"
        />
        <p className="text-xs text-stone-400 mt-1">
          Helps team captains browsing the pool know if you're a fit for their roster.
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm text-stone-600 pt-1">
        <input
          required
          type="checkbox"
          id="fa-agree"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 rounded border-stone-300 text-field-600 focus:ring-field-500"
        />
        <span>
          I understand signing up does <strong>not guarantee</strong> a spot on a team, and that the ${feeUSD} free
          agent fee is only due once I'm actually placed on a team.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-field-700 hover:bg-field-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base px-8 py-4 shadow-lg transition-colors"
      >
        {status === 'submitting' ? 'Submitting…' : '🙋 Join The Free Agent Pool'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-red-600 font-semibold pt-1">
          Something went wrong sending your sign-up. Please try again, or contact the Tournament Director directly.
        </p>
      )}
    </form>
  )
}
