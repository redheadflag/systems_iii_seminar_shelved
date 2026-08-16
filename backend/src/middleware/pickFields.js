export default function pickFields(fields) {
  return (req, res, next) => {
    const data = {}

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field]
      }
    }

    req.data = data
    next()
  }
}
