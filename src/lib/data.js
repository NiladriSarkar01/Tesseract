// --- EVENTS ---
export const EVENTS = [
  // "FIGMA",
  // "GRAFFITI",
  // "DRONE",
  // "PAINTBALL",
  // "LAP RACE",

  //robotics
  "ROBO WAR (8 KG + 15 KG)",
  "ROBO WAR (8 KG)",
  "ROBO WAR (15 KG)",
  "TERRANOVA",
  "LINE FOLLOWER",
  "MODEL VISION",
  "ROBO SOCCER",

  //coding
  "SUPER CODERS",
  "CAPTURE THE FLAG",

  //gaming
  "DIGITAL KICKOFF",
  "BGMI",
  "FREE FIRE",

  //indoor game
  "TECH ARENA CHESS",
  "CARROMACT",

  //miscellaneous
  "CANVA FUSION",
  "THE NEXUS TRANSMUTATION",
  "QUIZZARACT",
  "FRAME WAR",
  "CONSTRUCTOR()",
  "NAVIN VIDYARTHI",
];

const PALETTE = {
  CODING: { accent: "#c40886", glow: "rgba(196,8,134,0.45)" },
  MISCELLANEOUS: { accent: "#a855f7", glow: "rgba(168,85,247,0.45)" },
  INDOORGAME: { accent: "#f97316", glow: "rgba(249,115,22,0.45)" },
  GAMING: { accent: "#22c55e", glow: "rgba(34,197,94,0.45)" },
  ROBOTICS: { accent: "#eab308", glow: "rgba(234,179,8,0.45)" },
  COMBO: { accent: "#ef4444", glow: "rgba(239,68,68,0.45)" }, // strong/red (battle vibe)
  HACKATHON: { accent: "#6366f1", glow: "rgba(99,102,241,0.45)" }, // tech/indigo vibe

  DEFAULT: { accent: "#06b6d4", glow: "rgba(6,182,212,0.45)" },
};

export function getPalette(cat = "") {
  const key = cat.toUpperCase().replace(/\s+/g, "");
  return PALETTE[key] ?? PALETTE.DEFAULT;
}

export const COMBO_END_DATE = new Date(2026, 2, 25, 0, 0, 0);

