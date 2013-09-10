/**
 * JEX ui.combobox
 *
 * @module ui
 * @submodule combobox
 * @namespace J.EX.ui.combobox
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {

    /**
     * ComboboxBase
     * @constructor
     * @extends J.EX.ui.base
     */
    function ComboboxBase() {

        /**
         * @config defOpts
         * @type Object
         * @param {String} defOpts.title Combobox title
         * @param {Number} defOpts.val Combobox value
         * @param {Array} defOpts.ds Combobox data store
         * @param {String} defOpts.itm_t Item template
         * @param {String} defOpts.itm_kp Item key prefix
         * @param {String} defOpts.itm_ks Item key suffix
         * @param {Mixed} defOpts.itm_dk Item default key
         * @param {Number} defOpts.ddn Dropdown display num
         * @param {Boolean} defOpts.enable Combobox enable flag
         * @event onSelect
         * @event onRefresh
         */
        var defOpts = {
            title: '',
            val: 0,
            ds: [],
            itm_t: '',
            itm_kp: '',
            itm_ks: '',
            itm_dk: '',
            ddn: 10,
            enable: true,
            onSelect: null,
            onRefresh:null
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        /**
         * Combobox title
         *
         * @property title
         * @type String
         */
        this.title = opts.title;

        /**
         * Combobox value
         *
         * @property val
         * @type Number
         */
        this.val = opts.val;

        /**
         * Data store
         *
         * @property ds
         * @type Array
         */
        this.ds = opts.ds;

        /**
         * Item template
         *
         * @property itm_t
         * @type String
         */
        this.itm_t = opts.itm_t;

        /**
         * Item key prefix
         *
         * @property itm_kp
         * @type String
         */
        this.itm_kp = opts.itm_kp;

        /**
         * Item key suffix
         *
         * @property title
         * @type String
         */
        this.itm_ks =  opts.itm_ks;

        /**
         * Item default key
         *
         * @property itm_dk
         * @type String
         */
        this.itm_dk = opts.itm_dk ? opts.itm_dk : opts.title;

        /**
         * Combobox status
         *
         * @property enable
         * @type Boolean
         */
        this.enable = opts.enable;

        /**
         * Dropdown display number
         *
         * @property title
         * @type String
         */
        this.ddn = opts.ddn;

        /**
         * Expand flag
         *
         * @private
         * @property isExpand
         * @type String
         */
        this.isExpand = false;

        /**
         * Selected item
         *
         * @property si
         * @type Object
         */
        this.si = null;

        /**
         * Combobox select event
         *
         * @event onSelect
         */
        this.onSelect = opts.onSelect;

        /**
         * Combobox refresh event
         *
         * @event onRefresh
         */
        this.onRefresh = opts.onRefresh;

        ComboboxBase.superclass.constructor.call(this, opts);
    }

    ComboboxBase.prototype = {
        /**
         * @method setEnable
         * @param flag
         */
        setEnable: function(flag) {
            this.enable = flag;
            if(!flag) {
                this.reset();
            }
        },
        /**
         * Add item dynamic
         * @method add
         * @param item
         */
        add: function(item) {
            this.ds.push(item);
            this.refresh();
        },
        /**
         * Select item
         * @method select
         * @param val
         */
        select: function(val) {
            var key, si;
            this.ds.each(function(o, i){
                if(o[0] == val) {
                    key = o[1];
                    si = o;
                }
            });
            this.si = si;
        },
        /**
         * Combobox reload data
         * @method reload
         * @param data
         */
        reload: function(data) {
            this.ds = data;
            this.refresh();
        },
        /**
         * Refresh combobox
         * @method refresh
         */
        refresh: function() {

        },
        /**
         * Reset combobox
         * @method reset
         */
        reset: function() {
            this.isExpand = false;
        }
    };

    J.EX.inherit(ComboboxBase, J.EX.ui.base);

    J.mix(J.EX.ui, {
        combobox: ComboboxBase
    });

})(J);

