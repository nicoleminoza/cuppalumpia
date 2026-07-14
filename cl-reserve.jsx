// cl-reserve.jsx — 03 · Reservations. Two order types:
//   · Fresh-fried (Half/Full Dozen + Pinoy Palmer) — pickup Sat/Sun, 11:00–1:30
//   · Frozen by the dozen ($20) — pickup any day, time confirmed by email
// Live total via React state, underline inputs, clean success screen. Mock only.

const { Section: SectionR, Statement: StatementR, SectionTag: SectionTagR, Kicker: KickerR } = window;

const MENU = [
  { id: 'half',   name: 'Half Dozen',   sub: '6 pieces · fresh-fried',        price: 15, kind: 'fresh' },
  { id: 'full',   name: 'Full Dozen',   sub: '12 pieces · fresh-fried',       price: 25, kind: 'fresh' },
  { id: 'frozen', name: 'Frozen Dozen', sub: '12 pieces · frozen, fry at home', price: 20, kind: 'frozen' },
  { id: 'palmer', name: 'Pinoy Palmer', sub: 'black tea · calamansi',         price: 5,  kind: 'fresh' },
];

const TIME_SLOTS = ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'];

// ─────────────────────────────────────────────────────────────────
// WEB3FORMS KEY — RESERVATION FORM  ->  orders@cuppalumpia.com
// Paste the access key VERIFIED TO orders@cuppalumpia.com below.
// (Create at web3forms.com using orders@cuppalumpia.com, confirm the
//  link sent to that alias, then paste the key here.)
// ─────────────────────────────────────────────────────────────────
const ORDERS_ACCESS_KEY = 'c2322977-6591-4940-a83c-c8943c13bf9e'; // verified to orders@cuppalumpia.com

// ── Pickup-date rules ───────────────────────────────────────────
// Stand season: Sat & Sun, Jul 11 – Sep 30, 2026. Closed Aug 22–23.
//   Fresh-fried → weekend dates only (within season, minus the closed weekends).
//   Frozen      → any day from today through Sep 30, minus the closed weekends.
const SEASON_START = '2026-07-11';
const SEASON_END   = '2026-09-30';
const CLOSED_DATES = ['2026-08-22', '2026-08-23'];

function isoToDate(iso) { return new Date(iso + 'T12:00'); }
function dateToISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') +
    '-' + String(d.getDate()).padStart(2, '0');
}
function todayISO() { return dateToISO(new Date()); }
function tomorrowISO() { const d = new Date(); d.setDate(d.getDate() + 1); return dateToISO(d); }
// Frozen sells year-round; cap the picker a year out so the native control stays sane.
const FROZEN_MAX = (() => { const d = new Date(); d.setDate(d.getDate() + 365); return dateToISO(d); })();
function isClosed(iso) { return CLOSED_DATES.includes(iso); }

// Valid fresh-fried weekend dates: Sat/Sun, today-or-later, within the season,
// excluding the two closed weekends.
function buildFreshDates() {
  const out = [], today = todayISO(), end = isoToDate(SEASON_END);
  for (let d = isoToDate(SEASON_START); d <= end; d.setDate(d.getDate() + 1)) {
    const iso = dateToISO(d), day = d.getDay();
    if ((day === 0 || day === 6) && !isClosed(iso) && iso >= today) out.push(iso);
  }
  return out;
}
const FRESH_DATES = buildFreshDates();
function isValidFresh(iso) { return FRESH_DATES.includes(iso); }
// Frozen pickup: next-day at the earliest, year-round, excluding any weeks we're away.
function isValidFrozen(iso) {
  return iso >= tomorrowISO() && iso <= FROZEN_MAX && !isClosed(iso);
}
// Frozen default: the next available day, skipping any week we're closed.
function nextFrozenDate() {
  const d = new Date();
  for (let i = 0; i < 400; i++) {
    d.setDate(d.getDate() + 1);
    const iso = dateToISO(d);
    if (isValidFrozen(iso)) return iso;
  }
  return tomorrowISO();
}
function fmtOption(iso) {
  try { return isoToDate(iso).toLocaleDateString('en-US',
    { weekday: 'short', month: 'short', day: 'numeric' }); } catch { return iso; }
}

