// cl-sections2.jsx — 04 · The Craft (reheating tabs) + Footer.

const { Section: Section2, Statement: Statement2, SectionTag: SectionTag2, Kicker: Kicker2, Photo: Photo2, PhotoSlot: PhotoSlot2, Wordmark: Wordmark2, Placeholder: Placeholder2 } = window;

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
        <SectionTag2 num="05" label="Reheat" />
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
                <div style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 'clamp(48px,7vw,96px)',
                  lineHeight: 0.9, color: 'var(--ink)' }}>{cur.temp}</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)',
                  marginTop: 12 }}>Temperature</div>
              </div>
              <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--line)' }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(4px,0.6vw,9px)',
                  whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 'clamp(40px,6vw,76px)',
                    lineHeight: 0.9, color: 'var(--accent)' }}>{cur.time}</span>
                  <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 'clamp(19px,2.4vw,32px)',
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
              <div style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 'clamp(28px,3.4vw,46px)',
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

// ── 04 · Catering ─────────────────────────────────────────────────────────────
function CatRow({ k, children, last }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'clamp(14px,2vw,28px)',
      padding: '16px 0', borderBottom: last ? 'none' : '1px solid var(--line)', alignItems: 'baseline' }}>
      <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 11.5,
        letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>{k}</div>
      <div style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.5,
        color: 'var(--ink)' }}>{children}</div>
    </div>);

}

function Catering() {
  return (
    <Section2 id="catering">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 24 }}>
        <SectionTag2 num="04" label="Catering" />
        <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 16,
          color: 'var(--muted)' }}>Always the first thing gone.</span>
      </div>
      <Statement2 style={{ marginTop: 30, maxWidth: 880 }}>
        The dish your guests ask about all night.
      </Statement2>

      <div className="cl-two" style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr',
        gap: 'clamp(34px, 6vw, 80px)', marginTop: 'clamp(40px,5vw,72px)', alignItems: 'start' }}>
        <div>
          <Placeholder2 caption="A heaping party tray, sweet chili dip at the ready. Beauty shot incoming." kicker="Catering photo coming" ratio="5 / 4" />
          <p style={{ fontFamily: "'Yellowtail',cursive", fontSize: 24, color: 'var(--accent)',
            margin: '20px 0 0', transform: 'rotate(-1.5deg)' }}>
            No plates. No forks. No leftovers.</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.7vw,21px)', lineHeight: 1.6,
            color: 'var(--ink)', margin: '4px 0 0', maxWidth: 500 }}>
            Lumpia was always meant to be shared. It started at Lola's table in Pampanga, on Sunday
            afternoons spent rolling by the dozen for a full house.
          </p>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.65,
            color: 'var(--ink-soft)', margin: '18px 0 0', maxWidth: 500 }}>
            We bring that same table to your gathering. Every order is hand-rolled and fried fresh the
            day of, then arranged in catering trays that travel from our stand to your party. One
            recipe: seasoned pork, garlic, sweet onion, a whisper of soy. Made the way it's been
            made for fifty years.
          </p>
          <Kicker2 style={{ marginTop: 30 }}>Why lumpia earns its place at the table</Kicker2>
          <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0, display: 'grid', gap: 14 }}>
            {[['Finger food, full stop.', 'Guests grab, dip, and go.'],
              ['Stays crisp on the tray.', 'Fried the day of, so they hold their crunch even at room temperature.'],
              ['Reached for by everyone.', 'A shattering crust and seasoned pork inside. Kids and grandparents clear the plate.']].map(([b, t]) => (
              <li key={b} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12,
                alignItems: 'baseline', fontFamily: "'Lora',serif", fontSize: 'clamp(15px,1.4vw,18px)',
                lineHeight: 1.55, color: 'var(--ink)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
                  transform: 'translateY(-3px)' }} />
                <span><b style={{ fontWeight: 700 }}>{b}</b>{' '}
                  <span style={{ color: 'var(--ink-soft)' }}>{t}</span></span>
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 'clamp(15px,1.4vw,17px)',
            lineHeight: 1.55, color: 'var(--muted)', margin: '20px 0 0', maxWidth: 500 }}>
            Served with house-made dipping sauces: sweet chili or traditional spiced vinegar. Add
            individual serving cups with sauce for a small extra charge.
          </p>
          <div style={{ marginTop: 30 }}>
            <CatRow k="Minimum">3 dozen · 36 pieces · <b style={{ fontWeight: 600,
              color: 'var(--accent)' }}>$70</b></CatRow>
            <CatRow k="Lead time">48 hours' notice · paid up front via Venmo</CatRow>
            <CatRow k="Pickup">Free, from our place on Lovgreen Rd</CatRow>
            <CatRow k="Delivery">Hot, within 15 miles · delivery fee applies</CatRow>
            <CatRow k="Served" last>Fresh-fried pork lumpia by the tray</CatRow>
          </div>
          <a href={'mailto:catering@cuppalumpia.com?subject=' +
            encodeURIComponent('Catering inquiry · Cuppa Lumpia') + '&body=' +
            encodeURIComponent(
              'Hi Cuppa Lumpia! I\'d love to book lumpia for my event.\n\n' +
              'Event date: \n' +
              'Headcount (approx.): \n' +
              'How many dozen (3 dozen / $70 minimum): \n' +
              'Pickup on Lovgreen Rd, or delivery? (delivery within 15 mi, fee applies): \n' +
              'Dip (sweet chili, vinegar, or both): \n\n' +
              'Name: \nPhone: \n\n' +
              'Anything else: \n')}
            className="cl-flink"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 30,
              padding: '16px 28px', background: 'var(--ink)', color: 'var(--bg)',
              border: '1px solid var(--ink)', fontFamily: "'Oswald',sans-serif", fontWeight: 600,
              fontSize: 12.5, letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none' }}>
            <window.Mail size={16} />Email us to plan catering
          </a>
        </div>
      </div>
    </Section2>);

}

