// Shared primitives + chrome for Oprova landing
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- i18n hook (shared pub-sub so all components re-render on change) ----------
window.__oprovaLangListeners = window.__oprovaLangListeners || new Set();
window.__oprovaLang = window.__oprovaLang || (() => {
  try { return localStorage.getItem('oprova_lang') || 'ko'; } catch(e) { return 'ko'; }
})();
function useLang() {
  const [lang, setLangState] = useState(window.__oprovaLang);
  useEffect(() => {
    const fn = (v) => setLangState(v);
    window.__oprovaLangListeners.add(fn);
    return () => { window.__oprovaLangListeners.delete(fn); };
  }, []);
  const setLang = useCallback((v) => {
    window.__oprovaLang = v;
    try { localStorage.setItem('oprova_lang', v); } catch(e){}
    window.__oprovaLangListeners.forEach(fn => fn(v));
  }, []);
  const t = window.OPROVA_COPY[lang];
  return { lang, setLang, t };
}

// ---------- Logo (white inline SVG) ----------
function Logo({ size = 22, color = "currentColor" }) {
  return (
    <svg viewBox="245 250 370 95" height={size} aria-label="Oprova AI"
      style={{display:'block', shapeRendering:'geometricPrecision'}}
      preserveAspectRatio="xMidYMid meet">
      <g fill={color}>
        <path d="M267.68,254.26c-6.51,0-11.49,1.85-14.94,5.54-3.45,3.7-5.18,8.92-5.18,15.66v44.34c0,6.75,1.73,11.97,5.18,15.66,3.45,3.69,8.43,5.54,14.94,5.54s11.49-1.85,14.94-5.54c3.45-3.69,5.18-8.92,5.18-15.66v-44.34c0-6.75-1.73-11.97-5.18-15.66-3.45-3.69-8.43-5.54-14.94-5.54ZM274.54,320.65c0,5.54-2.29,8.31-6.87,8.31s-6.87-2.77-6.87-8.31v-46.03c0-5.54,2.29-8.31,6.87-8.31s6.87,2.77,6.87,8.31v46.03Z"/>
        <path d="M316.23,255.47h-19.52v84.34h13.25v-34.34h6.27c6.59,0,11.53-1.77,14.82-5.3,3.29-3.53,4.94-8.71,4.94-15.54v-8.31c0-6.83-1.65-12.01-4.94-15.54-3.29-3.53-8.23-5.3-14.82-5.3ZM322.74,285.47c0,2.89-.54,4.94-1.63,6.14s-2.71,1.81-4.88,1.81h-6.27v-25.91h6.27c2.17,0,3.8.6,4.88,1.81s1.63,3.25,1.63,6.14v10Z"/>
        <path d="M382.62,329.57v-14.82c0-4.98-.66-8.95-1.99-11.93-1.32-2.97-3.6-4.94-6.81-5.9v-.24c5.78-2.33,8.68-7.87,8.68-16.63v-5.18c0-6.59-1.57-11.47-4.7-14.64-3.13-3.17-8.11-4.76-14.94-4.76h-19.64v84.34h13.25v-36.15h4.58c3.05,0,5.2.76,6.45,2.29,1.24,1.53,1.87,4.22,1.87,8.07v15.42c0,3.13.08,5.3.24,6.51.16,1.21.48,2.49.96,3.86h13.5c-.64-1.45-1.04-2.91-1.2-4.4-.16-1.49-.24-3.43-.24-5.84ZM369.25,282.7c0,3.21-.66,5.5-1.99,6.87-1.33,1.37-3.31,2.05-5.96,2.05h-4.82v-24.1h6.03c2.33,0,4.04.68,5.12,2.05,1.08,1.37,1.63,3.58,1.63,6.63v6.51Z"/>
        <path d="M410.94,254.26c-6.51,0-11.49,1.85-14.94,5.54-3.45,3.7-5.18,8.92-5.18,15.66v44.34c0,6.75,1.73,11.97,5.18,15.66,3.45,3.69,8.43,5.54,14.94,5.54s11.49-1.85,14.94-5.54c3.45-3.69,5.18-8.92,5.18-15.66v-44.34c0-6.75-1.73-11.97-5.18-15.66-3.45-3.69-8.43-5.54-14.94-5.54ZM417.81,320.65c0,5.54-2.29,8.31-6.87,8.31s-6.87-2.77-6.87-8.31v-46.03c0-5.54,2.29-8.31,6.87-8.31s6.87,2.77,6.87,8.31v46.03Z"/>
        <polygon points="467.21 255.47 458.53 320.89 458.29 320.89 449.62 255.47 436.24 255.47 449.01 339.81 466.61 339.81 479.38 255.47 467.21 255.47"/>
        <path d="M560.22,255.47l-9.18,56.39h-31.27l-9.18-56.39h-17.95l-13.74,84.34h12.29l2.41-16.51h15.06v-.24l2.41,16.75h13.25l-2.73-16.75h27.62l-2.73,16.75h12.29l2.41-16.51h15.06v-.24l2.41,16.75h13.25l-13.74-84.34h-17.95ZM500.94,270.17h.24l5.9,41.69h-11.93l5.79-41.69ZM568.54,270.17h.24l5.9,41.69h-11.93l5.79-41.69Z"/>
        <rect x="598.3" y="255.47" width="13.25" height="84.34"/>
      </g>
    </svg>
  );
}

// ---------- Inline arrow ----------
function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display:'inline-block',verticalAlign:'middle'}}>
      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ---------- Top nav ----------
function TopNav({ lang, setLang }) {
  const t = window.OPROVA_COPY[lang];
  return (
    <header className="op-nav">
      <a href="#top" className="op-nav-logo" aria-label="Oprova AI">
        <Logo size={24} color="var(--fg)" />
      </a>
      <nav className="op-nav-center">
        <a href="#how">{t.nav.how}</a>
        <a href="#why">{t.nav.why}</a>
      </nav>
      <div className="op-nav-right">
        <div className="op-toggle" role="tablist" aria-label="Language">
          {['EN','KO'].map(l => (
            <button key={l} role="tab" aria-selected={lang===l.toLowerCase()}
              className={"op-toggle-btn" + (lang===l.toLowerCase() ? " is-on" : "")}
              onClick={() => setLang(l.toLowerCase())}>{l}</button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ---------- Marquee ----------
function Marquee({ items, speed = 40 }) {
  return (
    <div className="op-marquee">
      <div className="op-marquee-track" style={{animationDuration: `${speed}s`}}>
        {[...items, ...items, ...items].map((x,i) => (
          <span key={i} className="op-marquee-item">{x}</span>
        ))}
      </div>
    </div>
  );
}

// ---------- IntersectionObserver reveal ----------
function Reveal({ children, delay=0, className="", style={} }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); io.disconnect(); } });
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={"op-reveal " + (on ? "is-in " : "") + className} style={style}>
      {children}
    </div>
  );
}

// ---------- Counter animation ----------
function Counter({ to, duration = 1400 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver((ents) => {
      if (!ents[0].isIntersecting) return;
      const start = performance.now();
      const target = parseFloat(to);
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  const n = Number.isInteger(parseFloat(to)) ? Math.round(val) : val.toFixed(1);
  return <span ref={ref}>{n}</span>;
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="op-footer">
      <div className="op-footer-row">
        <Logo size={14} color="var(--fg-dim)" />
        <span>© 2026 OPROVA AI CO., LTD.</span>
        <span>mason@oprova.ai</span>
      </div>
    </footer>
  );
}

Object.assign(window, { useLang, Logo, ArrowRight, TopNav, Marquee, Reveal, Counter, Footer });
