# Shufflrr How-To (mdBook)

This repository is the **Shufflrr user guide**, built as a static site with [mdBook](https://github.com/rust-lang/mdBook). Published output lives in **`docs/`** (see `book.toml` → `build-dir`).

---

## Critical: use mdBook **0.4.52**

This project’s custom **`theme/`** (Handlebars helpers like `theme_option`, `{{#previous}}` / `{{#next}}`) matches **mdBook 0.4.x**. **mdBook 0.5.x will not build** this book without changing the theme.

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

## Repository layout

| Path | Purpose |
|------|--------|
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
