
import { Hono } from 'hono'
import { signup } from './pages/signup'
import { signin } from './pages/signin'
import { cors } from 'hono/cors'


const app = new Hono()

app.use(cors())
app.route('/api/v1',signup)
app.route('/api/v1',signin)

export default app