// ── Drop List · email signup ───────────────────────────────────────────────────
// Wired to Web3Forms: each signup emails the address to the shop inbox with a
// distinct subject so drop-list signups stay separate from order emails.
// (Web3Forms collects/forwards only — when you're ready to broadcast to the list,
// export these addresses into a newsletter tool like Buttondown or MailerLite.)
// ─────────────────────────────────────────────────────────────────
// WEB3FORMS KEY — DROP-LIST SIGNUP  ->  list@cuppalumpia.com
// Paste the access key VERIFIED TO list@cuppalumpia.com below.
// (Create at web3forms.com using list@cuppalumpia.com, confirm the
//  link sent to that alias, then paste the key here.)
// Collection/forwarding only — export to a newsletter tool to broadcast.
// ─────────────────────────────────────────────────────────────────
const DROPLIST_ACCESS_KEY = '76b44fae-a8b9-4435-8bac-e1eda5d68aa7'; // verified to list@cuppalumpia.com

async function sendSignup(email) {
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: DROPLIST_ACCESS_KEY,
        subject: `New drop-list signup — ${email}`,
        from_name: 'Cuppa Lumpia drop list',
        email,
        botcheck: '',
      }),
    });
  } catch (e) {
    // Fire-and-forget: keep the on-page success state even if the network hiccups.
  }
}