// --- EVENT DATA ---
export const EVENTS_DATA = [
  // ─── COMBO EVENTS ─────────────────────────────────────────────────────────────

  {
    id: 201,
    title: "Terranova + Robo Soccer + Line Follower",
    category: "COMBO",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    venue: "Multiple Venues",
    isClosed: true,
    image: "https://images.pexels.com/photos/6779863/pexels-photo-6779863.jpeg",
    desc: "Three robotics events, one unstoppable package — navigate the Hell Road, dominate the soccer arena, and follow the line to glory.",
    participationMode: "team",
    price: 0,
    teamPrice: 700,
    savings: 100,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 5,
    events: [
      { title: "Terranova", category: "Robotics" },
      { title: "Robo Soccer", category: "Robotics" },
      { title: "Line Follower", category: "Robotics" },
    ],
    prizes: ["📜 Certificates for all participants"],
    head: [],
    coHead: [],
  },

  {
    id: 101,
    title: "Robo War (8 kg + 15 kg)",
    category: "COMBO",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    venue: "Open Air Theatre",
    isClosed: true,
    image:
      "https://edu.ieee.org/in-amritaras/wp-content/uploads/sites/500/2025/02/image.png",
    desc: "Take on both weight classes in one unstoppable package — build and battle an 8 kg and a 15 kg combat robot in tournament-style arena fights. Double the metal, double the glory.",
    participationMode: "team",
    price: 0,
    teamPrice: 1500,
    savings: 300,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 6,
    events: [
      { title: "Robo War (8 kg)", category: "Robotics" },
      { title: "Robo War (15 kg)", category: "Robotics" },
    ],
    prizes: [
      "🏆 Combined Prize Pool: ₹50,000",
      "📜 Certificates for all participants",
    ],
    head: [
      {
        name: "Tousif Azim",
        mobile: "+91 9609670201",
        email: "tousifw00431@gmail.com",
      },
      {
        name: "Parna Ghosh",
        mobile: "+91 8584872974",
        email: "parnag125@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Soumodeep Guho",
        mobile: "+91 8967203175",
        email: "soumyadeepguha69@gmail.com",
      },
      {
        name: "Dhruba Biswas",
        mobile: "+91 8145104502",
        email: "dhrubabiswas7777@gmail.com",
      },
    ],
  },

  {
    id: 202,
    title: "Robo War 8kg + Terranova + Robo Soccer + Line Follower",
    category: "COMBO",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    venue: "Multiple Venues",
    isClosed: true,
    image:
      "https://edu.ieee.org/in-amritaras/wp-content/uploads/sites/500/2025/02/image.png",
    desc: "Four events, one legend — combine the 8 kg arena brawl with obstacle navigation, robotic soccer, and line following in one power-packed combo.",
    participationMode: "team",
    price: 0,
    teamPrice: 1400,
    savings: 200,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 6,
    events: [
      { title: "Robo War (8 kg)", category: "Robotics" },
      { title: "Terranova", category: "Robotics" },
      { title: "Robo Soccer", category: "Robotics" },
      { title: "Line Follower", category: "Robotics" },
    ],
    prizes: ["📜 Certificates for all participants"],
    head: [],
    coHead: [],
  },

  {
    id: 203,
    title: "Robo War 15kg + Terranova + Robo Soccer + Line Follower",
    category: "COMBO",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    venue: "Multiple Venues",
    isClosed: true,
    image:
      "https://edu.ieee.org/in-amritaras/wp-content/uploads/sites/500/2025/02/image.png",
    desc: "Step up to the heavyweight division — pair the 15 kg war machine with obstacle racing, bot soccer, and precision line following in one fierce combo.",
    participationMode: "team",
    price: 0,
    teamPrice: 1500,
    savings: 300,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 6,
    events: [
      { title: "Robo War (15 kg)", category: "Robotics" },
      { title: "Terranova", category: "Robotics" },
      { title: "Robo Soccer", category: "Robotics" },
      { title: "Line Follower", category: "Robotics" },
    ],
    prizes: ["📜 Certificates for all participants"],
    head: [],
    coHead: [],
  },

  {
    id: 204,
    title: "All Robotics Events (5 Events Combo)",
    category: "COMBO",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    venue: "Multiple Venues",
    isClosed: true,
    image:
      "https://edu.ieee.org/in-amritaras/wp-content/uploads/sites/500/2025/02/image.png",
    desc: "Go all-in on robotics — every single event under one roof. Two war machines, one obstacle course, a soccer arena, and a precision track. The ultimate combo for the ultimate team.",
    participationMode: "team",
    price: 0,
    teamPrice: 2200,
    savings: 400,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 6,
    events: [
      { title: "Robo War (8 kg)", category: "Robotics" },
      { title: "Robo War (15 kg)", category: "Robotics" },
      { title: "Terranova", category: "Robotics" },
      { title: "Robo Soccer", category: "Robotics" },
      { title: "Line Follower", category: "Robotics" },
    ],
    prizes: ["📜 Certificates for all participants"],
    head: [],
    coHead: [],
  },

  // 1 — Robo War (8 KG)
  {
    id: 2,
    title: "Robo War (8 kg)",
    category: "Robotics",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    isClosed: true,
    venue: "Open Air Theatre",
    whatsappLink: "https://chat.whatsapp.com/Bamds7udD57AgdSwS22Gi1",
    image:
      "https://edu.ieee.org/in-amritaras/wp-content/uploads/sites/500/2025/02/image.png",
    desc: "Build an 8 kg remote-controlled combat robot and battle it out in a tournament-style arena fight. Your goal — disable, immobilize, or outscore your opponent within 3 minutes to claim victory.",
    participationMode: "team",
    price: 0,
    teamPrice: 800,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 6,
    rules: [
      "Maximum robot weight is 8 kg (100g tolerance); all power sources must be on-board.",
      "Only wireless remote control is allowed with a minimum 4-channel frequency; a manual Emergency Stop (E-Stop) is mandatory.",
      "Power must be electrical only (max 36V DC) using sealed batteries like LiPo, Li-ion, or NiMH.",
      "Allowed weapons include Spinners, Flippers, Lifters, Hammers, and Cutters. No liquid projectiles, jammers, or entangling devices.",
      "A robot loses if immobilized for 10 seconds, thrown out of the arena, or outscored on aggression, control, and damage.",
      "A kill switch and weapon lock are mandatory; safety inspection is required before every match.",
      "Teams using pneumatics or hydraulics must submit a safety authorization letter signed by faculty during registration.",
    ],
    head: [
      {
        name: "Tousif Azim",
        mobile: "+91 9609670201",
        email: "tousifw00431@gmail.com",
      },
      {
        name: "Parna Ghosh",
        mobile: "+91 8584872974",
        email: "parnag125@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Soumodeep Guho",
        mobile: "+91 8967203175",
        email: "soumyadeepguha69@gmail.com",
      },
      {
        name: "Dhruba Biswas",
        mobile: "+91 8145104502",
        email: "dhrubabiswas7777@gmail.com",
      },
    ],
    prizes: [
      "🏆 Total Prize Pool: ₹20,000",
      "📜 Certificates for all participants",
    ],
  },

  // 2 — Robo War (15 KG)
  {
    id: 11,
    title: "Robo War (15 kg)",
    category: "Robotics",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    venue: "Open Air Theatre",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/H4Nzuz8N8eL5k8e8VIDaqi",
    image:
      "https://edu.ieee.org/in-amritaras/wp-content/uploads/sites/500/2025/02/image.png",
    desc: "Build a 15 kg remote-controlled combat robot and compete in a high-stakes tournament-style arena battle. Immobilize, disable, or outscore your opponent within 3 minutes to advance and claim victory.",
    participationMode: "team",
    price: 0,
    teamPrice: 1000,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 6,
    rules: [
      "Maximum robot weight is 15 kg (100g tolerance); all power sources must be on-board, and each bot in a cluster must have individual drive.",
      "Only wireless remote control is allowed with a minimum 4-channel frequency; a manual Emergency Stop (E-Stop) is mandatory.",
      "Power must be electrical only (max 36V DC) using sealed batteries like LiPo, Li-ion, or NiMH. No IC engines allowed.",
      "Allowed weapons include Spinners, Flippers, Lifters, Hammers, and Cutters. No liquid projectiles, RF jammers, or entangling devices.",
      "A robot loses if immobilized for 10 seconds, thrown out of the arena, or outscored on aggression, control, and damage.",
      "A kill switch and weapon lock are mandatory; safety inspection is required before every match.",
      "Teams using pneumatics or hydraulics must submit a safety authorization letter signed by faculty during registration.",
    ],
    head: [
      {
        name: "Tousif Azim",
        mobile: "+91 9609670201",
        email: "tousifw00431@gmail.com",
      },
      {
        name: "Parna Ghosh",
        mobile: "+91 8584872974",
        email: "parnag125@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Soumodeep Guho",
        mobile: "+91 8902478956",
        email: "parnag125@gmail.com",
      },
      {
        name: "Dhruba Biswas",
        mobile: "+91 8145104502",
        email: "dhrubabiswas7777@gmail.com",
      },
    ],
    prizes: [
      "🏆 Total Prize Pool: ₹30,000",
      "📜 Certificates for all participants",
    ],
  },

  // 3 — Terranova
  {
    id: 3,
    title: "Terranova",
    category: "Robotics",
    date: "Mar 28, 2026",
    time: "11:00 AM Onwards",
    venue: "Gaming Lab 1",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/JMrabGgzHOA84Dh9SEnpoz?mode=gi_t",
    image: "https://images.pexels.com/photos/6779863/pexels-photo-6779863.jpeg",
    desc: "Trapped in the abyss, your only hope is to break free by reaching the gates of heaven. The path is the ruthless \u201cHell Road,\u201d where you must race at full speed, crash through dangers, and conquer every obstacle as fast as possible. Victory means escape \u2014 and peace at last.",
    participationMode: "team",
    price: 0,
    teamPrice: 300,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 5,
    rules: [
      "Bot Specifications:",
      "The dimension of the bot must be 25cm x 25cm x 25cm, including wheels (10% tolerance is allowed).",
      "The maximum weight of the bot is 3 kg.",
      "The wire must be 12ft long to avoid any issues.",
      "Ready-made toys/IC engines/LEGO kits are not allowed.",
      "Both wired and wireless controllers are allowed. In wireless RF controllers, Wi-Fi and Bluetooth-based controllers are also allowed.",
      "Rules:",
      "A team of a maximum of 5 members will be allowed to participate.",
      "Point systems will be introduced at the start of the event.",
      "Skip will incur a penalty of 30 seconds.",
      "Any hand touch will cause a penalty of 10 seconds for the hand touch.",
      "The bonus score will deduct 10 seconds.",
      "Timeout of 3 minutes.",
      "The maximum voltage used for driving the bot should be 24V.",
    ],
    head: [
      {
        name: "Rudranil Goswami",
        mobile: "+91 9830411863",
        email: "rudranilgoswami3@gmail.com",
      },
      {
        name: "Jeet Pal",
        mobile: "+91 7797303055",
        email: "jeet832004@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Suparna Dey",
        mobile: "+91 7980181134",
        email: "suparna20052021@gmail.com",
      },
      {
        name: "Sudipto Mondal",
        mobile: "+91 8902478956",
        email: "sudiptohwh2005@gmail.com",
      },
    ],
    prizes: [
      "🏆 Total Prize Pool: ₹10,000",
      "📜 Certificates for all participants",
    ],
  },

  // 4 — Line Follower
  {
    id: 4,
    title: "Line Follower",
    category: "Robotics",
    date: "Mar 28, 2026",
    time: "11:00 AM Onwards",
    venue: "GNIT",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/IYvC08c8fpDBP1C7UfDOqQ?mode=gi_t",
    image:
      "https://images.unsplash.com/photo-1589254047589-db4c14ad7779?q=80&w=1170&auto=format&fit=crop",
    desc: "Speed alone won't save you here. In this high-stakes time trial, your robot must navigate a twisting track of black lines on a white arena autonomously. From 90-degree turns to tricky crossovers, this event tests the stability of your hardware and the intelligence of your algorithms. Build it fast, code it smart, and don't lose the line!",
    participationMode: "team",
    price: 0,
    teamPrice: 200,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 4,
    rules: [
      "Build a fully autonomous line-following robot.",
      "Track includes sharp turns, acute angles, crossovers, and lighting variations.",
      "Robot must follow a black line on a white surface (or vice versa).",
      "No remote control allowed \u2014 fully self-operated after start.",
      "Uses sensor array to detect path and adjust motors in real-time.",
      "Must maintain accuracy even at high speed.",
      "Fastest robot to complete the track without derailing wins.",
    ],
    head: [
      {
        id: 1,
        name: "Anshuman Shaw",
        mobile: "+91 9088411976",
        email: "ansh98314414488@gmail.com",
      },
      {
        id: 2,
        name: "Supratik Nath",
        mobile: "+91 9932237759",
        email: "supratik9832@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Samrat Sinha",
        mobile: "+91 8420112474",
        email: "ss4912817@gmail.com",
      },
    ],
    prizes: [
      "🏆 Total Prize Pool: ₹6,000",
      "📜 Certificates for all participants",
    ],
  },

  // 5 — Model Vision
  {
    id: 7,
    title: "Model Vision",
    category: "Robotics",
    date: "Mar 28, 2026",
    time: "11:00 AM Onwards",
    venue: "Gaming Lab 1",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/CzqkqYAvg5j5O9mt2T8cw7?mode=gi_t",
    image:
      "https://images.unsplash.com/photo-1742239034927-0b4efe83ae5e?q=80&w=687&auto=format&fit=crop",
    desc: "Welcome to Model Vision — where ideas come to life through innovation. Participants are invited to showcase hardware, robotics, embedded systems, and IoT-based models designed to solve real-world problems. This event celebrates creativity, technical skills, and the ability to turn concepts into functional prototypes. Present your innovation, demonstrate its working, and inspire others with your ideas. Think beyond limits. Build the future.",
    participationMode: "team",
    price: 0,
    teamPrice: 150,
    isTeamPriceFixed: true,
    minMembers: 1,
    maxMembers: 5,
    rules: [
      "Each team must consist of minimum 1 and maximum 5 participants.",
      "Two members from each team will be allowed to present and explain the working of the model.",

      "The team leader must complete the registration with proper details.",
      "No entries will be accepted without registration.",

      "Participants from GNIT must carry their college ID cards.",
      "Participants from other colleges must carry their institutional ID cards.",
      "Proper uniform is mandatory for all team members.",
      "Models should preferably be hardware, electronics, robotics, or IoT based working prototypes.",
      "Teams should be prepared to explain the working principle, innovation, and real-world application of their model.",

      "Each team must bring their own extension board or socket if required for powering their model.",
      "Participants must complete model setup before the event begins.",

      "Projects will be evaluated based on innovation, technical implementation, usefulness, and presentation.",
      "The judge’s decision will be final.",
      "Registration will be available online through the website and at the registration desk before the event.",
      "The event head reserves the right to modify rules if necessary under any circumstances.",
    ],
    head: [
      {
        name: "Manjeera Patra",
        mobile: "+91 8597757846",
        email: "manjeerapatra131602@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Manjistha Patra",
        mobile: "+91 8597757874",
        email: "manjisthapatra1045@gmail.com",
      },
    ],
    prizes: [],
  },

  // 6 — Robo Soccer
  {
    id: 5,
    title: "Robo Soccer",
    category: "Robotics",
    date: "Mar 28, 2026",
    time: "11:00 AM Onwards",
    venue: "Gaming Lab 1",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/HwIOib7H1oxK6xmdbvHL0z?mode=gi_t",
    image:
      "https://images.unsplash.com/photo-1666193183124-3f27c7800370?q=80&w=1040&auto=format&fit=crop",
    desc: "Step into the arena of warriors at Turbo-Kick! Tesseract 2k26 brings you the ultimate fusion of match-day energy and raw engineering. Build your custom bot to master the obstacle-laden Prelims and strike your way through adrenaline-pumping 1v1 Knockout battles. From the 6-minute eliminations to the 8-minute Grand Final, only the best strategies will survive the Golden Goal. Don't just watch the future of sports\u2014build it. Register Now!",
    participationMode: "team",
    price: 0,
    teamPrice: 300,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 5,
    rules: [
      "\uD83D\uDD39 Team Requirements",
      "Team size: 2\u20135 members",
      "Members can be from different institutions",
      "One participant \u2192 only one team",
      "Valid institutional ID mandatory",
      "No bot sharing between teams",
    ],
    head: [
      {
        name: "Debjit Mukherjee",
        mobile: "+91 9830464724",
        email: "mukh.debjit@gmail.com",
      },
      {
        name: "Rajdeep Das",
        mobile: "+91 9366141412",
        email: "rajdeepdas.india0@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Shreejita Biswas",
        mobile: "+91 9804784751",
        email: "shreejitabiswasvis@gmail.com",
      },
      {
        name: "Supriyo Mondal",
        mobile: "+91 9064457370",
        email: "supriyamondal10562@gmail.com",
      },
    ],
    prizes: [
      "🏆 Total Prize Pool: ₹10,000",
      "📜 Certificates for all participants",
    ],
  },

  {
    id: 30,
    title: "Navin Vidyarthi",
    category: "Robotics",
    date: "Mar 28, 2026",
    time: "11:00 AM Onwards",
    venue: "Gaming Lab 1",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/FPSmexTkuFxJumqAUKlcOY",
    image:
      "https://images.unsplash.com/photo-1742239034927-0b4efe83ae5e?q=80&w=687&auto=format&fit=crop",
    desc: "Welcome to Navin Vidyarthi — where ideas come to life through innovation. Participants are invited to showcase hardware, robotics, embedded systems, and IoT-based models designed to solve real-world problems. This event celebrates creativity, technical skills, and the ability to turn concepts into functional prototypes. Present your innovation, demonstrate its working, and inspire others with your ideas. Think beyond limits. Build the future.",
    participationMode: "team",
    price: 0,
    teamPrice: 0,
    isTeamPriceFixed: true,
    minMembers: 1,
    maxMembers: 5,
    rules: [
      "Only open to school students.",
      "Each team must consist of minimum 1 and maximum 5 participants.",
      "Two members from each team will be allowed to present and explain the working of the model.",

      "The team leader must complete the registration with proper details.",
      "No entries will be accepted without registration.",

      "Participants from GNIT must carry their college ID cards.",
      "Participants from other colleges must carry their institutional ID cards.",
      "Proper uniform is mandatory for all team members.",
      "Models should preferably be hardware, electronics, robotics, or IoT based working prototypes.",
      "Teams should be prepared to explain the working principle, innovation, and real-world application of their model.",

      "Each team must bring their own extension board or socket if required for powering their model.",
      "Participants must complete model setup before the event begins.",

      "Projects will be evaluated based on innovation, technical implementation, usefulness, and presentation.",
      "The judge’s decision will be final.",
      "Registration will be available online through the website and at the registration desk before the event.",
      "The event head reserves the right to modify rules if necessary under any circumstances.",
    ],
    head: [
      {
        name: "Moulisha Roy",
        mobile: "+91 8100514961",
        email: "roymoulisha709@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Dhiman Barma",
        mobile: "+91 8250324834",
        email: "barmadhiman540@gmail.com",
      },
    ],
    prizes: [],
  },

  // Constructor()
  {
    id: 24,
    title: "Constructor()",
    category: "hackathon",
    date: "Mar 28, 2026",
    time: "11:00 AM Onwards",
    venue: "Gaming Lab 1",
    whatsappLink: "https://chat.whatsapp.com/Em1DjaKHbFt81QJIJbAPMT",
    isClosed: true,
    image:
      "https://plus.unsplash.com/premium_photo-1723773736797-8d05f469c6df?q=80&w=1053&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Welcome to Constructor() — a mini hackathon where innovation meets execution. Build creative, tech-driven solutions to real-world problems within a limited time. Collaborate, code, and compete as you transform ideas into impactful prototypes. Think beyond limits and shape the future.",
    participationMode: "team",
    price: 0,
    teamPrice: 200,
    isTeamPriceFixed: false,
    specialTeamPrice: {
      members: 4,
      price: 300,
    },
    minMembers: 2,
    maxMembers: 4,
    rules: [
      "Each team must consist of 2 to 4 members.",
      "Teams should ideally include a mix of skill sets (e.g., backend, frontend, design, and presentation).",
      "Teams must be finalized and registered before the event begins. No changes to the roster will be allowed after registration closes.",
      "Broad hackathon tracks (e.g., EdTech, Sustainability, Smart Campus) will be announced 48 hours prior to the event to help teams prepare their development environment.",
      "Specific problem statements will be revealed on the day of the event.",
      "Teams must develop a solution that directly addresses one of the provided problem statements. Off-topic projects will be disqualified.",
      "Participants may use any programming language (e.g., Java, Python, JavaScript) or framework of their choice.",
      "All project code must be written during the hackathon. Teams are required to create a new public GitHub repository at the start of the event and commit their progress regularly.",
      "AI Tool Policy: The use of generative AI tools (such as ChatGPT, Gemini) or AI coding assistants (such as GitHub Copilot) for writing core business logic, generating components, or designing system architecture is strictly prohibited. The objective is to encourage originality and independent problem-solving.",
      "Pitching sessions are time-bound. Each team will have 4 minutes to present their solution and demonstrate their prototype, followed by a 2-minute Q&A session with the judges.",
      `Presentations will be evaluated based on the following criteria:
- Technical Implementation (30%): Functionality, code quality, and effective use of the tech stack.
- Innovation & Originality (25%): Creativity and uniqueness of the solution.
- Real-world Impact (25%): Practical feasibility, scalability, and potential value.
- Presentation & UI/UX (20%): Clarity of the pitch, interface design, and overall user experience.`,
    ],
    head: [
      {
        name: "Ayush Singh",
        mobile: "+91 9875488340",
        email: "kayushsingh1@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Ishita Das",
        mobile: "+91 9073856639",
        email: "ishitadas.10.d.19@gmail.com",
      },
    ],
    prizes: "",
  },

  // 7 — Super Coder
  {
    id: 9,
    title: "Super Coders",
    category: "Coding",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "CSE Lab",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/CefqfJJnxXuJ0UdeazmbSd",
    image:
      "https://plus.unsplash.com/premium_photo-1678566154673-a728037f3f00?q=80&w=702&auto=format&fit=crop",
    desc: "Code hard, break limits, and outsmart every problem thrown your way.",
    participationMode: "both",
    price: 100,
    teamPrice: 150,
    isTeamPriceFixed: true,
    minMembers: 1,
    maxMembers: 2,
    rules: [
      "A team can consist of at most 2 members.",
      "All coding languages are accepted.",
      "The program with the least characters (if applicable) or fastest correct submission wins.",
      "Pen drives, laptops, or any external digital devices are not allowed.",
      "Any participant found indulging in malpractice will be disqualified immediately.",
      "Copy-paste is allowed only within the code editor. Copying from external sources (extensions, internet, etc.) is strictly prohibited.",
      "Participants must be in proper uniform and must carry payment form and institutional ID cards.",
      "The decision of the Event Head will be final. The organizing authority reserves the right to modify rules if required.",
    ],
    head: [
      {
        name: "Nazreen Imam",
        mobile: "+91 6206705516",
        email: "nazreenimam78601@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Gourav Chandra",
        mobile: "+91 9382757411",
        email: "gouravchandra935@gmail.com",
      },
    ],
    prizes: "",
  },

  // 8 — Capture The Flag
  {
    id: 10,
    title: "Capture The Flag",
    category: "Coding",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "CSE Lab",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/B7H3ymhTmhWGM9gtmYqaZo",
    image:
      "https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Cybersecurity challenge where participants exploit vulnerabilities and capture hidden flags.",
    participationMode: "both",
    price: 150,
    teamPrice: 200,
    isTeamPriceFixed: true,
    minMembers: 1,
    maxMembers: 4,
    rules: [
      "The competition is open to registered participants only.",

      "Participants may compete individually or in teams of up to 4 members.",

      "Team members cannot participate in multiple teams.",

      "The competition will follow a Jeopardy-style CTF format with challenges in areas such as Cryptography, Web Security, Digital Forensics, Reverse Engineering, and Miscellaneous categories.",

      "Each challenge contains a hidden flag that must be submitted in the required format on the official CTF platform.",

      "Flags must be submitted exactly in the specified format (e.g., FLAG{example_flag}).",

      "Points will be awarded based on the difficulty level of each challenge.",

      "The team with the highest score at the end of the competition will be declared the winner.",

      "Participants are allowed to use open-source tools, personal scripts, and publicly available resources.",

      "Attacking the CTF infrastructure, exploiting the scoring platform, or disrupting the competition environment is strictly prohibited.",

      "Sharing flags or collaborating with other teams is not allowed and may lead to disqualification.",

      "In case of a tie, the team that achieves the score earlier (based on submission timestamp) will be ranked higher.",

      "Participants are expected to maintain ethical conduct and fair play throughout the competition.",

      "The decision of the organizing committee will be final and binding in all matters related to the event.",
    ],
    head: [
      {
        name: "Ujjal Bhattacharya",
        mobile: "+91 9641768354",
        email: "Ujjalbhattacharya525@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Ujan Ghosh",
        mobile: "+91 9875510547",
        email: "ujanghosh3@gmail.com",
      },
    ],
    prizes: "",
  },

  // 9 — BGMI
  {
    id: 12,
    title: "BGMI",
    category: "Gaming",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "CSE Lab",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/LDLuMEnKbyX85IPGDgYvxS",
    image:
      "https://cdn1.epicgames.com/spt-assets/53ec4985296b4facbe3a8d8d019afba9/pubg-battlegrounds-19vwb.jpg?resize=1&w=780&h=438&quality=high",
    desc: "The ultimate mobile battleground awaits, where players unite, strategize, and engage in epic battles for victory. Join now!",
    participationMode: "team",
    price: 0,
    teamPrice: 200,
    isTeamPriceFixed: true,
    minMembers: 1,
    maxMembers: 4,
    rules: [
      "Team should consist of (4+2) members (in case of any emergency).",
      "Only one member of a team (Squad or Duo) has to pay the entry fee and for the match or tournaments.",
      "If you failed to attend Match in time you will not get any refund.",
      "Room ID and password would be shared 10 minutes before match. Players should be in lobby 5 minutes before starting the match.",
      "The lobby will not be restarted for player's disconnections.",
      "In case of online match, players should record their POV.",
      "All Maps should be downloaded.",
      "Make sure your BGMI Username matches with Registered BGMI username.",
      "Players cannot engage with other players in a verbal manner (cuss words, racism, and sexism).",
      "Sharing illegal programs and all third-party programs is forbidden.",
      "Spamming both in writing and verbally is forbidden.",
      "Teaming with opposing teams is forbidden.",
      "No emulator player are allowed. External triggers are also.",
    ],
    head: [
      {
        name: "Sahil Mallick",
        mobile: "+91 8697004118",
        email: "sahilmallick434@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Priyanshu Mandal",
        mobile: "+91 7980604507",
        email: "priyanshumondal927@gmail.com",
      },
    ],
    prizes: "",
  },

  // 10 — DIGITAL KICKOFF
  {
    id: 13,
    title: "DIGITAL KICKOFF",
    category: "Gaming",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "CSE Lab",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/CWWrc0pmItN32ARM1aAPu8",
    image:
      "https://images.unsplash.com/photo-1587368062478-e804f5e2a55a?q=80&w=1323&auto=format&fit=crop",
    desc: "Play smart, strike hard, and let your gameplay rewrite the scoreboard.",
    participationMode: "team",
    price: 0,
    teamPrice: 400,
    isTeamPriceFixed: true,
    minMembers: 4,
    maxMembers: 4,
    rules: [
      "Standard game settings will be used.",
      "Knockout format.",
      "Controller configuration allowed before match.",
      "Pausing without permission results in penalty.",
      "Referee decision final.",
    ],
    head: [
      {
        name: "Ayan Roy",
        mobile: "+91 8100019667",
        email: "ayanroy20.39@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Debjit Dwari",
        mobile: "+91 8240001874",
        email: "debjitdwari2018@gmail.com",
      },
    ],
    prizes: "",
  },
  {
    id: 6,
    title: "FREE FIRE",
    category: "Gaming",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "CSE Lab",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/GxWUiKbQRUyLZ01dRbMxYw",
    image:
      "https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/aa959aa3d8790d3a44f7f20f16adfa01.jpg",
    desc: "The ultimate mobile battleground awaits, where players unite, strategize, and engage in epic battles for victory. Join now!",
    participationMode: "team",
    price: 0,
    teamPrice: 200,
    isTeamPriceFixed: true,
    minMembers: 1,
    maxMembers: 4,
    rules: [
      "TEAM SHOULD CONSIST OF 4 MEMBERS. A MAXIMUM OF 2 SUBSTITUTE PLAYERS MAY BEREGISTERED AND USED ONLY IN CASE OF EMERGENCIES.",
      "THE TOURNAMENT WILL BE CONDUCTED IN TWO FORMATS: SOLO AND SQUAD.",
      "ONLY ONE MEMBER OF A TEAM HAS TO PAY THE ENTRY FEE AND FOR THE MATCH OR TOURNAMENTS.",
      "IF YOU FAILED TO ATTEND MATCH IN TIME YOU WILL NOT GET ANY REFUND.",
      "ROOM ID AND PASSWORD WOULD BE SHARED 10 MINUTES BEFORE MATCH. PLAYERS SHOULD BE IN LOBBY 5 MINUTES BEFORE STARTING THE MATCH.",
      "THE LOBBY WILL NOT BE RESTARTED FOR PLAYER'S DISCONNECTIONS.",
      "IN CASE OF ONLINE MATCH , PLAYERS SHOULD RECORD THEIR POV.",
      "ALL MAPS SHOULD BE DOWNLOADED.",
      "MAKE SURE YOUR Free Fire USERNAME MATCHES WITH REGISTERED Free Fire USERNAME.",
      "PLAYERS CANNOT ENGAGE WITH OTHER PLAYERS IN A VERBAL MANNER (CUSS WORDS, RACISM, AND SEXISM).",
      "SHARING ILLEGAL PROGRAMS AND ALL THIRD-PARTY PROGRAMS IS FORBIDDEN.",
      "SPAMMING BOTH IN WRITING AND VERBALLY IS FORBIDDEN.",
      "TEAMING WITH OPPOSING TEAMS IS FORBIDDEN.",
      "NO EMULATOR PLAYER ARE ALLOWED. EXTERNAL TRIGGERS ARE ALSO.",
      "EVERY PLAYER'S APP VERSION WILL BE CHECKED BY THE VOLUNTEERS BEFORE THEY ARE ABOUT TO ENTER THE ROOM.",
      "MISBEHAVING WITH THE MANAGEMENT WILL LEAD TO DISQUALIFICATION.",
      "EVENT HEAD DECISION WILL BE FINAL, FOR UNDER ANY CIRCUMSTANCES RULES CAN BE ALTERED IF NEEDED BY THE ORGANIZING AUTHORITY.",
      "MANAGEMENT HAS THE RIGHT TO CHECK PLAYER DEVICES THROUGHOUT THE EVENT IN BETWEEN MATCHES AS WELL. IF WE FIND ANYTHING UNETHICAL YOU WILL BE DISQUALIFIED FROM THE EVENT",
    ],
    head: [
      {
        name: "Sahil Mallick",
        mobile: "+91 8697004118",
        email: "sahilmallick434@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Priyanshu Mandal",
        mobile: "+91 7980604507",
        email: "priyanshumondal927@gmail.com",
      },
    ],
    prizes: "",
  },

  // 11 — Carromact
  {
    id: 15,
    title: "Carromact",
    category: "Indoor Game",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "Game Room",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/KHfJ0AKzYt7EsLRP77KOBm",
    image:
      "https://images.unsplash.com/photo-1620741211956-32977c8973be?q=80&w=880&auto=format&fit=crop",
    desc: "Carrom is a game of elegance, control, and sharp judgment. At Tesseract Carromact 2K26, the board becomes the battlefield where strategy meets precision and patience turns into victory. What starts as a simple break will evolve into a gripping contest of calculated moves, defensive play, and decisive strikes. Players will face high-pressure situations that demand focus, accuracy, and discipline. With exciting matches, intense moments, and pure competitive energy, Carromact 2K26 invites you to showcase your skills and experience the thrill of professional-level carrom. Get ready to aim, strike, and conquer the board.",
    participationMode: "both",
    price: 80,
    teamPrice: 100,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 2,
    rules: [
      "\uD83D\uDD39 Qualifier Round",
      "Conducted offline on college premises.",
      "Participants must report to the assigned venue (to be announced).",
      "Matches played in short-format based on standard carrom rules.",
      "Time limits & scoring pattern explained before start.",
      "Top performers/teams qualify for the Final Round.",
      "\uD83D\uDD39 Final Round",
      "Conducted offline.",
      "Matches follow standard professional carrom rules.",
      "Detailed rules & format explained before matches begin.",
      "Participants must maintain discipline, fairness & sportsmanship.",
      "Winner and 1st Runner-up decided based on performance.",
      "\uD83D\uDD39 Other Important Details",
      "Judge/organizing committee decision will be final.",
      "Any form of misconduct or unfair play will lead to disqualification.",
      "Participants must report on time for their matches.",
      "The organizing committee expects complete integrity from all players.",
    ],
    head: [
      {
        name: "Somnath Bose",
        mobile: "+91 6290211630",
        email: "somnathbose0705@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Sayan Tagore",
        mobile: "+91 8420819573",
        email: "sayantagore85@gmail.com",
      },
    ],
    prizes: "",
  },

  // 12 — Tech Arena Chess
  {
    id: 14,
    title: "Tech Arena Chess",
    category: "Indoor Game",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "Game Room",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/GXvFCnGjO4l422BjTX8biQ?mode=gi_t",
    image:
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1258&auto=format&fit=crop",
    desc: "Think deep, play sharp, and outsmart every move.",
    participationMode: "solo",
    price: 50,
    minMembers: 1,
    maxMembers: 1,
    rules: [
      "Players must register before the deadline through the official page or registration desk.",
      "Players must report on time, late arrival may lead to disqualification.",
      "Players are not required to carry any chess equipment.",
      "Exciting prizes for winners and e-certificates for all participants.",
      "For any issue, players should contact the organizers.",
      "The organizer's decision will be final in case of any dispute during the event.",
      "Game Rules:",
      "The tournament will follow a knockout format conducted under standard FIDE chess rules.",
      "White moves first, and player colors will be decided by pairing.",
      "Time Control: Each game will be 10 minutes per player, and 15 minutes per player in the final round.",
      "If a player touches a piece, they must move it if the move is legal; otherwise, it is considered an illegal move.",
      "An illegal move counts only if the opponent claims it. After the claim, the position is restored, and after 3 illegal moves by a player, they will be disqualified.",
      "If 50 moves pass without a pawn move or capture, the game is drawn.",
      "In case of a draw, the winner will be decided by a 5-minute tiebreak game per player.",
      "If a player's time runs out, they lose the game unless the opponent does not have sufficient material to checkmate.",
      "All standard rules including en-passant, castling, threefold repetition and pawn promotion are allowed.",
      "Spectators must not interfere or give advice.",
      "Mobile phones and electronic devices must be silent during a game.",
      "Players may resign at any time, but draws cannot be offered.",
      "Any unfair practice or misconduct may lead to disqualification.",
    ],
    head: [
      {
        name: "Surajit Tunga",
        mobile: "+91 8972195682",
        email: "surajittunga2005@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Sayak Banerjee",
        mobile: "+91 94761 21116",
        email: "banerjeesayak377@gmail.com",
      },
    ],
    prizes: "",
  },

  // 13 — canva fusion
  {
    id: 17,
    title: "Canva Fusion",
    category: "Miscellaneous",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "XY Room",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/CV2TBtUrbsW1ikOaXXRKZA",
    image:
      "https://plus.unsplash.com/premium_photo-1698362818669-286ffb633a79?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "A platform where ideas transform into visual stories. Participants will showcase their ideas through a 3–5 minute poster presentation. Teams of 2–3 members can present one hand-drawn poster on chart paper based on a selected topic. participants are expected to follow the event guidelines.",
    participationMode: "team",
    price: 0,
    teamPrice: 150,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 3,
    rules: [
      "EACH TEAM IS ALLOTTED A PRESENTATION TIME OF 3–5 MINUTES.",
      "EACH TEAM CAN CONSIST OF A MINIMUM OF 2 AND A MAXIMUM OF 3 PARTICIPANTS.",
      "EVERY TEAM SHOULD MENTION THE SUBJECT OF THEIR POSTER.",
      "ONLY ONE POSTER CAN BE PRESENTED BY EACH TEAM.",
      "THE POSTERS MUST BE DESIGNED IN (4 FEET × 2.5 FEET) FULL-SIZED CHART PAPER.",
      "POSTERS MUST BE HAND-DRAWN.",
      "USING ANY KIND OF ELECTRONIC GADGETS AND MODELS IS STRICTLY PROHIBITED DURING THE POSTERPRESENTATION.",
      "SUBMIT THE TOPIC, TEAM DETAILS, MEMBERS' NAMES, AND POSTER SOFT COPY TO THE EVENT HEAD’S EMAIL BEFORE THE DEADLINE.",
      "THE EVENT HEAD’S DECISION WILL BE FINAL UNDER ALL CIRCUMSTANCES. RULES CAN BE ALTERED IF NEEDED BY THE ORGANIZING AUTHORITY.",

      "TOPICS –",
      "ARTIFICIAL INTELLIGENCE IN DAILY LIFE",
      "CYBER SECURITY AND DATA PRIVACY",
      "LITERATURE: A REFLECTION OF SOCIETY",
      "TECHNOLOGY AND MENTAL HEALTH",
      "THE IMPACT OF SOCIAL MEDIA ON SOCIETY",
      "THE EVOLUTION OF THE INTERNET",
    ],
    head: [
      {
        name: "Sholankee Saha",
        mobile: "+91 9475834338",
        email: "me.sholankee18@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Amanpreet Singh Gandhi",
        mobile: "+91 9674026452",
        email: "",
      },
    ],
    prizes: "",
  },

  // 14 — The Nexus Transmutation
  {
    id: 19,
    title: "The Nexus Transmutation",
    category: "Miscellaneous",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "GNIT",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/HzL2iRHW6USHXPUqkX2Yuw?mode=gi_t",
    image:
      "https://plus.unsplash.com/premium_photo-1661313651013-e1bee6b0e558?q=80&w=1170&auto=format&fit=crop",
    desc: "\u26A1The Nexus Transmutation, 25 minutes to shatter quantum ciphers, hijack AR geometry, and execute the perfect knowledge transfer.",
    participationMode: "team",
    price: 0,
    teamPrice: 200,
    isTeamPriceFixed: false,
    specialTeamPrice: {
      members: 5,
      price: 250,
    },
    minMembers: 2,
    maxMembers: 5,
    rules: [
      "\u23F3 Total time limit: 25 minutes (strictly enforced)",
      "\uD83D\uDC65 Maximum 4 participants per team",
      "\uD83D\uDEAB No personal devices allowed (phones, laptops, smartwatches, etc.)",
      "\uD83D\uDDA5\uFE0F Only the provided Nexus Console can be used",
      "\uD83C\uDF10 Challenges involve both digital and physical world elements",
      "\uD83D\uDD10 Participants must solve advanced encryption and cipher-based tasks",
      "\uD83E\uDDE9 Clues may be hidden in augmented reality (AR) geometry",
      "\u2696\uFE0F Final round includes a live, time-pressured academic search (Ethical Crucible)",
      "\uD83D\uDEA8 Extreme pressure environment \u2014 performance under stress matters",
      "\uD83C\uDFC6 Team completing all challenges successfully within time wins",
    ],
    head: [
      {
        name: "Mahabir Mahatha",
        mobile: "+91 9163934535",
        email: "mahabirmahatha2003@gmail.com",
      },
      {
        name: "Ananya Kar",
        mobile: "+91 8637886583",
        email: "ananyakar8900@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Soumyadeep Dubey",
        mobile: "+91 6291399659",
        email: "soumyadeepdubey2@gmail.com",
      },
      {
        name: "Swaraj Dhara",
        mobile: "+91 9477776150",
        email: "swarajdhara47@gmail.com",
      },
      {
        name: "Saheli Mandol",
        mobile: "+91 6290986815",
        email: "sahelimandal29@gmail.com",
      },
    ],
    prizes: "",
  },

  // 15 — Quizzaract
  {
    id: 20,
    title: "Quizzaract",
    category: "Miscellaneous",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "XY Room",
    isClosed: true,
    whatsappLink:
      "https://chat.whatsapp.com/B6tbdoUGaih8MCxNLjh6YB?mode=hqctsha",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1172&auto=format&fit=crop",
    desc: "In 1964, the first computer mouse wasn't plastic, wireless, or RGB it was a wooden block with wheels. At Tesseract Quizzaract 2K26, the only wooden thing will be the stage\u2026 but the ideas will shine with silicon grade sharpness. What will begin as a simple quiz will turn into a high voltage showdown of logic, code, and creativity where every cracked answer will feel like reinventing the mouse all over again.",
    participationMode: "both",
    price: 80,
    teamPrice: 100,
    isTeamPriceFixed: true,
    minMembers: 2,
    maxMembers: 3,
    rules: [
      "Qualifier round:",
      "Conducted through Google Forms in online mode.",
      "Participants must come to the college premises.",
      "Total 22 questions (20 MCQ mandatory + 2 optional SAQ).",
      "Total time: 15 minutes.",
      "Top teams qualify for the final round.",
      "Final round:",
      "Conducted offline.",
      "Participants will answer on paper.",
      "Further rules will be explained on the spot.",
      "Winner and 1st Runner-up will be decided based on performance.",
    ],
    head: [
      {
        name: "Nowrin Parveen",
        mobile: "+91 8373015328",
        email: "nowrinparveen365@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Badhan Majumder",
        mobile: "+91 6290677652",
        email: "badhanmozumder04@gmail.com",
      },
    ],
    prizes: "",
  },

  // 16 — Frame War
  {
    id: 16,
    title: "Frame War",
    category: "Miscellaneous",
    date: "Mar 28, 2026",
    time: "09:00 AM",
    venue: "XY Room",
    isClosed: true,
    whatsappLink: "https://chat.whatsapp.com/CaE3AYPzRKZBcyVSy3rQRz",
    image:
      "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=687&auto=format&fit=crop",
    desc: "Capture the moment, frame the story, and let your lens speak louder than words.",
    participationMode: "solo",
    price: 100,
    minMembers: 1,
    maxMembers: 1,
    rules: [
      "Only DSLR/Mirrorless/Phone cameras allowed.",
      "No AI-generated pictures allowed.",
      "Theme announced at venue.",
      "Basic editing allowed.",
      "Submission must include RAW files on request.",
    ],
    head: [
      {
        name: "Arnabi Ghosh",
        mobile: "+91 8240251631",
        email: "arnabighosh2305@gmail.com",
      },
    ],
    coHead: [
      {
        name: "Riya Singha Roy",
        mobile: "+91 9064632245",
        email: "riyasinharoy02@gmail.com",
      },
    ],
    prizes: "",
  },

  // 9 — free fire
];

