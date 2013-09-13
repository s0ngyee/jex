/**
 * JEX ui
 *
 * @module ui
 * @submodule swfuploader
 * @namespace J.EX.ui.swfuploader
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {
    /**
     * Uploader Base
     * @constructor
     */
    function SWFUploaderBase() {
        var defOpts = {
            enable: true,
            min: 0,
            max: 0,
            onfinishupload: null
        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.enable = opts.enable;
        this.min = opts.min;
        this.max = opts.max;
        this.onfinishupload = opts.onfinishupload;

        SWFUploaderBase.superclass.constructor.call(this, opts);


        var init = function() {

        }
        init();
    }

    J.EX.inherit(SWFUploaderBase, J.EX.ui.base);

    J.mix(J.EX.ui, {
        uploader: SWFUploaderBase
    });
})(J);