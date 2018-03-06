const Koa = require('koa');
const Router = require('koa-router');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

const app = new Koa();
const router = new Router();

router.get('/v2/movie/in_theaters', async (ctx, next) => {
    var start = ctx.query.start;
    var count = ctx.query.count;
    var res = await request(`https://api.douban.com/v2/movie/in_theaters?start=${start}&count=${count}`);
    ctx.body = res.body;
    await next();
});

router.get('/v2/movie/coming_soon', async (ctx, next) => {
    var start = ctx.query.start;
    var count = ctx.query.count;
    var res = await request(`https://api.douban.com/v2/movie/coming_soon?start=${start}&count=${count}`);
    ctx.body = res.body;
    await next();
});

router.get('/v2/movie/top250', async (ctx, next) => {
    var start = ctx.query.start;
    var count = ctx.query.count;
    var res = await request(`https://api.douban.com/v2/movie/top250?start=${start}&count=${count}`);
    ctx.body = res.body;
    await next();
});

router.get('/v2/movie/search', async (ctx, next) => {
    var q = ctx.query.q;
    var res = await request(`https://api.douban.com/v2/movie/search?q=${q}`);
    ctx.body = res.body;
    await next();
});

app.use(router.routes());
app.listen(4000,() => {
    console.info('listening port 4000');
});
