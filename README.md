# Parisa Mohri Portfolio

React and Vite portfolio prepared for deployment from GitHub to Vercel.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vite writes the production site to `dist`. The root `vercel.json` rewrites
application routes to `index.html`, so direct visits to `/naturcycle` and
`/metaglasses` work correctly.

## Vercel

1. Import the `SetayeshChegini/parisa-mohri-portfolio` GitHub repository.
2. Keep the detected framework preset as Vite.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Add `parisamohri.com` and `www.parisamohri.com` to the Vercel project.

Once the GitHub repository is connected, Vercel creates a deployment for each
push and a production deployment for changes pushed to the configured
production branch.
