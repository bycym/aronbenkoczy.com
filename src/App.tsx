import { startTransition, useEffect, useState } from "react";
import heroAvatar from "../asset/bg.jpg";
import heroAvatarMobile from "../asset/bg-mobile.jpg";

type ExperienceCard = {
  role: string;
  company: string;
  period: string;
  context: string;
  highlights: string[];
};

type SkillGroup = {
  label: string;
  items: string[];
};

type SoftwareHighlight = {
  value: string;
  label: string;
};

type GameReference = {
  title: string;
  subtitle: string;
  type: string;
  role: string;
  mood: string;
  useCase: string;
  tools: string;
  link: string;
  imageSrc?: string;
  imageAlt?: string;
};

type BandcampAlbum = {
  title: string;
  url: string;
  albumId: number;
};

type ContactLink = {
  label: string;
  href: string;
};

type ContactGroup = {
  title: string;
  description: string;
  links: ContactLink[];
};

type ProjectCard = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel: string;
  ctaHref: string;
};

const bandcampAlbums: BandcampAlbum[] = [
  {
    title: "Flying Around",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/flying-around",
    albumId: 3342878763,
  },
  {
    title: "Te vagy a Pikupaka",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/te-vagy-a-pikupaka",
    albumId: 3599743977,
  },
  {
    title: "The Pool",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/the-pool",
    albumId: 2406310368,
  },
  {
    title: "Gravity Pulls Back",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/gravity-pulls-back",
    albumId: 1076315756,
  },
  {
    title: "Moving Storm",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/moving-storm",
    albumId: 4090116072,
  },
  {
    title: "Tilamtim",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/til-mtim",
    albumId: 781005976,
  },
  {
    title: "Pengetett Mylord",
    url: "https://pengetettmylord.bandcamp.com/album/pengetett-mylord",
    albumId: 2875902078,
  },
  {
    title: "Blurred TV Shows",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/blurred-tv-shows",
    albumId: 384038723,
  },
  {
    title: "Last Cigarette",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/last-cigarette",
    albumId: 3437198355,
  },
  {
    title: "Merge",
    url: "https://beforeyoucloseyourmind.bandcamp.com/album/merge",
    albumId: 1639748544,
  },
];

