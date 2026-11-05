# Peter Adole — Portfolio

Personal portfolio for Peter Adole: IT infrastructure, systems and network administration, cybersecurity, Microsoft 365 and software development.

Built with **React 19, Vite, Tailwind CSS v4 and Lucide icons**. Dark theme by default with a light mode toggle, fully responsive, accessible and SEO-ready.

---

## 1. Run it locally

You need **Node.js 18 or newer** (check with `node -v`; download from https://nodejs.org).

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:5173
```

The page reloads automatically as you edit files.

To check the production build before deploying:

```bash
npm run build      # outputs the finished site to /dist
npm run preview    # serves /dist at http://localhost:4173
```

---

## 2. Add your real details (do this before going live)

All content is in **`src/data/content.js`**. Every value still in `[square brackets]` is a placeholder. Search the file for `[` to find them all.

The site is built so that placeholders never become broken links: a LinkedIn, GitHub, demo or "verify credential" link only appears once you replace its placeholder with a real URL.

**Checklist**

| What | Where |
| --- | --- |
| Profile photo | `public/profile.jpg` — a 4:5 portrait (e.g. 800×1000) with your face in the upper third. Done; replace it any time. |
| CV | Replace `public/Peter-Adole-CV.pdf` with your real CV, same file name. The current file is a placeholder. |
| Email, location, LinkedIn, GitHub | `profile` in `content.js` |
| About paragraph on your experience | `about.paragraphs` (third item) |
| Project links | `github` and `demo` on each project (use `''` to hide a button) |
| Project screenshots | Put images in `public/projects/` and set `image: '/projects/your-file.png'`. Without a screenshot, a schematic illustration is shown. |
| Site address | `VITE_SITE_URL` in `.env`, plus the two `example.com` lines in `public/robots.txt` and `public/sitemap.xml` |

Please only list qualifications, employers and results you can back up. Recruiters check.

---

## 3. Make the contact form deliver email

The form works in one of two ways:

1. **Direct delivery (recommended).** Create a free form at https://formspree.io, copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`) and set it in `.env`:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
   Messages are then emailed to you. Formspree's free tier includes spam filtering; the form also has a hidden honeypot field to catch bots.
2. **Email-app fallback.** If `VITE_FORM_ENDPOINT` is empty, pressing *Send message* opens the visitor's email app with the message pre-filled and addressed to `profile.email`.

If you deploy to a host, set `VITE_FORM_ENDPOINT` and `VITE_SITE_URL` there as environment variables too (see below), then redeploy.

---

## 4. Deploy

The site is static: `npm run build` produces a `dist/` folder that any static host can serve. All three options below are free for a personal site.

### Live site — GitHub Pages (current setup)

The site is published at **https://padole.github.io** from the `padole/padole.github.io` repository. Every push to `main` rebuilds and redeploys it through `.github/workflows/deploy.yml`, which also sets `VITE_SITE_URL` and `VITE_FORM_ENDPOINT` for the build (edit them there if they change). Progress shows under the repository's **Actions** tab.

The options below are alternatives if you ever move hosts.

### Option A — Vercel (easiest)

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com, sign in with GitHub, click **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`).
4. Under **Environment Variables**, add `VITE_SITE_URL` (your final address) and, if using Formspree, `VITE_FORM_ENDPOINT`.
5. Click **Deploy**. Every future `git push` redeploys automatically.

### Option B — Netlify

1. Push to GitHub as above.
2. On https://app.netlify.com choose **Add new site → Import an existing project** and pick the repository.
3. Build command: `npm run build` · Publish directory: `dist`.
4. Add the same environment variables under **Site configuration → Environment variables**, then deploy.

Quick alternative: run `npm run build` locally and drag the `dist` folder onto https://app.netlify.com/drop.

### Option C — GitHub Pages

1. In `vite.config.js`, add `base: '/<repository-name>/',` inside `defineConfig({ ... })` if the site will live at `https://<username>.github.io/<repository-name>/`. Skip this for a custom domain or a `<username>.github.io` repository.
2. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci || npm install
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: dist
         - uses: actions/deploy-pages@v4
   ```
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. Push to `main` to publish.

### Custom domain

All three hosts let you attach a domain (for example `peteradole.com`) from their dashboard and issue HTTPS automatically. After connecting it, update `VITE_SITE_URL`, `robots.txt` and `sitemap.xml`, then redeploy. Finally, submit `https://your-domain/sitemap.xml` in Google Search Console.

---

## 5. Project structure

```
index.html                SEO meta tags, social preview, structured data, theme bootstrap
public/                   favicon, social image, CV, robots.txt, sitemap.xml (+ your photo)
src/
  data/content.js         ← all text, links and lists
  index.css               theme colours (dark + light), fonts, animations
  App.jsx                 page composition
  hooks/                  theme toggle, active-section tracking for the nav
  components/             Navbar, Button, Section, Portrait (hero photo frame), ProjectArt, brand icons
  sections/               Hero, About, Skills, Projects, Contact, Footer
```

**Changing colours:** edit the variables at the top of `src/index.css` (`.dark` for dark mode, `:root` for light mode).

**Changing the hero:** the serif phrase, latest-project card, spinning badge text and scrolling tech strip are `hero.highlight`, `hero.latest`, `hero.badge` and `hero.stack` in `content.js`; the four numbered items come from `about.focus`.

---

## 6. What's built in

- **Navigation:** sticky header, smooth scrolling, the current section highlighted as you scroll, full-screen mobile menu (closes on Escape).
- **Dark/light mode:** dark by default; the visitor's choice is remembered, with no flash on reload.
- **Accessibility:** semantic landmarks and headings, skip-to-content link, visible keyboard focus, labelled icons and form fields, inline form errors announced to screen readers, and animations switched off for people who prefer reduced motion.
- **SEO:** descriptive title and meta description, canonical URL, Open Graph and Twitter preview image, `Person` structured data, robots.txt and sitemap.
- **Performance:** a single small JavaScript bundle, fonts loaded with `display=swap`, lazy-loaded project screenshots, and no heavy animation libraries.
