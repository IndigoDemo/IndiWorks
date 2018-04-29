const base = require("./webpack.common");

module.exports = (env, argv) => Object.assign({}, base(env, argv), {});
