// cl-sections.jsx — page sections: Header, Hero, Stand (01), Pairing (02),
// Craft (04), Footer. Reservations (03) lives in cl-reserve.jsx.
// Pulls primitives + icons from window (loaded by cl-brand.jsx / cl-icons.jsx).

const { KraftCup, Kicker, SectionTag, Rule, Placeholder, Photo, PhotoSlot, Wordmark, useOpenStatus, StatusDot } = window;

// ── Section shell: hairline top + rhythm-scaled vertical padding ─────────────
function Section({ id, children, top = true, style }) {
  return (
    <section id={id} style={{ position: 'relative', ...style }}>
      {top && <div style={{ height: 1, background: 'var(--line)' }} />}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding:
        'calc(var(--rhythm) * 8.5rem) clamp(22px, 6vw, 84px)' }}>
        {children}
      </div>
    </section>);

}

function Statement({ children, style }) {
  return (
    <h2 style={{ fontFamily: "'Lora',serif", fontWeight: 400, fontSize: 'clamp(30px, 4.6vw, 60px)',
      lineHeight: 1.08, letterSpacing: '-0.01em', color: 'var(--ink)', margin: 0,
      textWrap: 'balance', ...style }}>{children}</h2>);

}

function CTA({ children, href, onClick, solid = true }) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 13,
    letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
    padding: '18px 30px', transition: 'all .25s ease', border: '1px solid var(--ink)'
  };
  const solidStyle = { background: hover ? 'var(--accent)' : 'var(--ink)', color: 'var(--bg)',
    borderColor: hover ? 'var(--accent)' : 'var(--ink)' };
  const ghostStyle = { background: 'transparent', color: 'var(--ink)',
    borderColor: 'var(--line)', opacity: hover ? 1 : 0.85 };
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{ ...base, ...(solid ? solidStyle : ghostStyle) }}>
      {children}
      <window.ArrowUpRight size={16} />
    </a>);

}

// ── Announcement ribbon ───────────────────────────────────────────────────────
function AnnounceBar() {
  return (
    <div style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', minHeight: 40,
        padding: '9px clamp(22px, 6vw, 84px)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 'clamp(10px,2vw,18px)', flexWrap: 'wrap',
        textAlign: 'center' }}>
        <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 10.5,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)',
          whiteSpace: 'nowrap' }}>Now taking orders</span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor',
          opacity: 0.4 }} />
        <span style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(13px,1.4vw,15px)',
          lineHeight: 1.4 }}>
          Frozen dozens &amp; catering —
          <b style={{ fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em',
            textTransform: 'uppercase', whiteSpace: 'nowrap' }}>&nbsp;available now</b>.
          <span style={{ opacity: 0.72 }}>&nbsp; Fresh-fried at the weekend stand, 11–2.</span>
        </span>
        <a href="#reserve" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600,
          fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--bg)', textDecoration: 'none', borderBottom: '1px solid var(--accent)',
          paddingBottom: 2, whiteSpace: 'nowrap' }}>Reserve ↗</a>
      </div>
    </div>);

}

// ── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const s = useOpenStatus();
  const links = [['#stand', 'The Stand'], ['#pairing', 'The Menu'],
  ['#reserve', 'Reserve'], ['#catering', 'Catering'], ['#craft', 'Reheat']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40,
      background: 'color-mix(in srgb, var(--bg) 86%, transparent)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 64,
        padding: '0 clamp(22px, 6vw, 84px)', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 20 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10,
          textDecoration: 'none', color: 'var(--ink)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontFamily: "'Yellowtail',cursive", fontSize: 15, color: 'var(--accent)',
              transform: 'rotate(-2deg)', transformOrigin: 'left center', lineHeight: 1,
              marginLeft: '0.04em', position: 'relative', top: -1 }}>Cuppa</span>
            <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 19, letterSpacing: '0.012em' }}>
              LUMPIA</span>
          </span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="cl-nav">
          {links.map(([href, label]) =>
          <a key={href} href={href} className="cl-navlink" style={{ fontFamily: "'Oswald',sans-serif",
            fontWeight: 500, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', textDecoration: 'none' }}>{label}</a>
          )}
        </nav>
        {!s.prelaunch && <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <StatusDot open={s.open} />
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: s.open ? 'var(--green)' : 'var(--muted)' }}>
            {s.open ? 'Open · 11–2' : 'Weekends · 11–2'}</span>
        </div>}
      </div>
    </header>);

}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ tagline }) {
  const s = useOpenStatus();
  return (
    <div id="top" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding:
        'clamp(48px, 7vw, 96px) clamp(22px, 6vw, 84px) calc(var(--rhythm) * 5rem)' }}>
        <div className="cl-hero-grid" style={{ display: 'grid',
          gridTemplateColumns: '1.08fr 0.92fr', gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'center', minHeight: 'min(76vh, 720px)' }}>
          {/* type */}
          <div>
            <img src={window.CL_HERO_LOGO} alt="Cuppa Lumpia"
              style={{ display: 'block', width: '100%', maxWidth: 480, height: 'auto',
                margin: 0, filter: 'drop-shadow(0 10px 26px rgba(0,0,0,0.4))' }} />
            <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px, 1.6vw, 22px)',
              lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: 440,
              margin: '30px 0 0' }}>{tagline}</p>
            <p style={{ fontFamily: "'Lora',serif", fontStyle: 'italic',
              fontSize: 'clamp(14px, 1.2vw, 16px)', color: 'var(--accent)',
              margin: '16px 0 0' }}>Sold out both opening days.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 32 }}>
              <CTA href="#reserve">Order frozen dozens</CTA>
              <CTA href="#pairing" solid={false}>See the menu</CTA>
            </div>
            <p style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 12.5,
              letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--muted)',
              margin: '18px 0 0', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <a href="#catering" style={{ color: 'var(--accent)', textDecoration: 'none',
                borderBottom: '1px solid color-mix(in srgb, var(--accent) 50%, transparent)' }}>Catering available now</a>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Fresh-fried weekends · 11–2</span>
            </p>
          </div>
          {/* art object — image placeholder for a hero photo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center' }}>
            <div className="cl-stage" style={{ width: '100%' }}>
              <Photo src="hero-cups-4x5.png" alt="Cuppa Lumpia cups and iced tea in a basket, ready to serve" ratio="4 / 5" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 18,
              flexWrap: 'wrap' }}>
              {!s.prelaunch && <StatusDot open={s.open} />}
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: s.prelaunch ? 700 : 600,
                fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: s.prelaunch ? 'var(--bg)' : s.open ? 'var(--green)' : 'var(--ink)',
                background: s.prelaunch ? 'var(--accent)' : 'transparent',
                padding: s.prelaunch ? '3px 10px' : 0, borderRadius: s.prelaunch ? 4 : 0,
                flexShrink: 0, whiteSpace: 'nowrap' }}>{s.prelaunch ? 'Stand opens July 11 & 12' : s.label}</span>
              {!s.prelaunch && <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 13,
                color: 'var(--muted)' }}>{s.sub}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

// ── 01 · The Stand ────────────────────────────────────────────────────────────
function MatrixRow({ k, children, last }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 'clamp(16px,3vw,40px)',
      padding: '22px 0', borderBottom: last ? 'none' : '1px solid var(--line)',
      alignItems: 'baseline' }}>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>{k}</div>
      <div style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(16px,1.5vw,20px)',
        lineHeight: 1.5, color: 'var(--ink)' }}>{children}</div>
    </div>);

}

function Stand() {
  const s = useOpenStatus();
  return (
    <Section id="stand">
      <div className="cl-two" style={{ display: 'grid', gridTemplateColumns: '0.86fr 1.14fr',
        gap: 'clamp(34px, 6vw, 88px)', alignItems: 'start' }}>
        <div>
          <SectionTag num="01" label="The Stand" />
          <Statement style={{ marginTop: 30 }}>The weekend stand is open every Saturday and Sunday, 11 to 2, through&nbsp;September.</Statement>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: s.prelaunch ? 14 : 12, marginTop: 32,
            padding: s.prelaunch ? 0 : '13px 20px',
            border: s.prelaunch ? 'none' : '1px solid var(--line)',
            background: s.prelaunch ? 'transparent' : 'var(--surface)',
            flexWrap: 'wrap' }}>
            {!s.prelaunch && <StatusDot open={s.open} />}
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: s.prelaunch ? 700 : 600,
              fontSize: s.prelaunch ? 15 : 12, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: s.prelaunch ? 'var(--bg)' : s.open ? 'var(--green)' : 'var(--ink)',
              background: s.prelaunch ? 'var(--accent)' : 'transparent',
              padding: s.prelaunch ? '5px 14px' : 0, borderRadius: s.prelaunch ? 5 : 0,
              flexShrink: 0, whiteSpace: 'nowrap' }}>{s.label}</span>
            {!s.prelaunch && <span style={{ width: 1, height: 16, background: 'var(--line)' }} />}
            {!s.prelaunch && <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 14,
              color: 'var(--muted)' }}>{s.sub}</span>}
          </div>
        </div>
        <div>
          <MatrixRow k="Find us">
            <window.MapPin size={15} style={{ display: 'inline', verticalAlign: '-2px',
              marginRight: 8, color: 'var(--accent)' }} />
            9251 NE Lovgreen Rd<br />Bainbridge Island, WA
            <span style={{ display: 'block', fontFamily: "'Lora',serif", fontStyle: 'italic',
              fontSize: 14.5, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>
              On Lovgreen Rd between Madison Ave &amp; Hwy 305, just down from Raquel's Farm Stand.
            </span>
            <a href="https://www.google.com/maps/search/?api=1&query=9251+NE+Lovgreen+Rd+Bainbridge+Island+WA"
              target="_blank" rel="noopener" className="cl-flink"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12,
                fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 11.5,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink)',
                textDecoration: 'none', borderBottom: '1px solid var(--accent)', paddingBottom: 4 }}>
              <window.MapPin size={14} style={{ color: 'var(--accent)' }} />Get directions ↗
            </a>
          </MatrixRow>
          <MatrixRow k="Hours">
            <window.Clock size={15} style={{ display: 'inline', verticalAlign: '-2px',
              marginRight: 8, color: 'var(--accent)' }} />
            Saturday &amp; Sunday · 11 AM – 2 PM<br />Weekends through September · until sold out
          </MatrixRow>
          <MatrixRow k="Sell-out">
            <em style={{ color: 'var(--ink-soft)' }}>"We fry until we run out, which could happen before two."</em>
          </MatrixRow>
          <MatrixRow k="Pre-orders" last>
            Held strictly until <b style={{ fontWeight: 600 }}>1:30 PM</b>. Reserve below and pay at the stand.
          </MatrixRow>
        </div>
      </div>
    </Section>);

}

// ── 02 · The Pairing ──────────────────────────────────────────────────────────
function PriceLine({ name, qty, price }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '16px 0',
      borderBottom: '1px solid var(--line)' }}>
      <span style={{ fontFamily: "'Lora',serif", fontSize: 19, color: 'var(--ink)' }}>{name}</span>
      <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11.5, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--muted)' }}>{qty}</span>
      <span style={{ flex: 1, borderBottom: '1px dotted var(--line)', transform: 'translateY(-4px)' }} />
      <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 22, color: 'var(--accent)' }}>{price}</span>
    </div>);

}

function Pairing() {
  return (
    <Section id="pairing">
      <SectionTag num="02" label="The Menu" />
      <Statement style={{ marginTop: 30, maxWidth: 820 }}>
        One recipe. One kind. Done right.
      </Statement>

      <div className="cl-two" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
        gap: 'clamp(34px, 6vw, 80px)', marginTop: 'clamp(40px,5vw,72px)', alignItems: 'start' }}>
        {/* The lumpia */}
        <div>
          <Kicker>The Lumpia</Kicker>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.7vw,21px)', lineHeight: 1.6,
            color: 'var(--ink)', margin: '16px 0 0', maxWidth: 460 }}>
            Paper-thin skins fried to a <b style={{ fontWeight: 600 }}>shatter</b>, wrapped around
            seasoned pork, garlic, and sweet onion with a whisper of soy. The Miñoza family recipe,
            barely changed in fifty years.
          </p>
          <div style={{ marginTop: 30 }}>
            <PriceLine name="Half Dozen" qty="6 pieces · fresh" price="$15" />
            <PriceLine name="Full Dozen" qty="12 pieces · fresh" price="$25" />
            <PriceLine name="Frozen Dozen" qty="12 · fry at home" price="$20" />
          </div>
          <p style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 14.5,
            color: 'var(--muted)', margin: '14px 0 0' }}>
            Frozen by the dozen, year-round. Same shatter, your kitchen, ten minutes to gold.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            {['Sweet chili', 'Vinegar'].map((t) =>
            <span key={t} style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 11.5,
              letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink)',
              padding: '8px 14px', border: '1px solid var(--line)' }}>
                <window.Leaf size={13} style={{ display: 'inline', verticalAlign: '-2px',
                marginRight: 7, color: 'var(--accent)' }} />{t}</span>
            )}
            <span style={{ alignSelf: 'center', fontFamily: "'Lora',serif", fontStyle: 'italic',
              fontSize: 14, color: 'var(--muted)' }}>house-made, small batch</span>
          </div>
          <p style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 11,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)',
            margin: '20px 0 0' }}>
            Contains pork &amp; wheat · fried in shared oil
          </p>
        </div>
        {/* image */}
        <div>
          <Photo src="fryer-lumpia-4x5.png" alt="Golden fried lumpia filling the fryer basket, straight from the oil" ratio="4 / 5" />
        </div>
      </div>

      {/* The refreshment */}
      <div className="cl-refresh" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr',
        gap: 'clamp(34px, 6vw, 80px)', marginTop: 'clamp(40px,5vw,72px)', alignItems: 'center',
        borderTop: '1px solid var(--line)', paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div>
          <Photo src="pinoy-palmer-toast-5x4.png" alt="Two iced Pinoy Palmers clinking together in a toast" ratio="5 / 4" />
        </div>
        <div>
          <Kicker>The Refreshment</Kicker>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 16 }}>
            <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 'clamp(26px,3vw,40px)',
              color: 'var(--ink)' }}>Pinoy Palmer</span>
            <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 22, color: 'var(--accent)' }}>+$5</span>
          </div>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.7vw,21px)', lineHeight: 1.6,
            color: 'var(--ink)', margin: '16px 0 0', maxWidth: 460 }}>
            Black tea over ice with fresh-squeezed calamansi (the fragrant Filipino lime),
            tart, cold, and built to cut clean through the crunch.
          </p>
          <p style={{ fontFamily: "'Yellowtail',cursive", fontSize: 24, color: 'var(--accent)',
            margin: '22px 0 0', transform: 'rotate(-1.5deg)' }}>
            The Filipino answer to a summer afternoon.</p>
        </div>
      </div>

      {/* How frozen works — year-round fulfillment, surfaced for scanners */}
      <div style={{ marginTop: 'clamp(40px,5vw,72px)', borderTop: '1px solid var(--line)',
        paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: 16 }}>
          <Kicker>How frozen works · Year-round</Kicker>
          <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 15,
            color: 'var(--muted)' }}>No stand needed. Order any day of the year.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 'clamp(22px,3vw,40px)', marginTop: 'clamp(28px,3vw,44px)' }}>
          {[
          ['01', 'Order any day', 'Pick a pickup date in the form below: next-day, every month of the year.'],
          ['02', 'We text a window', 'You get a 3-hour pickup window by text, confirmed the day before.'],
          ['03', 'Grab them cold', 'Straight from the cooler at our door, they stay frozen until you do.'],
          ['04', 'Venmo at pickup', 'Quick and contactless. That is the whole loop, all year long.']].
          map(([n, h, b]) =>
          <div key={n}>
              <div style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 'clamp(30px,3.4vw,46px)',
              color: 'var(--accent)', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 13,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)',
              margin: '14px 0 8px' }}>{h}</div>
              <p style={{ fontFamily: "'Lora',serif", fontSize: 15, lineHeight: 1.5,
              color: 'var(--ink-soft)', margin: 0 }}>{b}</p>
            </div>
          )}
        </div>
      </div>
    </Section>);

}

Object.assign(window, { Section, Statement, CTA, AnnounceBar, Header, Hero, Stand, Pairing });