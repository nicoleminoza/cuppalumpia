// cl-sections2.jsx — 04 · The Craft (reheating tabs) + Footer.

const { Section: Section2, Statement: Statement2, SectionTag: SectionTag2, Kicker: Kicker2 } = window;

const REHEAT = [
  { id: 'air', tab: 'Air Fryer', flag: 'Recommended', Icon: window.Wind,
    temp: '375°F', time: '3–4', unit: 'min',
    body: 'The closest thing to fresh out of the pan. Single layer, no oil, shake once. Pull them the moment the edges go deep gold.' },
  { id: 'oven', tab: 'Oven', flag: null, Icon: window.Flame,
    temp: '400°F', time: '5–6', unit: 'min',
    body: 'Set them on a wire rack over a sheet pan so the heat circles underneath. No rack, no crisp: the bottoms steam against the metal.' },
  { id: 'rule', tab: 'The Rule', flag: 'Read this', Icon: window.NoEntry,
    temp: null, time: null, unit: null,
    body: null },
];

function Craft() {
  const [active, setActive] = React.useState('air');
  const cur = REHEAT.find((r) => r.id === active);
  return (
    <Section2 id="craft">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 24 }}>
        <SectionTag2 num="04" label="The Craft" />
        <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 16,
          color: 'var(--muted)' }}>Take them home. Keep the crunch.</span>
      </div>
      <Statement2 style={{ marginTop: 30, maxWidth: 760 }}>
        Crisp is the whole point. Here is how you protect it.
      </Statement2>

      {/* tab bar — minimal underline indicators */}
      <div style={{ display: 'flex', gap: 'clamp(20px,4vw,44px)', marginTop: 'clamp(34px,4vw,56px)',
        borderBottom: '1px solid var(--line)' }}>
        {REHEAT.map((r) => {
          const on = r.id === active;
          return (
            <button key={r.id} onClick={() => setActive(r.id)} style={{ appearance: 'none',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 18px',
              position: 'relative', display: 'flex', alignItems: 'center', gap: 9 }}>
              <r.Icon size={16} style={{ color: on ? 'var(--accent)' : 'var(--muted)',
                transition: 'color .2s' }} />
              <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 13,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: on ? 'var(--ink)' : 'var(--muted)', transition: 'color .2s' }}>{r.tab}</span>
              {r.flag && <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600,
                fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 2,
                padding: '2px 6px', opacity: on ? 1 : 0.55, transition: 'opacity .2s' }}>{r.flag}</span>}
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2,
                background: 'var(--ink)', transform: on ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left', transition: 'transform .28s ease' }} />
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div key={active} className="cl-fade" style={{ paddingTop: 'clamp(34px,4vw,52px)' }}>
        {cur.temp ? (
          <div className="cl-two" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr',
            gap: 'clamp(28px,5vw,72px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(20px,4vw,48px)' }}>
              <div>
                <div style={{ fontFamily: "var(--display)", fontSize: 'clamp(48px,7vw,96px)',
                  lineHeight: 0.9, color: 'var(--ink)' }}>{cur.temp}</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)',
                  marginTop: 12 }}>Temperature</div>
              </div>
              <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--line)' }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(4px,0.6vw,9px)',
                  whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: "var(--display)", fontSize: 'clamp(40px,6vw,76px)',
                    lineHeight: 0.9, color: 'var(--accent)' }}>{cur.time}</span>
                  <span style={{ fontFamily: "var(--display)", fontSize: 'clamp(19px,2.4vw,32px)',
                    lineHeight: 0.9, color: 'var(--accent)', opacity: 0.8 }}>{cur.unit}</span>
                </div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)',
                  marginTop: 12 }}>Until golden</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(18px,1.8vw,23px)',
              lineHeight: 1.6, color: 'var(--ink)', margin: 0, maxWidth: 480 }}>{cur.body}</p>
          </div>
        ) : (
          // The Rule — warning component
          <div style={{ border: '1px solid var(--accent)', background:
            'color-mix(in srgb, var(--accent) 7%, transparent)', padding: 'clamp(28px,4vw,48px)',
            display: 'flex', gap: 'clamp(22px,3vw,40px)', alignItems: 'flex-start',
            flexWrap: 'wrap' }}>
            <window.NoEntry size={44} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 'clamp(28px,3.4vw,46px)',
                color: 'var(--ink)', lineHeight: 1.04 }}>Never the microwave.</div>
              <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.7vw,21px)',
                lineHeight: 1.6, color: 'var(--ink)', margin: '16px 0 0', maxWidth: 620 }}>
                A microwave steams from the inside out. That steam has nowhere to go but into the
                wrapper, and the paper-thin skin we fried to a shatter goes limp and chewy in
                seconds. Fifty years of crunch, undone in ninety. Use dry heat, every time.
              </p>
            </div>
          </div>
        )}
      </div>
    </Section2>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="footer" style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding:
        'calc(var(--rhythm) * 6rem) clamp(22px, 6vw, 84px) calc(var(--rhythm) * 2.4rem)' }}>
        <div className="cl-foot" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr',
          gap: 'clamp(34px,6vw,80px)', alignItems: 'end' }}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              lineHeight: 0.78 }}>
              <span style={{ fontFamily: "'Yellowtail',cursive", color: 'var(--accent)',
                fontSize: 'clamp(42px,6.4vw,86px)', transform: 'rotate(-4deg)', transformOrigin: 'left center',
                marginLeft: '0.14em', position: 'relative', zIndex: 1 }}>Cuppa</span>
              <span style={{ fontFamily: "var(--display)", color: 'var(--ink)',
                fontSize: 'clamp(62px,11.5vw,144px)', letterSpacing: '0.005em',
                marginTop: 'clamp(-7px,-0.25vw,0px)' }}>LUMPIA</span>
            </div>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 13,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)',
              marginTop: 22 }}>One Recipe · One Kind · Done Right</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <a href="https://instagram.com/cuppalumpia" target="_blank" rel="noopener"
               className="cl-flink" style={footLink}>
              <window.Instagram size={18} style={{ color: 'var(--accent)' }} />@cuppalumpia
            </a>
            <a href="mailto:hello@cuppalumpia.com" className="cl-flink" style={footLink}>
              <window.Mail size={18} style={{ color: 'var(--accent)' }} />hello@cuppalumpia.com
            </a>
            <div style={{ ...footLink, color: 'var(--muted)' }}>
              <window.MapPin size={18} style={{ color: 'var(--accent)' }} />
              9251 NE Lovgreen Rd, Bainbridge Island
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--line)', margin: 'clamp(38px,5vw,64px) 0 22px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
          alignItems: 'center' }}>
          <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 15,
            color: 'var(--ink-soft)' }}>
            Share your crunch: <b style={{ fontStyle: 'normal', fontWeight: 600,
              color: 'var(--accent)' }}>@CuppaLumpia · #CuppaLumpia</b>
          </span>
          <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--muted)' }}>
            The Miñoza Family · From the Philippine Islands to Bainbridge Island · Est 2026</span>
        </div>

        <div style={{ marginTop: 'clamp(20px,3vw,30px)', display: 'flex', alignItems: 'baseline',
          flexWrap: 'wrap', gap: 11, color: 'var(--muted)' }}>
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 10.5,
            letterSpacing: '0.22em', textTransform: 'uppercase' }}>Typeset in</span>
          <span style={{ fontFamily: "'Yellowtail',cursive", fontSize: 20, color: 'var(--ink-soft)',
            lineHeight: 1 }}>Yellowtail</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ fontFamily: "var(--display)", fontSize: 13.5, color: 'var(--ink-soft)',
            letterSpacing: '0.02em' }}>Anton</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ fontFamily: "'Lora',serif", fontSize: 15, color: 'var(--ink-soft)' }}>Lora</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: 13.5,
            color: 'var(--ink-soft)', letterSpacing: '0.05em' }}>Oswald</span>
        </div>
      </div>
    </footer>
  );
}

const footLink = { display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Lora',serif",
  fontSize: 'clamp(16px,1.5vw,19px)', color: 'var(--ink)', textDecoration: 'none' };

Object.assign(window, { Craft, Footer });
