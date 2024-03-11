FROM oven/bun:1 as priming
WORKDIR /app

ENV PORT=3000

FROM priming as install
COPY . .
RUN bun install --frozen-lockfile

FROM install as build
COPY --from=install /app .
RUN bun run build
EXPOSE "${PORT}"
CMD ["bun", "run", "start"]
