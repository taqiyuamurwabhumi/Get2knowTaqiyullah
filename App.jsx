import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  ['ABOUT', 'about'],
  ['CV', 'cv'],
  ['PUBLICATIONS', 'publications'],
  ['SKILLS', 'skills'],
  ['CONTACT', 'contact'],
];

const education = [
  ['2024 — PRESENT', "MA Mu'allimin Muhammadiyah Yogyakarta"],
  ['2021 — 2024', "MTs Mu'allimin Muhammadiyah Yogyakarta"],
  ['2015 — 2021', 'SD An-Namiroh Pusat Pekanbaru'],
];

const leadership = [
  ['2025 — 2026', 'Ketua Umum', 'Lembaga Pers Mu\'allimin'],
  ['2025 — 2026', 'Sekretaris Umum', 'Kegiatan Mubaligh Hijrah KABARAT'],
  ['2024 — 2025', 'Anggota Bidang Redaksi', 'Lembaga Pers Mu\'allimin'],
  ['2024 — 2025', 'Anggota Kepanitiaan Milad SKM 100', ''],
];

const achievements = [
  ['2026', 'Most Outstanding Delegate (IMUN Yogyakarta), Verbal Commendation (BYDMUN & CYMUN), Honorable Mention (HONEYMUN & GMMUN Virtual), 3 Weeks Volunteering (Margahayu Selatan).'],
  ['2025', 'Best Delegate (TBMUN), Semi-Finalist OSM ANAVA#19, Participant (FSMIMUN Istanbul, IMUN Jakarta, JOINMUN Yogyakarta).'],
  ['2024', 'Grand Finalist Olimpiade Juara Nasional Cabang Matematika, Siswa Tiga Perguruan Tapak Suci Muhammadiyah.'],
  ['2023', 'English Camp (Malaysia-Singapore), Arabic Camp (Egypt).'],
];

const publications = [
  ['01', 'Norway in NATO', 'MUN POSITION PAPER · DIPLOMACY', 'bg-[#aeb8b0]'],
  ['02', 'Falling Body Acceleration', 'PHYSICS KTI · SCIENTIFIC RESEARCH', 'bg-[#d3a85f]'],
  ['03', 'SINAR Magazine', 'EDITORIAL & PRESS DIRECTION', 'bg-[#c85a47]'],
  ['04', 'China in UNEP', 'POLICY BRIEF · INTERNATIONAL RELATIONS', 'bg-[#d7d0c5]'],
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function DrawnDivider({ className = '' }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px bg-black/15 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'left' }}
    />
  );
}

function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <motion.div
      id={id}
      className="relative grid gap-5 py-7 md:grid-cols-[1.25fr_1fr_auto] md:items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <DrawnDivider className="absolute inset-x-0 top-0" />
      <DrawnDivider className="absolute inset-x-0 bottom-0" />
      <div>
        <p className="mb-3 font-mono text-[10px] tracking-[.16em] text-[#c85a47]">{eyebrow}</p>
        <motion.h2
          className="font-serif text-5xl uppercase leading-[.88] tracking-[-.07em] md:text-7xl"
          initial={{ y: 28, opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >{title}</motion.h2>
      </div>
      <p className="max-w-sm text-sm leading-7 text-black/60">{description}</p>
      <a href="#contact" className="font-mono text-[10px] tracking-[.12em] transition-colors hover:text-[#c85a47]">GET IN TOUCH <span className="ml-4 text-lg text-[#c85a47]">→</span></a>
    </motion.div>
  );
}

