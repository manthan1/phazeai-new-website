# Demo verification

September 5, 2026. Local static client demonstration, not a production deployment.

The continuous-world grammar uses one fixed WebGL stage and one scroll spacer. The unchanged Scroll Craft engine establishes the worldflight track; page-specific camera, geometry, lighting, text and controls live in experience.js and experience.css.

Verified with a real headless Chrome browser at 1440×900, 390×844 and 360×640. Ten scroll positions per size were captured. All four waypoint controls, replay, motion Play/Pause, visibly changing animation pixels and graphics selection passed. No horizontal overflow or page errors were detected. WebGL failure displayed a loaded original-scene poster and readable content. With JavaScript disabled, the opening headline and contact remain available.

After the final camera framing and color adjustment, the final two scroll positions were checked again at all three sizes. The final chapter was active and no horizontal overflow was present. Desktop and mobile screenshots were visually inspected, alongside interactive in-app preview checks.

Evidence: lab/experience/results.json, viewport screenshot directories, and final-0.93.png/final-1.png. Reproduce the broad checks with node verify-experience.mjs while the local server is running. Development dependencies are in the parent workspace and are not required by the delivered website.

Limits: viewport tests are browser emulation, not tests on physical phones. GPU performance varies by device. A lighter graphics control and WebGL fallback are included. No live production deployment or backend integration was performed.

Fingerprint: all six dimensions differ from the initial workflow-studio design — continuous world; waypoint navigation; chrome portal; form/fracture/orbit progression; orbital invitation; persistent fragments forming and breaking apart with scroll.
