
import { useEffect, useRef, useState } from "react";
import {
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPerplexity,
  SiReact,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import "./index.css";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        scrollable > 0
          ? (window.scrollY / scrollable) * 100
          : 0;

      setProgress(percentage);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function MovingTypography() {
  const words = [
    "CREATIVE DEVELOPER",
    "FRONT-END DEVELOPER",
    "WEB DEVELOPER",
  ];

  return (
    <div className="moving-type-section">
      <div className="moving-type-track">
        {[0, 1].map((copy) => (
          <div className="moving-type-group" key={copy}>
            {words.map((word, index) => (
              <span className="moving-type-word" key={index}>
                {word}
                <span className="moving-type-star"> ✳ </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechMarquee() {
  const technologies = [
    SiHtml5,
    SiCss,
    SiJavascript,
    SiReact,
    SiGit,
    SiGithub,
    SiPerplexity,
    VscVscode,
    SiFigma,
    SiNodedotjs,
  ];

  return (
    <div className="tech-marquee" role="img" aria-label="Technology logos">
      <div className="tech-marquee-track" aria-hidden="true">
        {[1, 2].map((copy) => (
          <div className="tech-marquee-group" key={copy}>
            {technologies.map((Icon, index) => (
              <div className="tech-marquee-item" key={index}>
                <Icon className="tech-marquee-icon" aria-hidden="true" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState({
    phase: "initial",
    step: 0,
    changedIndex: -1,
  });
  const [activeSkillCategory, setActiveSkillCategory] = useState(null);
  const skillCategories = [
    { label: "Programming Skills", skills: ["Java", "C", "C++"] },
    {
      label: "Web Technologies",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    },
    { label: "Frameworks", skills: ["React.js"] },
    { label: "Database", skills: ["MySQL", "SQL"] },
    { label: "Tools", skills: ["Git", "GitHub", "VS Code"] },
    {
      label: "Artificial Intelligence",
      skills: [
        "Generative AI",
        "Prompt Engineering",
        "AI Tools",
        "AI-assisted Development",
      ],
    },
  ];

  const portfolioTitle = "PORTFOLIO";
  const nameTitle = "MATHARASI";
  const titleLetters = Array.from(portfolioTitle, (letter, index) => {
    if (titleAnimation.phase === "to-name") {
      return index < titleAnimation.step ? nameTitle[index] : letter;
    }

    if (titleAnimation.phase === "to-portfolio") {
      return index < titleAnimation.step ? letter : nameTitle[index];
    }

    return letter;
  });

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (motionPreference.matches) {
      return;
    }

    let timeoutId;
    let step = 0;
    let phase = "to-name";

    const revealNextLetter = () => {
      step += 1;
      setTitleAnimation({ phase, step, changedIndex: step - 1 });

      if (step < portfolioTitle.length) {
        timeoutId = window.setTimeout(revealNextLetter, 220);
      } else if (phase === "to-name") {
        phase = "to-portfolio";
        step = 0;
        timeoutId = window.setTimeout(revealNextLetter, 950);
      } else {
        setTitleAnimation({
          phase: "complete",
          step: portfolioTitle.length,
          changedIndex: -1,
        });
      }
    };

    const handleMotionPreferenceChange = (event) => {
      if (event.matches) {
        window.clearTimeout(timeoutId);
        setTitleAnimation({
          phase: "complete",
          step: portfolioTitle.length,
          changedIndex: -1,
        });
      }
    };

    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    timeoutId = window.setTimeout(revealNextLetter, 650);

    return () => {
      window.clearTimeout(timeoutId);
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAboutVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    const section = aboutRef.current;

    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(
      ".home-page, .about-page, .skills-page, .projects-page, .contact-page"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-page");
          } else {
            entry.target.classList.remove("show-page");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(
      ".skill-card, .project-card"
    );

    const handleMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 12;
      const rotateX = (0.5 - (y / rect.height)) * 12;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

      card.style.setProperty(
        "--mouse-x",
        `${(x / rect.width) * 100}%`
      );
      card.style.setProperty(
        "--mouse-y",
        `${(y / rect.height) * 100}%`
      );
    };

    const handleLeave = (event) => {
      event.currentTarget.style.transform = "";
    };

    cards.forEach((card) => {
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
      });
    };
  }, []);

  return (
    <main>
      <ScrollProgress />
      <section className="home-page" id="home">
      <header className="home-header">
        <a href="#contact" className="contact-button">
          Contact
        </a>
      </header>

      <section className="hero">
        <h1 className="hero-portfolio-title" aria-label="PORTFOLIO">
          {titleLetters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={`hero-letter ${
                titleAnimation.changedIndex === index ? "is-revealing" : ""
              }`}
              style={{ "--letter-index": index }}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </h1>

        <div className="hero-glow"></div>

        <img
          className="profile-image"
          src="/profile.png"
          alt="Matharasi T"
        />

        <div className="hero-intro">
          
          <h2>Matharasi T</h2>
          <p className="job-title">Front-End Developer</p>
        </div>
      </section>
      </section>

      <TechMarquee />
      
      

<section
  className={`about-page ${aboutVisible ? "about-visible" : ""}`}
  id="about"
  ref={aboutRef}
>
  <div className="about-title-area">
    <p className="about-kicker">A LITTLE ABOUT MYSELF</p>
    <h2 className="about-big-title">
      ABOUT <span>ME.</span>
    </h2>
    <p className="about-caption">
      GET TO KNOW THE PERSON BEHIND THE CODE
    </p>
  </div>

  <div className="about-layout">
    <div className="about-portrait">
      <div className="portrait-frame">
        <img src="/profile.png" alt="Matharasi T" />
      </div>
      <span className="portrait-number">01 — CREATIVE MIND</span>
    </div>

    <div className="about-info">
      <p className="about-eyebrow">HELLO THERE, I'M</p>

      <h3>
        Matharasi
        <span> T</span>
      </h3>

      <h4>Front-End Developer</h4>

      <p className="about-paragraph">
        I'm an aspiring Front-End Developer who loves building
        beautiful, responsive and user-friendly websites.
      </p>

      <p className="about-paragraph">
        I enjoy exploring new technologies, experimenting with
        creative ideas and transforming concepts into engaging
        digital experiences.
      </p>

      <a href="#contact" className="about-link">
        LET'S CONNECT <span>↗</span>
      </a>
    </div>
  </div>
  
</section>


<section className="skills-page" id="skills">
  <div className="skills-heading">
    <p className="skills-kicker">MY TECHNICAL EXPERTISE</p>

    <h2>
      MY <span>SKILLS.</span>
    </h2>

    <p className="skills-caption">
      TECHNOLOGIES AND TOOLS I WORK WITH
    </p>
  </div>

  <div className="skills-list">
    {skillCategories.map(({ label, skills }, index) => (
      <div className="skill-category" key={label}>
        <button
          type="button"
          className={`skill-category-button ${
            activeSkillCategory === index ? "is-active" : ""
          }`}
          aria-pressed={activeSkillCategory === index}
          onClick={() =>
            setActiveSkillCategory(
              activeSkillCategory === index ? null : index
            )
          }
        >
          <span className="skill-category-label">{label}</span>
          <span className="skill-category-skills">
            {skills.map((skill) => (
              <span className="skill-name" key={skill}>
                {skill}
              </span>
            ))}
          </span>
        </button>
      </div>
    ))}
  </div>
</section>

{/* MY PROJECTS SECTION */}

<section className="projects-page" id="projects">
  <div className="projects-heading">
    <p className="projects-kicker">THINGS I'VE BUILT</p>

    <h2>
      MY <span>PROJECTS.</span>
    </h2>

    <p className="projects-caption">
      IDEAS TURNED INTO DIGITAL EXPERIENCES
    </p>
  </div>

  <div className="projects-grid">

    {/* PROJECT 01 - Aptitude Preparation */}

    <article className="project-card">
      <div className="project-top">
        <span>01 / LEARNING PLATFORM</span>
        <span className="project-arrow">↗</span>
      </div>

      <div className="project-visual aptitude-visual">
        <span className="visual-label">THINK. PRACTICE. IMPROVE.</span>
        <h3>APTI<br />PREP.</h3>
        <div className="visual-symbol">∑</div>
      </div>

      <div className="project-details">
        <h3>Aptitude Preparation</h3>

        <p>
          A platform to practise aptitude questions,
          improve problem-solving skills and prepare
          for placement assessments.
        </p>

        <div className="project-tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>node.js</span>
          <span>sqlite</span>
        </div>

        <div className="project-buttons">
          <a
            href="https://aptiprep-1zyu.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn live-btn"
          >
            LIVE DEMO ↗
          </a>
          <a
            href="https://github.com/matharasi2127/aptiprep"
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn github-btn"
          >
            GITHUB ↗
          </a>
        </div>
      </div>
    </article>

    {/* PROJECT 02 - Portfolio */}

    <article className="project-card">
      <div className="project-top">
        <span>02 / PERSONAL BRAND</span>
        <span className="project-arrow">↗</span>
      </div>

      <div className="project-visual portfolio-visual">
        <span className="visual-label">DESIGN. DEVELOP. CREATE.</span>
        <h3>MY<br />PORTFOLIO.</h3>
        <div className="visual-symbol">✳</div>
      </div>

      <div className="project-details">
        <h3>Personal Portfolio</h3>

        <p>
          A personal website showcasing my skills,
          projects and journey as a front-end developer
          with interactive animations.
        </p>

        <div className="project-tags">
          <span>React</span>
          <span>CSS</span>
          <span>JavaScript</span>
        </div>

        <div className="project-buttons">
          <a href="https://portfolio-gules-chi-69.vercel.app/" target="_blank" rel="noopener noreferrer">
            LIVE DEMO ↗
          </a>
          <a href="https://github.com/matharasi2127/portfolio.git" target="_blank" rel="noopener noreferrer">
            GITHUB ↗
          </a>
        </div>
      </div>
    </article>

  </div>
</section>

<Contact />

    </main>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio contact from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href =
      `mailto:matharasi65@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-page" id="contact">
      <div className="contact-animated-bg" aria-hidden="true">
        <div className="contact-orb orb-one"></div>
        <div className="contact-orb orb-two"></div>
        <div className="contact-grid"></div>
      </div>

      <div className="contact-heading">
        <p className="contact-kicker">HAVE A PROJECT IN MIND?</p>
        <h2>
          LET'S <span>CONNECT.</span>
        </h2>
        <p className="contact-subtitle">
          Got an idea? Let's turn it into something amazing.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <p className="contact-label">GET IN TOUCH</p>
          <h3>Let's make<br />something <span>great.</span></h3>
          <p className="contact-description">
            I'm open to opportunities, collaborations
            and exciting projects. Drop me a message!
          </p>

          <a
            className="contact-detail"
            href="mailto:matharasi65@gmail.com"
          >
            <span className="contact-icon">@</span>
            <span>
              <small>EMAIL ME</small>
              <strong>matharasi65@gmail.com</strong>
            </span>
            <span className="contact-arrow">↗</span>
          </a>

          <a
            className="contact-detail"
            href="https://github.com/matharasi2127"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-icon">GH</span>
            <span>
              <small>CHECK MY CODE</small>
              <strong>GitHub Profile</strong>
            </span>
            <span className="contact-arrow">↗</span>
          </a>

          <a
            className="contact-detail"
            href="https://www.linkedin.com/in/matharasi-t-"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-icon">in</span>
            <span>
              <small>LET'S NETWORK</small>
              <strong>LinkedIn Profile</strong>
            </span>
            <span className="contact-arrow">↗</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-kicker">SEND A MESSAGE</p>

          <label htmlFor="contact-name">YOUR NAME</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <label htmlFor="contact-email">YOUR EMAIL</label>
          <input
            id="contact-email"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <label htmlFor="contact-message">YOUR MESSAGE</label>
          <textarea
            id="contact-message"
            rows="4"
            placeholder="Tell me about your idea..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button className="contact-submit" type="submit">
            LET'S TALK <span>↗</span>
          </button>

          <p className="form-note">
            Your message will open in your default email app.
          </p>
        </form>
      </div>

      <footer className="contact-footer">
        <span>© 2026 MATHARASI T</span>
        
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}

export default App;
