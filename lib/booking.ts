export const BOOKING_URL = "/bookings";
// The booking flow on /bookings is our own booking platform, iframed in its
// embed mode with the Phaze skin. The platform only applies the skin inside
// an iframe, and only lets phazeai.com (and localhost:5173 in its dev builds)
// frame it. To test against a local platform, point the origin at
// http://localhost:3000.
export const BOOKING_EMBED_ORIGIN = "https://book-a-call-ruby.vercel.app";
export const BOOKING_EMBED_PATH = "/book/manthan-jethwani/phaze-ai-strategic-call";
export const BOOKING_EMBED_SRC = `${BOOKING_EMBED_ORIGIN}${BOOKING_EMBED_PATH}?embed=1&theme=phaze`;
