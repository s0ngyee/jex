/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-4
 * Time: 上午11:10
 * To change this template use File | Settings | File Templates.
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