/**
 * JEX ui.mask
 *
 * @module ui
 * @submodule mask
 * @namespace J.EX.ui.mask
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {
    /**
     * MaskBase
     * @constructor
     * @extends J.EX.ui.base
     */
    function MaskBase() {

        /**
         * @config defOpts
         * @type Object
         * @param {Object} defOpts.elModal Mask's modal element
         * @param {Number} defOpts.zidx Mask z-index property
         * @param {String} defOpts.tpl Mask element template
         */
        var defOpts = {
            elModal: null,
            zidx: 9999,
            tpl: '<div id="mask" style="display: none;background-color: rgb(0, 0, 0);width: 100%;position: absolute;opacity: 0.5;z-index: {$zidx};"></div>'
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        /**
         * Mask modal element
         *
         * @property elModal
         * @type {Object|null}
         */
        this.elModal = opts.elModal;

        /**
         * Mask z-index
         *
         * @property elModal
         * @type {Number}
         */
        this.zidx = opts.modal.zidx ? opts.modal.zidx - 1 : opts.zidx;

        /**
         * Mask tpl
         *
         * @property tpl
         * @type {String}
         */
        this.tpl = opts.tpl.replace(/\{\$zidx\}/, opts.zidx);

        MaskBase.superclass.constructor.call(this, opts);

        var init = function() {
            self.el = J.g(J.EX.dom.parseDOM(self.tpl)[0]);
            self.el.setStyle({
                'height': J.page.height() + 'px',
                'left': J.page.scrollLeft() + 'px',
                'top': J.page.scrollTop() + 'px'
            });
            J.g(J.D.body).append(self.el[0]);

            self.el.on('click', function() {
                self.remove();
            })
        }
        init();
    }

    MaskBase.prototype = {
        show: function() {
            this.el.show();
        },
        hide: function() {
            this.el.hide();
        },
        remove: function() {
            this.el.remove();
            if(this.modal) {
                this.modal.remove();
            }
        }
    }

    J.EX.inherit(MaskBase, UIBase);

    J.mix(J.EX.ui, {
        mask: MaskBase
    });

})(J);
