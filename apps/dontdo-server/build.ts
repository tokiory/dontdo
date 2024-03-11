await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: '.output',
  minify: Bun.env.NODE_ENV === "production",
  target: "node",
});

export {}
