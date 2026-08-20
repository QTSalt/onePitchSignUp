// Single source of truth for the tournament page — every component reads
// from here. `charityEvent.beneficiary` is currently "To Be Announced";
// update it once the donation recipient is finalized.
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
    guaranteedGames: 4,
    maxGames: 5,
    gameTimeLimitMinutes: 40,
    phases: [
      {
        name: 'Morning Pool Play',
        description:
          '8 teams split into two pools of 4. Every team plays 3 rapid-fire pool games to determine afternoon seeding.',
      },
      {
        name: 'Afternoon Single-Elimination Bracket',
        description:
          "The top 2 teams from each pool advance to the Championship bracket; the bottom 2 advance to the Consolation bracket. Both brackets are single-elimination — win your semifinal and you play on for the bracket title, lose and your day is done. Every team is guaranteed at least 1 afternoon game; bracket finalists play a 2nd for the title.",
      },
    ],
  },
  registrationPolicy: {
    coreRule: 'No Pay, No Play',
    details:
      "Your team's spot is not guaranteed until full payment is received. Registration closes automatically once 8 teams have paid.",
    deadline: 'September 19, 2026',
    paymentMethods: [
      {
        app: 'CashApp',
        handle: '$ThomasPeel',
        url: 'https://cash.app/$ThomasPeel',
        qr: '/payment/cashapp-qr.png',
        requiredMemoNote: "Team Name and Coach's Last Name",
      },
      {
        app: 'Venmo',
        handle: 'Scan to pay',
        url: 'https://venmo.com/code?user_id=1948767808913408965&created=1787213535',
        qr: '/payment/venmo-qr.png',
        requiredMemoNote: "Team Name and Coach's Last Name",
      },
      {
        app: 'Cash',
        handle: 'Contact the Tournament Director to arrange',
        url: null,
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
      title: 'Check-In & Bat Check',
      description:
        'Arrive at least 30 minutes before your scheduled game time to check in and have your bats checked and tagged by tournament staff.',
      icon: '⏰',
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
  freeAgentProgram: {
    feeUSD: 25,
    tagline: "Don't have a full team? Join the free agent pool.",
    description:
      "Sign up as a free agent for $25 and we'll add you to a pool that team captains can pull from if they're short on players. This doesn't guarantee you a spot on a team. If enough free agents sign up on their own to field a full team, we'll group you together. Payment is only due once you're actually placed on a team — nothing is charged at sign-up.",
    howItWorks: [
      'Sign up below — no payment due yet.',
      'Team captains short on players can browse the pool and reach out to you directly.',
      "If enough free agents sign up, we'll group them into a team of their own.",
      "Once you're placed on a team, your $25 fee is due.",
    ],
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
    beneficiary: 'To Be Announced',
    timing: 'Immediately following the tournament — same day, same fields.',
    description:
      "After the last out of the tournament, we're bringing in fastpitch pitchers for a charity fundraiser open to any player who wants to step in. Declare a donation amount before you swing, then take 5 pitches from a real fastpitch arm. Every swing is scored on its own, and each swing's match stacks on top of your pledge — so every solid hit adds more, and a great swing is never watered down by a miss.",
    pledgeModel: {
      pitchesPerBatter: 5,
      summary:
        "Declare your donation amount before stepping into the box. Each of your 5 swings is scored independently using the tiers below, and every swing's match percentage is added on top of your pledge — they stack rather than average out.",
      example:
        'Example: You pledge $30 and swing 5 times — Foul Ball (10%), No Contact (0%), Infield Contact (20%), Single (25%), No Contact (0%). Add up the matches: 10% + 0% + 20% + 25% + 0% = 55% of your pledge, or $16.50. Total donation: $46.50.',
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
      "Volunteers stationed on the field call each swing's outcome in real time.",
    pitcherStrikeoutBonus: {
      amountUSD: 100,
      label: '$100 / Strikeout',
      description:
        "On top of every batter's matched donation, Quinntessential Softball will donate $100 for every strikeout a fastpitch pitcher throws — three strikes against one batter.",
    },
  },
}

export default tournament
