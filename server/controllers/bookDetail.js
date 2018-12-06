const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {id} = ctx.request.query
    let detail = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .where('id', id)
        .first()

    let info = JSON.parse(detail.user_info)

    await mysql('books')
        .where('id', id)
        .increment('count', 1)

    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(','),
        user_info: {
            name: info.nickName,
            image: info.avatarUrl
        },
        summary: detail.summary.split('\n')
    })
}
