import { Hono } from 'hono'
import { userRoute } from './routes/userroute'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/home",userRoute);

export default app
