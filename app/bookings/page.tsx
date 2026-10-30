import type { Metadata } from 'next';
import { Shell, PageHero } from '@/components/phaze';
import { BookingEmbed } from '@/components/booking-embed';
export const metadata: Metadata = { title: 'Book an assessment call', description: 'Choose a time for your Phaze AI assessment call. One hour, no obligation.' };
export default function Page() { return <Shell><PageHero label="BOOK A CALL" title="Book your assessment call">Choose a time that suits you. One hour, no obligation.</PageHero><div className="wrap booking-section"><BookingEmbed/></div></Shell>; }
