"use client";
import {BOOKING_URL} from "@/lib/booking";


import {ArrowUpRight, Check, ArrowRight, TrendingUp, Settings2, Wallet, Users, Sparkles, Megaphone, Headphones, ShoppingBag, Truck} from 'lucide-react';
import {ShimmerLink} from './ui/shimmer-link';
import {ShaderBackground} from './ui/silk-background';
import {TextReveal} from './ui/text-reveal';
import {SpotlightCard} from './ui/spotlight-card';
import {useSiteMotion} from './site-motion';
const departments=[
  {name:'Sales',icon:TrendingUp,work:'Quotations & follow-ups'},
  {name:'Operations',icon:Settings2,work:'Daily workflows & reports'},
  {name:'Finance',icon:Wallet,work:'Invoices & payment reminders'},
  {name:'HR',icon:Users,work:'Onboarding & team training'},
  {name:'Marketing',icon:Megaphone,work:'Content & campaign workflows'},
  {name:'Customer Support',icon:Headphones,work:'Customer queries & service follow-ups'},
  {name:'Procurement',icon:ShoppingBag,work:'Vendor coordination & purchase orders'},
  {name:'Logistics',icon:Truck,work:'Dispatch updates & delivery tracking'},
];
export function PremiumHero(){
const {enabled}=useSiteMotion();
return <section className="immersive-hero premium-hero partner-hero">
<div className="hero-shader" aria-hidden="true"><ShaderBackground paused={!enabled}/></div><div className="hero-vignette"/>
<div className="premium-hero-grid"><div className="premium-copy">
<div className="hero-badge"><span className="signal-dot"/> YOUR AI IMPLEMENTATION PARTNER</div>
<h1><TextReveal as="span" preset="slide" className="motion-text">Your business.</TextReveal><br/><span className="gradient-words">With AI built in.</span></h1>
<p className="premium-lead">The AI team your business needs.</p>
<p className="hero-description">We find where AI can make a real difference, build it into your workflows, and train your people to use it.</p>
<div className="hero-cta-row"><ShimmerLink href={BOOKING_URL} className="premium-cta" background="#3559d3" shimmerColor="#d6e4ff" shimmerSize="2px"><span>Find where AI fits</span><ArrowUpRight size={18}/></ShimmerLink><a href="/how-we-work" className="watch-link">How we work <ArrowRight size={16}/></a></div>
<div className="hero-assurance"><Check size={14}/> A practical starting point for AI in your business.</div>

</div><div id="workflow" className="intelligence-panel partner-overview">
<div className="partner-heading"><span className="partner-symbol"><Sparkles size={23}/></span><div><span>PHAZE AI + YOUR TEAM</span><h2>Every department.<br/>One AI partner.</h2></div></div>
<div className="department-stream" aria-label="Examples of departments we help">
{[0,1].map(column=><div className="department-stream-column" key={column}><div className={`department-stream-track stream-${column}`} style={{animationPlayState:enabled?'running':'paused'}}>{[0,1].map(copy=><div className="department-stream-group" key={copy} aria-hidden={copy===1?true:undefined}>{departments.filter((_,index)=>index%2===column).map(({name,icon:Icon,work})=><SpotlightCard key={name} className="department-card streaming-department" spotlightColor="#628bff25"><Icon size={23} strokeWidth={1.4} aria-hidden="true"/><h3>{name}</h3><p>{work}</p></SpotlightCard>)}</div>)}</div></div>)}
</div>
<p className="department-stream-caption">A few examples. AI can help across your business.</p>
<div className="partner-footer"><Check size={16}/><span>Every department. Starting where it matters most.</span></div>
</div></div></section>;
}
