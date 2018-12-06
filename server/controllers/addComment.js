const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {bookId, openId, comment, phone, location} = ctx.request.body
    try {
        await mysql('comments').insert({bookId, openId, comment, phone, location})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (err) {
        ctx.state = {
            code: -1,
            data: {
                msg: `评论失败${err.sqlMessage}`
            }
        }
    }
}
