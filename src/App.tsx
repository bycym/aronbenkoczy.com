import { useEffect, useMemo, useRef, useState } from "react";

type TrackCard = {
  title: string;
  mood: string;
  bestFor: string;
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
};

type BandcampAlbum = {
  title: string;
  url: string;
  albumId: number;
};

const bandcampAlbumUrl =
  "https://beforeyoucloseyourmind.bandcamp.com/album/blurred-tv-shows";

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

const chapters = [
  "00:00 — dark ambient intro",
  "00:17 — chase / runner rhythm",
  "00:34 — impact, noise, transition",
  "00:50 — synthwave melodic section",
  "01:12 — combat / tension",
  "01:35 — emotional post-rock ending",
];

const soundPalette = [
  "Main themes",
  "Menu music",
  "Chase loops",
  "Combat loops",
  "Dark ambient beds",
  "Horror tension",
  "Transition stingers",
  "UI sounds",
  "Trailer music",
  "Experimental audio identities",
  "Mixing / editing",
  "Loopable game music",
];

const tracks: TrackCard[] = [
  {
    title: "Silver Tooth",
    mood: "Metallic, cybernetic, aggressive",
    bestFor: "Boss room, trailer cut, industrial level",
  },
  {
    title: "Forgotten Clue",
    mood: "Melancholic, mysterious, slow-burn",
    bestFor: "Menu, investigation, dream sequence",
  },
  {
    title: "Fighting Waterbears",
    mood: "Strange, kinetic, playful-violent",
    bestFor: "Weird platformer, creature encounter, experimental game",
  },
  {
    title: "Hit By A Bullet",
    mood: "Physical, direct, impact-heavy",
    bestFor: "Action scene, combat montage, chase climax",
  },
];

const gameReferences: GameReference[] = [
  {
    title: "Runaway",
    subtitle: "OST Composing Jam #4",
    type: "Soundtrack",
    role: "Composer / Producer",
    mood: "Chase, forest escape, fast-paced, danger",
    useCase: "Endless runner, action sequence, trailer loop",
    tools: "Polyend Tracker + Ableton Live",
    link: "https://bycym.itch.io/ost-composing-jam-4-runaway",
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
  },
  {
    title: "Valhalla is near",
    subtitle: "2D controller fighting game",
    type: "Action / Fighting",
    role: "Game / audio reference",
    mood: "Mythological, retro, couch-fight energy",
    useCase: "Combat, local multiplayer, retro action",
    tools: "LÖVE",
    link: "https://bycym.itch.io/valhalla-is-near",
  },
];

