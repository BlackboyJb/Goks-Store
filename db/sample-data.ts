import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "Goke",
      email: "admin@example.com",
      password: hashSync("123456", 10),
      role: "admin",
    },
    {
      name: "Kunle",
      email: "kunle@example.com",
      password: hashSync("123456", 10),
      role: "user",
    },
  ],
  products: [
    {
      name: "PS5 SLIM CONSOLE",
      slug: "ps5-slim-console",
      category: "Console",
      description:
        "Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
      images: [
        "/images/sample-products/ps5 console.jpg",
        "/images/sample-products/ps5-2.jpg",
      ],
      price: 800000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },
    {
      name: "EA SPORTS FC 25 (PS5)",
      slug: "fc-25-Ps5",
      category: "Football",
      description:
        "Get your team playing like the world’s best with FC IQ. An overhaul of tactical foundations across the game delivers greater strategic control and more realistic collective movement at the team level, while a new AI model, powered by real-world data, influences player tactics through all-new Player Roles..",
      images: [
        "/images/sample-products/fc25.jpg",
        "/images/sample-products/fc25-2.jpg",
      ],
      price: 90000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },
    {
      name: "Call of Duty: Black Ops 6 (PS5)",
      slug: "cod-blackops6-ps5",
      category: "Millitary Game",
      description:
        "Developed by Treyarch and Raven, Black Ops 6 is a spy action thriller set in the early 90s, a period of transition and upheaval in global politics, characterized by the end of the Cold War and the rise of the United States as a single superpower. With a mind-bending narrative, and unbound by the rules of engagement, this is signature Black Ops across a cinematic single-player Campaign, a best-in-class Multiplayer experience, and with the epic return of Round-Based Zombies.",
      images: [
        "/images/sample-products/cod5.jpg",
        "/images/sample-products/cod-2.jpg",
      ],
      price: 90000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },
    {
      name: "Mortal Kombat 1 (PS5)",
      slug: "mk1-ps5",
      category: "Arcade",
      description:
        "Following the thrilling climax of Mortal Kombat 11, the all-powerful Fire God Liu Kang has created a New Era in the hope of bringing peace to Earthrealm and beyond. Through the series’ most cinematic story mode yet, you’ll be reintroduced to a cast of legendary warriors as you’ve never seen them before. Expect twists on classic friendships and rivalries, as well as new backstories that will change everything you think you know about your favorite Kombatants.",
      images: [
        "/images/sample-products/mk1.jpg",
        "/images/sample-products/mk-2.jpg",
      ],
      price: 70000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },
    {
      name: "Black Myth: Wukong (Ps5)",
      slug: "black-myth-wukong-ps5",
      category: "Adventure",
      description:
        "Black Myth: Wukong is an action RPG rooted in Chinese mythology and based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.",
      images: [
        "/images/sample-products/bm.jpg",
        "/images/sample-products/wukong-2.jpg",
      ],
      price: 90000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },
    {
      name: "God of War Ragnarök (Ps5)",
      slug: "god-of-war-ragnarok-ps5",
      category: "Adventure",
      description:
        "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.",
      images: [
        "/images/sample-products/gow5.jpg",
        "/images/sample-products/gow2.jpg",
      ],
      price: 59000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },

    {
      name: "Spider-Man 2 (Ps5)",
      slug: "spider-man2-ps5",
      category: "Adventure",
      description:
        "Spider-Men, Peter Parker and Miles Morales, return for an exciting new adventure in the critically acclaimed Marvel’s Spider-Man franchise for PS5.",
      images: [
        "/images/sample-products/sp2.jpg",
        "/images/sample-products/sp-2.jpg",
      ],
      price: 69000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },

    {
      name: "Assasin Creed:Mirage (Ps5)",
      slug: "assasin-creed:mirage-ps5",
      category: "Adventure",
      description:
        "Discover a narrative-driven action-adventure experience that follows the transformation of a defiant young man into a refined Master Assassin with a conflicted destiny. Meet an inspiring cast of characters who will shape Basim’s destiny and may be more than what they seem…",
      images: [
        "/images/sample-products/asac5.jpg",
        "/images/sample-products/asc-2.jpg",
      ],
      price: 49000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },
    {
      name: "Battlefield 2042 (Ps5)",
      slug: "battlefield-2042-ps5",
      category: "Millitary Game",
      description:
        "Unleash your combat creativity through a full roster of cutting-edge weapons, vehicles, jets, helis, and all-new equipment inspired by the near-future of 2042.",
      images: [
        "/images/sample-products/bf5.jpg",
        "/images/sample-products/bf25-2.jpg",
      ],
      price: 69000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      console_type: "Ps5",
    },

    {
      name: "Assasin Creed:Mirage (Ps4)",
      slug: "assasin-creed-mirage-ps4",
      category: "Adventure",
      description:
        "Discover a narrative-driven action-adventure experience that follows the transformation of a defiant young man into a refined Master Assassin with a conflicted destiny. Meet an inspiring cast of characters who will shape Basim’s destiny and may be more than what they seem…",
      images: [
        "/images/sample-products/asac4.jpg",
        "/images/sample-products/asc-2.jpg",
      ],
      price: 39000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: false,
      banner: "banner-1.jpg",
      console_type: "Ps4",
    },

    {
      name: "Battlefield 2042 (Ps4)",
      slug: "battlefield-2042-ps4",
      category: "Millitary Game",
      description:
        "Unleash your combat creativity through a full roster of cutting-edge weapons, vehicles, jets, helis, and all-new equipment inspired by the near-future of 2042.",
      images: [
        "/images/sample-products/bf4.jpg",
        "/images/sample-products/bf25-2.jpg",
      ],
      price: 59000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: false,
      banner: "banner-2.jpg",
      console_type: "Ps4",
    },

    {
      name: "Call of Duty: Black Ops 6 (Ps4)",
      slug: "call-of-duty-black-ops-6-ps4",
      category: "Millitary Game",
      description:
        "Developed by Treyarch and Raven, Black Ops 6 is a spy action thriller set in the early 90s, a period of transition and upheaval in global politics, characterized by the end of the Cold War and the rise of the United States as a single superpower. With a mind-bending narrative, and unbound by the rules of engagement, this is signature Black Ops across a cinematic single-player Campaign, a best-in-class Multiplayer experience, and with the epic return of Round-Based Zombies.",
      images: [
        "/images/sample-products/cod.jpg",
        "/images/sample-products/cod-2.jpg",
      ],
      price: 79000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-2.jpg",
      console_type: "Ps4",
    },

    {
      name: "EA SPORTS FC 25 (Ps4)",
      slug: "ea-sports-fc-25-ps4",
      category: "Football",
      description:
        "Get your team playing like the world’s best with FC IQ. An overhaul of tactical foundations across the game delivers greater strategic control and more realistic collective movement at the team level, while a new AI model, powered by real-world data, influences player tactics through all-new Player Roles..",
      images: [
        "/images/sample-products/fc254.jpg",
        "/images/sample-products/fc25-2.jpg",
      ],
      price: 79000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: false,
      banner: "banner-2.jpg",
      console_type: "Ps4",
    },
    {
      name: "God of War Ragnarök (Ps4)",
      slug: "god-of-war-ragnarok-ps4",
      category: "Adventure",
      description:
        "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.",
      images: [
        "/images/sample-products/gow4.jpg",
        "/images/sample-products/gow2.jpg",
      ],
      price: 49000.0,
      brand: "Playstation",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: false,
      banner: "banner-2.jpg",
      console_type: "Ps4",
    },
  ],
};

export default sampleData;