function DropList() {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [err, setErr] = React.useState('');
  const [hp, setHp] = React.useState(''); // honeypot — humans never fill this

  const submit = (e) => {
    e.preventDefault();
    if (hp) { setDone(true); return; } // bot trapped — fake success, send nothing
    const v = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return setErr('Enter a valid email.');
    setErr('');
    sendSignup(v);
    setDone(true);
  };

  return (
    <Section2 id="droplist" top={false} style={{ paddingTop: 0 }}>
      <div style={{ background: 'var(--ink)', color: 'var(--bg)',
        padding: 'clamp(34px,5vw,68px) clamp(26px,5vw,72px)',
        display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
        gap: 'clamp(30px,5vw,72px)', alignItems: 'center' }} className="cl-droplist">
        {/* left — the pitch */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <window.Bell size={17} style={{ color: 'var(--accent)' }} />
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              The Drop List</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)",
            fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.02, letterSpacing: '-0.01em',
            color: 'var(--bg)', margin: '20px 0 0', textWrap: 'balance' }}>
            Know the second we&rsquo;re frying.</h2>
          <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.6,
            color: 'color-mix(in srgb, var(--bg) 78%, var(--ink))', margin: '18px 0 0', maxWidth: 460 }}>
            Weekend batches sell out fast. Join the list for a heads-up before each stand,
            first dibs on catering dates, and exclusive new flavor&nbsp;drops.
          </p>
          <a href="https://instagram.com/cuppalumpia" target="_blank" rel="noopener"
            className="cl-flink" style={{ display: 'inline-flex', alignItems: 'center', gap: 9,
              marginTop: 24, fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 11.5,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'color-mix(in srgb, var(--bg) 80%, var(--ink))', textDecoration: 'none' }}>
            <window.Instagram size={16} style={{ color: 'var(--accent)' }} />
            Or follow @cuppalumpia for live updates
          </a>
        </div>

        {/* right — the form */}
        <div>
          {!done ? (
            <form onSubmit={submit}>
              {/* honeypot — off-screen; bots fill it, humans don't */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off"
                value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1,
                  opacity: 0, pointerEvents: 'none' }} />
              <label style={{ display: 'block', fontFamily: "'Oswald',sans-serif", fontWeight: 600,
                fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--bg) 64%, var(--ink))', marginBottom: 11 }}>
                Email address</label>
              <div className="cl-dl-row" style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
                <input type="email" value={email} placeholder="you@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: '1 1 220px', minWidth: 0, appearance: 'none',
                    background: '#FFFFFF',
                    border: '1px solid rgba(36,22,6,0.18)',
                    borderRight: 'none', padding: '16px 18px', fontFamily: "'Lora',serif",
                    fontSize: 17, color: '#241606', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(36,22,6,0.18)'} />
                <button type="submit" className="cl-dl-btn" style={{ appearance: 'none',
                  padding: '16px 26px', background: 'var(--accent)', color: '#fff',
                  border: '1px solid var(--accent)', cursor: 'pointer',
                  fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12.5,
                  letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-flex',
                  alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
                  Join the drop list <window.ArrowRight size={16} />
                </button>
              </div>
              {err && <div style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 13.5,
                color: 'var(--accent)', marginTop: 11 }}>{err}</div>}
              <p style={{ fontFamily: "'Lora',serif", fontSize: 13, lineHeight: 1.5,
                color: 'color-mix(in srgb, var(--bg) 55%, var(--ink))', margin: '14px 0 0' }}>
                No spam, just fry days — we never share your email. Unsubscribe anytime.</p>
            </form>
          ) : (
            <div className="cl-fade" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                border: '1px solid var(--accent)', color: 'var(--accent)', display: 'flex',
                alignItems: 'center', justifyContent: 'center' }}>
                <window.Check size={24} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)",
                  fontSize: 'clamp(24px,2.6vw,34px)', color: 'var(--bg)', lineHeight: 1.05 }}>
                  You&rsquo;re on the list.</div>
                <p style={{ fontFamily: "'Lora',serif", fontSize: 16, lineHeight: 1.55,
                  color: 'color-mix(in srgb, var(--bg) 76%, var(--ink))', margin: '10px 0 0',
                  maxWidth: 360 }}>
                  We&rsquo;ll email you before the next stand. Watch your inbox for fry days.</p>
              </div>
            </div>
          )}
        </div>
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
            <Wordmark2 lumpia="clamp(62px, 11.5vw, 144px)" />
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
          <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 13.5, color: 'var(--ink-soft)',
            letterSpacing: '0.02em' }}>Zilla Slab</span>
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

Object.assign(window, { Catering, Craft, Footer, DropList });
