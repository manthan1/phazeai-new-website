# PhazeAI website and scroll demo

Complete static website source, including the immersive 3D scroll demonstration and agency landing-page variants.

## Run locally

With Python installed, run from this folder:

    python -m http.server 4510 --bind 127.0.0.1

Open http://localhost:4510/ for the current agency landing page.
Open http://localhost:4510/experience.html for the 3D scroll demo.
Open http://localhost:4510/classic.html for the earlier agency design.

Serve over HTTP: JavaScript modules will not work reliably when HTML is opened directly from disk.

## Files

- index.html / premium.css: current agency landing page.
- experience.html / experience.js / experience.css: immersive scroll experience.
- original-demo.html: retained demo variant.
- classic.html / app.js / styles.css: earlier agency homepage.
- assets/: original logo, scene fallback poster and vendored Three.js.
- scrollcraft.js / scrollcraft.css: Scroll Craft engine.
- BRIEF.md and DEMO-BRIEF.md: design context.
- REPORT.md and DEMO-REPORT.md: historical verification records.
- WEBSITE-CONTEXT-AND-ASSETS.md: original research handoff; absolute paths refer to the author's workstation.

No runtime dependency installation is needed. Python serves all variants. The optional `npm run build` command validates and copies only the current agency landing page into dist; it does not bundle the 3D demo. To deploy all variants, publish the source HTML, CSS, JS and assets together on a static host.

## Functionality

The 3D demo provides scroll-driven scene transitions, waypoint navigation, replay, motion controls and lighter graphics. A poster is shown if WebGL is unavailable. Contact links open email or the existing Calendly booking page. No backend or credentials are included.

## Credits

PhazeAI brand/logo: https://www.phazeai.com/
Scroll Craft: https://github.com/nateherkai/scroll-craft (MIT; SCROLLCRAFT-LICENSE.txt).
Three.js: https://threejs.org/ (MIT; assets/three/LICENSE).
Procedural scene artwork was created for this demo. Third-party licenses do not grant rights to the PhazeAI brand.