function formatTime(timeInSeconds: number): string {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setAudioError(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setAudioError(
        "Audio reel is currently unavailable. Add /public/audio/reel.mp3 to enable playback.",
      );
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const progress = useMemo(() => {
    if (!duration) {
      return 0;
    }
    return Math.min(100, (currentTime / duration) * 100);
  }, [currentTime, duration]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setAudioError(null);
    } catch {
      setAudioError("Playback could not start. Use keyboard or click to try again.");
      setIsPlaying(false);
    }
  };

  const onSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) {
      return;
    }

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="app-shell">
      <header className="site-hero" id="start">
        <div className="hero-copy">
          <p className="section-label">01 / Start</p>
          <h1>Before You Close Your Mind</h1>
          <p className="hero-tagline">Music / Sound Design / Game Audio</p>
          <p className="hero-description">
            Dark electronic music, cinematic sound design, synthwave textures,
            ambient noise, and audio for strange indie game worlds.
          </p>
          <div className="hero-buttons">
            <a href="#reel" className="btn btn-primary">
              Play Audio Reel
            </a>
            <a href="#games" className="btn btn-secondary">
              Game References
            </a>
            <a
              href={bandcampAlbumUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Listen on Bandcamp
            </a>
          </div>
        </div>
        <div className="hero-art-frame" aria-label="Blurred TV Shows visual frame">
          <img
            src="https://f4.bcbits.com/img/a2322473639_10.jpg"
            alt="Blurred TV Shows album artwork"
          />
        </div>
      </header>

      <main>
        <section className="section" id="reel">
          <p className="section-label">02 / Transmission Reel</p>
          <article className="reel-card" aria-labelledby="reel-title">
            <h2 id="reel-title">
              Transmission 01 - Game Audio / Sound Design Reel
            </h2>

            <div className="player-row">
              <button
                className="player-button"
                onClick={togglePlayback}
                aria-label={isPlaying ? "Pause audio reel" : "Play audio reel"}
                type="button"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <div className="time-readout" aria-live="polite">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <label htmlFor="reel-progress" className="sr-only">
              Audio reel progress
            </label>
            <input
              id="reel-progress"
              className="progress"
              type="range"
              min={0}
              max={duration || 100}
              value={duration ? currentTime : 0}
              onChange={onSeek}
            />

            <div className="waveform" aria-hidden="true">
              <div className="waveform-fill" style={{ width: `${progress}%` }} />
            </div>

            {audioError ? <p className="audio-error">{audioError}</p> : null}

            <audio ref={audioRef} preload="metadata" src="/audio/reel.mp3">
              Your browser does not support the audio element.
            </audio>

            <ul className="chapter-list">
              {chapters.map((chapter) => (
                <li key={chapter}>{chapter}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section" id="games">
          <p className="section-label">03 / Game References</p>
          <div className="card-grid">
            {gameReferences.map((game) => (
              <article key={game.title} className="save-card">
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

        <section className="section">
          <p className="section-label">04 / Sound Palette</p>
          <div className="chip-wrap">
            {soundPalette.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="section-label">05 / Selected Tracks</p>
          <div className="card-grid">
            {tracks.map((track) => (
              <article key={track.title} className="track-card">
                <h3>{track.title}</h3>
                <p>
                  <strong>Mood:</strong> {track.mood}
                </p>
                <p>
                  <strong>Best for:</strong> {track.bestFor}
                </p>
                <a href={bandcampAlbumUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  Listen
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="section-label">06 / Album</p>
          <article className="album-card">
            <h3>Blurred TV Shows</h3>
            <p>
              A dark electronic album built from synthwave, ambient noise,
              post-rock weight, distorted memories, and cinematic textures.
            </p>
            <a href={bandcampAlbumUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              Listen on Bandcamp
            </a>
          </article>
          <div className="bandcamp-grid" aria-label="Bandcamp discography embeds">
            {bandcampAlbums.map((album) => (
              <article className="bandcamp-card" key={album.albumId}>
                <div className="bandcamp-card-header">
                  <h4>{album.title}</h4>
                  <a href={album.url} target="_blank" rel="noreferrer" className="inline-link">
                    Open on Bandcamp
                  </a>
                </div>
                <iframe
                  title={`Bandcamp player for ${album.title}`}
                  className="bandcamp-embed"
                  src={`https://bandcamp.com/EmbeddedPlayer/album=${album.albumId}/size=large/bgcol=05080f/linkcol=03f2e5/minimal=true/transparent=true/`}
                  seamless
                >
                  <a href={album.url}>{album.title}</a>
                </iframe>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="section-label">07 / About the Signal</p>
          <p className="about-copy">
            Before You Close Your Mind is the solo project of Aron Benkoczy,
            focused on dark electronic music, cinematic sound design, ambient
            noise, synthwave textures, and emotionally heavy instrumental songs.
          </p>
          <p className="about-copy">
            The project lives somewhere between broken television signals,
            dystopian rooms, low-poly dreams, and half-remembered game worlds.
          </p>
        </section>

        <section className="section section-contact" id="contact">
          <p className="section-label">08 / Contact</p>
          <h3>Before You Close Your Mind - music, sound design, and strange little game worlds.</h3>
          <div className="contact-links">
            <a href="https://beforeyoucloseyourmind.bandcamp.com" target="_blank" rel="noreferrer">
              Bandcamp
            </a>
            <a href="https://bycym.itch.io" target="_blank" rel="noreferrer">
              itch.io
            </a>
            <a href="mailto:contact@beforeyoucloseyourmind.com">
              contact@beforeyoucloseyourmind.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
