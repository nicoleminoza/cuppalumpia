// cl-sections.jsx — page sections: Header, Hero, Stand (01), Pairing (02),
// Craft (04), Footer. Reservations (03) lives in cl-reserve.jsx.
// Pulls primitives + icons from window (loaded by cl-brand.jsx / cl-icons.jsx).

const { KraftCup, Kicker, SectionTag, Rule, Placeholder, useOpenStatus, StatusDot } = window;

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
          Frozen by the dozen &amp; catering available now.
          <span style={{ opacity: 0.62 }}>&nbsp; The farm stand opens </span>
          <b style={{ fontWeight: 600 }}>June 27 &amp; 28</b>.
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
  const links = [['#stand', 'The Stand'], ['#pairing', 'The Pairing'],
  ['#reserve', 'Reserve'], ['#craft', 'Reheat']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40,
      background: 'color-mix(in srgb, var(--bg) 86%, transparent)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 64,
        padding: '0 clamp(22px, 6vw, 84px)', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 20 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'baseline', gap: 8,
          textDecoration: 'none', color: 'var(--ink)' }}>
          <span style={{ fontFamily: "'Yellowtail',cursive", fontSize: 22, color: 'var(--accent)',
            transform: 'rotate(-3deg)', lineHeight: 1 }}>Cuppa</span>
          <span style={{ fontFamily: "var(--display)", fontSize: 17, letterSpacing: '0.04em' }}>
            LUMPIA</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="cl-nav">
          {links.map(([href, label]) =>
          <a key={href} href={href} className="cl-navlink" style={{ fontFamily: "'Oswald',sans-serif",
            fontWeight: 500, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', textDecoration: 'none' }}>{label}</a>
          )}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <StatusDot open={s.open} />
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: s.open ? 'var(--green)' : 'var(--muted)' }}>
            {s.prelaunch ? 'Opens Jun 27' : s.open ? 'Open · 11–2' : 'Weekends · 11–2'}</span>
        </div>
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
            <Kicker style={{ fontSize: 14, letterSpacing: '0.26em', lineHeight: 1.8 }}>
              Filipino Family Recipe · Bainbridge Island<br />Rolling Since 2026
            </Kicker>
            <div style={{ margin: '26px 0 0', lineHeight: 0.82 }}>
              <div style={{ fontFamily: "'Yellowtail',cursive", color: 'var(--accent)',
                fontSize: 'clamp(40px, 6vw, 78px)', transform: 'rotate(-3deg)',
                marginLeft: 6 }}>Cuppa</div>
              <div style={{ fontFamily: "var(--display)", color: 'var(--ink)',
                fontSize: 'clamp(64px, 12vw, 168px)', letterSpacing: '0.005em',
                marginTop: 'clamp(2px, 1vw, 10px)' }}>LUMPIA</div>
            </div>
            <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px, 1.6vw, 22px)',
              lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: 440,
              margin: '30px 0 0' }}>{tagline}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 38 }}>
              <CTA href="#reserve">Reserve a batch</CTA>
              <CTA href="#pairing" solid={false}>See the pairing</CTA>
            </div>
          </div>
          {/* art object — image placeholder for a hero photo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center' }}>
            <div className="cl-stage" style={{ width: '100%' }}>
              <Placeholder caption="A dangerously crispy hero shot lands right here." ratio="4 / 5" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 18,
              flexWrap: 'wrap' }}>
              <StatusDot open={s.open} />
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 11.5,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: s.open ? 'var(--green)' : 'var(--ink)' }}>{s.label}</span>
              <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 13,
                color: 'var(--muted)' }}>{s.sub}</span>
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
          <Statement style={{ marginTop: 30 }}>Freshly fried at our home, every Saturday and&nbsp;Sunday.</Statement>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 32,
            padding: '13px 20px', border: '1px solid var(--line)', background: 'var(--surface)',
            flexWrap: 'wrap' }}>
            <StatusDot open={s.open} />
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: s.open ? 'var(--green)' : 'var(--ink)' }}>{s.label}</span>
            <span style={{ width: 1, height: 16, background: 'var(--line)' }} />
            <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 14,
              color: 'var(--muted)' }}>{s.sub}</span>
          </div>
        </div>
        <div>
          <MatrixRow k="Find us">
            <window.MapPin size={15} style={{ display: 'inline', verticalAlign: '-2px',
              marginRight: 8, color: 'var(--accent)' }} />
            9251 NE Lovgreen Rd<br />Bainbridge Island, WA
          </MatrixRow>
          <MatrixRow k="Hours">
            <window.Clock size={15} style={{ display: 'inline', verticalAlign: '-2px',
              marginRight: 8, color: 'var(--accent)' }} />
            Saturday &amp; Sunday · 11 AM – 2 PM<br />Until sold out
          </MatrixRow>
          <MatrixRow k="Sell-out">
            <em style={{ color: 'var(--ink-soft)' }}>"We fry until we run out, which could happen before two."</em> <span style={{ fontStyle: 'normal' }}>🍳</span>
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
      <span style={{ fontFamily: "var(--display)", fontSize: 22, color: 'var(--accent)' }}>{price}</span>
    </div>);

}

function Pairing() {
  return (
    <Section id="pairing">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 24 }}>
        <SectionTag num="02" label="The Pairing" />
        <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 16,
          color: 'var(--muted)' }}>One recipe. One kind. Done right.</span>
      </div>
      <Statement style={{ marginTop: 30, maxWidth: 820 }}>
        One pairing, perfected. Rich and golden, met with cold and tart.
      </Statement>

      <div className="cl-two" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
        gap: 'clamp(34px, 6vw, 80px)', marginTop: 'clamp(40px,5vw,72px)', alignItems: 'start' }}>
        {/* The lumpia */}
        <div>
          <Kicker>The Lumpia</Kicker>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.7vw,21px)', lineHeight: 1.6,
            color: 'var(--ink)', margin: '16px 0 0', maxWidth: 460 }}>
            Seasoned pork, garlic, sweet onion, a whisper of soy. The Miñoza family recipe,
            barely changed in fifty years, wrapped in paper-thin skins and fried until shatter-crisp.
          </p>
          <div style={{ marginTop: 30 }}>
            <PriceLine name="Half Dozen" qty="6 pieces" price="$15" />
            <PriceLine name="Full Dozen" qty="12 pieces" price="$25" />
          </div>
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
        </div>
        {/* image */}
        <div>
          <Placeholder caption="Golden, shatter-crisp, and very photogenic. Pic incoming." ratio="4 / 5" />
        </div>
      </div>

      {/* The refreshment */}
      <div className="cl-refresh" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr',
        gap: 'clamp(34px, 6vw, 80px)', marginTop: 'clamp(40px,5vw,72px)', alignItems: 'center',
        borderTop: '1px solid var(--line)', paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div>
          <Placeholder caption="An ice-cold, sweaty-glass beauty shot goes here." kicker="Drink pic coming" ratio="5 / 4" />
        </div>
        <div>
          <Kicker>The Refreshment</Kicker>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 16 }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 'clamp(26px,3vw,40px)',
              color: 'var(--ink)' }}>Pinoy Palmer</span>
            <span style={{ fontFamily: "var(--display)", fontSize: 22, color: 'var(--accent)' }}>+$5</span>
          </div>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.7vw,21px)', lineHeight: 1.6,
            color: 'var(--ink)', margin: '16px 0 0', maxWidth: 460 }}>
            Steeped black tea over ice, brightened with fresh-squeezed calamansi. Crisp, tart and
            cold, crafted to cut clean through the rich, savory crunch.
          </p>
          <p style={{ fontFamily: "'Yellowtail',cursive", fontSize: 24, color: 'var(--accent)',
            margin: '22px 0 0', transform: 'rotate(-1.5deg)' }}>
            The Filipino answer to a summer afternoon.</p>
        </div>
      </div>
    </Section>);

}

Object.assign(window, { Section, Statement, CTA, AnnounceBar, Header, Hero, Stand, Pairing });