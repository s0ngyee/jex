/**
 *
 * @module core
 * @submodule fn
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {
    /**
     * @namespace J.EX.fn
     */
    J.EX.namespace('J.EX.fn');

    /**
     * currying function
     *
     * @method currying
     * @return {Function}
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