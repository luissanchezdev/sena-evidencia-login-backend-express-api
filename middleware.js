import jwt from 'jsonwebtoken'

export const tokenExtractor = (request, response, next) => {
  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

  const token = getTokenFrom(request)

  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.email) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  console.log({ token })
  console.log({ decodedToken })
  console.log(request.body)

  next()
}
