export default function validateRequired(fields) {
  return (req, res, next) => {
    const missingFields = []

    for (const field of fields) {
      if (req.body[field] === undefined) {
        missingFields.push(field)
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        fields: missingFields,
      })
    }

    next()
  }
}
