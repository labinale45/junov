"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, BriefcaseBusiness, Code2, Folder, Layers, UserRound } from "lucide-react";
import { SiFlutter, SiReact, SiNextdotjs, SiTypescript, SiPython, SiSupabase, SiTailwindcss, SiBlender, SiGodotengine } from "react-icons/si";
import { PortfolioFrame, CardTitle } from "./PortfolioFrame";
import { projects } from "@/content/projects/cases";

const tools = [{name:"React",icon:SiReact},{name:"Flutter",icon:SiFlutter},{name:"Next.js",icon:SiNextdotjs},{name:"TypeScript",icon:SiTypescript},{name:"Python",icon:SiPython},{name:"Supabase",icon:SiSupabase},{name:"Tailwind CSS",icon:SiTailwindcss},{name:"Blender",icon:SiBlender},{name:"Godot",icon:SiGodotengine}];

export function PortfolioHome() {
  return <PortfolioFrame home>
    <header className="pf-hero"><div><h1>Building intelligent systems.</h1><p>AI Developer · Full Stack Engineer · Co-Founder @ TypingOwl.<br />Building scalable web platforms and AI-driven tools that empower people to learn faster and work smarter.</p></div><Link className="pf-cta" href="/contact">Get in touch <ArrowUpRight size={17} /></Link></header>
    <div className="pf-mobile-stats"><span><b>4+</b>YEARS DEVELOPMENT</span><span><b>10+</b>PROJECTS BUILT</span><span><b>AI + Web</b>& GAME DEV</span></div>
    <section className="pf-marquee" aria-label="Tools I work with"><div className="pf-marquee-label"><span className="pf-eyebrow">DAILY DRIVERS</span><strong>Tools I work with</strong></div><div className="pf-marquee-window"><div className="pf-marquee-track">{[0,1].map(copy => <ul key={copy} aria-hidden={copy === 1}>{tools.map(({name,icon:Icon}) => <li key={name}><Icon aria-hidden="true" /><span>{name}</span></li>)}</ul>)}</div></div></section>
    <div className="pf-explore-label"><h2>Explore</h2><span>Swipe →</span></div>
    <section className="pf-bento" aria-label="Explore the portfolio">
      <Link href="/projects" className="pf-card pf-projects"><CardTitle title="Projects" icon={Folder} /><p>Platforms, tools and apps built to solve real problems.</p><div className="pf-preview-window"><div className="pf-preview-stack" style={{ animationDuration: `${projects.length * 22 / 3}s` }}>{[...projects,...projects].map((p,i) => <div className="pf-browser-preview" key={`${p.slug}-${i}`}><div><i /><i /><i /><span>{p.title}</span></div><Image src={p.showcaseImage!} alt={i < projects.length ? p.title : ""} width={300} height={160} /></div>)}</div></div></Link>
      <Link href="/about" className="pf-card pf-about"><CardTitle title="About" icon={UserRound} /><p>Who I am and how I work.</p><div className="pf-photo-stack">{["/rabin-short.png","/rabin-ale.png","/rabin-short-formal.png"].map((src,i) => <Image key={src} src={src} alt={i===2 ? "Rabin Ale" : ""} width={130} height={155} />)}</div></Link>
      <Link href="/typingowl" className="pf-card pf-product"><CardTitle title="TypingOwl" icon={Layers} /><p>Co-Founder & Senior Developer. A better way to build typing skills.</p><div className="pf-product-pills"><span>Typing practice <i /></span><span>Speed & accuracy <i /></span><span>Real-time analytics <i /></span></div></Link>
      <Link href="/achievements" className="pf-card pf-awards"><CardTitle title="Credentials" icon={Award} /><p>Full stack training. AI foundations. Computer teacher certification.</p><div className="pf-medal"><Award size={64} strokeWidth={1.2}/><span>DEVELOPER & EDUCATOR</span></div></Link>
      <Link href="/skills" className="pf-card pf-skills"><CardTitle title="Skills" icon={Code2} /><p>What I use to build and teach.</p><ul>{["Programming","Web development","AI / Machine learning","Creative tools","Teaching & mentoring"].map((x,i)=><li key={x}><Code2 size={13}/>{x}<small>0{i+1}</small></li>)}</ul></Link>
      <Link href="/experience" className="pf-card pf-experience"><div><CardTitle title="Experience" icon={BriefcaseBusiness} /><p>The products I build and the people I teach.</p></div><div className="pf-mini-cards"><article><strong>TypingOwl</strong><p>Co-Founder & Senior Developer</p><small>Next.js · TypeScript · Supabase</small></article><article><strong>Computer Trainer</strong><p>Programming & software development</p><small>Teaching · Projects · Mentorship</small></article></div></Link>
    </section>
    <nav className="pf-home-resources" aria-label="More from Rabin"><Link href="/explore">Explore everything <ArrowUpRight size={13}/></Link><Link href="/tools">Tools</Link><Link href="/games">Games</Link><Link href="/gta-6">GTA 6</Link><Link href="/course">Courses</Link><Link href="/blog">Blog</Link><a href="/rabin-ale-cv.pdf" download>Download CV</a></nav>
  </PortfolioFrame>;
}
