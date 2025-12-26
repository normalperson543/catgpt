# CatGPT
A fake AI app that instead gives randomly generated cat-like answers

There is no LLM. What you are seeing is random words from a dictionary put together in random ways.

It will pretend to:

* Respond to your queries in cat speak (randomly generated)
* Generate images for you (actually pulls from https://cataas.com/)

## Developing
This project uses Plausible, if you want to add analytics, you can create a .env file and add a VITE_PLAUSIBLE_URL variable with the Plausible analytics domain and VITE_SITE_URL with the site domain (without https://)

Install deps:
```
pnpm i
```
Run development server:
```
pnpm dev
```
Open http://localhost:5173 to see the result.

## Deploying
Build:
```
pnpm build
```