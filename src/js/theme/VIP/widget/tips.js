/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:28
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {
    /**
     * Tips
     * @constructor
     */
    function Tips() {
        var defOpts = {

        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        Tips.superclass.constructor.call(this, opts);
    }

    J.EX.inherit(Tips, J.EX.widget.tips);

    J.mix(J.EX.widget.VIP, {
        tips: Tips
    });
})(J);