const tokenExtractor = (request, response, next) => {

    if ((request.path === '/api/blogs' && request.method === 'POST') || ((request.path.indexOf('/api/blogs/') > -1) && request.method === 'DELETE')) {

        const authorization = request.get('authorization')

        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

            request.token = authorization.substring(7)
            return next()
        }

    }

    return next()
}

module.exports = {tokenExtractor}