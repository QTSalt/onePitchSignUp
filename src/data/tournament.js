// Single source of truth for the tournament page. Edit the INSERT_* values
// below once your date, park, deadline, and payment handle are locked in —
// every component reads from here.
const tournament = {
  organizationName: 'Quinntessential Softball',
  tournamentName: 'One Pitch-No Bitch',
  eventType: 'Slowpitch Softball - One Pitch Tournament',
  logistics: {
    date: 'September 26, 2026',
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    durationHours: 7,
    fieldsCount: 2,
    location: {
      parkName: 'Lower Woodlands Ballfield',
      mapUrl: 'https://share.google/1DFfRLqln7C8zP2Iw',
      fields: ['Field 3', 'Field 6'],
    },
    pricing: {
      entryFeeUSD: 250,
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
      title: '7-Run Rule',
      description:
        "Each half-inning is capped at 7 runs. Once the 7th run scores and the umpire calls time, the half-inning ends immediately. Any additional run that scores while the ball is still live — before time is called — still counts.",
      icon: '7️⃣',
    },
    {
      title: 'Time Limit',
      description: 'Games are strictly capped at 40 minutes.',
      icon: '⏱️',
    },
    {
      title: 'Co-Ed Requirement',
      description:
        'This is a strict co-ed tournament. Teams may field a maximum of 6 players of the same gender at once, and batting orders may not stack more than 2 same-gender batters in a row.',
      icon: '🚻',
    },
    {
      title: 'Equipment',
      description:
        'Game balls are provided. All bats must bear the required certification stamp and pass umpire inspection — every bat will be checked and tagged by tournament staff before play.',
      icon: '🥎',
    },
  ],
  rulesReference: {
    note: 'All other play follows the official USA Softball rulebook.',
    url: 'https://www.usasoftball.com/official-rulebook/',
  },
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
  charityEvent: {
    name: 'The Charity Swing-Off',
    isCharityEvent: true,
    tagline: 'Five pitches. Real fastpitch heat. Every swing raises money for a good cause.',
    beneficiary: 'INSERT_CHARITY_NAME_HERE',
    timing: 'Immediately following the tournament — same day, same fields.',
    description:
      "After the last out of the tournament, we're bringing in fastpitch pitchers for a charity fundraiser open to any player who wants to step in. Declare a donation amount before you swing, then take 5 pitches from a real fastpitch arm. Every swing is scored, and your match percentage is the average across all 5 — so consistency pays off, not just one lucky homer.",
    pledgeModel: {
      pitchesPerBatter: 5,
      summary:
        'Declare your donation amount before stepping into the box. Each of your 5 swings is scored using the tiers below. Your match percentage is the average of all 5 results, applied to your full pledge.',
      example:
        'Example: You pledge $30 and swing 5 times — Foul Ball (10%), No Contact (0%), Infield Contact (20%), Single (25%), No Contact (0%). Average match = 11%. That adds $3.30 on top of your $30 donation.',
    },
    scoringTiers: [
      {
        outcome: 'No Contact',
        description: 'Swinging or called strike — no contact made.',
        matchPercent: 0,
      },
      {
        outcome: 'Foul Ball',
        description: 'You got a piece of it.',
        matchPercent: 10,
      },
      {
        outcome: 'Infield Contact',
        description: 'Fair ball that stays in the infield — grounder, dribbler, or popup.',
        matchPercent: 20,
      },
      {
        outcome: 'Single',
        description: 'Ball reaches the outfield grass.',
        matchPercent: 25,
      },
      {
        outcome: 'Double',
        description: 'Gap shot or a hard-hit ball to the fence on the ground.',
        matchPercent: 50,
      },
      {
        outcome: 'Triple',
        description: "Deep fly ball, off the fence in the air, or over an outfielder's head.",
        matchPercent: 75,
      },
      {
        outcome: 'Home Run',
        description: 'Clears the fence.',
        matchPercent: 100,
      },
    ],
    scoringNote:
      'Hit zones are marked on the field (cones/rope) ahead of time so every swing is scored the same way for every batter — no judgment calls.',
  },
}

export default tournament