// --- EVENT CATEGORIES---
export const EVENT_CATEGORIES = [
  "ALL",
  "COMBO",
  "HACKATHON",
  "CODING",
  "ROBOTICS",
  "GAMING",
  "INDOOR GAME",
  "MISCELLANEOUS",
];

// --- EVENT SLIDES ---
export const EVENT_SLIDES = [
  {
    id: 0,
    title: "GAMING",
    subtitle: "THE ARENA",
    category: "GAMING",
    desc: "Immerse yourself in 48 hours of non-stop competitive gaming. Prove your dominance.",
    color: "from-red-900 to-orange-900", // Warm tones
    accent: "text-red-400",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070",
    // icon: Gamepad2,
  },
  {
    id: 1,
    title: "ROBOTICS",
    subtitle: "STEEL CLASH",
    category: "ROBOTICS",
    desc: "Witness the sparks fly as 8kg bots battle for supremacy in our state-of-the-art combat arena.",
    color: "from-orange-900 to-amber-900",
    accent: "text-orange-400",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070",
    // icon: Bot,
  },
  {
    id: 2,
    title: "CODING",
    subtitle: "LOGIC LAB",
    category: "CODING",
    desc: "Think fast, code faster — only the sharpest minds survive the challenge.",
    color: "from-red-900 to-rose-900",
    accent: "text-rose-400",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
    // icon: Terminal,
  },
  {
    id: 3,
    title: "INDOOR GAME",
    subtitle: "THE PLAYHOUSE",
    category: "INDOOR GAME",
    desc: "Classic games, sharp minds, and pure competition — from chess strategies to carrom precision, step in and outplay everyone.",
    color: "from-slate-900 to-gray-800",
    accent: "text-sky-400",
    image:
      "https://plus.unsplash.com/premium_photo-1723478555114-2bebac948a50?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // icon: Trophy,
  },
  {
    id: 4,
    title: "MISC",
    subtitle: "FUSION HUB",
    title: "MISCELLANEOUS",
    desc: "A creative fusion of skill and fun — photography, graffiti, quizzes, treasure hunts, paintball and more, all under one vibrant zone.",
    color: "from-gray-900 to-slate-900",
    accent: "text-violet-400",
    image:
      "https://images.unsplash.com/photo-1557933488-c8daa2a5772c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // icon: Sparkles,
  },
];