export default function App() {
  const [active, setActive] = useState('about');
  const [transition, setTransition] = useState(null);
  const sectionsRef = useRef([]);
  const navTimer = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] }
    );
    sectionsRef.current.forEach((section) => section && observer.observe(section));
    return () => {
      observer.disconnect();
      window.clearTimeout(navTimer.current);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const navigateTo = (id, index) => {
    window.clearTimeout(navTimer.current);
    setTransition({ id, label: navItems[index][0], number: String(index + 1).padStart(2, '0') });
    navTimer.current = window.setTimeout(() => {
      scrollTo(id);
      navTimer.current = window.setTimeout(() => setTransition(null), 260);
    }, 260);
  };
  const registerSection = (element) => {
    if (element && !sectionsRef.current.includes(element)) sectionsRef.current.push(element);
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#F9F8F6] text-[#121212] selection:bg-[#c85a47] selection:text-white">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -left-[22rem] -top-[24rem] h-[58rem] w-[58rem] rounded-full bg-[radial-gradient(circle,rgba(200,90,71,0.12)_0%,rgba(200,90,71,0)_70%)] blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-[32rem] -right-[24rem] h-[68rem] w-[68rem] rounded-full bg-[radial-gradient(circle,rgba(73,65,56,0.07)_0%,rgba(73,65,56,0)_70%)] blur-3xl"
          animate={{ scale: [1.03, 1, 1.03] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")" }}
        />
      </div>
      <header className="sticky top-0 z-50 border-b border-black/15 bg-[#F9F8F6]/90 px-6 backdrop-blur-md md:px-12">
        <nav className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-5">
          <button onClick={() => navigateTo('about', 0)} className="whitespace-nowrap font-mono text-[10px] font-medium tracking-[.1em]">T. AMURWABHUMI <span className="text-black/40">— PROFILE</span></button>
          <div className="flex gap-3 overflow-x-auto md:gap-7">
            {navItems.map(([label, id], index) => (
              <button key={id} onClick={() => navigateTo(id, index)} className={`relative whitespace-nowrap pb-2 font-mono text-[9px] tracking-[.12em] transition-colors ${active === id ? 'text-[#c85a47]' : 'text-black/55 hover:text-black'}`}>
                {active === id && <motion.span layoutId="active-dot" className="absolute -bottom-px left-0 h-px w-full bg-[#c85a47]" />}
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section ref={registerSection} id="about" className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1500px] items-center overflow-hidden px-6 py-24 md:px-12 lg:py-16">
          <motion.div className="pointer-events-none absolute left-[-2vw] top-[25%] whitespace-nowrap font-sans text-[25vw] font-black uppercase leading-[.72] tracking-[-.08em] text-[#e9e6e1]" initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.2 }}>PORTFOLIO</motion.div>
          <div className="relative z-10 w-full lg:w-[52%]">
            <Reveal><p className="mb-5 font-mono text-[10px] tracking-[.17em]">HELLO, I'M</p></Reveal>
            <Reveal delay={0.08}><h1 className="max-w-3xl font-serif text-[17vw] uppercase leading-[.78] tracking-[-.08em] md:text-[10vw] lg:text-[8.2vw]">Taqiyullah<br /><em className="font-normal text-[#c85a47]">Amurwabhumi</em></h1></Reveal>
            <Reveal delay={0.16}><p className="mt-9 font-mono text-[10px] uppercase tracking-[.13em] text-[#c85a47]">President of Student Press &amp; MUN Delegate</p></Reveal>
            <Reveal delay={0.24}><p className="mt-6 max-w-md text-sm leading-7 text-black/65">I am a Class of 2027 student at MA Mu'allimin Muhammadiyah Yogyakarta, an active Model UN delegate, researcher, and President of the Student Press. I work across diplomacy, communication, research, and editorial leadership.</p><div className="mt-8 font-serif text-3xl italic">Taqi <span className="text-[#c85a47]">—</span></div></Reveal>
          </div>
          <Reveal className="absolute bottom-8 right-[8%] z-10 hidden h-[min(48vw,650px)] w-[min(37vw,530px)] items-center justify-center md:flex" delay={0.25}>
            <div className="absolute aspect-square w-[90%] rounded-full bg-[#c85a47]" />
            <img src="./assets/Syawal-3x4.jpg" alt="Portrait of Taqiyullah Amurwabhumi" className="relative h-full w-[78%] rounded-[48%_48%_0_0] object-cover grayscale mix-blend-multiply" />
            <motion.div className="absolute -right-14 top-[25%] grid h-32 w-32 place-items-center rounded-full border border-black bg-[#F9F8F6]/80" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}><span className="w-20 text-center font-mono text-[9px] leading-5 tracking-[.12em]">OPEN FOR OPPORTUNITIES • CLASS OF 2027 •</span></motion.div>
          </Reveal>
        </section>

        <section ref={registerSection} id="cv" className="mx-auto max-w-[1500px] border-b border-black/15 px-6 py-24 md:px-12">
          <SectionHeading eyebrow="01 / ACADEMIC RECORD" title={<>Curriculum<br /><em className="font-normal text-[#c85a47]">Vitae</em></>} description="An editorial record of education, leadership, diplomacy, and academic milestones." />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
            <CVColumn title="Education" entries={education} />
            <CVColumn title="Leadership & Organization" entries={leadership} />
            <CVColumn title="Achievements & Honors" entries={achievements} />
          </div>
        </section>

        <section ref={registerSection} id="publications" className="mx-auto max-w-[1500px] px-6 py-24 md:px-12">
          <SectionHeading eyebrow="02 / SELECTED WORK" title={<>Selected<br /><em className="font-normal text-[#c85a47]">Publications</em></>} description="A considered archive of research, diplomacy, and visual stories shaped by curiosity and clarity." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{publications.map(([number, title, category, color], index) => <Reveal key={title} delay={index * .07}><article><div className={`group relative flex h-80 flex-col justify-between overflow-hidden p-5 ${color}`}><div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" /><span className="relative font-sans text-5xl font-black tracking-[-.08em]">{number === '02' ? 'g = 9.8' : number === '04' ? '中国' : number === '03' ? 'SINAR' : 'NATO'}</span><span className="relative self-end text-right font-mono text-[9px] leading-4">{category.split(' · ').map((part) => <React.Fragment key={part}>{part}<br /></React.Fragment>)}</span></div><div className="border-t border-black/15 pt-4"><b className="font-mono text-xl font-normal text-[#c85a47]">{number}</b><h3 className="mt-3 font-serif text-2xl">{title}</h3><p className="mt-2 font-mono text-[9px] tracking-[.1em] text-black/45">{category}</p></div></article></Reveal>)}</div>
        </section>

        <section ref={registerSection} id="skills" className="relative px-6 py-24 md:px-12"><DrawnDivider className="absolute inset-x-0 top-0" /><DrawnDivider className="absolute inset-x-0 bottom-0" /><div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3 md:gap-0"><Reveal className="md:border-r md:border-black/15 md:pr-12"><p className="font-mono text-[10px] tracking-[.15em] text-[#c85a47]">03 / CAPABILITIES</p><motion.h2 className="mt-7 font-serif text-5xl uppercase leading-[.88] tracking-[-.07em]" initial={{ y: 24, opacity: 0, clipPath: 'inset(0 0 100% 0)' }} whileInView={{ y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>Skills &amp;<br /><em className="font-normal text-[#c85a47]">Expertise</em></motion.h2><SkillList /></Reveal><Reveal className="md:border-r md:border-black/15 md:px-12" delay={.1}><span className="font-serif text-8xl leading-none text-[#c85a47]">“</span><blockquote className="mt-3 font-serif text-4xl leading-none tracking-[-.05em]">Purpose is not a destination. It is the lens through which we make every decision.</blockquote><cite className="mt-8 block font-mono text-[10px] text-black/45">— A working philosophy</cite></Reveal><Reveal className="md:pl-12" delay={.2}><Competencies /></Reveal></div></section>

        <section ref={registerSection} id="contact" className="mx-auto max-w-[1500px] border-t-4 border-[#121212] px-6 py-24 md:px-12"><div className="grid gap-14 md:grid-cols-2"><Reveal><p className="font-mono text-[10px] tracking-[.15em] text-[#c85a47]">04 / GET IN TOUCH</p><h2 className="mt-10 font-serif text-6xl uppercase leading-[.82] tracking-[-.08em] md:text-8xl">Let's connect<br /><em className="font-normal text-[#c85a47]">something great.</em></h2><p className="mt-8 max-w-sm text-sm leading-7 text-black/60">Open to research collaborations, MUN delegations, and editorial projects.</p></Reveal><Reveal delay={.15}><form onSubmit={(event) => event.preventDefault()} className="space-y-5"><input aria-label="Your name" placeholder="YOUR NAME" className="w-full border-b border-black/20 bg-transparent py-4 font-mono text-[10px] outline-none placeholder:text-black/40 focus:border-[#c85a47]" /><input aria-label="Your email" type="email" placeholder="YOUR EMAIL" className="w-full border-b border-black/20 bg-transparent py-4 font-mono text-[10px] outline-none placeholder:text-black/40 focus:border-[#c85a47]" /><textarea aria-label="Your message" placeholder="YOUR MESSAGE" rows="3" className="w-full resize-none border-b border-black/20 bg-transparent py-4 font-mono text-[10px] outline-none placeholder:text-black/40 focus:border-[#c85a47]" /><button className="border border-[#121212] px-6 py-4 font-mono text-[10px] tracking-[.12em] transition-colors hover:bg-[#c85a47] hover:text-white">SEND MESSAGE ↗</button></form><div className="mt-12 grid gap-5 border-t border-black/15 pt-7 font-mono text-xs"><a href="mailto:taqiyuamurwabhumi@gmail.com"><small className="mr-5 text-[#c85a47]">EMAIL</small>taqiyuamurwabhumi@gmail.com</a><a href="tel:+6285867523019"><small className="mr-5 text-[#c85a47]">WHATSAPP</small>+62 858-6752-3019</a><a href="https://instagram.com/amurwa._"><small className="mr-5 text-[#c85a47]">INSTAGRAM</small>@amurwa._</a><p><small className="mr-5 text-[#c85a47]">LOCATION</small>Yogyakarta / Tangerang Selatan, Indonesia</p></div></Reveal></div></section>
      </main>

      <AnimatePresence>
        {transition && (
          <motion.div
            key={transition.id}
            role="status"
            aria-label={`Navigating to ${transition.label}`}
            className="pointer-events-none fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#c85a47] text-[#F9F8F6]"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-[#F9F8F6]/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            />
            <motion.p
              className="relative font-serif text-[clamp(3rem,10vw,9rem)] uppercase leading-none tracking-[-.07em]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.8, delay: 0.08 }}
            >
              <span className="mr-4 align-middle font-mono text-[.18em] tracking-[.08em]">{transition.number} //</span>
              {transition.label}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CVColumn({ title, entries }) {
  return <div className="border-t border-black/15 md:border-t-0 md:border-r md:px-8 first:pl-0 last:border-0"><p className="mb-5 font-mono text-[10px] uppercase tracking-[.14em] text-[#c85a47]">{title}</p>{entries.map((entry, index) => <div key={index} className="border-t border-black/15 py-5"><b className="font-mono text-[10px] font-normal tracking-[.08em] text-[#c85a47]">{entry[0]}</b>{entry.length === 2 ? <p className="mt-2 text-sm font-medium leading-6">{entry[1]}</p> : <><p className="mt-2 text-sm font-semibold leading-5">{entry[1]}</p><p className="mt-1 text-xs leading-5 text-black/55">{entry[2]}</p></>}</div>)}</div>;
}

function SkillList() {
  const skills = [['Indonesian', 'Native', 100], ['English', 'IELTS 7 / C1 Level', 88], ['Team Communication', '', 92], ['Data Observation & Analytics', '', 84], ['Problem Solving', '', 90], ['Publication / Redaksi Management', '', 94]];
  return <div className="mt-12">{skills.map(([name, detail, width], index) => <div key={name} className="mb-7 font-mono text-[10px]"><div className="flex justify-between gap-3"><span>{name} <small className="text-black/45">{detail}</small></span></div><div className="mt-3 h-px bg-black/15"><motion.div className="h-px bg-[#c85a47]" style={{ width: `${width}%`, transformOrigin: 'left' }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ type: 'spring', stiffness: 90, damping: 18, mass: 0.8, delay: index * 0.06 }} /></div></div>)}</div>;
}

function Competencies() {
  const items = [['01', 'Research with intent', 'Turning complex questions into structured, useful insight.'], ['02', 'Lead with empathy', 'Building bridges across people, cultures, and ideas.'], ['03', 'Make it memorable', 'Giving every message a clear and compelling form.']];
  return <div className="space-y-0">{items.map(([number, title, text]) => <div key={number} className="border-b border-black/15 pb-7 pt-1"><b className="font-mono text-[10px] text-[#c85a47]">{number}</b><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-xs leading-6 text-black/55">{text}</p></div>)}</div>;
}
