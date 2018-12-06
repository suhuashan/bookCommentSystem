let {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {bookId, openId} = ctx.request.query
    let comments
    let res = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')

    if (bookId) {
        comments = await res.where('bookid', bookId)
    } else if (openId) {
        comments = await res.where('openid', openId)
    } else {}

    ctx.state.data = {
        list: comments.map(v => {
            let info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    title: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
    }
}
