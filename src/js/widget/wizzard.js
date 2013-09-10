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