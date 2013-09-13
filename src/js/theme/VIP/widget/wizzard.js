/**
 * JEX widget.VIP
 *
 * @module widget
 * @submodule wizzard
 * @namespace J.EX.VIP.widget.wizzard
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {
    /**
     * Wizzard
     * @constructor
     */
    function Wizzard() {
        var defOpts = {

        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        Wizzard.superclass.constructor.call(this, opts);
    }

    J.EX.inherit(Wizzard, J.EX.widget.wizzard);

    J.mix(J.EX.widget.VIP, {
        wizzard: Wizzard
    });
})(J);