// --- TEAM DATA ---
export const TEAM_DATA = [
  {
    id: 1,
    name: "Arna Saha",
    dept: "Convenor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1773596201/arna_cxed0e.jpg",
    level: "L4",
    bio: "Strategic leader driving vision, coordination, and execution across all teams.",
    email: "arnasaha098@gmail.com",
    github: "",
    linkedin: "http://www.linkedin.com/in/arna-saha-838330286",
    instagram: "https://www.instagram.com/vntnsh?igsh=MWZ3Z2lpNTFjcTk0aA==",
  },

  {
    id: 2,
    name: "Ramesh Biswas",
    dept: "Convenor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710663/tesseract/core_team/ramesh_biswas.jpg",
    level: "L3",
    bio: "Ensures seamless collaboration and leads the organization toward impactful outcomes.",
    email: "rameshbiswas855277@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/ramesh-biswas-4710652aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/rudra_26082?igsh=N3Z4dTJwNTdmYXFk&utm_source=qr",
  },

  {
    id: 3,
    name: "Debtanu Roy",
    dept: "Co-convenor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1773596189/debtanu_awpz04.jpg",
    level: "L3",
    bio: "Supports core leadership and streamlines operations for smooth event execution.",
    email: "debtanuroy82@gmail.com",
    github: "",
    linkedin: "https://www.linkedin.com/in/debtanu-roy-0a15792a9",
    instagram: "https://www.instagram.com/dr_roy.jpg",
  },

  {
    id: 4,
    name: "Rudrojyoti Manna",
    dept: "Co-convenor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710665/tesseract/core_team/rudrojyoti_manna.jpg",
    level: "L4",
    bio: "Bridges strategy and implementation while managing team coordination.",
    email: "mannarudro05@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/rudrojyotimanna?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram:
      "https://www.instagram.com/literally_insane_05?igsh=bmlweXY0cDlpYWth",
  },

  {
    id: 5,
    name: "Swarnabindu Sen",
    dept: "SPOC",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1772710446/IMG-20260305-WA0018_-_Swarnabindu_Sen_vurovn.jpg",
    level: "L3",
    bio: "Primary point of contact ensuring clear communication and efficient coordination.",
    email: "senswarnabindu@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/swarnabindu-sen-aaa2a2265?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/eckaydenteezhist_i?igsh=MTdhYnR5anhqdHJjMg==",
  },

  {
    id: 6,
    name: "Dewan Habib",
    dept: "Finance",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710662/tesseract/core_team/dewan_habib.jpg",
    level: "L2",
    bio: "Manages budgets and financial planning to ensure sustainable growth.",
    email: "dewanhabib2004@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/dewan-habib-701a5b320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/the1_habib?igsh=MTgydTdpczJvaTZ3bA==",
  },

  {
    id: 7,
    name: "Akash Dey",
    dept: "Finance",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710684/tesseract/core_team/akash_dey.jpg",
    level: "L5",
    bio: "Oversees fund allocation and maintains transparent financial operations.",
    email: "deyakash2525@gmail.com",
    github: "",
    linkedin: "https://www.linkedin.com/in/akash-dey-a5291930b/",
    instagram: "https://www.instagram.com/akash.dey__18?igsh=YTEwa254NHVld21w",
  },

  {
    id: 8,
    name: "Satyam Kundu",
    dept: "Media Head",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710679/tesseract/core_team/satyam_kundu.jpg",
    level: "L4",
    bio: "Leads creative storytelling and digital presence through impactful media strategies.",
    email: "satyamkundu77@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/satyam-kundu-238b19289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/_s_a_t.y_a_m_?igsh=MXVxZWVuMzg2OWVzeQ==",
  },

  {
    id: 9,
    name: "Sneha Sen",
    dept: "Marketing Head",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1773596198/sreeya_h2oefa.jpg",
    level: "L4",
    bio: "Drives branding, outreach, and engagement to maximize visibility and impact.",
    email: "snehasen.official@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/sneha-sen-3a66bb29a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/kaler_mandira?igsh=MW11OTJ6Z2hsdzVvNg==",
  },

  {
    id: 10,
    name: "Surajit Paul",
    dept: "Robotics Coordinator",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1772710898/WhatsApp_Image_2026-03-05_at_3.44.44_PM_-_Surajit_Paul_gycxlx.jpg",
    level: "L3",
    bio: "Guides robotics initiatives and fosters innovation in automation and hardware.",
    email: "surajitpaul1304@gmail.com",
    github: "",
    linkedin: "https://www.linkedin.com/in/psurajit/",
    instagram: "https://www.instagram.com/__mr.paul_/",
  },

  {
    id: 11,
    name: "Saksham Singh",
    dept: "Management Coordinator",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1772710829/IMG_20251207_233825_377_-_Saksham_Singh_tjqyfp.webp",
    level: "L3",
    bio: "Organizes operations and ensures smooth execution of planning and logistics.",
    email: "sakshamsingh899@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/saksham-singh-a68b512b1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/babu.saheb_?igsh=OHh0eHdhM21hcjF0",
  },

  {
    id: 12,
    name: "Niladri Sarkar",
    dept: "Tech Team",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1772711659/_MG_3740.JPG_g4gbe0.jpg",
    level: "L3",
    bio: "Builds scalable technical solutions and powers digital innovation.",
    email: "niladrisarkar422@gmail.com",
    github: "https://github.com/NiladriSarkar01",
    linkedin: "https://www.linkedin.com/in/niladri-sarkar-b96a40274/",
    instagram: "https://www.instagram.com/_nil_d_sarkar_/",
  },
  {
    id: 13,
    name: "Arghya Chakraborty",
    dept: "Tech Team",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710666/tesseract/core_team/arghya_chakraborty.jpg",
    level: "L3",
    bio: "Develops intelligent systems and contributes to cutting-edge technical projects.",
    email: "chakrabortyarghya11@gmail.com",
    github: "https://github.com/arghya45-dev",
    linkedin:
      "https://www.linkedin.com/in/arghya-chakraborty-61b151276?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram:
      "https://www.instagram.com/arghya_143_?igsh=MTd4aXhtczA5bThkag==",
  },
  {
    id: 14,
    name: "Aikik Patra",
    dept: "Tech Team",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1772714290/WhatsApp_Image_2026-03-05_at_17.16.27_f30b4a.jpg",
    level: "L3",
    bio: "Collaborates on development tasks and enhances system performance.",
    email: "",
    github: "",
    linkedin: "",
    instagram: "",
  },
  {
    id: 15,
    name: "Aritra Chattopadhyay",
    dept: "Tech Team",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710652/tesseract/core_team/aritra_chattopadhyay.jpg",
    level: "L2",
    bio: "Transforms ideas into functional, user-friendly digital solutions.",
    email: "aritrachattopadhyay900@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/aritra-chattopadhyay-5198492a4?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram:
      "https://www.instagram.com/its_da_hooman?igsh=MWxpczc1dGN2c29oNQ==",
  },

  {
    id: 16,
    name: "Anwesa Ghosh",
    dept: "Decoration Head",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710666/tesseract/core_team/anwesa_ghosh.jpg",
    level: "L2",
    bio: "Designs immersive environments that elevate event aesthetics and experience.",
    email: "anwesa310@gmail.com",
    github: "",
    linkedin: "https://www.linkedin.com/in/anwesa-ghosh-472b29319/",
    instagram:
      "https://www.instagram.com/itz.annie7_?igsh=MTA4eGszd2lheGp0NQ==",
  },

  {
    id: 17,
    name: "Aritra Chowdhury",
    dept: "Advisor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710652/tesseract/core_team/aritra_chowdhury.jpg",
    level: "L5",
    bio: "Provides strategic guidance and mentorship to strengthen team direction.",
    email: "chowdhuryaritra215@gmail.com",
    github: "",
    linkedin: "http://www.linkedin.com/in/aritra-chowdhury-415055327",
    instagram: "https://www.instagram.com/aritra1452?igsh=MTVsZWptcG1jYm42OA==",
  },

  {
    id: 18,
    name: "Zishan Khan Chowdhury",
    dept: "Advisor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710696/tesseract/core_team/zishan_khan.jpg",
    level: "L4",
    bio: "Offers experienced insights to support decision-making and growth.",
    email: "zishankhan360@gmail.com",
    github: "",
    linkedin: "http://linkedin.com/in/zishan-khan-chowdhury-115607245",
  },

  {
    id: 19,
    name: "Smarta Das",
    dept: "Advisor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710680/tesseract/core_team/smarta_das.jpg",
    level: "L4",
    bio: "Guides long-term planning and ensures alignment with organizational goals.",
    email: "smartadas211@gmail.com",
    github: "",
    linkedin: "https://www.linkedin.com/in/smarta-das-63ab8b253",
    instagram: "https://www.instagram.com/smarta_2113?igsh=Z2Z6amRvMnJwbmdv",
  },

  {
    id: 20,
    name: "Champak Kundu",
    dept: "Advisor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1772710999/IMG-20250514-WA0086_-_CHAMPAK_KUNDU_sy9k5b.jpg",
    level: "L3",
    bio: "upports leadership with valuable advice and operational perspective.",
    email: "champakkundu2004@gmail.com",
    github: "",
    linkedin:
      "https://www.linkedin.com/in/champak-kundu-ab1652253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/itz_champak_?utm_source=qr&igsh=MWN6cHRlbmw1aG83dw==",
  },

  {
    id: 21,
    name: "Nanda Lal Das",
    dept: "Advisor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710665/tesseract/core_team/nanda.jpg",
    level: "L3",
    bio: "Mentors teams and contributes strategic oversight for sustainable progress.",
    email: "tikludas01@gmail.com",
    github: "",
    linkedin: "https://www.linkedin.com/in/nanda-das-7b2242243/",
    instagram: "https://www.instagram.com/heavenly_demon_dx/",
  },

  {
    id: 22,
    name: "Anurag Bhattacharjee",
    dept: "Advisor",
    img: "https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710649/tesseract/core_team/anurag_bhattacharjee.jpg",
    level: "L3",
    bio: "Provides expert recommendations to enhance performance and innovation.",
    email: "",
    github: "",
    linkedin: "",
    instagram: "",
  },
];

