module.exports = function check (value) {
  var type = typeof value

  switch (true) {
    case type === 'boolean':
      return true

    case type === 'number':
      return !Number.isNaN(value)

    case type === 'object':
      return !(JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]' || value === null)

    default:
      // string undefined function symbol
      return !!value
  }
}