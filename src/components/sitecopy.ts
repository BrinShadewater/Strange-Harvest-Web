export type SiteLanguage = "en" | "es";

function detectSiteLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "en";
  // Detect from pathname for /es/ route (Next.js)
  const pathname = window.location.pathname;
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  return "en";
}

export const siteLanguage = detectSiteLanguage();

const sitecopyEn = {
  cookieConsent: {
    title: "Cookie Notice",
    message:
      "This website uses cookies to improve your browsing experience and analyze site traffic. You can choose which cookies to accept.",
    acceptAllButton: "Accept All",
    essentialOnlyButton: "Only Essential Cookies",
    manageButton: "Manage Preferences",
    saveButton: "Save Preferences",
    privacyLink: {
      label: "Privacy Policy",
      href: "/privacy.html",
    },
    preferences: {
      title: "Cookie Preferences",
      description: "Choose which types of cookies you want to allow. Essential cookies cannot be disabled as they are necessary for the site to function.",
      categories: {
        essential: {
          label: "Essential Cookies",
          description: "Required for basic site functionality. These cannot be disabled.",
          required: true,
        },
        analytics: {
          label: "Analytics Cookies",
          description: "Help us understand how visitors interact with our website.",
          required: false,
        },
        marketing: {
          label: "Marketing Cookies",
          description: "Used to track visitors across websites for advertising purposes.",
          required: false,
        },
        preferences: {
          label: "Preference Cookies",
          description: "Remember your settings and preferences for future visits.",
          required: false,
        },
      },
    },
  },

  header: {
    skipToContent: "Skip to main content",
    nav: {
      home: "Home",
      about: "About",
      watch: "Watch",
      press: "Press",
      bts: "BTS",
      merch: "Merch",
    },
    aria: {
      home: "Strange Harvest home",
      cart: "Open shopping cart",
      language: "Language selector",
    },
    languageToggle: {
      en: "EN",
      es: "ES",
    },
  },

  hero: {
    title: "STRANGE HARVEST",
    tagline: "TRUE-CRIME FOUND FOOTAGE HORROR MOCKUMENTARY",
    subtitle: "OFFICIAL WEBSITE",
    blurb:
      "A routine welfare check leads to a gruesome discovery — and the return of a killer thought gone forever.",
    posterToggle: {
      official: "Official Poster",
      festival: "Festival Poster",
    },
    ctas: {
      primary: { label: "Trailer", href: "#trailer" },
      secondary: { label: "Watch", href: "#watch" },
      tertiary: { label: "Merch", href: "#shop" },
    },
  },


  synopsis: {
    title: "About",
    body: [
      `A routine welfare check in the San Bernardino suburbs leads to a gruesome discovery — a family of three has been bound, bled and posed below a strange symbol written in blood on the ceiling. Detective Joe Kirby and Lexi Taylor recognize the symbol as the calling card of a killer from 15 years earlier who has seemingly returned to continue his murder spree.`,
      `It's not long before "Mr. Shiny" begins leaving horrifying new crime scenes in his wake; one victim is trapped in a swimming pool with live leeches while another is ritualistically flayed and displayed in a public park.`,
      `It soon becomes evident the case is anything but routine and that the murders, and their perpetrator, may be part of some sinister, otherworldly agenda involving cosmic phenomena and evil forces from beyond.`,
    ],
    quote: {
      text: "Some mysteries don't get solved. They just get stranger the longer you look at them.",
      attribution: "Detective Joe Kirby",
    },
    images: [
      {
        src: "/images/strange-harvest-crime-scene-pool-investigation.webp",
        alt: "Forensic investigators examining a drained swimming pool crime scene in the horror mockumentary Strange Harvest",
      },
      {
        src: "/images/strange-harvest-crime-scene-kitchen-evidence.webp",
        alt: "Occult symbol painted in blood on a kitchen wall at a crime scene in the horror mockumentary Strange Harvest",
      },
      {
        src: "/images/strange-harvest-forensic-evidence-weapon-knife.webp",
        alt: "Blood stained knife labeled as forensic evidence during a murder investigation in Strange Harvest",
      },
      {
        src: "/images/strange-harvest-forensic-evidence-bloody-handprint.webp",
        alt: "Bloody handprint marked as forensic evidence at a crime scene in the horror mockumentary Strange Harvest",
      },
    ],
    stats: [
      { value: "2025", label: "Release Year" },
      { value: "134m", label: "Runtime" },
      { value: "RESTRICTED", label: "Disturbing / Grisly Violent Content And Language" },
      { value: "True Crime / Horror", label: "Genre" },
    ],
  },

  trailer: {
    title: "Official Trailer",
    iframeTitle: "Strange Harvest Official Trailer",
  },

  press: {
    title: "Press & Mentions",
    icons: [
      {
        name: "Rotten Tomatoes",
        icon: "/images/strange-harvest-rotten-tomatoes-fresh-icon.webp",
        href: "https://www.rottentomatoes.com/m/strange_harvest",
      },
      {
        name: "Letterboxd",
        icon: "/images/strange-harvest-letterboxd-film-icon.webp",
        href: "https://letterboxd.com/film/strange-harvest-2024/",
      },
      {
        name: "Wikipedia",
        icon: "/images/strange-harvest-wikipedia-icon.webp",
        href: "https://en.wikipedia.org/wiki/Strange_Harvest_(film)",
      },
      {
        name: "IMDb",
        icon: "/images/svgcons/strange-harvest-imdb-rating-icon.svg",
        href: "https://www.imdb.com/title/tt33400719/",
      },
    ],
    quotes: [
      {
        quote:
          "Ignore the film’s marketing, which seems intent on positioning it as a run-of-the-mill masked maniac movie; this is a fascinating and neatly realised horror riff on the 2020s’ most popular genre.",
        source: "The Guardian / Catherine Bray",
        href: "https://www.theguardian.com/film/2025/oct/20/strange-harvest-review-mock-true-crime-documentary",
      },
      {
        quote:
          "It’s a grisly piece of work — drawing at least minor inspiration from the New French Extremity movement, of all places — but one that manages to display its cutthroat ambitions with surprising subtlety.",
        source: "MovieFreak / Sarah Michelle Fetters",
        href: "http://moviefreak.com/strange-harvest-2024-movie-review/",
      },
      {
        quote:
          "Ortiz pushes the subgenre forward with a heady and unsettling immersion into the realm of true crime with a distinct horror twist.",
        source: "Bloody Disgusting / Meagan Navarro",
        href: "https://bloody-disgusting.com/reviews/3832354/strange-harvest-review-occult-murder-in-the-inland-empire/",
      },
      {
        quote:
          "Strange Harvest is a brutal, well-crafted descent into depravity that walks a tightrope between realism and horror fantasy.",
        source: "Film Threat / Tom Atkinson",
        href: "https://filmthreat.com/reviews/strange-harvest-movie-found-footage-review/",
      },
      {
        quote:
          "A compelling blend of true-crime documentary aesthetics and foreboding horror, director Stuart Ortiz presents a meticulously crafted low-fi affair chock full of references to adorn its own strange, supernatural lore.",
        source: "Fish Jelly Films / YouTube",
        href: "https://www.youtube.com/watch?v=N7iLoVl1AZk",
      },
      {
        quote:
          "Stuart Ortiz crafts a phenomenal, disturbing, and creepy pseudo-documentary with ‘Strange Harvest: Occult Murder In The Inland Empire’.",
        source: "Dread Central / Mary Beth McAndrews",
        href: "https://www.dreadcentral.com/reviews/512431/strange-harvest-occult-murder-in-the-inland-empire-is-a-pitch-perfect-found-footage-film-fantastic-fest-2024-review/",
      },
      {
        quote:
          "A grizzly serial killer vs cop procedural and an incredibly spot-on spoof of True Crime documentaries.",
        source: "Nightmare on Film Street / Jonathan DeHaan",
        href: "https://nofspodcast.com/strange-harvest-review-macabre-mockumentary-spoofs-every-true-crime-cliche-you-love-and-love-to-hate-fantasticfest",
      },
      {
        quote: "Ortiz’s bone-chilling effort is easily the found footage horror standout of 2025",
        source: "Daily Dead / Rocco T. Thompson",
        href: "https://dailydead.com/fantastic-fest-2024-review-strange-harvest-occult-murder-in-the-inland-empire-is-an-instant-found-footage-classic/",
      },      {
        quote: "A fascinating and neatly realised horror riff on the 2020s' most popular genre.",
        source: "Rotten Tomatoes Critics Consensus",
        href: "https://www.rottentomatoes.com/m/strange_harvest",
      },
      {
        quote: "A compelling horror show woven through mockumentary threads.",
        source: "RogerEbert.com",
        href: "https://www.rogerebert.com/reviews/strange-harvest-film-review-2025",
      },
      {
        quote: "Strange Harvest offers plenty of grisly intrigue for genre fans.",
        source: "Decider (Stream It Verdict)",
        href: "https://decider.com/2025/12/26/strange-harvest-stream-it-or-skip-it/",
      },
      {
        quote: "A deeply unsettling experience that mimics true-crime docs with eerie precision.",
        source: "The Daily Beast",
        href: "https://www.thedailybeast.com/obsessed/strange-harvest-true-crime-thriller-about-a-serial-killer-with-a-twist",
      },
      {
        quote: "An impressively realistic faux-documentary horror.",
        source: "JoshAtTheMovies.com",
        href: "https://joshatthemovies.com/2025/08/04/film-review-strange-harvest/",
      },
      {
        quote: "Like Lake Mungo, but original and confidently crafted.",
        source: "Rue Morgue",
        href: "https://rue-morgue.com/movie-review-strange-harvest-a-cleverly-twisted-take-on-true-crime/",
      },
      {
        quote: "Perhaps the best pseudo-documentary since Lake Mungo.",
        source: "Dread Central",
        href: "https://en.wikipedia.org/wiki/Strange_Harvest_(film)",
      },
      {
        quote: "An eerie, convincing recreation of modern true-crime format.",
        source: "Paste Magazine",
        href: "https://www.pastemagazine.com/movies/horror-movies/strange-harvest-review-documentary-mr-shiny-serial-killer-real-stuart-ortiz-killings",
      },
      {
        quote: "Gruesome, nasty effects and dreadful intrigue keep the tension high.",
        source: "Movies and Munchies",
        href: "https://www.rottentomatoes.com/m/strange_harvest",
      },
      {
        quote: "This mockumentary blurs fiction and reality with compelling verité style.",
        source: "The Daily Beast",
        href: "https://www.thedailybeast.com/obsessed/strange-harvest-true-crime-thriller-about-a-serial-killer-with-a-twist",
      },
      {
        quote: "A gripping and immersive faux-true-crime thriller.",
        source: "From the Fourth Row",
        href: "https://fromthefourthrow.com/2025/08/09/strange-harvest-review-a-faux-documentary-film-that-felt-as-real-as-any-true-crime-documentary-ive-ever-seen/",
      },
      {
        quote: "A thoroughly engaging horror mockumentary.",
        source: "Moviejawn",
        href: "https://www.moviejawn.com/home/2025/10/29/strange-harvest-review",
      },
      {
        quote: "Worth horror mavens' time with enough variation on genre tropes.",
        source: "Decider",
        href: "https://www.rottentomatoes.com/m/strange_harvest",
      },
      {
        quote: "Strange Harvest nails the true-crime parody in early moments.",
        source: "Paste Magazine",
        href: "https://www.pastemagazine.com/movies/horror-movies/strange-harvest-review-documentary-mr-shiny-serial-killer-real-stuart-ortiz-killings",
      },
      {
        quote: "A convincing blend of documentary style and horror tension.",
        source: "RogerEbert.com",
        href: "https://www.rogerebert.com/reviews/strange-harvest-film-review-2025",
      },
      {
        quote: "An unforgettable mockumentary experience for true-crime fans.",
        source: "JoshAtTheMovies.com",
        href: "https://joshatthemovies.com/2025/08/04/film-review-strange-harvest/",
      },
      {
        quote: "The film's doc style keeps you immersed, making it feel almost real.",
        source: "From the Fourth Row",
        href: "https://fromthefourthrow.com/2025/08/09/strange-harvest-review-a-faux-documentary-film-that-felt-as-real-as-any-true-crime-documentary-ive-ever-seen/",
      },
      {
        quote: "Mockumentary structure executed in a way that feels familiar and eerie.",
        source: "Paste Magazine",
        href: "https://www.pastemagazine.com/movies/horror-movies/strange-harvest-review-documentary-mr-shiny-serial-killer-real-stuart-ortiz-killings",
      },
      {
        quote: "Strange Harvest sets itself apart with immersive documentary mimicry.",
        source: "Decider",
        href: "https://decider.com/2025/12/26/strange-harvest-stream-it-or-skip-it/",
      },
      {
        quote: "A compelling horror journey that blends mockumentary realism with unsettling imagery.",
        source: "Rotten Tomatoes",
        href: "https://www.rottentomatoes.com/m/strange_harvest",
      },    ],
  },

  watch: {
    title: "Watch Now",
    streaming: "STREAMING",
    streamingOn: "STREAMING ON",
    rentOwnUSCA: "RENT / OWN",
    rentOwnIntl: "RENT / OWN (UK & INTERNATIONAL)",
    loadingMessage: "Checking platform availability for your region...",
    ariaWatchOn: "Watch on",
    ariaRentBuyOn: "Rent or buy on",
    streamingPlatforms: [
      {
        name: "Hulu",
        href: "https://www.hulu.com/movie/strange-harvest-e931d642-fe34-4b92-b6da-96f4c7573fac",
        icon: "/images/strange-harvest-watch-streaming-hulu-icon.webp",
      },
      {
        name: "Paramount+",
        href: "https://www.paramountplus.com/ca/movies/video/_rwhlpI_KPDSpgSqI41q70Q6VVwGC2lG/",
        icon: "/images/strange-harvest-watch-paramount-plus-icon.webp",
      },
      {
        name: "Filmin",
        href: "https://www.filmin.es/pelicula/los-asesinatos-de-mr-shiny",
        icon: "/images/strange-harvest-watch-streaming-filmin-icon.webp",
      },
    ],
    usca: [
      {
        name: "Apple TV",
        href: "https://tv.apple.com/us/movie/strange-harvest/umc.cmc.4atgf8qjfghsw0w6ki9k7eqch",
        icon: "/images/strange-harvest-watch-apple-tv-icon.webp",
      },
      {
        name: "Amazon",
        href: "https://www.primevideo.com/detail/Strange-Harvest/0GOLHLOCIIRVMO44IB2E0LMNN2",
        icon: "/images/strange-harvest-watch-amazon-prime-video-icon.webp",
      },
      {
        name: "Fandango",
        href: "https://athome.fandango.com/content/browse/details/Strange-Harvest/4473508",
        icon: "/images/strange-harvest-watch-fandango-icon.webp",
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/watch?v=XU5edpgV37o",
        icon: "/images/strange-harvest-watch-youtube-movies-icon.webp",
      },
      {
        name: "Cosmo",
        href: "https://www.cosmogo.com/#!/search?phrase=strange%20hav",
        icon: "/images/strange-harvest-watch-cosmo-streaming-icon.webp",
      },
      {
        name: "Sony Pictures Core",
        href: "https://www.sonypicturescore.com",
        icon: "/images/sony-pictures-core.webp",
      },
    ],
    intl: [
      {
        name: "Sky Store",
        href: "https://www.skystore.com/product/strange-harvest/5cea96ca-2f66-4c07-9d95-643537650b95",
        icon: "/images/strange-harvest-watch-sky-store-uk-icon.webp",
      },
      {
        name: "Rakuten TV",
        href: "https://www.rakuten.tv/uk/movies/strange-harvest",
        icon: "/images/strange-harvest-watch-rakuten-tv-uk-icon.webp",
      },
    ],
  },

  homeVideo: {
    title: "Official Home Video Release",
    productTitle: "Strange Harvest (DVD)",
    description: "Official DVD release distributed by Sony Pictures Home Entertainment. Manufactured on demand.",
    image: "/images/strange-harvest-official-movie-poster.webp",
    cta: { label: "View on Amazon", href: "https://www.amazon.com/dp/B0FSMGS86V", target: "_blank" },
    disclaimer: "*Sold and fulfilled by Amazon.",
  },

  merch: {
    title: "Official Merch",
    blurb: "Wear the terror. Carry the mystery. Exclusive Strange Harvest merchandise for true believers.",
    shopifyUrl: "https://strangeharvestfilm.myshopify.com/pages/customer-notifications",
    shopifyCartUrl: "https://strangeharvestfilm.myshopify.com/cart",
    loadingMessage: "Loading merchandise...",
    comingSoonTitle: "Merch Coming Soon",
    comingSoonBody: "Our merchandise store is currently being updated. Check back soon!",
    notifyMe: "Notify me",
    buyNow: "Buy Now",
  },

  castCrew: {
    title: "Cast & Crew",
    leadDetectives: {
      title: "LEAD DETECTIVES",
      members: [
        {
          name: "Peter Zizzo",
          role: "Detective Joe Kirby",
          image: "/images/strange-harvest-detective-joe-kirby-peter-zizzo.webp",
          imageAlt: "Detective Joe Kirby giving an interview about the investigation in the horror mockumentary Strange Harvest",
          imdb: "https://www.imdb.com/name/nm0970567/",
        },
        {
          name: "Terri Apple",
          role: "Detective Lexi Taylor",
          image: "/images/strange-harvest-detective-lexi-taylor-terri-apple.webp",
          imageAlt: "Detective Lexi Taylor speaking during an investigative interview in the horror mockumentary Strange Harvest",
          imdb: "https://www.imdb.com/name/nm0032322/",
        },
      ],
    },
    cast: {
      title: "CAST",
      members: [
        { name: "Andy Lauer", character: "Jared Kelly", imdb: "https://www.imdb.com/name/nm0490774/" },
        { name: "Dawsyn Eubanks", character: "Victoria Macenroe", imdb: "https://www.imdb.com/name/nm8625065/" },
        { name: "Matthew M Garcia", character: "Saroj Mallick", imdb: "https://www.imdb.com/name/nm4547717/" },
        { name: "Matthew Peschio", character: "Victor Shamaz", imdb: "https://www.imdb.com/name/nm5678530/" },
        { name: "Allen Marsh", character: "Jonas Eckhard", imdb: "https://www.imdb.com/name/nm2956809/" },
        { name: "Travis T. Wolfe Sr.", character: "Officer Pearce", imdb: "https://www.imdb.com/name/nm10769326/" },
        { name: "Roy Abramsohn", character: "Prof. Warren Gilette", imdb: "https://www.imdb.com/name/nm0009252/" },
        { name: "Christina Hélène Braa", character: "Lizzy", imdb: "https://www.imdb.com/name/nm4444640/" },
        { name: "David Hemphill", character: "Glen Sandweiss", imdb: "https://www.imdb.com/name/nm3634973/" },
        { name: "Janna Cardia", character: "Kacie Porter", imdb: "https://www.imdb.com/name/nm6902919/" },
        { name: "Brandon Christensen", character: "Noah Lafone / Miles Harris", imdb: "https://www.imdb.com/name/nm3417134/" },
        { name: "Jessee J. Clarkson", character: "Mr. Shiny / Leslie Sykes", imdb: "https://www.imdb.com/name/nm1560796/" },
        { name: "Nicole Dionne", character: "Sonia Lafone", imdb: "https://www.imdb.com/name/nm1000737/" },
        { name: "Brendan James Hanarhan", character: "Jim Lizetti", imdb: "https://www.imdb.com/name/nm16535665/" },
        { name: "Heath Harper", character: "Jim Macenroe", imdb: "https://www.imdb.com/name/nm3266164/" },
        { name: "Oscar Jordan", character: "Homer Johnson", imdb: "https://www.imdb.com/name/nm0430122/" },
        { name: "Michael Karan", character: "Jim Lafone", imdb: "https://www.imdb.com/name/nm4024114/" },
        { name: "Bernadette Pérez", character: "Silvia Villejo", imdb: "https://www.imdb.com/name/nm1783216/" },
        { name: "Marisa Petroro", character: "Monica", imdb: "https://www.imdb.com/name/nm0662475/" },
        { name: "Angel Prater", character: "Stephanie Courtland", imdb: "https://www.imdb.com/name/nm10086325/" },
        { name: "Joel Searls", character: "Jim Martinez", imdb: "https://www.imdb.com/name/nm7283591/" },
        { name: "Tim Shelburne", character: "Prof. Nathan Silva", imdb: "https://www.imdb.com/name/nm7927039/" },
        { name: "Samantha Stephens", character: "Chelsea Lunsford", imdb: "https://www.imdb.com/name/nm5560648/" },
        { name: "Ross Turner", character: "Dr. Dennis Levine", imdb: "https://www.imdb.com/name/nm3129298/" },
        { name: "Coleen Tutton", character: "April Macenroe", imdb: "https://www.imdb.com/name/nm2601916/" },
        { name: "Angie Jho Lee", character: "Reporter ('95)", imdb: "https://www.imdb.com/name/nm9187716/" },
        { name: "Alistair David Herz", character: "Anchor ('95)", imdb: "https://www.imdb.com/name/nm2796307/" },
        { name: "Garon Grigsby", character: "Anchor 1", imdb: "https://www.imdb.com/name/nm0341954/" },
        { name: "Lisa Cole", character: "Anchor 2", imdb: "https://www.imdb.com/name/nm1565266/" },
        { name: "Jennifer Titus", character: "Anchor 3", imdb: "https://www.imdb.com/name/nm2315616/" },
        { name: "Sarah Murphree", character: "Reporter 2", imdb: "https://www.imdb.com/name/nm5648079/" },
        { name: "Charley Rossman", character: "Lieutenant", imdb: "https://www.imdb.com/name/nm0744451/" },
      ],
    },
    crew: {
      title: "CREW",
      sections: [
        {
          role: "Director & Writer",
          members: [
            { name: "Stuart Ortiz", imdb: "https://www.imdb.com/name/nm3425513/" },
          ],
        },
        {
          role: "Producers",
          members: [
            { name: "Stuart Ortiz", imdb: "https://www.imdb.com/name/nm3425513/" },
            { name: "Bruce Guido", imdb: "https://www.imdb.com/name/nm3615187/" },
            { name: "Alex Yesilcimen", imdb: "https://www.imdb.com/name/nm9215424/" },
            { name: "Michael Karlin", imdb: "https://www.imdb.com/" },
          ],
        },
        {
          role: "Executive Producers",
          members: [
            { name: "David Karlin", imdb: "https://www.imdb.com/name/nm16535811/" },
            { name: "Joseph Paul Latorre", imdb: "https://www.imdb.com/name/nm16535812/" },
            { name: "Bruce P. Guido", imdb: "https://www.imdb.com/" },
            { name: "Leo Deleon", imdb: "https://www.imdb.com/name/nm16535809/" },
          ],
        },
        {
          role: "Associate Producers",
          members: [
            { name: "Matthew M Garcia", imdb: "https://www.imdb.com/name/nm4547717/" },
            { name: "James Pearce", imdb: "https://www.imdb.com/name/nm16535779/" },
            { name: "Stuart Gallacher", imdb: "https://www.imdb.com/name/nm16535780/" },
            { name: "Jordan Moser", imdb: "https://www.imdb.com/name/nm16535778/" },
            { name: "Tony Copolillo", imdb: "https://www.imdb.com/name/nm1949663/" },
          ],
        },
      ],
    },
  },

  footer: {
    title: "STRANGE HARVEST",
    tagline: "True Crime Found Footage Mockumentary",
    rating: "Disturbing / Grisly Violent Content And Language",
    officialNotice: "Official Website of Strange Harvest (2025)",
    copyright: "© 2024 Strange Harvest. All rights reserved.",
    musicCredit: "Adorable Damage & Pathogen Pictures",
    cookieSettingsLabel: "Cookie Settings",
    disclaimer:
      "All material on this website is fictional and presented for entertainment. Any resemblance to real people, organizations, places, or events is coincidental and not intended as factual representation.",
  },
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends Record<string, any>
      ? DeepPartial<T[K]>
      : T[K];
};

