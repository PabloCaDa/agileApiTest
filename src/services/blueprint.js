const { memoize } = require('lodash')
const { promisify } = require('util')
const aglio = require('aglio')

module.exports.composeBlueprint = (routes) => {
    return Object.values(routes)
      .map(({ blueprint }) => blueprint)
      .filter((blueprint) => blueprint)
      .join('\n')
  }


module.exports.generateDocs = (blueprints = []) => {
    const blueprint = blueprints.join('\n')
    const render = memoize(promisify(aglio.render))
  
    return (req, res) => {
      return render(blueprint, {})
        .then((html) => res.send(html))
        .catch(() => sendError(res).docs())
    }
  }