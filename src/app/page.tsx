import { Belt } from "@/components/Belt";
import { Bunting } from "@/components/Bunting";
import { CopyAddress } from "@/components/CopyAddress";
import { Countdown } from "@/components/Countdown";
import { Edges } from "@/components/Edge";
import { ExpectFilm } from "@/components/ExpectFilm";
import { Glyph, PALM_PATH } from "@/components/Glyph";
import { Header } from "@/components/Header";
import { Register } from "@/components/Register";
import { RegisterButton } from "@/components/RegisterButton";
import { Ribbon } from "@/components/Ribbon";
import { SoundPlayer } from "@/components/SoundPlayer";
import { Symbols } from "@/components/Symbols";
import {
  days, event, faq, live, ministers, PAIRS, pastThemes, sessions, social, voices,
} from "@/content/site";
import { zigTile } from "@/lib/fabric";

const Palm = () => (
  <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d={PALM_PATH} /></svg>
);

function XmasStar() {
  return (
    <svg className="xstar" viewBox="0 0 64 64" aria-hidden="true">
      <g className="rays"><path d="M32 2v14M32 48v14M2 32h14M48 32h14M11 11l8 8M45 45l8 8M53 11l-8 8M19 45l-8 8" /></g>
      <path className="core" d="M32 14l4.2 13.8L50 32l-13.8 4.2L32 50l-4.2-13.8L14 32l13.8-4.2z" />
      <circle className="sp s1" cx="52" cy="14" r="2.2" /><circle className="sp s2" cx="12" cy="50" r="1.8" /><circle className="sp s3" cx="54" cy="48" r="1.6" />
    </svg>
  );
}

const RUNNERS = [
  ["/assets/flat-teal.webp", "86%", ".1s"], ["/assets/flat-mustard.webp", "100%", ".25s"],
  ["/assets/flat-crimson.webp", "76%", ".4s"], ["/assets/flat-coral.webp", "94%", ".55s"],
  ["/assets/flat-lime.webp", "82%", ".7s"],
];

