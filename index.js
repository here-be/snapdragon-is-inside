'use strict';

var define = require('define-property');
var util = require('snapdragon-util');

/**
 * Adds an `.isInside` method to a [snapdragon][] `Compiler` instance.
 *
 * ```js
 * var Snapdragon = require('snapdragon');
 * var isInside = require('snapdragon-is-inside');
 * // register the plugin
 * var snapdragon = new Snapdragon();
 * snapdragon.use(isInside());
 * // or
 * var compiler = new Snapdragon.Compiler();
 * compiler.use(isInside());
 * ```
 * @api public
 */

module.exports = function(options) {
  return function(snapdragon) {
    if (snapdragon.isSnapdragon) {
      define(snapdragon.parser, 'isInside', plugin);

    } else if (snapdragon.isCompiler) {
      define(snapdragon, 'isInside', plugin);

    } else {
      throw new Error('expected an instance of Snapdragon or Snapdragon.compiler');
    }

    /**
     * Returns true if `node` is currently inside the given node type(s).
     *
     * ```js
     * snapdragon.use(isInside());
     * snapdragon.compiler
     *   .set(function(node) {
     *     if (this.isInside(node, /foo/)) {
     *       // do stuff
     *     }
     *   })
     * ```
     * @param {Object} `node`
     * @param {RegExp|Function} `regex` Pass the regex to use for capturing. Pass a function if you need access to the compile instance.
     * @return {Object} Returns the compile instance for chaining
     * @api public
     */

    function plugin(node, types) {
      return util.isInside(this.state, node, types);
    }
  };
};