function deepMerge<T extends Record<string, any>>(base: T, override: DeepPartial<T>): T {
  const output: Record<string, any> = { ...base };
  Object.keys(override).forEach((key) => {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === "object" &&
      typeof overrideValue === "object" &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue)
    ) {
      output[key] = deepMerge(baseValue, overrideValue);
      return;
    }

    output[key] = overrideValue;
  });
  return output as T;
}

const sitecopyEs: DeepPartial<typeof sitecopyEn> = {
  cookieConsent: {
    title: "Aviso de Cookies",
    message:
      "Este sitio web utiliza cookies para mejorar tu experiencia de navegacion y analizar el trafico. Puedes elegir que cookies aceptar.",
    acceptAllButton: "Aceptar todo",
    essentialOnlyButton: "Solo cookies esenciales",
    manageButton: "Administrar preferencias",
    saveButton: "Guardar preferencias",
    privacyLink: {
      label: "Politica de Privacidad",
    },
    preferences: {
      title: "Preferencias de Cookies",
      description:
        "Elige que tipos de cookies deseas permitir. Las cookies esenciales no se pueden desactivar porque son necesarias para el funcionamiento del sitio.",
      categories: {
        essential: {
          label: "Cookies esenciales",
          description: "Necesarias para el funcionamiento basico del sitio. No se pueden desactivar.",
        },
        analytics: {
          label: "Cookies analiticas",
          description: "Nos ayudan a entender como los visitantes interactuan con el sitio.",
        },
        marketing: {
          label: "Cookies de marketing",
          description: "Se utilizan para rastrear a los visitantes en diferentes sitios web con fines publicitarios.",
        },
        preferences: {
          label: "Cookies de preferencias",
          description: "Recuerdan tu configuracion y preferencias para futuras visitas.",
        },
      },
    },
  },
  header: {
    skipToContent: "Saltar al contenido principal",
    nav: {
      home: "Inicio",
      about: "Sinopsis",
      watch: "Ver",
      press: "Prensa",
      merch: "Merch",
    },
    aria: {
      cart: "Abrir carrito de compras",
      language: "Selector de idioma",
    },
  },
  hero: {
    tagline: "MOCKUMENTARY DE TERROR TRUE CRIME Y FOUND FOOTAGE",
    subtitle: "SITIO OFICIAL",
    blurb:
      "Un control de bienestar de rutina conduce a un hallazgo espeluznante y al regreso de un asesino que se creia desaparecido para siempre.",
    ctas: {
      primary: { label: "Trailer" },
    },
    posterToggle: {
      official: "Poster Oficial",
      festival: "Poster Festival",
    },
  },
  trailer: {
    title: "Trailer oficial",
    iframeTitle: "Trailer oficial de Strange Harvest",
  },
  synopsis: {
    title: "Sinopsis",
    body: [
      "Un control de bienestar de rutina en los suburbios de San Bernardino conduce a un descubrimiento espeluznante: una familia de tres ha sido atada, desangrada y colocada bajo un extrano simbolo escrito con sangre en el techo. Los detectives Joe Kirby y Lexi Taylor reconocen el simbolo como la firma de un asesino de hace 15 anos que aparentemente ha regresado para continuar su ola de crimenes.",
      "Poco despues, \"Mr. Shiny\" comienza a dejar nuevas escenas aterradoras; una victima queda atrapada en una piscina con sanguijuelas vivas mientras otra es desollada ritualmente y expuesta en un parque publico.",
      "Pronto se hace evidente que el caso no tiene nada de rutinario y que los asesinatos, y su autor, pueden formar parte de una agenda siniestra y de otro mundo relacionada con fenomenos cosmicos y fuerzas malignas mas alla de nuestra comprension.",
    ],
    quote: {
      text: "Algunos misterios no se resuelven. Solo se vuelven mas extranos cuanto mas los miras.",
    },
    stats: [
      { value: "2025", label: "Ano de estreno" },
      { value: "134m", label: "Duracion" },
      { value: "RESTRINGIDA", label: "Contenido perturbador / violencia explicita y lenguaje fuerte" },
      { value: "True Crime / Horror", label: "Genero" },
    ],
  },
  press: {
    title: "Prensa y menciones",
  },
  watch: {
    title: "Ver ahora",
    rentOwnUSCA: "ALQUILER / COMPRA",
    rentOwnIntl: "ALQUILER / COMPRA (REINO UNIDO E INTERNACIONAL)",
    loadingMessage: "Comprobando disponibilidad de plataformas para tu region...",
    ariaWatchOn: "Ver en",
    ariaRentBuyOn: "Alquilar o comprar en",
  },
  homeVideo: {
    title: "Lanzamiento oficial en video domestico",
    description: "Lanzamiento oficial en DVD distribuido por Sony Pictures Home Entertainment. Fabricado bajo demanda.",
    cta: { label: "Ver en Amazon" },
    disclaimer: "*Vendido y gestionado por Amazon.",
  },
  merch: {
    title: "Merch oficial",
    blurb: "Viste el terror. Lleva el misterio. Merch oficial exclusiva de Strange Harvest para verdaderos creyentes.",
    loadingMessage: "Cargando merchandising...",
    comingSoonTitle: "Merch proximamente",
    comingSoonBody: "Nuestra tienda de merch se esta actualizando. Vuelve pronto.",
    notifyMe: "Avisarme",
    buyNow: "Comprar ahora",
  },
  castCrew: {
    title: "Reparto y equipo",
    leadDetectives: { title: "DETECTIVES PRINCIPALES" },
    cast: { title: "REPARTO" },
    crew: {
      title: "EQUIPO",
    },
  },
  footer: {
    tagline: "Mockumentary de True Crime y Found Footage",
    officialNotice: "Sitio web oficial de Strange Harvest (2025)",
    cookieSettingsLabel: "Configuracion de cookies",
    disclaimer:
      "Todo el material de este sitio web es ficticio y se presenta con fines de entretenimiento. Cualquier similitud con personas, organizaciones, lugares o eventos reales es coincidencia y no pretende representar hechos reales.",
  },
};

export const sitecopy = siteLanguage === "es" ? deepMerge(sitecopyEn, sitecopyEs) : sitecopyEn;
