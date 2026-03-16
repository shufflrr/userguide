# Building the user guide

This book is built with **mdBook 0.4.52**. Newer versions (e.g. 0.5.x) use a different theme API and will fail to build.

## Install mdbook 0.4.52

```bash
cargo install mdbook --version 0.4.52 --locked
```

If you have mdbook from Homebrew or another source, use the Cargo-installed binary so you get 0.4.52:

```bash
~/.cargo/bin/mdbook build
```

Or ensure `~/.cargo/bin` is before other paths in your `PATH`.

## Build

```bash
mdbook build
```

Output is written to the `docs/` directory.

## Serve locally

```bash
mdbook serve
```

Then open http://localhost:3000