export const SOCIALS = {
  email: "tesseract.2k26@gmail.com",
  linkedin: "",
  instagram:
    "https://www.instagram.com/tesseract_gnit?igsh=MWt0dDAzM243YTU5dQ==",
  facebook: "https://www.facebook.com/share/1CgBLmjYEG/",
};

//removed events
//1 - FIGMA
// {
//     id: 11,
//     title: "Figma",
//     category: "Coding",
//     date: "Feb 26, 2026",
//     time: "09:00 AM",
//     venue: "CSE Lab",
//     image:
//       "https://images.unsplash.com/photo-1606161290889-77950cfb67d3?q=80&w=1170&auto=format&fit=crop",
//     desc: "Design bold, think creative, and let your Figma skills steal the spotlight.",
//     price: 100,
//     participationMode: "solo",
//     minMembers: 1,
//     maxMembers: 1,
//     rules: [
//       "Participants must bring their own laptops with Figma installed.",
//       "Theme will be provided on the spot.",
//       "Use of pre-made templates is not allowed.",
//       "Submission must include the prototype link.",
//       "Late submissions will not be accepted.",
//     ],
//     head: {
//       name: "Ayesha Rahman",
//       mobile: "+91 98740 12345",
//       email: "ayesha.design@events.com",
//     },
//     coHead: {
//       name: "Rohan Verma",
//       mobile: "+91 98312 98765",
//       email: "rohan.v@events.com",
//     },
//     prizes: "Top 3 designers receive certificates + premium UI kits.",
//   },

