export interface Movie {
  id: string;
  title: string;
  year: string;
  lang: string;
  format: string;
  genre: string;
  rating: number;
  runtime: string;
  releaseDate: string;
  director: string;
  writer: string;
  storyline: string;
  cast: { name: string; character: string; img: string }[];
  poster: string;
  bg: string;
  trailerId: string;
  color: string;
  isComingSoon?: boolean;
  reviewsData?: {
    user: string;
    avatar?: string;
    rating: number;
    date: string;
    comment: string;
    isVerified: boolean;
  }[];
}

export const MOVIES: Movie[] = [
  {
    id: "avengers-doomsday",
    title: "Avengers: Doomsday",
    year: "2026",
    lang: "EN",
    format: "IMAX",
    genre: "Action/Sci-Fi",
    rating: 4.9,
    runtime: "2h 45m",
    releaseDate: "May 1, 2026",
    director: "Anthony & Joe Russo",
    writer: "Stephen McFeely",
    storyline: "The Avengers face their greatest threat yet as Victor von Doom emerges from the multiverse to reshape reality in his own image. A cosmic battle that spans dimensions and tests the limits of every hero.",
    cast: [
      { name: "Robert Downey Jr.", character: "Victor von Doom", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&fit=crop" },
      { name: "Pedro Pascal", character: "Reed Richards", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop" },
      { name: "Vanessa Kirby", character: "Sue Storm", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&fit=crop" },
      { name: "Joseph Quinn", character: "Johnny Storm", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&fit=crop" }
    ],
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&fit=crop",
    bg: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200&fit=crop",
    trailerId: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#00D4FF",
    reviewsData: [
      { user: "Kasun Perera", rating: 5, date: "2 days ago", comment: "Absolutely mind-blowing! RDJ as Doom is the best casting decision ever. The IMAX experience was out of this world.", isVerified: true },
      { user: "Sarah J.", rating: 4, date: "1 week ago", comment: "Great movie, but a bit long. The visual effects are definitely the highlight of 2026.", isVerified: true },
      { user: "Nuwan Silva", rating: 5, date: "3 days ago", comment: "Best Avengers movie since Endgame. Period.", isVerified: true }
    ]
  },
  {
    id: "the-batman-2",
    title: "The Batman Part II",
    year: "2026",
    lang: "EN",
    format: "Dolby",
    genre: "Action/Crime",
    rating: 4.8,
    runtime: "2h 55m",
    releaseDate: "October 2, 2026",
    director: "Matt Reeves",
    writer: "Matt Reeves & Peter Craig",
    storyline: "Bruce Wayne continues to delve into the dark heart of Gotham City, facing new adversaries that challenge his sanity and his resolve as the World's Greatest Detective.",
    cast: [
      { name: "Robert Pattinson", character: "Bruce Wayne", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&fit=crop" },
      { name: "Zoë Kravitz", character: "Selina Kyle", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&fit=crop" },
      { name: "Colin Farrell", character: "Oz Cobblepot", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150&fit=crop" },
      { name: "Andy Serkis", character: "Alfred Pennyworth", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop" }
    ],
    poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&fit=crop",
    bg: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&fit=crop",
    trailerId: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#FF3B3B",
    reviewsData: [
      { user: "Dimuthu", rating: 5, date: "Just now", comment: "Dark, gritty, and perfect. Pattinson IS Batman. The cinematography is award-worthy.", isVerified: true }
    ]
  },
  {
    id: "avatar-fire-ash",
    title: "Avatar: Fire and Ash",
    year: "2025",
    lang: "EN",
    format: "IMAX 3D",
    genre: "Sci-Fi/Adventure",
    rating: 4.7,
    runtime: "3h 12m",
    releaseDate: "December 19, 2025",
    director: "James Cameron",
    writer: "James Cameron",
    storyline: "Jake Sully and Ney'tiri lead their tribe against a new threat: the 'Ash People', a clan of Na'vi who have embraced fire and aggression in the wake of the RDA's return.",
    cast: [
      { name: "Sam Worthington", character: "Jake Sully", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop" },
      { name: "Zoe Saldaña", character: "Ney'tiri", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&fit=crop" },
      { name: "Sigourney Weaver", character: "Kiri", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&fit=crop" },
      { name: "Oona Chaplin", character: "Varang", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop" }
    ],
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&fit=crop",
    bg: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&fit=crop",
    trailerId: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#00E676"
  },
  {
    id: "superman-2025",
    title: "Superman",
    year: "2025",
    lang: "EN",
    format: "IMAX",
    genre: "Action/Adventure",
    rating: 4.5,
    runtime: "2h 35m",
    releaseDate: "July 11, 2025",
    director: "James Gunn",
    writer: "James Gunn",
    storyline: "Superman's journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent of Smallville, Kansas.",
    cast: [
      { name: "David Corenswet", character: "Clark Kent / Superman", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&fit=crop" },
      { name: "Rachel Brosnahan", character: "Lois Lane", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&fit=crop" },
      { name: "Nicholas Hoult", character: "Lex Luthor", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150&fit=crop" },
      { name: "Isabela Merced", character: "Hawkgirl", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop" }
    ],
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&fit=crop",
    bg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&fit=crop",
    trailerId: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#00D4FF",
    isComingSoon: true
  },
  {
    id: "spiderman-beyond",
    title: "Spider-Man: Beyond the Spider-Verse",
    year: "2026",
    lang: "EN",
    format: "IMAX",
    genre: "Animation/Action",
    rating: 4.9,
    runtime: "2h 20m",
    releaseDate: "March 27, 2026",
    director: "Joaquim Dos Santos",
    writer: "Phil Lord & Christopher Miller",
    storyline: "Miles Morales embark on a final, multiverse-spanning adventure to save every universe from the threat of the Spot and find his way home.",
    cast: [
      { name: "Shameik Moore", character: "Miles Morales", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&fit=crop" },
      { name: "Hailee Steinfeld", character: "Gwen Stacy", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&fit=crop" },
      { name: "Oscar Isaac", character: "Miguel O'Hara", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&fit=crop" },
      { name: "Jason Schwartzman", character: "The Spot", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop" }
    ],
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&fit=crop",
    bg: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1200&fit=crop",
    trailerId: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#FFD700"
  }
];

export const COMING_SOON = MOVIES.filter(m => m.isComingSoon);
export const NOW_PLAYING = MOVIES.filter(m => !m.isComingSoon);
