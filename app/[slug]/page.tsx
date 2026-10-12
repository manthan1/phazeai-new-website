import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/content-pages';
const pages: Record<string,[string,string]> = {
 'what-we-build':['What we build','Enquiries, quotations, collections and reports. Explore the automation catalogue by department.'],
 'how-we-work':['How we work','Project or ongoing AI partner. Clear scope, pricing and a 3–6 week delivery process.'],
 training:['Training & speaking','Practical AI workshops for teams and speaking sessions with Manthan Jethwani.'],
 industries:['Industries','AI automation for Indian manufacturers, distributors, institutes, clinics, consultants and more.'],
 about:['About Phaze AI','Meet the implementation company helping Indian businesses put AI to work.'],
 contact:['Contact','Book an assessment, enquire about team training or invite Manthan to speak.'],
};
export function generateStaticParams(){return Object.keys(pages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const page=pages[slug];return page?{title:page[0],description:page[1]}:{title:'Page not found'};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!pages[slug])notFound();return <ContentPage slug={slug}/>;}
