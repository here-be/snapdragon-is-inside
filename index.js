'use strict';

var define = require('define-property');
var util = require('snapdragon-util');

/**
 * Adds an `.isInside` method to a [snapdragon][] `Compiler` instance.
 *
 * ```js
 * var Snapdragon = require('snapdragon');
 * var isInside = require('snapdragon-is-inside');
 *
 * // register the plugin
 * var snapdragon = new Snapdragon();
 * snapdragon.use(isInside());
 *
 * // or register directly on the compiler instance
 * var compiler = new Snapdragon.Compiler();
 * compiler.use(isInside());
 * ```
 * @api public
 */

module.exports = function(options) {
  return function(snapdragon) {
    if (snapdragon.isSnapdragon) {
      define(snapdragon.compiler, 'isInside', plugin);

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
     *   .set('foo', function() {
     *     var pos = this.position();
     *     var match = this.match(/foo/);
     *     if (match) {
     *       if (this.isInside(node, 'some-other-node-type')) {
     *         // do stuff
     *       }
     *       return pos(new Node(match[0]));
     *     }
     *   });
     * ```
     * @name .isInside
     * @param {Object} `node`
     * @param {String|Array|Regex} `types` Pass one or more types to check for, or a regex to use for matching types.
     * @return {Boolean} Returns true if the plugin
     * @api public
     */

    function plugin(node, types) {
      return util.isInside(this.state, node, types);
    }
  };
};