const experienceCards: ExperienceCard[] = [
  {
    role: "Full-stack Software Engineer",
    company: "Yext",
    period: "2025. January - now",
    context: "SaaS CRM and data synchronization",
    highlights: [
      "Build and maintain a Python-based, AWS Lambda-driven event platform supporting enterprise CRM and tenant-specific integrations.",
      "Develop microservices and shared modules in a monorepo environment.",
      "Improve reliability with metrics, checkpointing, error handling, and Sentry-based monitoring.",
      "Use Codex AI agents to streamline feature implementation and boost engineering velocity.",
    ],
  },
  {
    role: "Full-stack Software Engineer",
    company: "Norbit",
    period: "2023. December - 2024. December",
    context: "3D point cloud and map-based web application",
    highlights: [
      "Contributed to the design and delivery of a real-time 3D point cloud and map-based application.",
      "Identified performance bottlenecks in a complex legacy codebase and improved maintainability.",
      "Reworked a slow CI/CD pipeline and introduced automated testing to improve release quality.",
    ],
  },
  {
    role: "Full-stack Javascript Developer",
    company: "Kinsta",
    period: "2022. January - 2023. November",
    context: "WordPress website hosting solution",
    highlights: [
      "Built backend features and integrations for a multi-tenant SaaS platform.",
      "Worked with GCP services such as Cloud Functions, BigQuery, and Pub/Sub.",
      "Extended GraphQL schemas, resolvers, and backend APIs across microservice-based services.",
    ],
  },
    {
    role: "Full-stack Software Engineer / Scrum Master",
    company: "CAE",
    period: "2019. April - 2021. December",
    context: "CAE LearningSpace healthcare simulation",
    highlights: [
      "Delivered customer-facing features including camera connection visibility, video streaming, and chat-related capabilities.",
      "Built and supported cloud-hosted mediator services in .NET for real-time communication use cases.",
      "Introduced CI/CD pipelines in Azure DevOps and improved engineering workflow for a mixed legacy and modern codebase.",
      "Worked across Angular, Node.js, Python, C#, ASP.NET Core, and legacy components in a complex product environment.",
    ],
  },
  {
    role: "Software Engineer",
    company: "CAE",
    period: "2017. December - 2019. April",
    context: "Military helicopter simulator",
    highlights: [
      "Worked on software used in a military helicopter simulator environment.",
      "Collaborated directly with end users to reproduce issues and validate fixes.",
      "Supported testing and delivery in a reliability-sensitive, customer-facing engineering context.",
      "Worked across Ada, C, C#, Python, and shell scripting in a mixed-technology environment.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Evosoft",
    period: "2015. July - 2017. November",
    context: "STARTER commissioning tool",
    highlights: [
      "Maintained and extended a production engineering desktop application used for industrial drive commissioning.",
      "Worked on new features, maintenance, and safety-related functionality in a long-lived C++/MFC codebase.",
      "Collaborated with German colleagues in an international engineering environment.",
      "Tested features on real drives and control units, gaining hands-on exposure to reliability-sensitive software delivery.",
    ],
  },
];

const skillGroups: SkillGroup[] = [
  {
    label: "Core",
    items: [
      "Python",
      "React",
      "TypeScript",
      "AWS",
      "LLM-driven development",
      "Agentic workflows",
    ],
  },
  {
    label: "Delivery",
    items: [
      "Lambda",
      "DynamoDB",
      "CI/CD",
      "OpenTofu",
      "Terragrunt",
      "Observability",
    ],
  },
  {
    label: "Systems",
    items: ["REST APIs", "GraphQL", "Monorepo", "Docker", "Node.js", "Bash"],
  },
];

const softwareHighlights: SoftwareHighlight[] = [
  { value: "10+ yrs", label: "building production software" },
  { value: "Python + AWS", label: "current backend focus" },
  { value: "SaaS / Enterprise", label: "systems and integrations" },
  { value: "CI/CD + AI", label: "delivery and agentic workflows" },
];

const gameReferences: GameReference[] = [
    {
    title: "Lina: Witches of the Moon",
    subtitle: "itch.io game",
    type: "Game audio",
    role: "Audio by me, made with Pico-8 tracker",
    mood: "Chiptune, magical, game-ready",
    useCase: "Playable game audio, retro atmosphere, character-driven scenes",
    tools: "Pico-8 tracker",
    link: "https://achie.itch.io/lina-witches-of-the-moon",
    imageSrc: "https://img.itch.zone/aW1nLzEwMzMwMDkxLnBuZw==/original/NcAiyM.png",
    imageAlt: "Screenshot from Lina: Witches of the Moon.",
  },
  {
    title: "Runaway",
    subtitle: "OST Composing Jam #4",
    type: "Soundtrack",
    role: "Composer / Producer",
    mood: "Chase, forest escape, fast-paced, danger",
    useCase: "Endless runner, action sequence, trailer loop",
    tools: "Polyend Tracker + Ableton Live",
    link: "https://bycym.itch.io/ost-composing-jam-4-runaway",
    imageSrc: "https://img.itch.zone/aW1hZ2UvMTYxNjUwNi85NDYzNjUxLnBuZw==/original/%2B3KWa4.png",
  },
  {
    title: "Mjœdŏnland",
    subtitle: "Surreal low-poly adventure / RPG",
    type: "HTML5 / Windows game",
    role: "Game creator / audio direction / atmosphere",
    mood: "Weird, domestic, uncanny, dreamlike",
    useCase: "Exploration, surreal narrative, strange ambience",
    tools: "Unity",
    link: "https://bycym.itch.io/mjdnland",
    imageSrc: "https://img.itch.zone/aW1hZ2UvNTkxOTUwLzMxMjk3NzgucG5n/794x1000/5NJJeW.png",
  },
  {
    title: "Valhalla is near",
    subtitle: "2D controller fighting game",
    type: "Action / Fighting",
    role: "Game / audio reference",
    mood: "Mythological, retro, couch-fight energy",
    useCase: "Combat, local multiplayer, retro action",
    tools: "LÖVE",
    imageSrc: "https://img.itch.zone/aW1hZ2UvMTUwNDkyLzY4OTIxNC5wbmc=/794x1000/mEF8rG.png",
    link: "https://bycym.itch.io/valhalla-is-near",
  },
];

const featuredLinks: ContactLink[] = [
  { label: "Software engineer - Email", href: "mailto:benkoczyaron@gmail.com" },
  { label: "Audio - Email", href: "mailto:before.you.close.your.mind@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/%C3%A1ron-benk%C3%B3czy-889b4291/",
  },
  { label: "Bandcamp", href: "https://beforeyoucloseyourmind.bandcamp.com" },
];

const contactGroups: ContactGroup[] = [
  {
    title: "Streaming",
    description: "Listen across major platforms.",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/artist/2sduEziGMsmyNDIbwHUoYU" },
      { label: "Apple Music", href: "https://music.apple.com/us/artist/before-you-close-your-mind/1710715924" },
      { label: "Amazon Music", href: "https://music.amazon.com/artists/B0CKL9TNB3" },
      { label: "Deezer", href: "https://www.deezer.com/hu/artist/234610041" },
      { label: "SoundCloud", href: "https://soundcloud.com/beforeyoucloseyourmind" },
      { label: "Tidal", href: "https://tidal.com/artist/42646786" },
      { label: "YouTube Music", href: "https://music.youtube.com/channel/UC_WZHKCw6lGHSlP45v7H5yQ" },
    ],
  },
  {
    title: "Elsewhere",
    description: "Find releases, games, and social presence.",
    links: [
      { label: "Github", href: "https://github.com/bycym" },
      { label: "Linktree", href: "https://linktr.ee/bycym" },
      { label: "itch.io", href: "https://bycym.itch.io/" },
      { label: "Instagram", href: "https://www.instagram.com/before.you.close.your.mind/" },
    ],
  },
];

