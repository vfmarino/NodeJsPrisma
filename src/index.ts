const Koa = require('koa')
const Router = require ('@koa/router')

const app = new Koa()
const router = new Router()


app.use(async (ctx: { body: string; }) => (ctx.body ="Hello World"));

app.listen(3100, () => {
    console.log(`Server running at: http://localhost:3100`);
})