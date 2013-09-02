/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:14
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {
    /**
     * WizzardBase
     * @constructor
     */
    function WizzardBase() {
        var defOpts = {
            step: '',
            current: ''
        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.step = opts.step;
        this.current = opts.current;

        WizzardBase.superclass.constructor.call(this, opts);
    }

    J.EX.inherit(WizzardBase, J.EX.widget.base);

    J.mix(J.EX.widget, {
        wizzard: WizzardBase
    });
})(J);