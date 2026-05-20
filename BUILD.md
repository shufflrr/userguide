# Building the user guide

This book is built with **mdBook 0.4.52** only. Newer versions (e.g. 0.5.x) use a different theme API and **will break** this project.

## Recommended: version-checked wrapper

From the repository root:

```bash
./scripts/mdbook build
./scripts/mdbook serve
```

The script refuses to run if `mdbook --version` is not **0.4.52**.

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
./scripts/mdbook build
```

Or, if you have confirmed `mdbook --version` is `mdbook v0.4.52`:

```bash
mdbook build
```

Output is written to the `docs/` directory.

## Serve locally

```bash
./scripts/mdbook serve
```

Then open http://localhost:3000