function Stepper({ value, onAdd }) {
  const btn = (dir, child, disabled) => (
    <button type="button" disabled={disabled} onClick={() => onAdd(dir)}
      style={{ appearance: 'none', width: 34, height: 34, border: '1px solid var(--line)',
        background: 'var(--bg)', color: disabled ? 'var(--muted)' : 'var(--ink)',
        cursor: disabled ? 'default' : 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', opacity: disabled ? 0.4 : 1, transition: 'all .15s' }}>
      {child}
    </button>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--line)' }}>
      {btn(-1, <window.Minus size={15} />, value === 0)}
      <div style={{ width: 42, textAlign: 'center', fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 18,
        color: value > 0 ? 'var(--ink)' : 'var(--muted)',
        borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)',
        lineHeight: '32px', height: 34 }}>{value}</div>
      {btn(1, <window.Plus size={15} />, false)}
    </div>
  );
}

function Field({ label, children, hint, required }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: "'Oswald',sans-serif", fontWeight: 600,
        fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)',
        marginBottom: 9 }}>{label}{required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}</span>
      {children}
      {hint && <span style={{ display: 'block', fontFamily: "'Lora',serif", fontStyle: 'italic',
        fontSize: 12.5, color: 'var(--muted)', marginTop: 7 }}>{hint}</span>}
    </label>
  );
}

const inputStyle = {
  width: '100%', appearance: 'none', background: 'transparent', border: 'none',
  borderBottom: '1px solid var(--line)', borderRadius: 0, padding: '8px 2px',
  fontFamily: "'Lora',serif", fontSize: 17, color: 'var(--ink)', outline: 'none',
  transition: 'border-color .2s',
};

