"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Image from "next/image";
import A4ResumeModal from "@/components/A4ResumeModal";
import { PROFILE_DATA } from "@/data/profile";
import {
  SHOWCASE_CATEGORIES,
  SHOWCASE_WORKS,
  TICKER_ITEMS,
  type ShowcaseWork,
} from "@/data/showcaseWorks";

type PageName = "home" | "projects" | "about";

const PAGE_NAMES: PageName[] = ["home", "projects", "about"];
const HERO_WORDS = ["Prensu", "Sonkar"];

export default function PortfolioHome() {
  const [activePage, setActivePage] = useState<PageName>("home");
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const [selectedWork, setSelectedWork] = useState<ShowcaseWork | null>(null);
  // Keep the last selected work mounted so its images stay cached after close
  const lastWorkRef = useRef<ShowcaseWork | null>(null);
  if (selectedWork) lastWorkRef.current = selectedWork;
  const dialogWork = selectedWork ?? lastWorkRef.current;
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({
    left: 5,
    width: 0,
  });

  const navLinksRef = useRef<Record<PageName, HTMLAnchorElement | null>>({
    home: null,
    projects: null,
    about: null,
  });
  const sectionRefs = useRef<Record<PageName, HTMLElement | null>>({
    home: null,
    projects: null,
    about: null,
  });
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dbodyRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const openResumeModal = useCallback(() => setResumeModalOpen(true), []);
  const closeResumeModal = useCallback(() => setResumeModalOpen(false), []);

  const updatePill = useCallback((currentPage: PageName) => {
    const activeLink = navLinksRef.current[currentPage];
    if (!activeLink) return;
    setPillStyle({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
    });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => updatePill(activePage));
    const handleResize = () => updatePill(activePage);

    window.addEventListener("resize", handleResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updatePill(activePage));
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [activePage, updatePill]);

  // IntersectionObserver to highlight active nav based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section most visible in the viewport
        let best: { page: PageName; ratio: number } | null = null;
        entries.forEach((entry) => {
          const id = entry.target.id as PageName;
          if (!PAGE_NAMES.includes(id)) return;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { page: id, ratio: entry.intersectionRatio };
          }
        });
        if (best && (best as { page: PageName; ratio: number }).ratio > 0.1) {
          setActivePage((best as { page: PageName; ratio: number }).page);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7] }
    );

    PAGE_NAMES.forEach((name) => {
      const el = sectionRefs.current[name];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle initial hash on load
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    let target: PageName = "home";
    if (hash === "projects" || hash === "work") target = "projects";
    else if (hash === "about" || hash === "resume") target = "about";

    if (target !== "home") {
      setTimeout(() => {
        const el = sectionRefs.current[target];
        if (el) {
          window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  const scrollToSection = useCallback((target: PageName) => {
    const el = sectionRefs.current[target];
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      setActivePage(target);
      // Update URL hash without triggering navigation
      history.pushState(null, "", `#${target}`);
    }
  }, []);

  const handleNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, targetPage: PageName) => {
      e.preventDefault();
      scrollToSection(targetPage);
    },
    [scrollToSection]
  );

  const filteredWorks = useMemo(
    () =>
      SHOWCASE_WORKS.filter(
        (work) => currentCategory === "All" || work.c === currentCategory
      ),
    [currentCategory]
  );

  const openWorkDialog = useCallback((work: ShowcaseWork) => {
    setSelectedWork(work);
    setActiveSlide(0);
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) {
      dlg.showModal();
    }
    if (dbodyRef.current) {
      dbodyRef.current.scrollTop = 0;
    }
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = 0;
    }
  }, []);

  const closeWorkDialog = useCallback(() => {
    const dlg = dialogRef.current;
    if (dlg && dlg.open) {
      dlg.close();
    }
    setSelectedWork(null);
  }, []);

  const scrollGallery = useCallback((direction: "left" | "right") => {
    const el = galleryRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  const handleGalleryScroll = useCallback(() => {
    const el = galleryRef.current;
    if (!el || !selectedWork?.imgs?.length) return;
    const items = el.querySelectorAll<HTMLElement>(".gal-item");
    if (!items.length) return;
    const containerCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    setActiveSlide(closestIndex);
  }, [selectedWork]);

  const scrollToSlide = useCallback((index: number) => {
    const el = galleryRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".gal-item");
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveSlide(index);
    }
  }, []);

  const handleGalleryWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const el = galleryRef.current;
      if (!el || !selectedWork?.imgs || selectedWork.imgs.length <= 1) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
      }
    },
    [selectedWork]
  );

  useEffect(() => {
    if (!selectedWork || !selectedWork.imgs || selectedWork.imgs.length <= 1)
      return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollGallery("left");
      } else if (e.key === "ArrowRight") {
        scrollGallery("right");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedWork, scrollGallery]);

  const handleCardMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    },
    []
  );

  const handleCardMouseLeave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = "";
    },
    []
  );

  // Build hero letter indices sequentially across ["Prensu", "Sonkar"]
  const heroWordsWithIndices = useMemo(() => {
    let charIndex = 0;
    return HERO_WORDS.map((word) => ({
      word,
      letters: word.split("").map((letter) => ({
        letter,
        index: charIndex++,
      })),
    }));
  }, []);

  const tickerContent = useMemo(
    () => [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS],
    []
  );

  return (
    <>
      <div className="ps-shell">
        <header>
          <a
            className="logo"
            href="#home"
            aria-label="Home"
            onClick={(e) => handleNavClick(e, "home")}
          >
            PS
          </a>
          <nav aria-label="Main">
            <i
              id="pill"
              style={{
                left: `${pillStyle.left}px`,
                width: pillStyle.width > 0 ? `${pillStyle.width}px` : undefined,
              }}
            />
            <a
              ref={(el) => {
                navLinksRef.current.home = el;
              }}
              href="#home"
              aria-current={activePage === "home" ? "page" : undefined}
              onClick={(e) => handleNavClick(e, "home")}
            >
              Home
            </a>
            <a
              ref={(el) => {
                navLinksRef.current.projects = el;
              }}
              href="#projects"
              aria-current={activePage === "projects" ? "page" : undefined}
              onClick={(e) => handleNavClick(e, "projects")}
            >
              Projects
            </a>
            <a
              ref={(el) => {
                navLinksRef.current.about = el;
              }}
              href="#about"
              aria-current={activePage === "about" ? "page" : undefined}
              onClick={(e) => handleNavClick(e, "about")}
            >
              About me
            </a>
          </nav>
        </header>

        <aside className="rail" aria-label="Social links">
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GH<span>GitHub</span>
          </a>
          <a
            href={PROFILE_DATA.behance ?? "https://www.behance.net/prensusonkar"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
          >
            Bē<span>Behance</span>
          </a>
          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            in<span>LinkedIn</span>
          </a>
          <button
            type="button"
            className="cv"
            id="cvlink"
            aria-label="Resume"
            onClick={openResumeModal}
          >
            CV<span>Resume</span>
          </button>
        </aside>

        <main id="main">
          {/* 1. Home */}
          <section
            className="page"
            id="home"
            ref={(el) => { sectionRefs.current.home = el; }}
          >
            <div className="hero">
              {/* ── Space scene SVG — SMIL animations (browser-native, always works) ── */}
              <svg
                className="hero-space-svg"
                viewBox="-20 -20 540 540"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="astro-body" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="70%" stopColor="#e8e4ff" />
                    <stop offset="100%" stopColor="#c5bef5" />
                  </radialGradient>
                  <radialGradient id="visor-grad" cx="38%" cy="35%" r="55%">
                    <stop offset="0%" stopColor="#a8f0ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#5B3DF5" stopOpacity="0.7" />
                  </radialGradient>
                  <radialGradient id="planet1-grad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#9b7fff" />
                    <stop offset="60%" stopColor="#5B3DF5" />
                    <stop offset="100%" stopColor="#2a1a7a" />
                  </radialGradient>
                  <radialGradient id="planet2-grad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#ffb07a" />
                    <stop offset="55%" stopColor="#FF7A45" />
                    <stop offset="100%" stopColor="#b03a00" />
                  </radialGradient>
                  <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* ── Twinkling stars — SMIL animate opacity ── */}
                {([
                  [42,  38,  2.5, "0s",   "#5B3DF5", "2.8s"],
                  [310, 60,  2,   "0.6s",  "#FF7A45", "3.2s"],
                  [80,  150, 1.8, "1.1s",  "#5B3DF5", "2.5s"],
                  [420, 130, 2.2, "0.3s",  "#FF7A45", "3.6s"],
                  [160, 55,  1.5, "1.5s",  "#5B3DF5", "2.9s"],
                  [370, 310, 2,   "0.9s",  "#FF7A45", "3.1s"],
                  [55,  390, 1.6, "0.4s",  "#5B3DF5", "2.7s"],
                  [450, 400, 2.4, "1.3s",  "#FF7A45", "3.4s"],
                  [230, 20,  1.8, "0.7s",  "#5B3DF5", "2.6s"],
                  [470, 240, 1.5, "1.8s",  "#5B3DF5", "3.0s"],
                ] as [number,number,number,string,string,string][]).map(([cx,cy,r,begin,fill,dur],i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} fill={fill}>
                    <animate attributeName="opacity" values="0.1;1;0.1" dur={dur} begin={begin} repeatCount="indefinite" />
                    <animate attributeName="r" values={`${r*0.6};${r*1.5};${r*0.6}`} dur={dur} begin={begin} repeatCount="indefinite" />
                  </circle>
                ))}

                {/* ── Comet — fades in and streaks ── */}
                <g>
                  <line x1="430" y1="25" x2="370" y2="72" stroke="#FF7A45" strokeWidth="2" strokeLinecap="round">
                    <animate attributeName="opacity" values="0;0.9;0.7;0" dur="4s" begin="1s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="translate" values="0,0;-70,55;-70,55" dur="4s" begin="1s" repeatCount="indefinite" />
                  </line>
                  <circle cx="430" cy="25" r="3" fill="#FF7A45">
                    <animate attributeName="opacity" values="0;1;0.8;0" dur="4s" begin="1s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="translate" values="0,0;-70,55;-70,55" dur="4s" begin="1s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* ── Planet 1 — purple, floats up/down ── */}
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0,0;10,-22;0,-28;-10,-16;0,0" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <ellipse cx="115" cy="105" rx="55" ry="12" fill="none" stroke="#5B3DF5" strokeWidth="2" opacity="0.22" />
                  <circle cx="115" cy="105" r="40" fill="url(#planet1-grad)" filter="url(#glow)" />
                  <clipPath id="ring-clip">
                    <rect x="60" y="105" width="110" height="45" />
                  </clipPath>
                  <ellipse cx="115" cy="105" rx="55" ry="12" fill="none" stroke="#5B3DF5" strokeWidth="2" opacity="0.22" clipPath="url(#ring-clip)" />
                  <ellipse cx="115" cy="97" rx="28" ry="5" fill="none" stroke="#9b7fff" strokeWidth="1.2" opacity="0.35" />
                </g>

                {/* ── Planet 2 — orange, counter floats ── */}
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0,0;-12,16;0,24;14,12;0,0" dur="9s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                  <circle cx="370" cy="360" r="52" fill="url(#planet2-grad)" filter="url(#glow)" />
                  <ellipse cx="370" cy="352" rx="38" ry="7" fill="none" stroke="#ffb07a" strokeWidth="1.5" opacity="0.3" />
                  <ellipse cx="370" cy="366" rx="28" ry="5" fill="none" stroke="#ff9b55" strokeWidth="1" opacity="0.2" />
                  {/* planet 2 ring */}
                  <ellipse cx="370" cy="360" rx="68" ry="14" fill="none" stroke="#FF7A45" strokeWidth="1.5" opacity="0.2" />
                  <clipPath id="ring2-clip">
                    <rect x="302" y="360" width="136" height="52" />
                  </clipPath>
                  <ellipse cx="370" cy="360" rx="68" ry="14" fill="none" stroke="#FF7A45" strokeWidth="1.5" opacity="0.2" clipPath="url(#ring2-clip)" />
                </g>

                {/* ── Astronaut body — floats + sways ── */}
                <g>
                  <animateTransform attributeName="transform" type="translate" values="0,0;2,-20;0,-28;-2,-18;0,0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />

                  {/* tether cord */}
                  <path d="M252 312 Q218 352 196 392" stroke="#c5bef5" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />

                  {/* body */}
                  <ellipse cx="252" cy="285" rx="42" ry="52" fill="url(#astro-body)" />
                  {/* chest panel */}
                  <rect x="234" y="268" width="36" height="22" rx="5" fill="#5B3DF5" opacity="0.18" />
                  <circle cx="244" cy="278" r="3" fill="#5B3DF5" opacity="0.5" />
                  <circle cx="252" cy="278" r="3" fill="#FF7A45" opacity="0.5" />
                  <circle cx="260" cy="278" r="3" fill="#5B3DF5" opacity="0.5" />
                  {/* accent stripes */}
                  <rect x="212" y="270" width="8" height="30" rx="4" fill="#FF7A45" opacity="0.75" />
                  <rect x="284" y="270" width="8" height="30" rx="4" fill="#FF7A45" opacity="0.75" />

                  {/* left arm — SMIL wave around shoulder pivot 210,275 ── */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate" values="0 210 275;-40 210 275;-15 210 275;-45 210 275;0 210 275" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" />
                    <ellipse cx="202" cy="265" rx="12" ry="28" fill="url(#astro-body)" transform="rotate(-30 202 265)" />
                    <circle cx="193" cy="244" r="9" fill="url(#astro-body)" />
                  </g>

                  {/* right arm — slight opposite sway */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate" values="0 294 275;8 294 275;0 294 275;-6 294 275;0 294 275" dur="2.4s" repeatCount="indefinite" />
                    <ellipse cx="302" cy="268" rx="12" ry="26" fill="url(#astro-body)" transform="rotate(20 302 268)" />
                    <circle cx="312" cy="250" r="9" fill="url(#astro-body)" />
                  </g>

                  {/* legs */}
                  <ellipse cx="238" cy="332" rx="14" ry="22" fill="url(#astro-body)" transform="rotate(8 238 332)" />
                  <ellipse cx="266" cy="334" rx="14" ry="22" fill="url(#astro-body)" transform="rotate(-8 266 334)" />
                  {/* boots */}
                  <ellipse cx="233" cy="350" rx="16" ry="8" fill="#c5bef5" />
                  <ellipse cx="263" cy="352" rx="16" ry="8" fill="#c5bef5" />
                  <rect x="222" y="346" width="22" height="5" rx="2" fill="#FF7A45" opacity="0.6" />
                  <rect x="252" y="348" width="22" height="5" rx="2" fill="#FF7A45" opacity="0.6" />

                  {/* helmet */}
                  <circle cx="252" cy="228" r="40" fill="url(#astro-body)" />
                  <ellipse cx="252" cy="226" rx="26" ry="24" fill="url(#visor-grad)" opacity="0.9" />
                  <ellipse cx="244" cy="216" rx="8" ry="5" fill="white" opacity="0.4" transform="rotate(-20 244 216)" />
                  <circle cx="252" cy="228" r="40" fill="none" stroke="#e8e4ff" strokeWidth="3" opacity="0.5" />
                </g>

                {/* ── Sparkles ── */}
                <path d="M313 193 L316 183 L319 193 L329 196 L319 199 L316 209 L313 199 L303 196 Z" fill="#FF7A45">
                  <animate attributeName="opacity" values="0;1;0.8;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="scale" values="0.4 0.4;1.2 1.2;1 1;0.4 0.4" dur="2s" begin="0.3s" repeatCount="indefinite" additive="sum" />
                </path>
                <path d="M182 315 L184 308 L186 315 L193 317 L186 319 L184 326 L182 319 L175 317 Z" fill="#5B3DF5">
                  <animate attributeName="opacity" values="0;1;0.8;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="scale" values="0.4 0.4;1.3 1.3;1 1;0.4 0.4" dur="2.4s" begin="1.2s" repeatCount="indefinite" additive="sum" />
                </path>
              </svg>

              <h1 id="name" aria-label="Prensu Sonkar">
                {heroWordsWithIndices.map(({ word, letters }) => (
                  <span key={word} className="w" aria-hidden="true">
                    {letters.map(({ letter, index }) => (
                      <span
                        key={`${word}-${index}`}
                        className="c"
                        style={{ "--i": index } as CSSProperties}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              <p className="lead">
                UI/UX designer from Bhavnagar. I design websites, landing pages
                and mobile screens, plus the brand work that goes around them:
                logos, brochures and social media.
              </p>
              <div className="cta">
                <a
                  className="btn p"
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "projects")}
                >
                  See my projects
                </a>
                <a
                  className="btn"
                  href="#about"
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  About me
                </a>
              </div>

              {/* Scroll-down indicator — desktop only */}
              <div
                className="scroll-hint"
                role="button"
                tabIndex={0}
                aria-label="Scroll to projects"
                onClick={(e) => {
                  const el = e.currentTarget;
                  el.classList.remove("ps-clicked");
                  void el.offsetWidth; // force reflow to restart animation
                  el.classList.add("ps-clicked");
                  scrollToSection("projects");
                  setTimeout(() => el.classList.remove("ps-clicked"), 600);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.currentTarget.click();
                  }
                }}
              >
                <div className="scroll-hint-inner">
                  <div className="scroll-hint-ring" aria-hidden="true" />
                  <span>Scroll</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="tick" aria-hidden="true">
              <div
                id="tick"
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  willChange: "transform",
                }}
              >
                {tickerContent.map((label, idx) => (
                  <span key={`${label}-${idx}`}>
                    {label}
                    <i>✦</i>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Projects */}
          <section
            className="page"
            id="projects"
            ref={(el) => { sectionRefs.current.projects = el; }}
          >
            <h2 className="t">Projects</h2>
            <p className="sub">
              Interface work and brand work. Pick a category, then open a card for
              details.
            </p>
            <div className="chips" id="chips" role="group" aria-label="Filter projects">
              {SHOWCASE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="chip"
                  aria-pressed={currentCategory === category}
                  onClick={() => setCurrentCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="grid" id="grid">
              {filteredWorks.map((work, index) => (
                <button
                  key={`${currentCategory}-${work.t}`}
                  type="button"
                  className="card"
                  style={{ "--n": index } as CSSProperties}
                  onClick={() => openWorkDialog(work)}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div
                    className={`thumb thumb-${work.fit || "cover"}`}
                    style={{
                      background: `linear-gradient(135deg,${work.g[0]},${work.g[1]})`,
                    }}
                  >
                    {work.imgs && work.imgs.length > 0 ? (
                      <>
                        {work.fit === "contain" && (
                          <div className="thumb-blur-bg" aria-hidden="true">
                            <Image
                              src={work.imgs[0].src}
                              alt=""
                              fill
                              sizes="160px"
                              className="thumb-blur-img"
                            />
                          </div>
                        )}
                        <div className="thumb-frame">
                          <Image
                            src={work.imgs[0].src}
                            alt={work.t}
                            fill
                            sizes="(max-width: 820px) 100vw, 340px"
                            style={{
                              objectFit: work.fit || "cover",
                              objectPosition: work.pos || "center center",
                            }}
                            className="thumb-img"
                            priority={index < 4}
                          />
                        </div>
                      </>
                    ) : (
                      <span>{work.t}</span>
                    )}
                  </div>
                  <div className="cb">
                    <small>{work.c}</small>
                    <h3>{work.t}</h3>
                    <p>{work.d}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 3. About me */}
          <section
            className="page"
            id="about"
            ref={(el) => { sectionRefs.current.about = el; }}
          >
            <h2 className="t">About me</h2>
            <div className="ab">
              <div>
                <p>
                  I'm a UI/UX designer with hands-on agency experience at
                  Simplifyte, where I designed website interfaces, landing pages
                  and mobile screens, and the digital and print materials that go
                  with them.
                </p>
                <p>
                  I work in Figma with Auto Layout, and I check visual hierarchy
                  before anything else. My B.Sc. in Information Technology means I
                  know what developers need from a handoff.
                </p>
                <h3>Experience</h3>
                <div className="tl">
                  <b>UI/UX Designer</b>
                  <small>Simplifyte Labs Private Limited · Jan 2026 – Nov 2026</small>
                  <ul>
                    <li>
                      Designed website interfaces and landing pages with clients,
                      developers and internal teams.
                    </li>
                    <li>
                      Made brochures, visiting cards, logos, posters, standees,
                      social posts, mobile screens, ID cards, thumbnails and book
                      covers.
                    </li>
                    <li>
                      Used client and team feedback to improve layouts, hierarchy
                      and brand consistency.
                    </li>
                  </ul>
                </div>
                <h3>Education</h3>
                <div className="tl">
                  <b>B.Sc. Information Technology</b>
                  <small>
                    Maharaja Krushnakumarsinhji Bhavnagar University · 2023 – 2026
                  </small>
                  <ul>
                    <li>
                      Web Technologies, Software Engineering, DBMS,
                      Human-Computer Interaction.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 style={{ marginTop: 0 }}>UI/UX</h3>
                <div className="sk">
                  <span>Website UI</span>
                  <span>Landing pages</span>
                  <span>Mobile screens</span>
                  <span>Wireframing</span>
                  <span>Prototyping</span>
                  <span>Figma Auto Layout</span>
                  <span>Visual hierarchy</span>
                </div>
                <h3>Graphic and brand</h3>
                <div className="sk">
                  <span>Social media</span>
                  <span>Posters</span>
                  <span>Brochures</span>
                  <span>Visiting cards</span>
                  <span>ID cards</span>
                  <span>Book covers</span>
                  <span>Standees</span>
                  <span>Logos</span>
                </div>
                <h3>Tools</h3>
                <div className="sk">
                  <span>Figma</span>
                  <span>Canva</span>
                  <span>Photoshop</span>
                  <span>Lovable</span>
                  <span>Google Stitch</span>
                  <span>Framer</span>
                  <span>Ideogram</span>
                  <span>Brandmark</span>
                </div>
              </div>
            </div>

            <div className="contact" id="resume">
              <h3>Let's work together</h3>
              <p>
                <a href={`mailto:${PROFILE_DATA.email}`}>{PROFILE_DATA.email}</a>{" "}
                ·{" "}
                <a href={`tel:${PROFILE_DATA.phoneRaw}`}>{PROFILE_DATA.phone}</a>{" "}
                · Bhavnagar, Gujarat
              </p>
              <p style={{ marginTop: "14px" }}>
                <button
                  type="button"
                  className="btn contact-btn"
                  id="cv2"
                  onClick={openResumeModal}
                >
                  Download resume
                </button>
              </p>
            </div>
          </section>
        </main>

        {/* Hidden preloader — keeps all project first-images in browser cache */}
        <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
          {SHOWCASE_WORKS.map((work) =>
            work.imgs && work.imgs.length > 0 ? (
              <Image
                key={work.imgs[0].src}
                src={work.imgs[0].src}
                alt=""
                width={work.imgs[0].w}
                height={work.imgs[0].h}
                sizes="1px"
                priority
              />
            ) : null
          )}
        </div>

        <dialog
          id="dlg"
          ref={dialogRef}
          onCancel={(e) => {
            e.preventDefault();
            closeWorkDialog();
          }}
          onClick={(e) => {
            if (e.target === dialogRef.current) {
              closeWorkDialog();
            }
          }}
        >
          <button
            type="button"
            className="x"
            aria-label="Close"
            id="close"
            onClick={closeWorkDialog}
          >
            ×
          </button>
          <div id="dbody" ref={dbodyRef}>
            {dialogWork && (
              <>
                {dialogWork.imgs && dialogWork.imgs.length > 0 ? (
                  <div className="gal-container">
                    <div
                      className="gal"
                      ref={galleryRef}
                      onScroll={handleGalleryScroll}
                      onWheel={handleGalleryWheel}
                    >
                      {dialogWork.imgs.map((img, idx) => (
                        <div className="gal-item" key={img.src}>
                          <Image
                            src={img.src}
                            alt={`${dialogWork.t} - Design ${idx + 1}`}
                            width={img.w}
                            height={img.h}
                            sizes="(max-width: 860px) 100vw, 860px"
                            priority={idx === 0}
                            loading={idx === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      ))}
                    </div>

                    {dialogWork.imgs.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="gal-nav gal-prev"
                          aria-label="Previous design photo"
                          onClick={() => scrollGallery("left")}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="gal-nav gal-next"
                          aria-label="Next design photo"
                          onClick={() => scrollGallery("right")}
                        >
                          ›
                        </button>

                        <div className="gal-pagination">
                          <span className="gal-counter">
                            {activeSlide + 1} / {dialogWork.imgs.length}
                          </span>
                          <div className="gal-dots">
                            {dialogWork.imgs.map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                className={`gal-dot${i === activeSlide ? " active" : ""}`}
                                aria-label={`View photo ${i + 1}`}
                                onClick={() => scrollToSlide(i)}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div
                    className="thumb"
                    style={{
                      background: `linear-gradient(135deg,${dialogWork.g[0]},${dialogWork.g[1]})`,
                    }}
                  >
                    <span>{dialogWork.t}</span>
                  </div>
                )}
                <div className="mb">
                  <small style={{ color: "var(--acc)", fontWeight: 700 }}>
                    {dialogWork.c}
                  </small>
                  <h3>{dialogWork.t}</h3>
                  <p>{dialogWork.d}</p>
                  <div className="tags">
                    {dialogWork.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </dialog>
      </div>

      <A4ResumeModal isOpen={resumeModalOpen} onClose={closeResumeModal} />
    </>
  );
}