const projectCards: ProjectCard[] = [
  {
    eyebrow: "Open source",
    title: "BitBar Jira Client",
    description:
      "Small macOS menu bar utility for checking Jira notifications without keeping the full Jira tab open all day.",
    bullets: [
      "Pulls Jira issue activity into a lightweight desktop-friendly view.",
      "Able to check the current assigned ticket.",
      "Check all the assigned tickets",
      "Able to click on it for quick access",
    ],
    imageSrc:
      "https://raw.githubusercontent.com/bycym/bitbar_jira_client/master/jira-noti.png",
    imageAlt: "Screenshot of BitBar Jira Client menu bar notification UI.",
    ctaLabel: "See GitHub repo",
    ctaHref: "https://github.com/bycym/bitbar_jira_client",
  },
  {
    eyebrow: "Indie making",
    title: "Timestamp Clock",
    description:
      "Tiny visual clock project for timestamps.",
    bullets: [
      "Quick playful timestamp adjust",
    ],
    imageSrc: "https://raw.githubusercontent.com/bycym/timestamp-clock/main/image.png",
    imageAlt: "Screenshot of Timestamp Clock interface.",
    ctaLabel: "See GitHub repo",
    ctaHref: "https://github.com/bycym/timestamp-clock",
  },
  {
    eyebrow: "Utility",
    title: "hun-dic-macos",
    description:
      "macOS-focused Hungarian dictionary helper project.",
    bullets: [
      "Support windows like hungarian layout on macos.",
    ],
    ctaLabel: "See GitHub repo",
    ctaHref: "https://github.com/bycym/hun-dic-macos",
    imageSrc: "https://raw.githubusercontent.com/bycym/hun-dic-macos/main/screenshot.png",
    imageAlt: "Screenshot of hun-dic-macos.",
  },
  {
    eyebrow: "Workflow",
    title: "xbar-plugins",
    description:
      "Collection of xbar plugins.",
    bullets: [
      "Telex RSS feed ",
      "Gitlab MR",
      "Github PR",
      "Met.hu radar",
      "Headphone battery and remaining battery",
    ],
    ctaLabel: "See GitHub repo",
    ctaHref: "https://github.com/bycym/xbar-plugins",
    imageSrc: "https://raw.githubusercontent.com/bycym/xbar-plugins/main/met-radar.png",
    imageAlt: "Screenshot of xbar-plugins weather radar plugin.",
  },
  {
    eyebrow: "Music tech",
    title: "midi-tools",
    description:
    "Set of MIDI-related utilities built around music-making workflows.",
    bullets: [
      "Script to create a local midi proxy.",
      "A simple midi tool to send midi notes to plugin (for example Vital)",
    ],
    ctaLabel: "See GitHub repo",
    ctaHref: "https://github.com/bycym/midi-tools",
    imageSrc: "https://raw.githubusercontent.com/bycym/midi-tools/main/doc/image-1.png",
    imageAlt: "Screenshot of midi-tools.",
  },
  {
    eyebrow: "Experiment",
    title: "Interrogator",
    description:
    "A simple tool to learn english words.",
    bullets: [
      "Given a bunch of words like `cat, kitty, puss = cica, macska`.",
      "Going through them, and do a question answer style flow.",
      "Check some statistics after a session.",
      "Be able to ask only the failed words.",
      "Works under windows, macos and linux.",
    ],
    imageSrc: "https://raw.githubusercontent.com/bycym/Interrogator/master/screenshot.png",
    imageAlt: "Screenshot of Interrogator.",
    ctaLabel: "See GitHub repo",
    ctaHref: "https://github.com/bycym/Interrogator",
  },
];

