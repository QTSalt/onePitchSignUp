// Single source of truth for the tournament page — every component reads
// from here.
const tournament = {
  organizationName: 'Quinntessential Softball',
  tournamentName: 'One Pitch-No Bitch',
  eventType: 'Slowpitch Softball - One Pitch Tournament',
  contact: {
    name: 'Quinn',
    email: 'emailquinnpeel@gmail.com',
    phone: '801-834-0974',
  },
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
    name: 'Round Robin + Playoffs',
    teamsCount: 5,
    guaranteedGames: 4,
    maxGames: 6,
    gameTimeLimitMinutes: 40,
    minutesBetweenGames: 15,
    phases: [
      {
        name: 'Round Robin',
        description:
          'All 5 teams play each other once, so every team gets 4 games. With two fields running, one team sits out each round, and every team gets one bye to rest.',
      },
      {
        name: 'Playoffs',
        description:
          'The top 4 teams from the round robin advance to the semifinals: #1 vs #4 and #2 vs #3. The semifinal winners meet in the championship game.',
      },
    ],
  },
  schedule: {
    teams: ['Swingers', 'Thunderhanded', 'Horse Gurlz', 'Blue Salsa Batters', 'Ump Yours'],
    roundRobin: [
      { start: '10:00 AM', end: '10:40 AM', games: [['Swingers', 'Blue Salsa Batters'], ['Thunderhanded', 'Horse Gurlz']], bye: 'Ump Yours' },
      { start: '10:55 AM', end: '11:35 AM', games: [['Ump Yours', 'Horse Gurlz'], ['Swingers', 'Thunderhanded']], bye: 'Blue Salsa Batters' },
      { start: '11:50 AM', end: '12:30 PM', games: [['Blue Salsa Batters', 'Thunderhanded'], ['Ump Yours', 'Swingers']], bye: 'Horse Gurlz' },
      { start: '12:45 PM', end: '1:25 PM', games: [['Horse Gurlz', 'Swingers'], ['Blue Salsa Batters', 'Ump Yours']], bye: 'Thunderhanded' },
      { start: '1:40 PM', end: '2:20 PM', games: [['Thunderhanded', 'Ump Yours'], ['Horse Gurlz', 'Blue Salsa Batters']], bye: 'Swingers' },
    ],
    playoffs: [
      { start: '2:35 PM', end: '3:15 PM', games: [{ label: 'Semifinal', matchup: '#1 seed vs #4 seed' }, { label: 'Semifinal', matchup: '#2 seed vs #3 seed' }] },
      { start: '3:30 PM', end: '4:10 PM', games: [{ label: 'Championship', matchup: 'Semifinal winners' }, null] },
    ],
  },
  registrationPolicy: {
    coreRule: 'No Pay, No Play',
    details:
      "Your team's spot is not guaranteed until full payment is received. Registration closes automatically once 8 teams have paid.",
    deadline: 'September 19, 2026',
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
      'Applied if teams finish round-robin play with identical win-loss records to determine playoff seeding.',
    orderOfOperations: [
      {
        step: 1,
        name: 'Head-to-Head',
        rule: 'Record against the team you are tied with.',
      },
      {
        step: 2,
        name: 'Run Differential',
        rule: 'Total runs scored minus total runs allowed across all round-robin games.',
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
    beneficiary: 'Cleveland Eagles Athletic Departments',
    beneficiaryFinalized: true,
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
