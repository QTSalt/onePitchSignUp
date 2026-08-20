export default function Pricing({ tournament }) {
  const { logistics, registrationPolicy, refundAndWeatherPolicy } = tournament
  const paymentMethods = registrationPolicy.paymentMethods

  return (
    <section id="pricing" className="bg-field-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sun-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">
            Entry &amp; Payment
          </p>
          <h2 className="font-display text-3xl sm:text-4xl uppercase">Pricing &amp; Registration Policy</h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Price card */}
          <div className="lg:col-span-2 rounded-2xl bg-white text-field-950 p-8 shadow-xl flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-field-600 mb-2">Team Entry Fee</p>
            <p className="font-display text-6xl mb-4">${logistics.pricing.entryFeeUSD}</p>
            <ul className="space-y-2 mb-6 text-sm text-stone-600">
              {logistics.pricing.inclusions.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-field-600">✓</span> {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-xl bg-sun-500/15 border border-sun-500/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-sun-700 mb-1">
                Registration closes at 8 paid teams
              </p>
              <p className="text-xs text-stone-600">Spots fill on a first-paid, first-served basis.</p>
            </div>
          </div>

          {/* Policy + payment */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-bold text-lg text-sun-400 mb-2">{registrationPolicy.coreRule}</h3>
              <p className="text-field-100/90 text-sm leading-relaxed">{registrationPolicy.details}</p>
              <p className="mt-3 text-sm">
                <span className="font-bold text-white">Payment Deadline:</span>{' '}
                <span className="text-sun-400 font-semibold">{registrationPolicy.deadline}</span>
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-bold text-lg text-sun-400 mb-3">How to Pay</h3>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((method) =>
                  method.qr ? (
                    <a
                      key={method.app}
                      href={method.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-xl p-3 flex flex-col items-center text-center hover:scale-[1.03] transition-transform"
                    >
                      <img src={method.qr} alt={`${method.app} QR code`} className="w-full max-w-[110px] aspect-square" />
                      <span className="text-field-950 text-xs font-bold mt-2">{method.app}</span>
                      <span className="text-stone-500 text-[11px]">{method.handle}</span>
                    </a>
                  ) : (
                    <div
                      key={method.app}
                      className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center"
                    >
                      <span className="text-3xl mb-1">💵</span>
                      <span className="text-white text-xs font-bold">{method.app}</span>
                      <span className="text-field-100/70 text-[11px] mt-0.5">{method.handle}</span>
                    </div>
                  )
                )}
              </div>
              <p className="text-xs uppercase tracking-wide text-field-200/70 font-semibold mt-4 mb-1">
                Required Memo Note
              </p>
              <p className="font-semibold text-white text-sm">{paymentMethods[0].requiredMemoNote}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h4 className="font-bold text-white mb-1.5">Withdrawals</h4>
                <p className="text-field-100/80 text-sm leading-relaxed">{refundAndWeatherPolicy.withdrawals}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h4 className="font-bold text-white mb-1.5">Weather Policy</h4>
                <p className="text-field-100/80 text-sm leading-relaxed">{refundAndWeatherPolicy.weather}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
