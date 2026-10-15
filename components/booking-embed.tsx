"use client";
import { useEffect, useState } from 'react';
import { BOOKING_EMBED_SRC } from '@/lib/booking';

/** Our booking platform, iframed so visitors book without leaving the site.
 * The platform renders and styles the whole flow (slots, details, Razorpay,
 * confirmation); this only frames it at a fixed height.
 *
 * The src is set after hydration, not in the server HTML: on a slow phone the
 * frame could otherwise finish loading before React attaches `onLoad`, and the
 * skeleton would cover a working booking page forever. The timer is a last
 * resort in case `load` never arrives at all. */
export function BookingEmbed() {
  const [src, setSrc] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setSrc(BOOKING_EMBED_SRC);
    const timer = window.setTimeout(() => setLoaded(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className={`booking-embed ${loaded ? 'is-ready' : ''}`}>
    {!loaded && <div className="booking-embed-skeleton" aria-hidden="true"><i/><i/><i/></div>}
    <iframe src={src} title="Book your assessment call" allow="payment" onLoad={() => { if (src) setLoaded(true); }}/>
  </div>;
}