// 7 — Paintball
// {
//   id: 21,
//   title: "Paintball",
//   category: "Miscellaneous",
//   date: "Feb 26, 2026",
//   time: "09:00 AM",
//   venue: "Outdoor Arena",
//   image:
//     "https://images.unsplash.com/photo-1614602355999-bc295cba75b5?q=80&w=764&auto=format&fit=crop",
//   desc: "Run, dodge, fire — dominate the arena with every splatter shot.",
//   participationMode: "team",
//   price: 0,
//   teamPrice: 100,
//   isTeamPriceFixed: false,
//   minMembers: 4,
//   maxMembers: 5,
//   rules: [
//     "No removing safety gear.",
//     "Hits anywhere on body count.",
//     "Referee decisions are final.",
//     "Physical contact is prohibited.",
//     "Ammo limits must be respected.",
//   ],
//   head: {
//     name: "Vikrant Singh",
//     mobile: "+91 99880 11234",
//     email: "vikrant.p@events.com",
//   },
//   coHead: {
//     name: "Anushka Mehta",
//     mobile: "+91 77660 22123",
//     email: "anushka.m@events.com",
//   },
//   prizes: "Winning team receives medals + goodies.",
// },

// // 8 — Lap Race
// {
//   id: 6,
//   title: "Lap Race",
//   category: "Robotics",
//   date: "Feb 26, 2026",
//   time: "11:00 AM Onwards",
//   venue: "Gaming Lab 1",
//   image:
//     "https://plus.unsplash.com/premium_photo-1682124389443-faa964f770c9?q=80&w=1170&auto=format&fit=crop",
//   desc: "Speed, control, precision — let your bot conquer the track.",
//   participationMode: "team",
//   price: 0,
//   teamPrice: 150,
//   isTeamPriceFixed: true,
//   minMembers: 2,
//   maxMembers: 4,
//   rules: [
//     "Bot must complete laps without assistance.",
//     "Track damage or tampering leads to disqualification.",
//     "One repair timeout allowed.",
//     "Fastest lap time wins.",
//     "Bot inspection is mandatory.",
//   ],
//   head: {
//     name: "Ritwik Sharma",
//     mobile: "+91 88220 33411",
//     email: "ritwik.race@events.com",
//   },
//   coHead: {
//     name: "Sneha Ghosh",
//     mobile: "+91 91110 22345",
//     email: "sneha.g@events.com",
//   },
//   prizes: "Robotics kit + certificate.",
// },

