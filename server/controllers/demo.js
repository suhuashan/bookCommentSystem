module.exports = async (ctx, next) => {
    ctx.body = {
        code: 200,
        msg: '访问成功'
    }
}
