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

// Web3Forms access key — get a free key at https://web3forms.com (emailed to hello@cuppalumpia.com).
// Paste it between the quotes below to start receiving orders by email.
const WEB3FORMS_ACCESS_KEY = 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY';

function nextWeekendISO() {
  const d = new Date();
  for (let i = 0; i < 7; i++) {
    const day = d.getDay();
    if (day === 6 || day === 0) break;
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().slice(0, 10);
}
function todayISO() { return new Date().toISOString().slice(0, 10); }
function isWeekend(iso) {
  try { const d = new Date(iso + 'T12:00').getDay(); return d === 0 || d === 6; }
  catch { return false; }
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
      <div style={{ width: 42, textAlign: 'center', fontFamily: "var(--display)", fontSize: 18,
        color: value > 0 ? 'var(--ink)' : 'var(--muted)',
        borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)',
        lineHeight: '32px', height: 34 }}>{value}</div>
      {btn(1, <window.Plus size={15} />, false)}
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: "'Oswald',sans-serif", fontWeight: 600,
        fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)',
        marginBottom: 9 }}>{label}</span>
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

function CateringNote() {
  return (
    <div style={{ marginTop: 'clamp(34px,5vw,60px)', borderTop: '1px solid var(--line)',
      paddingTop: 'clamp(22px,3vw,32px)', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <span style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(16px,1.6vw,20px)',
        color: 'var(--ink)' }}>
        Feeding a party? <span style={{ fontStyle: 'italic', color: 'var(--muted)' }}>
          We cater by the tray.</span>
      </span>
      <a href="mailto:catering@cuppalumpia.com?subject=Catering%20inquiry" className="cl-flink"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald',sans-serif",
          fontWeight: 600, fontSize: 12.5, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--accent)',
          paddingBottom: 4 }}>
        <window.Mail size={16} style={{ color: 'var(--accent)' }} />
        Email us to plan catering
      </a>
    </div>
  );
}

