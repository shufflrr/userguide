# Shufflrr How-To (mdBook)

This repository is the **Shufflrr user guide**, built as a static site with [mdBook](https://github.com/rust-lang/mdBook). Published output lives in **`docs/`** (see `book.toml` → `build-dir`).

---

## Critical: use mdBook **0.4.52**

This project’s custom **`theme/`** (Handlebars helpers like `theme_option`, `{{#previous}}` / `{{#next}}`) matches **mdBook 0.4.x**. **mdBook 0.5.x will not build** this book without changing the theme.

**Do not use Homebrew’s `mdbook` (often 0.5.x) for this repo.** Use the Cargo install below, or `./scripts/mdbook`, or asdf/mise (see **`.tool-versions`** / **`mise.toml`**).

### Wrapper (checks version before running)

From the repo root:

```bash
./scripts/mdbook build
./scripts/mdbook serve
```

If your mdbook is not 0.4.52, the script exits with an error. Override the binary with:

```bash
MDBOOK_BIN="$HOME/.cargo/bin/mdbook" ./scripts/mdbook build
```

### Install the correct version

```bash
cargo install mdbook --version 0.4.52 --locked
```

### Build (recommended if you have another `mdbook` on PATH)

Homebrew or other installs may put **mdBook 0.5.x** first on your `PATH`. Always prefer the Cargo binary:

```bash
~/.cargo/bin/mdbook build
```

Or put `~/.cargo/bin` **before** other paths in your shell profile, then:

```bash
mdbook build
```

**Output:** HTML is written to **`docs/`** (ready for GitHub Pages or similar).

### Preview locally

```bash
~/.cargo/bin/mdbook serve
```

Then open **http://localhost:3000** (or the URL printed in the terminal).

More detail: see **`BUILD.md`**.

---

## Build safety guardrails (do this every time)

To prevent accidental site breakage from incompatible mdBook versions:

1. Verify version before building:

```bash
mdbook --version
```

It must print `mdbook 0.4.52`.

2. If it does not, use the pinned binary explicitly:

```bash
~/.cargo/bin/mdbook --version
~/.cargo/bin/mdbook build
```

3. Never run a build command after changing only docs source content unless the version check passed first.

4. If a build creates large unexpected churn in `docs/` (many deletes/renames), stop and restore the tree before continuing.

---

## Repository layout

| Path | Purpose |
|------|--------|
| **`scripts/mdbook`** | **Use this for `build` / `serve`** — refuses to run unless mdBook is **0.4.52** |
| **`.tool-versions`** / **`mise.toml`** | Optional: pin **mdbook 0.4.52** for [asdf](https://asdf-vm.com/) / [mise](https://mise.jdx.dev/) |
| **`book.toml`** | mdBook config (title, authors, `src`, output dir, extra CSS) |
| **`src/`** | Markdown sources; images under **`src/img/`** |
| **`src/SUMMARY.md`** | Sidebar / table of contents (chapter order and nesting) |
| **`theme/`** | Custom HTML/CSS (overrides default mdBook theme) |
| **`custom.css`**, **`fonts.css`** | Site styling (referenced from `book.toml`) |
| **`docs/`** | **Generated** site — do not hand-edit; regenerate with `mdbook build` |

---

## Editing content

1. Change or add `.md` files under **`src/`**.
2. Update **`src/SUMMARY.md`** if you need new pages or a different sidebar order.
3. Reference images from markdown as **`img/your-image.png`** (files live in **`src/img/`**).
4. Run **`~/.cargo/bin/mdbook build`** and confirm changes under **`docs/`**.

---

## Deployment notes

- Configured CNAME / hosting intent: **`howto.shufflrr.com`** (see `book.toml` → `cname`).
- Repo link in the book chrome: **`https://github.com/shufflrr/userguide`**.

### Ask AI OpenAI proxy security

The Ask AI page calls `cloudflare-worker.js`, which proxies requests to OpenAI without exposing the OpenAI API key to the browser.

Configure the Worker with:

```bash
wrangler secret put OPENAI_API_KEY
wrangler secret put ALLOWED_ORIGINS
```

Recommended `ALLOWED_ORIGINS` value:

```text
https://howto.shufflrr.com
```

For local testing, include localhost origins temporarily:

```text
https://howto.shufflrr.com,http://localhost:3000,http://127.0.0.1:3000
```

Keep model and token settings on the Worker. The browser should only send chat messages; the Worker validates request size, origin, content type, message roles, and message length before contacting OpenAI. Also enable Cloudflare dashboard rate limiting for the Worker route to cap abusive traffic.

---

## Troubleshooting

| Problem | Likely cause |
|--------|----------------|
| `unknown field multilingual` | Remove unsupported keys from `book.toml` if present (current repo should not need `multilingual`). |
| `Helper not found theme_option` / `previous` | You’re on **mdBook 0.5+**. Use **`~/.cargo/bin/mdbook`** after installing **0.4.52**. |
| Sidebar looks wrong after edits | Check **`src/SUMMARY.md`** indentation (nesting = sections). |

---

## Authors / book metadata

Configured in **`book.toml`**: title **Shufflrr How-To**, authors, language `en`.