function Reserve() {
  const [qty, setQty] = React.useState({ half: 0, full: 0, frozen: 0, palmer: 0 });
  const [form, setForm] = React.useState({ name: '', email: '', phone: '',
    date: FRESH_DATES[0], time: '11:00 AM' });
  const [done, setDone] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [hp, setHp] = React.useState(''); // honeypot — humans never fill this

  const total = MENU.reduce((s, m) => s + qty[m.id] * m.price, 0);
  const count = MENU.reduce((s, m) => s + qty[m.id], 0);
  const hasFresh = qty.half + qty.full + qty.palmer > 0;
  const frozenOnly = qty.frozen > 0 && !hasFresh;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Keep the pickup date valid for the current order type:
  //   fresh present  → snap to the first valid weekend
  //   frozen only    → default to the next day (skipping closed weekends)
  React.useEffect(() => {
    if (hasFresh) {
      if (!isValidFresh(form.date)) set('date', FRESH_DATES[0]);
    } else if (frozenOnly) {
      if (!isValidFrozen(form.date) || isValidFresh(form.date)) set('date', nextFrozenDate());
    }
  }, [hasFresh, frozenOnly]); // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault();
    if (hp) { setDone({ ...form, frozenOnly, hasFresh, items: [], total }); return; } // bot trapped — fake success, send nothing
    if (!form.name.trim()) return setErr('Add a name for the order.');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const phoneOk = form.phone.replace(/\D/g, '').length >= 10;
    if (!emailOk) return setErr('Add a valid email so we can confirm your order.');
    if (!phoneOk) return setErr('Add a valid phone number so we can reach you about pickup.');
    if (count === 0) return setErr('Add at least one item.');
    if (hasFresh && !isValidFresh(form.date)) {
      return setErr('Fresh-fried pickup is a weekend in the season (Jul 11 – Sep 30; closed Aug 22–23).');
    }
    if (frozenOnly && !isValidFrozen(form.date)) {
      return setErr(isClosed(form.date)
        ? "We're away that week. Please pick another pickup day."
        : 'Frozen orders are next-day. Pick a day from tomorrow on.');
    }
    setErr('');
    const items = MENU.filter((m) => qty[m.id] > 0).map((m) => ({ ...m, n: qty[m.id] }));
    const orderLines = items.map((m) => `${m.n} × ${m.name} — $${m.price * m.n}`).join('\n');
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ORDERS_ACCESS_KEY,
          subject: `New order — ${form.name} — $${total}`,
          from_name: 'Cuppa Lumpia website',
          name: form.name, email: form.email, phone: form.phone,
          order_type: frozenOnly ? 'Frozen (any-day pickup)' : 'Fresh-fried (weekend)',
          pickup_date: fmtDate(form.date),
          pickup_time: frozenOnly ? 'Confirmed by email' : form.time,
          order: orderLines, total: `$${total}`,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'failed');
      setDone({ ...form, frozenOnly, hasFresh, items, total });
    } catch (e2) {
      setErr('Sorry — your order did not go through. Please try again, or text us to reserve.');
    } finally {
      setSending(false);
    }
  };

  const reset = () => { setQty({ half: 0, full: 0, frozen: 0, palmer: 0 });
    setForm({ name: '', email: '', phone: '', date: FRESH_DATES[0], time: '11:00 AM' });
    setDone(null); setErr(''); };

  const fmtDate = (iso) => {
    try { return new Date(iso + 'T12:00').toLocaleDateString('en-US',
      { weekday: 'long', month: 'long', day: 'numeric' }); } catch { return iso; }
  };

  return (
    <SectionR id="reserve">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 24 }}>
        <SectionTagR num="03" label="Reservations" />
        <span style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 16,
          color: 'var(--muted)' }}>Pre-orders held until 1:30 PM.</span>
      </div>

      {!done ? (
        <>
          <StatementR style={{ marginTop: 30, maxWidth: 820 }}>
            We sell out most weekends. Reserve fresh-fried to skip the line, or order frozen dozens to fry any&nbsp;day.
          </StatementR>
          <form onSubmit={submit} className="cl-resv" style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 'clamp(34px,6vw,80px)',
            marginTop: 'clamp(38px,5vw,64px)', alignItems: 'start' }}>
            {/* honeypot — off-screen; bots fill it, humans don't */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off"
              value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1,
                opacity: 0, pointerEvents: 'none' }} />
            {/* order builder */}
            <div>
              <KickerR>Build your batch</KickerR>
              <div style={{ marginTop: 20 }}>
                {MENU.map((m) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 16,
                    padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                        <span style={{ fontFamily: "'Lora',serif", fontSize: 19, color: 'var(--ink)' }}>
                          {m.name}</span>
                        {m.kind === 'frozen' && <span style={{ fontFamily: "'Oswald',sans-serif",
                          fontWeight: 600, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 2,
                          padding: '2px 6px' }}>Frozen</span>}
                      </div>
                      <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11,
                        letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)',
                        marginTop: 4 }}>{m.sub} · ${m.price}</div>
                    </div>
                    <Stepper value={qty[m.id]}
                      onAdd={(d) => setQty((q) => ({ ...q, [m.id]: Math.max(0, q[m.id] + d) }))} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                marginTop: 26 }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Estimated total</span>
                <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 'clamp(40px,5vw,60px)',
                  color: 'var(--accent)', lineHeight: 1, transition: 'color .2s' }}>${total}</span>
              </div>
              <div style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 14,
                color: 'var(--muted)', textAlign: 'right', marginTop: 4 }}>
                {count > 0 ? `${count} item${count > 1 ? 's' : ''} · paid at pickup` : 'Tap + to start'}
              </div>
            </div>

            {/* details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <KickerR>Your details</KickerR>
              <Field label="Name" required>
                <input style={inputStyle} value={form.name} placeholder="Who's it under?"
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                  onChange={(e) => set('name', e.target.value)} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <Field label="Email" required>
                  <input style={inputStyle} type="email" value={form.email} placeholder="you@email.com"
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    onChange={(e) => set('email', e.target.value)} />
                </Field>
                <Field label="Phone" required>
                  <input style={inputStyle} type="tel" value={form.phone} placeholder="(206) 000-0000"
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    onChange={(e) => set('phone', e.target.value)} />
                </Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <Field label="Pickup date"
                  hint={frozenOnly
                    ? (isValidFrozen(form.date) ? 'Frozen, year-round, from tomorrow on' : "We're away that week, pick another")
                    : 'Saturday or Sunday only'}>
                  {frozenOnly ? (
                    <input style={{ ...inputStyle, colorScheme: 'dark',
                      borderBottomColor: isValidFrozen(form.date) ? 'var(--line)' : 'var(--accent)' }}
                      type="date" value={form.date} min={tomorrowISO()} max={FROZEN_MAX}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.target.style.borderColor = isValidFrozen(form.date) ? 'var(--line)' : 'var(--accent)'}
                      onChange={(e) => set('date', e.target.value)} />
                  ) : (
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.date}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                      onChange={(e) => set('date', e.target.value)}>
                      {FRESH_DATES.map((iso) => <option key={iso} value={iso}>{fmtOption(iso)}</option>)}
                    </select>
                  )}
                </Field>
                {frozenOnly ? (
                  <Field label="Pickup window" hint="We'll text a 3-hour window">
                    <div style={{ ...inputStyle, color: 'var(--muted)', cursor: 'default',
                      display: 'flex', alignItems: 'center', gap: 8 }}>
                      <window.Clock size={15} style={{ color: 'var(--accent)' }} />
                      Confirmed by text
                    </div>
                  </Field>
                ) : (
                  <Field label="Pickup time" hint="Between 11:00 – 1:30">
                    <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.time}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                      onChange={(e) => set('time', e.target.value)}>
                      {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                )}
              </div>
              {err && <div style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 14,
                color: 'var(--accent)' }}>{err}</div>}
              <button type="submit" className="cl-submit" disabled={sending} style={{ appearance: 'none',
                marginTop: 6, padding: '18px 30px', background: 'var(--ink)', color: 'var(--bg)',
                border: '1px solid var(--ink)', cursor: 'pointer', fontFamily: "'Oswald',sans-serif",
                fontWeight: 600, fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                transition: 'all .25s' }}>
                {sending ? 'Sending…' : <>Reserve {total > 0 ? `· $${total}` : 'this batch'} <window.ArrowRight size={16} /></>}
              </button>
              <p style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', fontSize: 12.5,
                color: 'var(--muted)', margin: 0 }}>
                We only use your details to fill this order — never shared, never spammed.
              </p>
              <p style={{ fontFamily: "'Lora',serif", fontSize: 13.5, lineHeight: 1.5,
                color: 'var(--muted)', margin: 0 }}>
                {frozenOnly
                  ? "Frozen orders are ready next day. We'll text a 3-hour pickup window and Venmo details, then grab them cold from the cooler at our door."
                  : 'No payment now. We hold your batch and you settle up at the stand. Cash or Venmo @cuppalumpia.'}
              </p>
            </div>
          </form>
        </>
      ) : (
        <Success done={done} fmtDate={fmtDate} onReset={reset} />
      )}
    </SectionR>
  );
}

function Success({ done, fmtDate, onReset }) {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=9251%20NE%20Lovgreen%20Rd%20Bainbridge%20Island%20WA%2098110';
  return (
    <div className="cl-fade" style={{ marginTop: 'clamp(38px,5vw,64px)' }}>
      <div className="cl-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(34px,6vw,80px)', alignItems: 'start' }}>
        {/* LEFT — reassurance + the single next step */}
        <div>
          <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid var(--green)',
            color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <window.Check size={28} />
          </div>
          <h2 style={{ fontFamily: "'Lora',serif", fontWeight: 400, fontSize: 'clamp(30px,4vw,52px)',
            lineHeight: 1.08, color: 'var(--ink)', margin: '26px 0 0', letterSpacing: '-0.01em' }}>
            Your order is in,<br />{done.name.split(' ')[0] || 'friend'}.
          </h2>
          {done.frozenOnly ? (
            <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.6vw,20px)', lineHeight: 1.6,
              color: 'var(--ink-soft)', margin: '22px 0 0', maxWidth: 460 }}>
              Next up: we'll text your 3-hour pickup window for
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}> {fmtDate(done.date)}</b>. Your
              frozen dozens wait cold in the cooler at our door.
            </p>
          ) : (
            <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.6vw,20px)', lineHeight: 1.6,
              color: 'var(--ink-soft)', margin: '22px 0 0', maxWidth: 460 }}>
              We'll have it rolled and ready. Come by
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}> {fmtDate(done.date)}</b> around
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}> {done.time}</b> — held to 1:30,
              we roll till we run out.
            </p>
          )}
          {done.email && (
            <p style={{ fontFamily: "'Lora',serif", fontSize: 15, lineHeight: 1.5,
              color: 'var(--muted)', margin: '16px 0 0', maxWidth: 460 }}>
              A confirmation is on its way to <b style={{ fontWeight: 600, color: 'var(--ink-soft)' }}>{done.email}</b>.
            </p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 32 }}>
            <button onClick={onReset} style={{ appearance: 'none', padding: '16px 28px',
              background: 'var(--ink)', color: 'var(--bg)', border: '1px solid var(--ink)',
              cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12.5,
              letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Place another
            </button>
            <a href={mapsUrl} target="_blank" rel="noopener" style={{ appearance: 'none', padding: '16px 28px',
              background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)',
              cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12.5,
              letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Get directions <window.ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* RIGHT — the receipt: items, total, pay (each once) */}
        <div style={{ border: '1px solid var(--line)', background: 'var(--surface)',
          padding: 'clamp(26px,3vw,40px)' }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Order summary</div>
          <div style={{ marginTop: 18 }}>
            {done.items.map((m) => (
              <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between',
                padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontFamily: "'Lora',serif", fontSize: 17, color: 'var(--ink)' }}>
                  <b style={{ fontWeight: 600, color: 'var(--accent)' }}>{m.n}×</b> {m.name}
                  {m.kind === 'frozen' && <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)',
                    marginLeft: 8 }}>frozen</span>}</span>
                <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 17, color: 'var(--ink)' }}>
                  ${m.n * m.price}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginTop: 20 }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink)' }}>
              Total</span>
            <span style={{ fontFamily: "var(--display)", fontWeight: "var(--display-weight)", fontSize: 34, color: 'var(--accent)' }}>
              ${done.total}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 8 }}>
            <window.Wallet size={15} style={{ color: 'var(--muted)', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Lora',serif", fontSize: 14.5, color: 'var(--muted)' }}>
              Pay at pickup — cash or Venmo <b style={{ fontWeight: 600, color: 'var(--ink-soft)' }}>@cuppalumpia</b>
            </span>
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '24px 0' }} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <window.MapPin size={17} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} />
            <div style={{ fontFamily: "'Lora',serif", fontSize: 15.5, lineHeight: 1.55,
              color: 'var(--ink)' }}>
              <b style={{ fontWeight: 600 }}>{done.frozenOnly ? 'Cuppa Lumpia · cooler pickup' : 'Cuppa Lumpia Farm Stand'}</b><br />
              9251 NE Lovgreen Rd, Bainbridge Island, WA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Reserve });
