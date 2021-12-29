export default {
  validQueryParams: async (req, res, next) => {
    if (req.query.text) {
      next()
    } else {
      return res.status(400).send({
        error: 'no text'
      })
    }
  }
}