function Reserve() {
  const [qty, setQty] = React.useState({ half: 0, full: 0, frozen: 0, palmer: 0 });
  const [form, setForm] = React.useState({ name: '', email: '', phone: '',
    date: nextWeekendISO(), time: '11:00 AM' });
  const [done, setDone] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const total = MENU.reduce((s, m) => s + qty[m.id] * m.price, 0);
  const count = MENU.reduce((s, m) => s + qty[m.id], 0);
  const hasFresh = qty.half + qty.full + qty.palmer > 0;
  const frozenOnly = qty.frozen > 0 && !hasFresh;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setErr('Add a name for the order.');
    if (count === 0) return setErr('Add at least one item.');
    if (hasFresh && !isWeekend(form.date)) {
      return setErr('Fresh-fried pickup is Saturday or Sunday only. Pick a weekend date.');
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
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New order — ${form.name} — $${total}`,
          from_name: 'Cuppa Lumpia website',
          name: form.name,
          email: form.email,
          phone: form.phone,
          order_type: frozenOnly ? 'Frozen (any-day pickup)' : 'Fresh-fried (weekend)',
          pickup_date: fmtDate(form.date),
          pickup_time: frozenOnly ? 'Confirmed by email' : form.time,
          order: orderLines,
          total: `$${total}`,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');
      setDone({ ...form, frozenOnly, hasFresh, items, total });
    } catch (e2) {
      setErr('Sorry — your order didn’t go through. Please try again, or text us to reserve.');
    } finally {
      setSending(false);
    }
  };

  const reset = () => { setQty({ half: 0, full: 0, frozen: 0, palmer: 0 });
    setForm({ name: '', email: '', phone: '', date: nextWeekendISO(), time: '11:00 AM' });
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
          <StatementR style={{ marginTop: 30, maxWidth: 720 }}>
            Reserve your batch. Pay at the stand.
          </StatementR>
          <form onSubmit={submit} className="cl-resv" style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: 'clamp(34px,6vw,80px)',
            marginTop: 'clamp(38px,5vw,64px)', alignItems: 'start' }}>
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
                <span style={{ fontFamily: "var(--display)", fontSize: 'clamp(40px,5vw,60px)',
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
              <Field label="Name">
                <input style={inputStyle} value={form.name} placeholder="Who's it under?"
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                  onChange={(e) => set('name', e.target.value)} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <Field label="Email">
                  <input style={inputStyle} type="email" value={form.email} placeholder="you@email.com"
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    onChange={(e) => set('email', e.target.value)} />
                </Field>
                <Field label="Phone">
                  <input style={inputStyle} type="tel" value={form.phone} placeholder="(206) 000-0000"
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    onChange={(e) => set('phone', e.target.value)} />
                </Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
                <Field label="Pickup date"
                  hint={frozenOnly ? 'Frozen — pick up any day' : 'Saturday or Sunday only'}>
                  <input style={inputStyle} type="date"
                    value={form.date} min={todayISO()}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
                    onChange={(e) => set('date', e.target.value)} />
                </Field>
                {frozenOnly ? (
                  <Field label="Pickup time" hint="We'll email to confirm">
                    <div style={{ ...inputStyle, color: 'var(--muted)', cursor: 'default',
                      display: 'flex', alignItems: 'center', gap: 8 }}>
                      <window.Mail size={15} style={{ color: 'var(--accent)' }} />
                      Confirmed by email
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
                border: '1px solid var(--ink)', cursor: sending ? 'default' : 'pointer',
                opacity: sending ? 0.6 : 1, fontFamily: "'Oswald',sans-serif",
                fontWeight: 600, fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                transition: 'all .25s' }}>
                {sending ? 'Sending…' : <>Reserve {total > 0 ? `· $${total}` : 'this batch'}
                <window.ArrowRight size={16} /></>}
              </button>
              <p style={{ fontFamily: "'Lora',serif", fontSize: 13.5, lineHeight: 1.5,
                color: 'var(--muted)', margin: 0 }}>
                {frozenOnly
                  ? "No payment now. We'll email to confirm your pickup time, then you settle up at pickup. Cash or card."
                  : 'No payment now. We hold your batch and you settle up at the stand. Cash or card.'}
              </p>
            </div>
          </form>
        </>
      ) : (
        <Success done={done} fmtDate={fmtDate} onReset={reset} />
      )}

      <CateringNote />
    </SectionR>
  );
}

function Success({ done, fmtDate, onReset }) {
  return (
    <div className="cl-fade" style={{ marginTop: 'clamp(38px,5vw,64px)' }}>
      <div className="cl-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(34px,6vw,80px)', alignItems: 'start' }}>
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
              color: 'var(--ink-soft)', margin: '20px 0 0', maxWidth: 440 }}>
              We'll email you to confirm a pickup time for
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}> {fmtDate(done.date)}</b>. Your
              frozen dozens will be packed cold and ready to fry at home.
            </p>
          ) : (
            <p style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(17px,1.6vw,20px)', lineHeight: 1.6,
              color: 'var(--ink-soft)', margin: '20px 0 0', maxWidth: 440 }}>
              We'll have it rolled and ready. Come by the stand on
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}> {fmtDate(done.date)}</b> around
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}> {done.time}</b>.
            </p>
          )}
          <button onClick={onReset} style={{ appearance: 'none', marginTop: 34, padding: '16px 28px',
            background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)',
            cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12.5,
            letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Place another
          </button>
        </div>
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
                <span style={{ fontFamily: "var(--display)", fontSize: 17, color: 'var(--ink)' }}>
                  ${m.n * m.price}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginTop: 18 }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Pay at pickup</span>
            <span style={{ fontFamily: "var(--display)", fontSize: 34, color: 'var(--accent)' }}>
              ${done.total}</span>
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '22px 0' }} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <window.MapPin size={17} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} />
            <div style={{ fontFamily: "'Lora',serif", fontSize: 15.5, lineHeight: 1.5,
              color: 'var(--ink)' }}>
              <b style={{ fontWeight: 600 }}>Day Road Farm Stand</b><br />
              9251 NE Lovgreen Rd, Bainbridge Island, WA<br />
              <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                {done.frozenOnly
                  ? "We'll email to confirm your pickup time."
                  : 'Held until 1:30 PM. We roll until we run out.'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Reserve });
