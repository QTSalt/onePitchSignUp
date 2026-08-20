// Single source of truth for the tournament page. Edit the INSERT_* values
// below once your date, park, deadline, and payment handle are locked in —
// every component reads from here.
const tournament = {
  tournamentName: 'The One Pitch Showdown',
  eventType: 'Slowpitch Softball - One Pitch Tournament',
  logistics: {
    date: 'INSERT_DATE_HERE',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    durationHours: 8,
    fieldsCount: 2,
    location: {
      parkName: 'INSERT_PARK_NAME_HERE',
      fields: ['Field 1', 'Field 2'],
    },
    pricing: {
      entryFeeUSD: 350,
      inclusions: ['Field Rental', 'Umpires', 'Game Balls'],
    },
  },
  format: {
    name: 'Crossover Format',
    guaranteedGames: 5,
    gameTimeLimitMinutes: 40,
    phases: [
      {
        name: 'Morning Pool Play',
        description:
          '8 teams split into two pools of 4. Every team plays 3 rapid-fire pool games to determine afternoon seeding.',
      },
      {
        name: 'Afternoon Playoffs & Consolation',
        description:
          'The top 2 teams from each pool advance to the Championship bracket. The bottom 2 teams advance to the Consolation bracket. Everyone plays 2 more games against evenly matched competition to determine final rankings (1st through 8th place).',
      },
    ],
  },
  registrationPolicy: {
    coreRule: 'No Pay, No Play',
    details:
      "Your team's spot is not guaranteed until full payment is received. Registration closes automatically once 8 teams have paid.",
    deadline: 'INSERT_DEADLINE_DATE_HERE',
    paymentMethods: [
      {
        app: 'Venmo/Zelle/CashApp',
        handle: 'INSERT_HANDLE_HERE',
        requiredMemoNote: "Team Name and Coach's Last Name",
      },
    ],
  },
  rules: [
    {
      title: 'The One-Pitch Rule',
      description: '1 pitch per batter. Strike = Out. Ball = Walk. Hit = Play it out.',
      icon: '⚡',
    },
    {
      title: "The 'Foul to Give' Rule",
      description:
        'You get exactly one foul ball buffer. If your pitch is a foul, the count resets for one more pitch. A second consecutive foul ball is an automatic out.',
      icon: '🛡️',
    },
    {
      title: 'Time Limit',
      description: 'Games are strictly capped at 40 minutes.',
      icon: '⏱️',
    },
    {
      title: 'Equipment',
      description:
        'Game balls are provided. All bats must bear the required certification stamp and pass umpire inspection.',
      icon: '🥎',
    },
  ],
  tieBreakers: {
    context:
      'Applied if teams finish morning pool play with identical win-loss records to determine afternoon bracket seeding.',
    orderOfOperations: [
      {
        step: 1,
        name: 'Head-to-Head',
        rule: 'Record against the team you are tied with.',
      },
      {
        step: 2,
        name: 'Run Differential',
        rule: 'Total runs scored minus total runs allowed across all morning games.',
      },
      {
        step: 3,
        name: 'The Ultimate Decider',
        rule:
          'If teams are still deadlocked on run differential, the coaches will meet at the main HQ table for a Best-of-Three Rock-Paper-Scissors showdown overseen by the Tournament Director.',
      },
    ],
  },
  refundAndWeatherPolicy: {
    withdrawals:
      'Full refunds are available if you withdraw before the payment deadline. No refunds will be issued for teams dropping out after the deadline.',
    weather:
      'If the city closes the fields due to severe weather, teams will receive a full refund minus a small fee to cover non-refundable insurance and ball costs.',
  },
}

export default tournament
