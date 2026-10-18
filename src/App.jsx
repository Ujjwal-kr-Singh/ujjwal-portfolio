import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail, MapPin, Moon, Sun } from 'lucide-react'

const EMAIL = 'dujjwasingh@gmail.com'
const CAREER_START = new Date(2024, 6, 1)

const projects = [
  {
    name: 'NEO',
    kind: 'Real estate platform',
    status: 'Live',
    what: 'Property search and listings with an admin panel, backed by REST APIs I optimised for heavy read traffic.',
    result: '500,000+ API requests a day',
    stack: ['Node.js', 'Angular', 'MongoDB'],
  },
  {
    name: 'Alumni ERP',
    kind: 'College management system',
    status: 'Live',
    what: 'One system for alumni, students and administrators, with chat-style messaging and a shared component library.',
    result: 'Three user roles, one codebase',
    stack: ['Vue.js', 'Node.js'],
  },
  {
    name: 'Gerry',
    kind: 'Savings platform',
    status: 'In development',
    what: 'Sign-in and session handling, savings goals, and linked family accounts.',
    result: 'Auth and goal-tracking flows end to end',
    stack: ['Vue.js', 'Node.js', 'MongoDB'],
  },
  {
    name: 'H-Sports',
    kind: 'Sports and events platform',
    status: 'On staging',
    what: 'Modular APIs for events and match data, consumed by Vue dashboards.',
    result: 'Modular API and dashboard integration',
    stack: ['Vue.js', 'Node.js', 'MongoDB'],
  },
]

const jobs = [
  {
    when: 'Jul 2025 – now',
    role: 'Freelance web developer',
    org: 'Remote contract',
    points: [
      'Build and maintain features in Node.js, Angular and SQL.',
      'Write unit tests for new code and plan sprint work directly with stakeholders.',
    ],
  },
  {
    when: 'Jul 2024 – Jun 2025',
    role: 'Associate full stack developer',
    org: 'Huulke Technologies India Pvt. Ltd.',
    points: [
      'Built and tuned REST APIs for a production platform handling 500,000+ requests a day.',
      'Reworked MongoDB schemas and queries to keep data operations fast as volume grew.',
      'Shipped Vue.js and Angular front-end features, admin panels, refactors and production releases.',
    ],
  },
]

const skills = [
  ['Backend', 'Node.js, Express, REST API design, authentication'],
  ['Front end', 'Vue.js, Angular, HTML, CSS'],
  ['Data', 'MongoDB (schema and query tuning), SQL'],
  ['Cloud and tooling', 'AWS S3, EC2 and Lambda; Git, Postman, MongoDB Compass'],
  ['Languages', 'JavaScript, Java, Python, SQL'],
]

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
  }, [theme])
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))]
}

function Section({ id, title, children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [copied, setCopied] = useState(false)
  const years = Math.max(1, Math.floor((Date.now() - CAREER_START) / (365.25 * 24 * 3600 * 1000)))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <>
      <a className="skip" href="#work">Skip to content</a>
      <header className="bar">
        <div className="wrap bar-in">
          <a className="mark" href="#top" aria-label="Ujjwal Kumar Singh, top of page">Ujjwal Kr. Singh</a>
          <nav aria-label="Main">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main id="top" className="wrap">
        <section className="hero">
          <h1>
            <span className="line">
              Developer by passion. Problem-solver by mindset.
            </span>
            <span className="line">
              I transform ideas into purposeful digital products through code, creativity, and curiosity.
            </span>
          </h1>
          <div className="hero-side">
            <p>
              I'm a developer, with {years}+ years of experience, who enjoys creating responsive web applications and meaningful digital experiences.
              From designing intuitive interfaces to building functional features,
              I focus on writing maintainable code and continuously improving my skills.

            </p>
            <div className="actions">
              <a className="btn btn-solid" href="/resume.pdf" download><Download size={16} /> Download resume</a>
              <a className="btn" href="#contact"><Mail size={16} /> Get in touch</a>
            </div>
            <p className="where"><MapPin size={15} /> Ghaziabad, India · available for new roles and contract work</p>
          </div>
        </section>

        <Section id="work" title="Projects">
          <ul className="projects">
            {projects.map(p => (
              <li key={p.name} className="project">
                <div className="project-head">
                  <h3>{p.name}</h3>
                  <span className={`status ${p.status === 'Live' ? 'status-live' : ''}`}>{p.status}</span>
                </div>
                <p className="kind">{p.kind}</p>
                <p>{p.what}</p>
                <p className="result"><Check size={15} /> {p.result}</p>
                <ul className="stack" aria-label="Technologies">
                  {p.stack.map(s => <li key={s}>{s}</li>)}
                </ul>
                {p.url && <a className="text-link" href={p.url} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a>}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="jobs">
            {jobs.map(j => (
              <li key={j.when}>
                <p className="when">{j.when}</p>
                <h3>{j.role}</h3>
                <p className="org">{j.org}</p>
                <ul>{j.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="skills">
            {skills.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <ul className="edu">
            <li><div><h3>B.Tech, Computer Science</h3><p>R.D. Engineering College</p></div><p className="when">2020 – 2024 · 7.6 CGPA</p></li>
            <li><div><h3>Intermediate</h3><p>St. Joseph's Academy</p></div><p className="when">2019 – 2020 · 77%</p></li>
          </ul>
          <p className="certs">Also: Full Stack Development training, Coding Ninjas certifications in Java, C/C++ and Python, and college programming competition awards.</p>
        </Section>

        <Section id="contact" title="Contact">
          <p className="contact-lead">Hiring, or have something to build? Email is the fastest way to reach me.</p>
          <div className="email-row">
            <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button className="btn" onClick={copyEmail}>
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy email</>}
            </button>
          </div>
          <p className="elsewhere">
            <a href="https://github.com/Ujjwal-kr-Singh" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
            <a href="https://www.linkedin.com/in/ujjwal-singh-a04479209" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
          </p>
        </Section>
      </main>

      <footer className="wrap foot">© {new Date().getFullYear()} Ujjwal Kumar Singh</footer>
    </>
  )
}
