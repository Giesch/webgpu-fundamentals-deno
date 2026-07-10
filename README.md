# WebGPU Fundamentals

This is a setup repo for the [WebGPU Fundamentals](https://webgpufundamentals.org/) tutorial, using the new [deno desktop](https://docs.deno.com/runtime/desktop/) cross-platform native environment.

## Getting Started

1. Install Dependencies

Deno:

```sh
curl -fsSL https://deno.land/install.sh | sh
```

Set up your editor to use the Deno LSP rather than a default TypeScript one. If
you're using VSCode, you'll want
[the Deno extension](https://github.com/denoland/vscode_deno/).\
If you use Emacs and lsp-mode, the .dir-locals.el will fix this.

If you're on Linux and using Wayland: you'll need libxdo3:

```sh
# on a debian-like, for example:
sudo apt install libxdo3
```

2. Run the example:

```sh
deno task dev
```
