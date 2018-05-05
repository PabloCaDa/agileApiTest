const { memoize } = require('lodash')
const { promisify } = require('util')
const aglio = require('aglio')

module.exports.composeBlueprint = (routes) => {
    return Object.values(routes)
      .map(({ blueprint }) => blueprint)
      .filter((blueprint) => blueprint)
      .join('\n')
  }