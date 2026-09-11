"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ProfilePhotos } from "./ProfilePhotos";
import { usePathname, useRouter } from "next/navigation";
import { Accessibility, ArrowUpRight, Award, BookOpen, BriefcaseBusiness, Code2, Download, Folder, Gamepad2, Home, Layers, Mail, Menu, Moon, Sun, UserRound, X } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./portfolio.css";

export const portfolioLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Skills", href: "/skills", icon: Code2 },
  { label: "Experience", href: "/experience", icon: BriefcaseBusiness },
  { label: "TypingOwl", href: "/typingowl", icon: Layers },
  { label: "Explore", href: "/explore", icon: BookOpen },
  { label: "Games", href: "/games", icon: Gamepad2 },
  { label: "GTA 6", href: "/gta-6", icon: Gamepad2 },
  { label: "About", href: "/about", icon: UserRound },
  { label: "FAQs / Contact", href: "/contact", icon: Mail },
];

function NepalLocation() {
  return <span className="pf-location"><svg viewBox="0 0 22 28" width="17" height="22" aria-label="Nepal flag" role="img"><path d="M2 1v26h19L10 15h10Z" fill="#dc143c" stroke="#003893" strokeWidth="2"/><path d="M5 8a3 3 0 0 0 5 0 2.5 2.5 0 0 1-5 0M7 17l1 2 2-1-1 2 2 1-2 1 1 2-2-1-1 2-1-2-2 1 1-2-2-1 2-1-1-2 2 1Z" fill="white"/></svg> Nepal</span>;
}

export function PortfolioFrame({ children, home = false }: { children: ReactNode; home?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [light, setLight] = useState(false);
  const [menu, setMenu] = useState(false);
  const [access, setAccess] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [large, setLarge] = useState(false);
  useEffect(() => {
    const aliases: Record<string, string> = {hero:"/",home:"/",projects:"/projects",funnels:"/projects",skills:"/skills",experience:"/experience",typingowl:"/typingowl",explore:"/explore",about:"/about",contact:"/contact",achievements:"/achievements",blog:"/blog","tech-stack":"/skills","sample-plan":"/skills"};
    const followHash = () => { const key = location.hash.slice(1); if (pathname === "/" && aliases[key] && aliases[key] !== "/") router.replace(aliases[key]); };
    followHash(); window.addEventListener("hashchange", followHash);
    return () => { window.removeEventListener("hashchange", followHash); };
  }, [pathname, router]);
  function toggleTheme() { setLight(current => !current); }
  const themeButton = <button className="pf-circle" onClick={toggleTheme} aria-label={`Switch to ${light ? "dark" : "light"} theme`}>{light ? <Moon /> : <Sun />}</button>;
  return <div className={`pf ${home ? "pf-home" : ""} ${light ? "pf-light" : ""} ${reduced ? "pf-still" : ""} ${large ? "pf-large" : ""}`}>
    <a className="pf-skip" href="#portfolio-content">Skip to main content</a>
    <svg className="pf-lines" viewBox="0 0 1536 850" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M440 -90C610 210 920 65 690 -85M-60 550C160 900 690 795 465 450S140 40 180 320 940 515 870 210 1090 -30 1190 120 1380 605 1630 440M-50 720C460 1150 790 310 1020 480S1220 840 1640 770M1530 10C1210 20 1130 230 1420 300" /></svg>
    <aside className={`pf-rail ${menu ? "pf-menu-open" : ""}`} aria-label="Profile and site navigation">
      <button className="pf-close" onClick={() => setMenu(false)} aria-label="Close menu"><X /></button>
      <div className="pf-profile"><ProfilePhotos reduced={reduced} /><strong>Rabin Ale</strong><NepalLocation /></div>
      <div className="pf-socials"><a className="pf-circle" href="https://github.com/labinale45" aria-label="GitHub"><FaGithub /></a><a className="pf-circle" href="https://www.linkedin.com/in/rabin-ale-07650a1a3/" aria-label="LinkedIn"><FaLinkedin /></a><a className="pf-circle" href="https://www.youtube.com/@Mrj-no" aria-label="YouTube"><FaYoutube /></a><a className="pf-circle" href="https://www.instagram.com/rabinale45/" aria-label="Instagram"><FaInstagram /></a><a className="pf-circle" href="https://www.facebook.com/rabin.ale.5680/" aria-label="Facebook"><FaFacebook /></a>{themeButton}</div>
      <nav className="pf-links">{portfolioLinks.map(({href,label,icon:Icon}) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenu(false)}><Icon strokeWidth={1.6} /><span>{label}</span></Link>)}</nav>
      <footer className="pf-rail-footer"><a className="pf-cv" href="/rabin-ale-cv.pdf" download><Download size={16} /> Download CV</a>© {new Date().getFullYear()} Rabin Ale.<br />All rights reserved.<div><Link href="/privacy-policy">Privacy</Link> · <Link href="/terms">Terms</Link> · <a href="https://www.instagram.com/rabinale45/" aria-label="Instagram"><FaInstagram /></a></div></footer>
    </aside>
    <div className="pf-mobile-profile"><ProfilePhotos reduced={reduced} compact /><div><strong>Rabin Ale</strong><NepalLocation /></div>{themeButton}</div>
    <main id="portfolio-content" className="pf-main" key={pathname}>{children}</main>
    <a className="pf-cv pf-cv-mobile" href="/rabin-ale-cv.pdf" download><Download size={16} /> Download CV</a>
    <nav className="pf-tabbar" aria-label="Mobile navigation"><Link href="/" aria-current={pathname === "/" ? "page" : undefined}><Home /><span>Home</span></Link><Link href="/projects" aria-current={pathname === "/projects" ? "page" : undefined}><Folder /><span>Work</span></Link><Link className="pf-contact-tab" href="/contact" aria-label="Contact Rabin"><Mail /></Link><Link href="/skills" aria-current={pathname === "/skills" ? "page" : undefined}><Layers /><span>Skills</span></Link><button aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu /><span>More</span></button></nav>
    <button className="pf-access-toggle pf-circle" aria-label="Accessibility options" aria-expanded={access} onClick={() => setAccess(!access)}><Accessibility /></button>
    {access && <div className="pf-access"><h2>Accessibility</h2><label><input type="checkbox" checked={reduced} onChange={e => setReduced(e.target.checked)} /> Reduce motion</label><label><input type="checkbox" checked={large} onChange={e => setLarge(e.target.checked)} /> Larger text</label><button onClick={() => setAccess(false)}>Done</button></div>}
  </div>;
}

export function PageHeading({ title, label, description }: { title:string; label:string; description:string }) { return <header className="pf-page-heading"><span className="pf-eyebrow">{label}</span><h1>{title}</h1><p>{description}</p></header>; }
export function CardTitle({ title, icon:Icon = Award }: {title:string;icon?:typeof Award}) { return <div className="pf-card-title"><span><Icon size={21} strokeWidth={1.6} /></span><h2>{title}</h2><ArrowUpRight className="pf-card-arrow" size={16} /></div>; }
