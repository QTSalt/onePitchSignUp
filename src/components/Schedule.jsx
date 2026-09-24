import { useState } from 'react'

function TeamName({ name, selected }) {
  const on = selected === name
  return (
    <span
      className={
        on
          ? 'rounded px-1.5 -mx-1.5 bg-sun-500/30 text-field-950 transition-colors'
          : 'rounded px-1.5 -mx-1.5 transition-colors'
      }
    >
      {name}
    </span>
  )
}

function Matchup({ game, selected }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-semibold text-field-950">
      <TeamName name={game[0]} selected={selected} />
      <span className="text-xs uppercase font-bold text-stone-400">vs</span>
      <TeamName name={game[1]} selected={selected} />
    </div>
  )
}

export default function Schedule({ tournament }) {
  const { schedule } = tournament
  const fields = tournament.logistics.location.fields
  const [selected, setSelected] = useState(null)

  const teamGames = (team) =>
    schedule.roundRobin.map((round) => {
      const i = round.games.findIndex((g) => g.includes(team))
      if (i === -1) return { time: round.start, bye: true }
      const g = round.games[i]
      return { time: round.start, opponent: g[0] === team ? g[1] : g[0], field: fields[i] }
    })

  const chip = (active) =>
    active
      ? 'rounded-full px-4 py-1.5 text-sm font-bold bg-field-900 text-white border border-field-900 transition-colors'
      : 'rounded-full px-4 py-1.5 text-sm font-semibold bg-white text-field-900 border border-stone-300 hover:border-field-600 transition-colors'

  return (
    <section id="schedule" className="bg-white border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-field-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-2">Game Day</p>
          <h2 className="font-display text-3xl sm:text-4xl uppercase text-field-950">Schedule</h2>
          <p className="text-stone-500 mt-3">
            {tournament.format.gameTimeLimitMinutes}-minute games with {tournament.format.minutesBetweenGames} minutes
            between games. Tap your team to highlight your games.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6" role="group" aria-label="Highlight a team">
          <button type="button" className={chip(selected === null)} aria-pressed={selected === null} onClick={() => setSelected(null)}>
            All Teams
          </button>
          {schedule.teams.map((team) => (
            <button
              key={team}
              type="button"
              className={chip(selected === team)}
              aria-pressed={selected === team}
              onClick={() => setSelected(team)}
            >
              {team}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left tabular-nums">
            <thead className="bg-field-950 text-field-100">
              <tr className="text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-bold">Time</th>
                <th className="px-5 py-3 font-bold">{fields[0]}</th>
                <th className="px-5 py-3 font-bold">{fields[1]}</th>
                <th className="px-5 py-3 font-bold">Bye</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {schedule.roundRobin.map((round, i) => (
                <tr key={round.start}>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-display text-xl text-field-950">{round.start}</p>
                    <p className="text-xs text-stone-500 uppercase font-semibold">
                      to {round.end} · Round {i + 1}
                    </p>
                  </td>
                  {round.games.map((game, gi) => (
                    <td key={gi} className="px-5 py-4">
                      <Matchup game={game} selected={selected} />
                    </td>
                  ))}
                  <td className="px-5 py-4 text-stone-500">
                    <TeamName name={round.bye} selected={selected} />
                  </td>
                </tr>
              ))}
              <tr className="bg-stone-50">
                <td colSpan={4} className="px-5 py-2 text-xs uppercase tracking-wider font-bold text-stone-500">
                  Playoffs · seeded by round-robin standings
                </td>
              </tr>
              {schedule.playoffs.map((slot) => (
                <tr key={slot.start}>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-display text-xl text-dirt-600">{slot.start}</p>
                    <p className="text-xs text-stone-500 uppercase font-semibold">to {slot.end}</p>
                  </td>
                  {slot.games.map((game, gi) => (
                    <td key={gi} className="px-5 py-4">
                      {game ? (
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={
                              game.label === 'Championship'
                                ? 'rounded-md bg-sun-500 text-field-950 text-xs font-bold uppercase tracking-wide px-2 py-0.5'
                                : 'rounded-md bg-dirt-100 text-dirt-700 text-xs font-bold uppercase tracking-wide px-2 py-0.5'
                            }
                          >
                            {game.label}
                          </span>
                          <span className="font-semibold text-field-950">{game.matchup}</span>
                        </div>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-4 text-stone-400">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {schedule.teams.map((team) => (
            <div
              key={team}
              className={
                'rounded-2xl bg-white border border-stone-200 p-6 shadow-sm transition-opacity ' +
                (selected && selected !== team ? 'opacity-40' : '')
              }
            >
              <h3 className="font-display text-xl uppercase text-field-950 mb-3">{team}</h3>
              <ol className="space-y-2 text-sm tabular-nums">
                {teamGames(team).map((g) => (
                  <li key={g.time} className="grid grid-cols-[4.5rem_1fr_auto] gap-3 items-baseline">
                    <span className="font-bold text-field-800">{g.time.replace(/ [AP]M$/, '')}</span>
                    {g.bye ? (
                      <span className="text-stone-400">Bye</span>
                    ) : (
                      <span className="text-stone-700">vs {g.opponent}</span>
                    )}
                    <span className="text-xs uppercase font-semibold text-stone-400">{g.bye ? '' : g.field}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="text-center text-stone-500 text-sm mt-8">
          The top 4 teams advance to the semifinals. Ties are broken using the{' '}
          <a href="#tiebreakers" className="font-semibold text-field-700 hover:text-field-600 underline underline-offset-2">
            tie-breaker rules
          </a>
          .
        </p>
      </div>
    </section>
  )
}
