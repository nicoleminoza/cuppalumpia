// cl-brand.jsx — brand furniture: the kraft cup + die-cut sticker mark, the
// editorial primitives (Kicker, SectionTag, Rule), an image Placeholder, and
// the live open/sold-out status hook driven off the device clock.

// ── Die-cut sticker label (black, cream type) ────────────────────────────────
function StickerLabel({ win = 3, hin = 1.2, pxin = 118, glyphScale = 1 }) {
  const w = win * pxin,h = hin * pxin;
  const fEst = w * 0.040 * glyphScale;
  const fWord = w * 0.118 * glyphScale;
  const fSub = w * 0.036 * glyphScale;
  const rule = w * 0.058;
  return (
    <div style={{ position: 'relative', width: w, height: h, background: '#161616',
      borderRadius: Math.max(7, w * 0.03), overflow: 'hidden',
      boxShadow: '0 18px 40px rgba(0,0,0,0.30), 0 2px 0 rgba(0,0,0,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: Math.max(4, w * 0.018),
        borderRadius: Math.max(5, w * 0.024), border: '1.3px solid rgba(244,239,227,0.7)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', color: '#F4EFE3', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: rule * 0.42,
          marginBottom: fWord * 0.20 }}>
          <span style={{ width: rule, height: 1, background: '#F4EFE3' }} />
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: fEst,
            letterSpacing: fEst * 0.35, whiteSpace: 'nowrap' }}>EST · 2026</span>
          <span style={{ width: rule, height: 1, background: '#F4EFE3' }} />
        </div>
        <div style={{ fontFamily: "'Alfa Slab One',serif", fontSize: fWord,
          letterSpacing: fWord * 0.02, whiteSpace: 'nowrap' }}>CUPPA LUMPIA</div>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 500, fontSize: fSub,
          letterSpacing: fSub * 0.42, marginTop: fWord * 0.22, whiteSpace: 'nowrap',
          opacity: 0.92 }}>FILIPINO FAMILY RECIPE</div>
      </div>
    </div>);

}

// ── Tapered kraft cup with applied sticker, real proportions ─────────────────
function KraftCup({ pxin = 118, wIn = 3.86, hIn = 2.48, stickerTop = '54%',
  stWin = 3, stHin = 1.2 }) {
  const topW = wIn * pxin,H = hIn * pxin,k = pxin / 118;
  return (
    <div style={{ position: 'relative', width: topW, height: H + 20 * k }}>
      <div style={{ position: 'absolute', left: '12%', right: '12%', bottom: -8 * k,
        height: 22 * k, background: 'rgba(0,0,0,0.22)', borderRadius: '50%',
        filter: `blur(${4 * k}px)` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 16 * k, height: H,
        background: 'var(--kraft-body)',
        clipPath: 'polygon(0% 0%, 100% 0%, 89% 100%, 11% 100%)',
        boxShadow: 'inset 0 -18px 30px rgba(0,0,0,0.12)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 38 * k,
        background: 'var(--kraft-rim)', borderRadius: '50%',
        border: '1px solid var(--kraft-edge)' }} />
      <div style={{ position: 'absolute', left: '3%', right: '3%', top: 7 * k, height: 26 * k,
        background: 'var(--kraft-open)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: stickerTop, left: '50%',
        transform: 'translate(-50%,-50%)' }}>
        <StickerLabel win={stWin} hin={stHin} pxin={pxin} />
      </div>
    </div>);

}

// ── Editorial primitives ─────────────────────────────────────────────────────
function Kicker({ children, style }) {
  return (
    <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600,
      letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--muted)',
      ...style, fontSize: "12px" }}>{children}</div>);

}

function SectionTag({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 13,
        letterSpacing: '0.2em', color: 'var(--accent)' }}>{num}</span>
      <span style={{ width: 26, height: 1, background: 'var(--accent)', opacity: 0.55 }} />
      <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 13,
        letterSpacing: '0.34em', textTransform: 'uppercase', color: 'var(--ink)' }}>{label}</span>
    </div>);

}

function Rule({ style }) {
  return <div style={{ height: 1, background: 'var(--line)', width: '100%', ...style }} />;
}

// ── Striped placeholder for photography to be dropped in later ────────────────
// `caption` is a playful human line; `kicker` is the small "this is a slot" tag.
function Placeholder({ caption, label, kicker = 'Photo coming soon', ratio = '4 / 5',
                       height, style }) {
  const line = caption || label;
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: height ? undefined : ratio,
      height, background:
      'repeating-linear-gradient(45deg, var(--ph-a) 0 14px, var(--ph-b) 14px 28px)',
      border: '1px solid var(--line)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden', ...style }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        background: 'var(--bg)', border: '1px solid var(--line)',
        padding: 'clamp(16px,2.4vw,24px) clamp(20px,3vw,30px)', maxWidth: '78%',
        textAlign: 'center' }}>
        <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10.5, letterSpacing: '0.26em',
          textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center',
          gap: 8 }}>
          <span style={{ width: 14, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
          {kicker}
          <span style={{ width: 14, height: 1, background: 'var(--accent)', opacity: 0.6 }} />
        </span>
        <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic',
          fontSize: 'clamp(15px,1.5vw,18px)', lineHeight: 1.4, color: 'var(--ink-soft)',
          textWrap: 'balance' }}>{line}</span>
      </div>
    </div>);

}

