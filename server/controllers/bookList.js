const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let size = 10
    let {page, openId} = ctx.request.query
    const mysqlSelect = mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .orderBy('books.id', 'desc')
    let bookList
    if (openId) {
        bookList = await mysqlSelect.where('books.openid', openId)
    } else {
        bookList = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
    ctx.state.data = {
        list: bookList.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                userinfo: {
                    nickName: info.nickName
                }
            })
        })
    }
}
