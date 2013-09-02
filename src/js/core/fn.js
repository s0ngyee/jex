/**
 *
 * @path: core/fn.js
 * @author: songyee
 * @date: 2013/08/14
 * @version: 0.1.0
 */
;(function(J) {
    J.EX.namespace('J.EX.fn');

    /**
     * @desc currying function
     * @returns {Function}
     */
    function currying() {
        var fn = this;
        var args = [].slice.call(arguments, 0);
        return function() {
            return fn.apply(this, args.concat([].slice.call(arguments, 0)));
        };
    }

    J.mix(J.EX.fn, {
        currying: currying
    });
})(J);