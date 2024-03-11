import { Hono } from 'hono'

const DEFAULT_PORT = 3000;
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Dontdo!')
})

export default {
  port: Bun.env.PORT || DEFAULT_PORT,
  fetch: app.fetch,
}
