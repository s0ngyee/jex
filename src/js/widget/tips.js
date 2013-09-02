/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:14
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {
    /**
     * TipsBase
     * @constructor
     */
    function TipsBase() {
        var defOpts = {
            msg: '',
            type: 1
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        TipsBase.superclass.constructor.call(this, opts);
        this.msg = opts.msg;
        this.type = opts.type;
    }

    TipsBase.prototype = {
        show: function(){

        },
        hide: function(){

        }
    }

    J.EX.inherit(TipsBase, J.EX.widget.base);

    J.mix(J.EX.widget, {
        tips: TipsBase
    });
})(J);