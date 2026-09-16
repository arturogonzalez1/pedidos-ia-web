const ICONS = {
  logo: (
    <>
      <path d="M4 8h16v2H4z" />
      <path d="M5 10h14v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" />
      <path d="M9 13v5M12 13v5M15 13v5" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  palette: (
    <>
      <circle cx="13.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="7.5" cy="12.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 22a10 10 0 1 1 10-10c0 2.2-1.8 3-3 3h-1.5a2.5 2.5 0 0 0-2.3 3.5A2 2 0 0 1 12 22Z" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.6-3.4 4.5-5 8-5s6.4 1.6 8 5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v10H3z" />
      <path d="M14 11h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="18" cy="18" r="1.6" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16.5v.5" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13h4l2 3h4l2-3h4v6H4z" />
      <path d="M4 13 7 5h10l3 8" />
    </>
  ),
  flame: (
    <path d="M12 3c2 4-2 5-1 9 3-1 6-4 6-8 4 4 5 8 3 12a7 7 0 1 1-14 0c0-3 2-6 6-13Z" />
  ),
  utensils: (
    <>
      <path d="M4 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
      <path d="M6 12v9M16 3v18M16 8h4a2 2 0 0 0 0-4h-4" />
    </>
  ),
  bike: (
    <>
      <circle cx="6.5" cy="17.5" r="3.5" />
      <circle cx="17.5" cy="17.5" r="3.5" />
      <path d="M6.5 17.5 12 8h4M12 8l3 9.5M10 12h6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2 7.6 7.6M16.4 16.4l1.4 1.4M17.8 6.2 16.4 7.6M7.6 16.4 6.2 17.8" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 10 4a7 7 0 0 0 10 10.5Z" />,
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="m4 4 16 16" />
      <path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" />
      <path d="M7 7.6C4.4 9.2 2 12 2 12s4 7 10 7c1.7 0 3.2-.4 4.5-1.1" />
      <path d="M14.1 6.3A10 10 0 0 1 22 12s-.7 1.2-2 2.6" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3.5h3L11 7l-2 1.5a12 12 0 0 0 6.5 6.5L17 13l3.5 1.5v3A1.5 1.5 0 0 1 19 19 16 16 0 0 1 5 5a1.5 1.5 0 0 1 1.5-1.5Z" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="7" rx="8" ry="3" />
      <path d="M4 7v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7" />
      <path d="M4 12v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" />
    </>
  ),
}

export function Icon({ name, size = 20, stroke = 1.75, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}