// 12 — Navin Vidyarthi
// {
//   id: 1,
//   title: "Navin Vidyarthi",
//   category: "Miscellaneous",
//   date: "Feb 26, 2025",
//   time: "10:00 AM",
//   venue: "Main Auditorium",
//   image: "",
//   desc: "A warm, energetic welcome event for freshers.",
//   price: 0,
//   participationMode: "solo",
//   minMembers: 1,
//   maxMembers: 1,
//   rules: [
//     "Only registered students allowed.",
//     "Maintain decorum inside the auditorium.",
//     "Photography allowed only in designated time.",
//     "Entry closes 15 minutes after start.",
//     "Follow organizers' instructions.",
//   ],
//   head: {
//     name: "Sanjana Ghosh",
//     mobile: "+91 88022 11991",
//     email: "sanjana.nv@events.com",
//   },
//   coHead: {
//     name: "Ayush Mondal",
//     mobile: "+91 70122 55340",
//     email: "ayush.m@events.com",
//   },
//   prizes: "No prizes — this is an inauguration ceremony.",
// },

// 19 — Graffiti
// {
//   id: 18,
//   title: "Graffiti",
//   category: "Miscellaneous",
//   date: "Feb 26, 2026",
//   time: "09:00 AM",
//   venue: "XY Room",
//   image:
//     "https://images.unsplash.com/photo-1487452066049-a710f7296400?q=80&w=1171&auto=format&fit=crop",
//   desc: "Splash your style, own the wall, and let your art speak in bold colors.",
//   participationMode: "team",
//   price: 0,
//   teamPrice: 300,
//   isTeamPriceFixed: true,
//   minMembers: 2,
//   maxMembers: 3,
//   rules: [
//     "Only eco-friendly colors allowed.",
//     "No offensive / political art.",
//     "Time limit: 90 minutes.",
//     "Bring your own supplies.",
//     "Judgment based on creativity + theme.",
//   ],
//   head: {
//     name: "Tanmay Paul",
//     mobile: "+91 98755 11240",
//     email: "tanmay.g@events.com",
//   },
//   coHead: {
//     name: "Mina Sarkar",
//     mobile: "+91 99331 77420",
//     email: "mina.s@events.com",
//   },
//   prizes: "Winning graffiti will be displayed on campus wall.",
// },

// // 20 — Drone
// {
//   id: 8,
//   title: "Drone",
//   category: "Robotics",
//   date: "Feb 26, 2026",
//   time: "11:00 AM Onwards",
//   venue: "Gaming Lab 1",
//   image:
//     "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1074&auto=format&fit=crop",
//   desc: "Take flight and let your drone rule the skies.",
//   participationMode: "team",
//   price: 0,
//   teamPrice: 150,
//   isTeamPriceFixed: true,
//   minMembers: 2,
//   maxMembers: 4,
//   rules: [
//     "Drone must pass safety check.",
//     "Flying outside track results in penalty.",
//     "Crashes = elimination.",
//     "FPV allowed but bring your own gear.",
//     "Battery change only during pit-stop.",
//   ],
//   head: {
//     name: "Aryan Jha",
//     mobile: "+91 78000 22178",
//     email: "aryan.drone@events.com",
//   },
//   coHead: {
//     name: "Noor Alam",
//     mobile: "+91 88290 43012",
//     email: "noor.a@events.com",
//   },
//   prizes: "Drone accessories + certificate.",
// },
