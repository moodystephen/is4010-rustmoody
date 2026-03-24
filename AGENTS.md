# AGENTS.md — IS4010 Rust labs

This repository contains six weekly Rust labs (weeks 09–14). Each week is a standalone Cargo project in its own directory.

## Scope of edits

**Only edit files inside `src/`.** Do not touch:

- `README.md`, `AGENTS.md`, any `labXX.md`
- Any `Cargo.toml` or `Cargo.lock`
- Anything under `.github/`

## What students are doing

Each lab ships with stub functions marked `todo!()`. The task is to replace every `todo!()` with a real implementation that makes the pre-written test suite pass. The test module is marked `// TESTS — DO NOT MODIFY` and must never be changed.

When implementing a stub, rename parameters by dropping the leading `_` (e.g., `_a` → `a`).

## Build and test commands

Run these from inside the week's directory (e.g., `cd week09`):

```bash
cargo check                  # fast syntax check
cargo test                   # run the test suite
cargo fmt                    # auto-format (edits files in place)
cargo clippy -- -D warnings  # lint; warnings are errors
```

CI runs `cargo test`, `cargo fmt --check`, and `cargo clippy -- -D warnings` on every push.

## Week structure

| Week | Topic | Source files |
|------|-------|-------------|
| 09 | Rust basics | `src/main.rs` |
| 10 | Ownership and borrowing | `src/main.rs` |
| 11 | Structs, enums, and methods | `src/main.rs`, `src/student.rs` |
| 12 | Generics and traits | `src/main.rs` |
| 13 | Idiomatic Rust | `src/main.rs` |
| 14 | CLI application | `src/main.rs`, `src/generator.rs`, `src/validator.rs` |

## Known issues

**Week 14 content misalignment:** The slides teach multithreading/concurrency (thread spawning, Arc/Mutex, channels) while the lab is a CLI application using clap and rand crates with no threading. This is intentional for the current semester. Future iterations should align these or restructure the curriculum.