export default function App() {
  const [loadedAlbumIds, setLoadedAlbumIds] = useState<number[]>([]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 981px)");

    const syncLoadedAlbums = (matchesDesktop: boolean) => {
      startTransition(() => {
        setLoadedAlbumIds(matchesDesktop ? bandcampAlbums.map((album) => album.albumId) : []);
      });
    };

    syncLoadedAlbums(desktopMediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncLoadedAlbums(event.matches);
    };

    desktopMediaQuery.addEventListener("change", handleChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const loadAlbumPlayer = (albumId: number) => {
    startTransition(() => {
      setLoadedAlbumIds((currentIds) =>
        currentIds.includes(albumId) ? currentIds : [...currentIds, albumId],
      );
    });
  };

  return (
    <div className="app-shell">
      <header className="site-hero" id="start">
        <div className="hero-copy">
          <p className="section-label">Aron Benkoczy</p>
          <h1>Software engineer and music maker for strange digital worlds.</h1>
          <p className="hero-tagline">Two fields. One portfolio.</p>
          <p className="hero-description">
            I build backend-heavy software systems and create dark music, sound
            design, and game audio under Before You Close Your Mind.
          </p>
          <div className="hero-buttons">
            <a href="#software" className="btn btn-primary">
              Explore Software
            </a>
            <a href="#music" className="btn btn-secondary">
              Explore Music / Game Audio
            </a>
            <a href="#projects" className="btn btn-ghost">
              Explore Projects
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Quick links and highlights">
          <div className="hero-art-frame hero-avatar-card">
            <div className="hero-avatar-image-wrap">
              <picture>
                <source media="(max-width: 640px)" srcSet={heroAvatarMobile} />
                <img
                  src={heroAvatar}
                  alt="Aron Benkoczy standing outdoors below a rocky hillside."
                  className="hero-avatar-image"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
            </div>
          </div>
          {/* <div className="hero-panel-card">
            <p className="panel-label">Jump to</p>
            <nav className="jump-links" aria-label="Section navigation">
              <a href="#software">Software Engineering</a>
              <a href="#music">Music / Game Audio</a>
              <a href="#contact">Contact</a>
            </nav>
          </div> */}
          <div className="hero-panel-card hero-panel-accent">
            <p className="panel-label">Current focus</p>
            <p>To enjoy every second of being a dad</p>
            <p>Python, AWS, event-driven systems</p>
            <p>Releasing new Metal/Trip-hop albums</p>
            <p>Audio for Indie games</p>
          </div>
          <div className="hero-panel-card">
            <p className="panel-label">Contact</p>
            <div className="contact-links contact-links-top">
              {featuredLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </header>

      <main>
        <section className="section section-software" id="software">
          <p className="section-label">01 / Software Engineering</p>
          <div className="section-intro">
            <h2>Full-stack systems, cloud delivery, and integration work.</h2>
            <p>
              Curated from the current CV, focused on the roles and skills that
              best represent the software side of the portfolio.
            </p>
          </div>

          <div className="horizontal-scroll-row software-highlight-row">
            {softwareHighlights.map((item) => (
              <article key={item.label} className="software-highlight-card horizontal-card">
                <p className="software-highlight-value">{item.value}</p>
                <p className="software-highlight-label">{item.label}</p>
              </article>
            ))}
          </div>

          <div className="horizontal-scroll-row summary-row">
            <article className="info-card horizontal-card">
              <p className="panel-label">Professional Summary</p>
              <h3>What I do best</h3>
              <ul className="bullet-list bullet-list-tight">
                <li>Build backend, frontend, and cloud-based systems.</li>
                <li>Modernize legacy services without losing delivery reliability.</li>
                <li>Improve engineering flow with observability, CI/CD, and AI-assisted workflows.</li>
              </ul>
            </article>

            <article className="info-card horizontal-card">
              <p className="panel-label">Core Skills</p>
              <h3>Stack snapshot</h3>
              <div className="skill-stack">
                {skillGroups.map((group) => (
                  <div key={group.label} className="skill-group skill-group-stack">
                    <p className="skill-group-label">{group.label}</p>
                    <div className="chip-wrap chip-wrap-inline">
                      {group.items.map((item) => (
                        <span key={`${group.label}-${item}`} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
            
          </div>

          <div className="horizontal-scroll-row timeline-row">
            {experienceCards.map((experience) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className="timeline-card horizontal-card"
              >
                <div className="timeline-header">
                  <div>
                    <p className="timeline-meta">{experience.period}</p>
                    <h3>{experience.role}</h3>
                    <p className="subtitle">{experience.company}</p>
                  </div>
                  <p className="timeline-context">{experience.context}</p>
                </div>
                <ul className="bullet-list">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <article className="education-line">
            <p>
              <span className="panel-label">Education</span>
              University of Szeged, BSc in Computer Software Engineering.
            </p>
          </article>
        </section>

        <section className="section section-music" id="music">
          <p className="section-label">02 / Music / Game Audio</p>
          <div className="section-split">
            <article className="section-split-heading">
              <p className="panel-label">Music identity</p>
              <h2>Before You Close Your Mind</h2>
              <p>
                The audio side of the portfolio lives here: game sound, dark
                electronic work, and Bandcamp releases.
              </p>
            </article>
            <article className="section-split-body">
              <h3>Discography</h3>
              <ul className="bullet-list">
                <li>Albums, EPs, Singles</li>
              </ul>
            </article>
          </div>

          <div
            className="horizontal-scroll-row bandcamp-row"
            aria-label="Bandcamp discography embeds"
          >
            {bandcampAlbums.map((album) => (
              <article className="bandcamp-card horizontal-card" key={album.albumId}>
                <div className="bandcamp-card-header">
                  <h4>{album.title}</h4>
                  <a href={album.url} target="_blank" rel="noreferrer" className="inline-link">
                    Open on Bandcamp
                  </a>
                </div>
                {loadedAlbumIds.includes(album.albumId) ? (
                  <iframe
                    title={`Bandcamp player for ${album.title}`}
                    className="bandcamp-embed"
                    style={{ border: 0, width: "100%", height: "120px" }}
                    src={`https://bandcamp.com/EmbeddedPlayer/album=${album.albumId}/size=large/bgcol=181a1b/linkcol=056cc4/tracklist=false/artwork=small/transparent=true/`}
                    loading="lazy"
                    seamless
                  >
                    <a href={album.url}>
                      {album.title} by Before You Close Your Mind
                    </a>
                  </iframe>
                ) : (
                  <div className="bandcamp-placeholder">
                    <p>Load the Bandcamp player only when you want to listen.</p>
                    <button
                      type="button"
                      className="player-button"
                      onClick={() => loadAlbumPlayer(album.albumId)}
                    >
                      Load player
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="section-intro music-followup">
            <h3>Game showcase</h3>
            <p>
              Audio and atmosphere inside games.
            </p>
          </div>

          <div className="horizontal-scroll-row music-project-row">
            {gameReferences.map((game) => (
              <article key={game.title} className="save-card horizontal-card">
                {game.imageSrc ? (
                  <div className="project-card-image-wrap game-card-image-wrap">
                    <img
                      src={game.imageSrc}
                      alt={game.imageAlt ?? `${game.title} screenshot`}
                      className="project-card-image game-card-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}
                <h3>{game.title}</h3>
                <p className="subtitle">{game.subtitle}</p>
                <dl>
                  <div>
                    <dt>Type</dt>
                    <dd>{game.type}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{game.role}</dd>
                  </div>
                  <div>
                    <dt>Mood</dt>
                    <dd>{game.mood}</dd>
                  </div>
                  <div>
                    <dt>Use case</dt>
                    <dd>{game.useCase}</dd>
                  </div>
                  <div>
                    <dt>Tools</dt>
                    <dd>{game.tools}</dd>
                  </div>
                </dl>
                <a href={game.link} target="_blank" rel="noreferrer" className="inline-link">
                  Open project
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-projects" id="projects">
          <p className="section-label">03 / Projects</p>
          <div className="section-split">
            <article className="section-split-heading">
              <p className="panel-label">Not client work</p>
              <h2>Misc projects.</h2>
              <p>
                Open source, side builds, and hobby rabbit holes.
              </p>
            </article>
            <article className="section-split-body">
              <h3>What belongs here</h3>
              <ul className="bullet-list">
                <li>Open source experiments and workflow tooling</li>
                <li>Game prototypes and interactive side ideas</li>
                <li>Personal systems that connect code and creative practice</li>
              </ul>
            </article>
          </div>

          <div className="horizontal-scroll-row project-row">
            {projectCards.map((project) => (
              <article key={project.title} className="project-card horizontal-card">
                {project.imageSrc ? (
                  <div className="project-card-image-wrap">
                    <img
                      src={project.imageSrc}
                      alt={project.imageAlt ?? `${project.title} screenshot`}
                      className="project-card-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}
                <p className="panel-label">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p className="project-card-copy">{project.description}</p>
                <ul className="bullet-list">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a
                  href={project.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-link project-card-link"
                >
                  {project.ctaLabel}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-contact" id="contact">
          <p className="section-label">04 / Contact</p>
          <div className="section-intro contact-intro">
            <h3>Find Before You Close Your Mind across streaming, social, and game platforms.</h3>
            <p>
              Pick a platform, jump into releases, or explore game-related work from one place.
            </p>
          </div>
          <div className="horizontal-scroll-row contact-row">
            {contactGroups.map((group) => (
              <article key={group.title} className="contact-card horizontal-card">
                <p className="panel-label">{group.title}</p>
                <p className="contact-card-copy">{group.description}</p>
                <div className="contact-links contact-links-minimal">
                  {group.links.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