export default function Home() {
  const liveLinks = live.filter((l) => l.url);
  const socialLinks = social.filter((s) => s.url);
  return (
    <>
      <div className="loader" aria-hidden="true"><Palm /><p>{event.tagline}</p></div>
      <Header />

      <main id="top">
        {/* HERO */}
        <section className="hero" aria-label={`${event.name} ${event.year}`}>
          <Bunting />
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1><img className="logo-hero" src="/assets/logo.png" alt="Festival of Life" width={800} height={674} /></h1>
              <p className="tagline">A celebration of the <em>life of Jesus.</em></p>
              <p className="when-line"><b>{event.dates}</b><span aria-hidden="true">·</span>{event.city}</p>
              <div className="hero-ctas">
                <RegisterButton>I&apos;m attending</RegisterButton>
                <a className="btn btn-line" href="#live"><i className="live-dot" aria-hidden="true" />Watch live</a>
              </div>
            </div>
            <div className="runners" aria-hidden="true">
              <div className="rod" />
              {RUNNERS.map(([img, h, d]) => (
                <div className="sway" key={img}>
                  <div className="runner" style={{ ["--img" as string]: `url(${img})`, ["--h" as string]: h, ["--d" as string]: d }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A NEW CHAPTER */}
        <section className="chapter" aria-labelledby="chapterH">
          <div className="photos" aria-hidden="true">
            <img src="/assets/sod-photo-1.webp" alt="" loading="lazy" />
            <img src="/assets/sod-photo-0.webp" alt="" loading="lazy" />
            <img src="/assets/sod-photo-2.webp" alt="" loading="lazy" />
          </div>
          <div className="wrap">
            <p className="was">For years, it&apos;s been <b>School of Destiny.</b></p>
            <div className="marquee" aria-label="Past School of Destiny themes">
              <div className="track">
                {[...pastThemes, ...pastThemes].map((src, i) => <img key={i} src={src} alt="" loading="lazy" />)}
              </div>
            </div>
            <p className="sod-note">Where hearts eagerly await this gathering of God&apos;s people for spiritual training, the experience of His glory and wisdom.</p>
            <div className="now">
              <h2 id="chapterH">It&apos;s now a <span>new chapter.</span></h2>
              <p>Festival of Life unveils the culmination and climax of our identity and culture. Same family, same fire, a bigger celebration.</p>
            </div>
          </div>
        </section>

        <Ribbon bg="var(--cream)" label="Extravagant grace calls for extravagant celebration"
          big="Extravagant grace ◆ calls for ◆ extravagant celebration ◆ "
          small={`${event.tagline} · 23–27 December 2026 · ${event.city} · `}
          c1="#eda60e" c2="#800d10" t1="#341004" t2="#ec6d5e"
          d="M-200 120 C 150 20, 450 20, 800 110 S 1350 230, 1800 90" />

        {/* STATEMENT + THEME */}
        <section className="statement" id="theme" aria-labelledby="stmt">
          <Edges left="red" right="teal" />
          <div className="wrap">
            <h2 className="big" id="stmt"><span className="ln r">Extravagant grace</span><span className="ln">calls for</span><span className="ln r">extravagant</span><span className="ln">celebration.</span></h2>
            <div className="statement-sub">
              <figure className="strip-photo" style={{ margin: 0 }}>
                <img src="/assets/symbol-strips.webp" loading="lazy" style={{ objectPosition: "30% center" }}
                  alt="Tapestry runners showing the cup and bread, fire, dove, cross, staff, crown of thorns, crown, Bible, praying hands and tamarisk tree" />
              </figure>
              <div className="theme-copy">
                <p className="eyebrow mark" style={{ color: "var(--red)" }}>This December</p>
                <h2>It&apos;s time for the celebration of <em>the life of Jesus.</em></h2>
                <p>He was dead and He is alive forevermore. That calls for more than a polite clap. For five days in Ojodu we gather to celebrate Him out loud: in worship, in the Word, and in our most extravagant outfits.</p>
                <div className="theme-mark">
                  <span className="eyebrow" style={{ color: "var(--muted-ink)" }}>2026 theme</span>
                  <div className="torrents"><img src="/assets/torrents.png" alt={event.theme} width={730} height={440} loading="lazy" /></div>
                </div>
                <p>Our 2026 theme is {event.theme}. Come expecting more of Him than you can hold.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MINISTERS */}
        <section className="ministers" id="ministers" aria-labelledby="minH">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="minH">At the table</h2>
              <p className="note">Ministering across five days of morning and evening sessions.</p>
            </div>
            <div className="mgrid">
              {ministers.map((m) => (
                <article className="mcard" key={m.name}>
                  <div className="pic"><img src={m.photo} alt={`Pastor ${m.name}`} loading="lazy" />{m.host && <span className="host">Host</span>}</div>
                  <div className="zig" style={{ backgroundImage: zigTile(m.pair) }} />
                  <div className="mname"><small>Pastor</small><b>{m.name}</b></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAMME */}
        <section className="programme" id="programme" aria-labelledby="progH">
          <Edges left="red" right="yellow" />
          <div className="wrap">
            <div className="sec-head">
              <h2 id="progH">Five days of<br />celebration</h2>
              <p className="note">Two sessions a day, Wednesday 23 to Sunday 27 December. Come for one. You&apos;ll want all ten.</p>
            </div>
            <div className="days">
              {days.map((d, i) => {
                const [bg, fg] = PAIRS[d.pair];
                return (
                  <div className="day" key={d.short}>
                    <div className="dayname">
                      <svg className="dm" viewBox="0 0 28 28" aria-hidden="true"><path d="M14 1 L27 14 L14 27 L1 14Z" fill={bg} /><path d="M14 7 L21 14 L14 21 L7 14Z" fill={fg} /></svg>
                      <div>
                        <b>{d.short}</b><small>{d.date} 2026</small>
                        {d.badge && <span className="xmas"><XmasStar /><span>{d.badge}</span></span>}
                      </div>
                    </div>
                    <div className="sessions">
                      <div className="sess"><time>09:00</time><span className="t">{sessions[i].morning}</span><span className="k">Morning</span></div>
                      <div className="sess"><time>17:00</time><span className="t">{sessions[i].evening}</span><span className="k">Evening</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Ribbon bg="var(--black)" reverse
          big="Hosanna ◆ Jesus reigns here ◆ was dead, now alive ◆ "
          small={`Festival of Life · ${event.tagline} · `}
          c1="#96d0c2" c2="#b4d030" t1="#2d6562" t2="#546603"
          d="M-200 90 C 250 210, 600 200, 900 110 S 1400 10, 1800 130" />

        {/* VOICES */}
        <section className="voices" id="celebrate" aria-labelledby="voicesH">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="voicesH">Five ways<br />we celebrate</h2>
              <p className="note">Grace this extravagant can&apos;t be celebrated one way. We celebrate because we&apos;re alive, we rejoice because we&apos;re saved, and we leave made new.</p>
            </div>
            <div className="stack">
              {voices.map((v, i) => {
                const [c, t] = PAIRS[v.pair];
                return (
                  <article className="vcard" key={v.word} aria-labelledby={`v${i}`}
                    style={{ ["--i" as string]: i, ["--c" as string]: c, ["--t" as string]: t, ["--img" as string]: `url(${v.strip})` }}>
                    <div className="vtext">
                      <div className="vtop"><span className="glyph"><Glyph name={v.glyph as "crown"} /></span></div>
                      <h3 className="vword" id={`v${i}`}>{v.word}</h3>
                      <p className="vquote">{v.quote}</p>
                      <p className="vbody">{v.body}</p>
                      <p className="verse">{v.verse}<cite>{v.ref}</cite></p>
                    </div>
                    <div className="vstrip" role="img" aria-label={`${v.word} tapestry panel`} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SYMBOLS */}
        <section className="symbols" aria-labelledby="symH">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="symH">Symbols of<br />our culture</h2>
              <p className="note">Ten symbols are woven into every runner, banner and robe of Festival of Life. Each one tells part of the story we celebrate.</p>
            </div>
            <Symbols />
          </div>
        </section>

        {/* LOOKBOOK */}
        <section className="looks" aria-labelledby="looksH">
          <Edges left="yellow" right="lime" />
          <div className="wrap">
            <div className="verse-lead">
              <div className="palm-badge" aria-hidden="true"><Palm /></div>
              <blockquote className="mt-verse" style={{ margin: 0 }}>
                “And a very great multitude spread their <b>clothes</b> on the road; others cut down <b>branches from the trees</b> and spread them on the road.”<cite>Matthew 21:8</cite>
              </blockquote>
            </div>
            <div className="sec-head">
              <h2 id="looksH">Spread your<br />clothes on the road</h2>
              <p className="note">When Jesus rode in, the crowd dressed the road for Him. This December we dress up for Him.</p>
            </div>
          </div>
          <Belt />
          <p className="belt-hint">Drag the belt. Pick your look.</p>
        </section>

        {/* WHAT TO EXPECT */}
        <section className="expect" id="expect" aria-labelledby="expectH">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="expectH">What to<br />expect</h2>
              <p className="note">A 25-second walk from the gate to the main hall. Press play, or tap a scene.</p>
            </div>
            <ExpectFilm />
          </div>
        </section>

        {/* VISIT */}
        <section className="visit" id="visit" aria-labelledby="visitH">
          <div className="wrap vgrid">
            <div className="vinfo">
              <p className="eyebrow mark">Plan your visit</p>
              <h2 id="visitH">Find us<br />in Ojodu</h2>
              <p className="addr" id="addr">{event.address}</p>
              <dl className="facts">
                <dt>Dates</dt><dd>{event.datesLong}</dd>
                <dt>Mornings</dt><dd>{event.morning}</dd>
                <dt>Evenings</dt><dd>{event.evening}</dd>
                <dt>Hosts</dt><dd>{event.hosts}</dd>
              </dl>
              <div className="vbtns">
                <a className="btn btn-teal btn-sm" href={event.mapsUrl} target="_blank" rel="noopener">Open in Maps</a>
                <CopyAddress text={event.address} />
              </div>
            </div>
            <div className="faq">
              <h3>Before you come</h3>
              {faq.map((f, i) => (
                <details key={f.q} open={i === 0}><summary>{f.q}</summary><div className="ans">{f.a}</div></details>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE */}
        <section className="live" id="live" aria-labelledby="liveH">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="liveH">Celebrate from<br />wherever you are</h2>
              <p className="note">
                {liveLinks.length
                  ? "Every session streams live. Can't make it to Ojodu? Join the celebration from your sitting room."
                  : "Every session will stream live. Links will be posted here before 23 December."}
              </p>
            </div>
            <div className="lgrid">
              {live.map((l) => {
                const [c, t] = PAIRS[l.pair];
                const inner = (<><b>{l.label}</b><span>{l.url ? l.sub : "Link coming soon"} <span aria-hidden="true">{l.url ? "↗" : ""}</span></span></>);
                return l.url
                  ? <a key={l.label} className="ltile" href={l.url} target="_blank" rel="noopener" style={{ ["--c" as string]: c, ["--t" as string]: t }}>{inner}</a>
                  : <div key={l.label} className="ltile" style={{ ["--c" as string]: c, ["--t" as string]: t, opacity: 0.85 }}>{inner}</div>;
              })}
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="count" aria-labelledby="countH">
          <div className="wrap">
            <h2 id="countH">The celebration of the <span>life of Jesus</span> begins in</h2>
            <Countdown />
            <p className="ready">Plenty of time to get the agbada pressed. Not enough to keep postponing it.</p>
          </div>
        </section>

        {/* I'M ATTENDING */}
        <section className="attend-wrap" aria-labelledby="attH">
          <div className="wrap">
            <div className="attend">
              <div className="txt">
                <p className="eyebrow mark" style={{ color: "var(--red-t)" }}>Tell everyone</p>
                <h2 id="attH">I&apos;m attending <span>Festival of Life.</span></h2>
                <p>Register in a minute, then make your own I&apos;m Attending card with your photo and name. Post it, send it, set it as your status.</p>
                <div className="btns"><RegisterButton>Register and make my card</RegisterButton></div>
              </div>
              <div className="preview" aria-hidden="true"><div className="bx">I&apos;m Attending</div><div className="ph-win">Your photo</div><div className="bx">Your name</div></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ftr">
        <div className="ftr-bg" aria-hidden="true"><span>Festival of Life · Festival of Life</span><span>Hosanna · Hosanna · Hosanna</span></div>
        <div className="wrap">
          <div className="fgrid">
            <div>
              <img src="/assets/logo.png" alt="Festival of Life" width={114} height={96} />
              <p style={{ color: "var(--muted-cream)", maxWidth: "34ch" }}>{event.tagline}. 23–27 December 2026, {event.address}.</p>
            </div>
            <div><h4>Explore</h4><ul><li><a href="#ministers">Ministers</a></li><li><a href="#programme">Programme</a></li><li><a href="#celebrate">Celebrate</a></li></ul></div>
            <div><h4>Visit</h4><ul><li><a href="#visit">Directions</a></li><li><a href="#visit">FAQ</a></li><li><a href="#live">Watch live</a></li></ul></div>
            {socialLinks.length > 0 && (
              <div><h4>Connect</h4><ul>{socialLinks.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener">{s.label}</a></li>)}</ul></div>
            )}
          </div>
          <div className="fsmall"><span>© 2026 {event.hosts}</span></div>
        </div>
      </footer>

      <div className="mbar">
        <RegisterButton>I&apos;m attending</RegisterButton>
        <a className="btn btn-line" href="#live" aria-label="Watch live"><i className="live-dot" aria-hidden="true" />Live</a>
      </div>
      <SoundPlayer />
      <Register />
    </>
  );
}
