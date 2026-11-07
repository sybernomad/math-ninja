# 🥷 Math Ninja Dojo

A kid-friendly multiplication game for facts **0–12**. Kids solve facts to fill the progress bar, then earn a **shuriken brain break**. In the break they throw shurikens at fruits and veggies hopping toward them down a bamboo path, one level at a time. Then it's back to training.

## What's inside
- **Pick your tables** (×0 to ×12, any mix) and choose how many correct answers earn a break (5, 10, 15 or 20).
- **Kind feedback.** A wrong answer gets a friendly "try again" plus a strategy hint. A second miss shows the answer with a skip-counting example. The fact comes back a few problems later. There are no timers, no lives and no losing.
- **Smart practice.** Missed facts appear more often until they're mastered (3 correct in a row).
- **Belts from White to Black.** Every correct answer earns a ⭐. Each new belt gets confetti and a fanfare.
- **Shuriken brain break (level-based).** A first-person view down a moonlit bamboo path. Cartoon fruits and veggies with mischievous eyes hop toward you from the distance, getting bigger as they get close. Tap to throw a ninja star at a spot, or drag a line across the screen and the star flies along that exact angle, cutting the fruit at that angle. Holding the drag longer charges the star up (gold = 2 hits of damage, fiery = 3). Stars stick in whatever they hit, the final hit slices it in two along the cut line, and every hit makes the fruit wobblier and goofier.
  - **Level 1:** one big fruit that takes 5 hits.
  - **Level 2:** two fruits. **Level 3:** three fruits, and so on up to 8 at once. After that they get tougher and a little faster.
  - Hit pips above each fruit show how many hits are left. Clear every fruit to level up.
  - Your level is saved, so the next brain break picks up where you left off.
  - If a fruit reaches you it just goes *Boing!* and bounces back down the path. There's no way to lose.
- **Grown-ups corner.** Shows accuracy, mastered facts, the facts to practice, break length and a reset button.
- Works with touch, a mouse, or a keyboard (number keys, Backspace, Enter).
- **Offline PWA.** You can install it to a home screen, and it works with no internet after the first visit.
- Progress is saved on the device in `localStorage`. There are no accounts and nothing is sent anywhere.

## Files
```
index.html        the whole game (HTML + CSS + JS)
manifest.json     PWA manifest
sw.js             service worker (offline caching)
icons/            app icons (regular, maskable, Apple)
.nojekyll         tells GitHub Pages to serve files as-is
```

## Deploy to GitHub Pages
1. Create a new repository on GitHub, for example `math-ninja`.
2. Upload all the files and the `icons` folder to the repository root. You can drag and drop them on the repo page, or use git:
   ```bash
   git init && git add . && git commit -m "Math Ninja Dojo"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/math-ninja.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**, and save.
4. After about a minute the game is live at `https://YOUR-NAME.github.io/math-ninja/`.

All paths are relative, so it works from a project subfolder with no changes.

## Installing as an app
- **Chrome / Edge / Android:** tap the **📲 Install app** button on the home screen, or use the browser menu and choose **Install app**.
- **iPad / iPhone (Safari):** tap **Share → Add to Home Screen**.

## Updating the game
After you change any file, edit `sw.js` and bump `CACHE_VERSION` (for example `math-ninja-v2`). This makes installed copies pick up the new version.

## Try it locally
Service workers need `http://`, not `file://`:
```bash
python3 -m http.server 8000
# open http://localhost:8000
```
