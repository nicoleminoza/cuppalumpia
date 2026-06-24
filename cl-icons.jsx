// cl-icons.jsx — minimal Lucide-style line icons as React components.
// Structural indicators only: MapPin, Clock, Instagram, Mail, Minus, Plus,
// Check, ArrowUpRight, Wind, Flame, NoMicrowave. Stroke = currentColor.

function Icon({ size = 18, sw = 1.5, children, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={sw} strokeLinecap="round"
         strokeLinejoin="round" style={{ display: 'block', flexShrink: 0, ...style }}
         aria-hidden="true">
      {children}
    </svg>
  );
}

const MapPin = (p) => (
  <Icon {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

const Clock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 1.8" />
  </Icon>
);

const Instagram = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </Icon>
);

const Mail = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Icon>
);

const Minus = (p) => (
  <Icon {...p}><path d="M5 12h14" /></Icon>
);

const Plus = (p) => (
  <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>
);

const Check = (p) => (
  <Icon {...p}><path d="m4 12.5 5 5L20 6.5" /></Icon>
);

const ArrowUpRight = (p) => (
  <Icon {...p}><path d="M7 17 17 7M8 7h9v9" /></Icon>
);

const ArrowRight = (p) => (
  <Icon {...p}><path d="M4 12h15M13 6l6 6-6 6" /></Icon>
);

const Wind = (p) => (
  <Icon {...p}>
    <path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5" />
    <path d="M3 12h14a2.6 2.6 0 1 1-2.6 2.6" />
    <path d="M3 16h7a2.2 2.2 0 1 1-2.2 2.2" />
  </Icon>
);

const Flame = (p) => (
  <Icon {...p}>
    <path d="M12 3c1 3 4 4.2 4 8a4 4 0 0 1-8 0c0-1.4.5-2.3 1-3 .3 1 1 1.4 1.6 1.5C10 8 11 5 12 3Z" />
  </Icon>
);

const NoEntry = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.6 5.6 18.4 18.4" />
  </Icon>
);

const Leaf = (p) => (
  <Icon {...p}>
    <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1Z" />
    <path d="M5 19c3-4 6-6 10-7.5" />
  </Icon>
);

const Bell = (p) => (
  <Icon {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10.2 20a2 2 0 0 0 3.6 0" />
  </Icon>
);

const Wallet = (p) => (
  <Icon {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <path d="M3 9h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3" />
    <circle cx="16" cy="13" r="1.1" fill="currentColor" stroke="none" />
  </Icon>
);

Object.assign(window, {
  MapPin, Clock, Instagram, Mail, Minus, Plus, Check,
  ArrowUpRight, ArrowRight, Wind, Flame, NoEntry, Leaf, Bell, Wallet,
});