// ── Live open / sold-out status off the device clock ─────────────────────────
// Hours: Sat & Sun, 11:00–14:00. Pre-orders held until 13:30.
// Before the launch weekend (Jul 11–12, 2026) the stand reads "Opens soon".
// Manual sold-out: edit status.json in the repo (soldOutDate = today's date,
// YYYY-MM-DD) to flip the whole site to "Sold out for today". It auto-clears
// the next day, so it's safe to set and forget.
const CL_LAUNCH = new Date(2026, 6, 11, 11, 0); // Jul 11, 2026, 11:00 (local)
const clYMD = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function clNextBack(now) {
  const day = now.getDay(), mins = now.getHours() * 60 + now.getMinutes(), CLOSE = 14 * 60;
  let add = 0;
  if (day === 6 && mins >= CLOSE) add = 1;        // Sat after close → Sun
  else if (day === 0 && mins >= CLOSE) add = 6;   // Sun after close → Sat
  else if (day === 6 || day === 0) add = 0;       // weekend, same day
  else add = (6 - day + 7) % 7;                   // weekday → next Sat
  const next = new Date(now); next.setDate(now.getDate() + add);
  return next.getDay() === 6 ? 'Saturday' : 'Sunday';
}

function useOpenStatus() {
  const [manualSoldOut, setManualSoldOut] = React.useState(false);

  // Poll the owner-editable status.json (cache-busted) for a manual sold-out flag.
  React.useEffect(() => {
    let alive = true;
    const load = () => fetch('status.json?t=' + Date.now())
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (alive && j) setManualSoldOut(j.soldOutDate === clYMD(new Date())); })
      .catch(() => {});
    load();
    const id = setInterval(load, 120000); // re-check every 2 min
    return () => { alive = false; clearInterval(id); };
  }, []);

  const compute = () => {
    const now = new Date();
    if (now < CL_LAUNCH) {
      return { open: false, prelaunch: true, label: 'Stand opens July 11 & 12', sub: '' };
    }
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const isWeekend = day === 0 || day === 6;
    const OPEN = 11 * 60, CLOSE = 14 * 60, PRE = 13 * 60 + 30;
    const nextDay = clNextBack(now);

    // Owner flipped sold-out for today
    if (manualSoldOut) {
      return { open: false, soldOut: true, label: 'Sold out for today',
        sub: isWeekend && mins < CLOSE ? 'All gone — back tomorrow' : `Back ${nextDay} · 11–2` };
    }
    // Open hours
    if (isWeekend && mins >= OPEN && mins < CLOSE) {
      return { open: true, label: 'Open now',
        sub: mins < PRE ? 'Rolling until we run out' : 'Last batches, pre-orders held to 1:30' };
    }
    // Weekend morning, before we open
    if (isWeekend && mins < OPEN) {
      return { open: false, label: 'Opens at 11:00 AM', sub: 'Fresh-fried, 11–2 today' };
    }
    // Weekend after close, or any weekday
    return { open: false, label: `Back ${nextDay} · 11–2`,
      sub: isWeekend ? "That's a wrap for today" : 'See you this weekend' };
  };

  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);
  return compute();
}

function StatusDot({ open, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, ...style }}>
      <span style={{ position: 'relative', width: 9, height: 9 }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%',
          background: open ? 'var(--green)' : 'var(--muted)' }} />
        {open && <span style={{ position: 'absolute', inset: -4, borderRadius: '50%',
          border: '1px solid var(--green)', opacity: 0.5,
          animation: 'clPulse 2.4s ease-out infinite' }} />}
      </span>
    </span>);

}

// ── Framed photo — matches the Placeholder frame, for real imagery ───────────
function Photo({ src, alt = '', ratio = '4 / 5', height, position = 'center', style }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: height ? undefined : ratio,
      height, border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--stage)',
      ...style }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: position, display: 'block' }} />
    </div>);

}

// ── Drag-in photo slot — user drops their own image; persists via sidecar ───
// image-slot's shadow :host hard-codes height:160px, so aspect-ratio on the
// element is ignored. Wrap it in an aspect-ratio frame and force the slot to
// fill it (inline height:100% beats the shadow :host rule).
function PhotoSlot({ id, ratio = '4 / 5', placeholder = 'Drop a photo', style }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: ratio, ...style }}>
      <image-slot
        id={id}
        shape="rect"
        fit="cover"
        placeholder={placeholder}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
          border: '1px solid var(--line)', background: 'var(--stage)' }}>
      </image-slot>
    </div>);

}

// ── Wordmark — the locked "Cuppa LUMPIA" lockup (Option A: Stacked Editorial) ─
// One component, used in BOTH the hero and the footer so they never drift.
// LUMPIA is the anchor; "Cuppa" is locked to 46% of it at every breakpoint via
// calc(), so the ratio can't change with viewport. Pass the LUMPIA size as a
// CSS length/clamp string; the script derives from it.
function Wordmark({ lumpia = 'clamp(64px, 12vw, 168px)', style }) {
  const cuppa = 'calc(0.46 * (' + lumpia + '))';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ...style }}>
      <div style={{ fontFamily: "'Yellowtail',cursive", color: 'var(--accent)',
        fontSize: cuppa, lineHeight: 1, transform: 'rotate(-2deg)', transformOrigin: 'left center',
        marginLeft: '0.12em', marginBottom: '0.05em' }}>Cuppa</div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 'var(--display-weight)', color: 'var(--ink)',
        fontSize: lumpia, letterSpacing: '0.012em', lineHeight: 0.9 }}>LUMPIA</div>
    </div>);

}

Object.assign(window, {
  StickerLabel, KraftCup, Kicker, SectionTag, Rule, Placeholder, Photo, PhotoSlot, Wordmark,
  useOpenStatus, StatusDot
});