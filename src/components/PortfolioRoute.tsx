"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PortfolioFrame, PageHeading } from "./PortfolioFrame";
import { About } from "./About";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Achievements } from "./Achievements";
import { Explore } from "./Explore";
import { Contact } from "./Contact";
import { HomeFaq } from "./HomeFaq";
import { TypingOwlFeatured } from "./TypingOwlFeatured";
import { TechStack } from "./TechStack";
import { LatestBlogPosts } from "./LatestBlogPosts";
import { PortfolioAboutDetails } from "./PortfolioAboutDetails";
import { projects } from "@/content/projects/cases";

type Kind = "projects"|"skills"|"experience"|"about"|"contact"|"explore"|"typingowl"|"achievements"|"services"|"tools"|"testimonials"|"privacy"|"terms";
const titles: Record<Kind, [string,string]> = {
 projects:["Real apps and platforms you can open.","Professional and academic work, with the full story behind every build."],
 skills:["The tools behind the work.","Programming, web development, AI and creative tools."],
 experience:["Building products. Teaching people.","My professional journey, responsibilities and project experience."],
 about:["Hi, I’m Rabin.","Developer, educator, and AI enthusiast based in Nepal."],
 contact:["Let’s build something amazing.","Interested in collaboration, AI projects, or development work? Let’s connect."],
 explore:["Tools, games & courses.","Free browser tools, interactive games, structured courses and practical articles."],
 typingowl:["Helping people learn to type better.","Co-Founder & Senior Developer at TypingOwl."],
 achievements:["Learning that shapes the work.","Highlights and credentials from my development journey."],
 services:["The skills behind the work.","Full-stack development, AI integration and teaching."],
 tools:["Tools, games & courses.","Everything I build, share and teach."],
 testimonials:["My professional journey.","Products, projects and teaching experience."],
 privacy:["Privacy Policy",""],terms:["Terms of Use",""]
};

export function PortfolioRoute({kind}:{kind:Kind}) {
 const [filter,setFilter] = useState("All");
 const [title,description]=titles[kind];
 return <PortfolioFrame><PageHeading title={title} description={description} label={kind === "tools" ? "Explore" : kind} />
 {kind === "projects" ? <><div className="pf-filters" aria-label="Filter projects">{["All","Professional","Academic"].map(x=><button key={x} aria-pressed={filter===x} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="pf-project-grid">{projects.filter(p=>filter === "All" || p.projectType===filter).map(p=><article className="pf-work" key={p.slug}><Link href={`/projects/${p.slug}`} className="pf-work-image"><div className="pf-window-bar"><i/><i/><i/><span>{p.title}</span></div><Image src={p.showcaseImage!} alt={`${p.title} preview`} width={600} height={300}/></Link><div className="pf-work-copy"><span className="pf-eyebrow">{p.projectType}{p.collaboration ? ` · ${p.collaboration}` : ""}</span><h2><Link href={`/projects/${p.slug}`}>{p.title}</Link></h2><p>{p.shortDescription}</p><div className="pf-tech-tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div><div className="pf-work-links"><Link href={`/projects/${p.slug}`}>Case study <ArrowUpRight size={14}/></Link>{p.repoUrl&&<a href={p.repoUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>}{p.liveUrl&&<a href={p.liveUrl} target="_blank" rel="noreferrer">{p.liveLabel || "Live site"} <ArrowUpRight size={14}/></a>}</div></div></article>)}</div></> : <div className="pf-original-content">
 {(kind==="skills"||kind==="services")&&<><Skills/><TechStack/></>}
 {(kind==="experience"||kind==="testimonials")&&<Experience/>}
 {kind==="about"&&<><About/><Achievements/><PortfolioAboutDetails/></>}
 {kind==="achievements"&&<Achievements/>}
 {kind==="typingowl"&&<TypingOwlFeatured/>}
 {(kind==="explore"||kind==="tools")&&<><Explore/><LatestBlogPosts/><Link className="pf-cta" href="/gta-6">GTA 6 <ArrowUpRight size={16}/></Link></>}
 {kind==="contact"&&<><HomeFaq/><Contact/><div className="pf-contact-details"><a href="mailto:alejunov@gmail.com">alejunov@gmail.com</a><a href="tel:+9779826175904">+977 9826175904</a><p>Vyas-1, Damauli, Gandaki, Nepal</p></div></>}
 </div>}
 </PortfolioFrame>;
}
