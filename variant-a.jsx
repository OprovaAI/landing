// Variant A — EDITORIAL
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

// --- Philosophy section with sequential reveal + strike animation ---
function PhilosophySection({ t }) {
  const ref = React.useRef(null);
  const [step, setStep] = React.useState(-1);
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setStep(0); io.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (step < 0) return;
    const lines = t.philosophy.lines.length;
    if (step < lines) {
      const id = setTimeout(() => setStep(s => s + 1), 420);
      return () => clearTimeout(id);
    }
    if (step === lines) {
      const id = setTimeout(() => setStep(s => s + 1), 500);
      return () => clearTimeout(id);
    }
  }, [step, t.philosophy.lines.length]);

  const linesCount = t.philosophy.lines.length;
  const revealedIdx = Math.min(step, linesCount);
  const strikeOn = step > linesCount;

  return (
    <section className="va-philo" ref={ref}>
      <div className="va-chap va-chap-center">{t.philosophy.eyebrow}</div>
      <div className="va-philo-stack">
        {t.philosophy.lines.map((l, i) => {
          const isLast = i === linesCount - 1;
          const shown = i < revealedIdx;
          const shouldStrike = strikeOn && !isLast;
          return (
            <div
              key={i}
              className={
                "va-philo-line" +
                (isLast ? " is-last" : "") +
                (shown ? " is-shown" : "") +
                (shouldStrike ? " is-struck" : "")
              }
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="va-philo-num">{String(i+1).padStart(2,'0')}</span>
              <span className="va-philo-text">
                <span className="va-philo-strike" aria-hidden />
                {l}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// --- Agent-to-agent live thread ---
function AgentThread({ t }) {
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const total = t.core.log.length;
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(es => setInView(es[0].isIntersecting), { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (!inView || !playing) return;
    const id = setInterval(() => setStep(s => (s + 1) % (total + 2)), 1400);
    return () => clearInterval(id);
  }, [inView, playing, total]);

  const visible = t.core.log.slice(0, Math.min(step + 1, total));

  return (
    <section id="core" className="va-thread" ref={ref}>
      <div className="va-two">
        <div className="va-col-label"><div className="va-chap">04 — {t.core.eyebrow}</div></div>
        <div className="va-col-body">
          <Reveal><h2 className="va-h2">{t.core.title}</h2></Reveal>
          <Reveal delay={140}>
            <p className="va-lede" style={{ marginTop: '24px', maxWidth: '640px' }}>{t.core.caption}</p>
          </Reveal>
          <Reveal delay={260}>
            <div className="va-thread-meta">
              <div className="va-thread-scenario">{t.core.scenario}</div>
              <button className="va-thread-play" onClick={() => setPlaying(p => !p)}>
                <span className={"va-pulse " + (playing ? "is-on" : "")} /> {playing ? 'PAUSE' : 'PLAY'}
              </button>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div className="va-parties">
              {t.core.parties.map(p => (
                <div key={p.id} className={"va-party va-party-" + p.id}>
                  <div className="va-party-dot" />
                  <div>
                    <div className="va-party-label">{p.label}</div>
                    <div className="va-party-sub">{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="va-thread-log">
            {visible.map((L, i) => {
              const isNew = i === Math.min(step, total - 1);
              return (
                <div key={i} className={"va-thread-row va-thread-" + L.party + (isNew ? " is-new" : "")}>
                  <span className="va-thread-t">{L.t}</span>
                  <span className={"va-thread-party-dot va-party-" + L.party}><i/></span>
                  <span className="va-thread-who">{L.who}</span>
                  <span className="va-thread-msg">{L.msg}</span>
                </div>
              );
            })}
            {step >= total && (
              <div className="va-thread-row va-thread-done">
                <span className="va-thread-t">—</span>
                <span className="va-thread-party-dot va-party-you"><i/></span>
                <span className="va-thread-who">system</span>
                <span className="va-thread-msg va-thread-dim">next event awaiting…</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function VariantA() {
  const { lang } = useLang();
  const t = window.OPROVA_COPY[lang];
  return (
    <div className="va-root" data-variant="A">

      {/* HERO */}
      <section className="va-hero">
        <div className="va-hero-grid">
          <div className="va-hero-left">
            <div className="va-eyebrow">— {t.hero.eyebrow}</div>
          </div>
          <div className="va-hero-main">
            <h1 className="va-headline">
              <span className="va-line">{t.hero.line1}</span>
              <span className="va-line va-line-2">{t.hero.line2}</span>
            </h1>
            <div className="va-hero-foot">
              <p className="va-lede">{t.hero.sub}</p>
              <div className="va-cta-row">
                <a href="mailto:mason@oprova.ai" className="va-cta-primary">{t.hero.cta} <ArrowRight size={16}/></a>
                <a href="#core" className="va-cta-ghost">{t.hero.cta2}</a>
              </div>
            </div>
          </div>
          <div className="va-hero-right">
            <div className="va-meta-block">
              <div className="va-meta-row"><span>FOUNDED</span><b>2026</b></div>
              <div className="va-meta-row"><span>LOCATION</span><b>SEOUL</b></div>
              <div className="va-meta-row"><span>STAGE</span><b>DESIGN PARTNER</b></div>
              <div className="va-meta-row"><span>INTAKE</span><b>Q2 · 4 LEFT</b></div>
            </div>
          </div>
        </div>
        <div className="va-hero-rule"></div>
        <div className="va-ticker">
          <Marquee items={[
            "ORDERS · AGENT",
            "SUPPORT · AGENT",
            "INVENTORY · AGENT",
            "VENDOR · AGENT",
            "SCHEDULING · AGENT",
            "BILLING · AGENT",
            "REPORTING · AGENT",
            "RFQ · AGENT",
          ]}/>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="va-problem">
        <div className="va-two">
          <div className="va-col-label"><div className="va-chap">01 — {t.problem.eyebrow}</div></div>
          <div className="va-col-body">
            <Reveal><h2 className="va-h2">{t.problem.title}</h2></Reveal>
            <div className="va-problem-list">
              <Reveal delay={120}><div className="va-prob-row"><span>a.</span><p>{t.problem.p1}</p></div></Reveal>
              <Reveal delay={240}><div className="va-prob-row"><span>b.</span><p>{t.problem.p2}</p></div></Reveal>
              <Reveal delay={360}><div className="va-prob-row"><span>c.</span><p>{t.problem.p3}</p></div></Reveal>
            </div>
            <Reveal delay={480}>
              <div className="va-pullquote">"{t.problem.close}"</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section id="why" className="va-who">
        <div className="va-two">
          <div className="va-col-label"><div className="va-chap">02 — {t.who.eyebrow}</div></div>
          <div className="va-col-body">
            <Reveal><h2 className="va-h2">{t.who.title}</h2></Reveal>
            <div className="va-who-grid">
              {t.who.items.map((it, i) => (
                <Reveal delay={i*120} key={i}>
                  <div className="va-who-cell">
                    <div className="va-who-n">{String(i+1).padStart(2,'0')}</div>
                    <div className="va-who-k">{it.k}</div>
                    <div className="va-who-v">{it.v}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="va-how">
        <div className="va-two">
          <div className="va-col-label"><div className="va-chap">03 — {t.how.eyebrow}</div></div>
          <div className="va-col-body">
            <Reveal><h2 className="va-h2">{t.how.title}</h2></Reveal>
            <div className="va-how-list">
              {t.how.steps.map((s, i) => (
                <Reveal delay={i*140} key={i}>
                  <article className="va-how-row">
                    <div className="va-how-n">{s.n}</div>
                    <div className="va-how-t">{s.t}</div>
                    <p className="va-how-d">{s.d}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AGENT THREAD */}
      <AgentThread t={t} />

      {/* METRICS */}
      <section className="va-metrics">
        <div className="va-two">
          <div className="va-col-label"><div className="va-chap">05 — {t.metrics.eyebrow}</div></div>
          <div className="va-col-body">
            <Reveal><h2 className="va-h2">{t.metrics.title}</h2></Reveal>
            <div className="va-m-grid">
              {t.metrics.items.map((m,i) => (
                <Reveal delay={i*120} key={i}>
                  <div className="va-m-cell">
                    <div className="va-m-big"><Counter to={m.big} /><span className="va-m-unit">{m.unit}</span></div>
                    <div className="va-m-label">{m.label}</div>
                    <div className="va-m-foot">{m.foot}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <PhilosophySection t={t} />

      {/* CTA */}
      <section id="contact" className="va-cta va-cta-premium">
        <div className="va-two">
          <div className="va-col-label"><div className="va-chap">06 — {t.cta.eyebrow}</div></div>
          <div className="va-col-body">
            <Reveal>
              <h2 className="va-cta-hl">
                {t.cta.title.split('\n').map((ln, i, arr) => (
                  <span key={i} className={"va-cta-hl-ln" + (i === arr.length - 1 ? " va-cta-hl-dim" : "")}>{ln}</span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="va-cta-sub">{t.cta.sub}</p>
            </Reveal>
            <Reveal delay={340}>
              <div className="va-cta-block va-cta-block-premium">
                <a href="mailto:mason@oprova.ai" className="va-cta-mail-line" aria-label={t.cta.book}>
                  <span className="va-cta-mail-label">{lang === 'ko' ? '메일 드리기' : 'Write to'}</span>
                  <span className="va-cta-mail-addr">{t.cta.book}</span>
                  <span className="va-cta-mail-arrow"><ArrowRight size={20}/></span>
                </a>
                <p className="va-cta-mail-foot">{t.cta.mail}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.VariantA = VariantA;
