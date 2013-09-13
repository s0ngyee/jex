/**
 * JEX widget.VIP
 *
 * @module widget
 * @submodule propimg
 * @namespace J.EX.VIP.widget.propimg
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {
    /**
     * PropImg
     * @constructor
     */
    function PropImg() {
        var defOpts = {
            cls: true,
            ds: {
                img: {},
                desc: 'test place holder',
                type: 0
            },
            thumb: {
                w: 110,
                h: 80
            },
            elDesc: null,
            elThumb: null,
            onfinishload: null
        };
        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.pnl = '<li></li>';
        this.ds = opts.ds;
        this.thumb = opts.thumb;
        this.onthumbclick = opts.onthumbclick;
        this.pnl_img = '<div class="photo-item-img"><img width="110" height="80" src ="" /></div>';
        this.pnl_txt = '<div class="photo-item-describe"></div>';
        this.pnl_desc = '<div class="photo-item-f"></div>';
        this.btn_close = '<span class="home-plan-close"><a href="javascript:void(0);"></a></span>';
        this.ti = '<textarea class="text-inf-box text-inf-def">{$ph}</textarea>';
        this.onfinishload = opts.onfinishload;
        PropImg.superclass.constructor.call(this, opts);

        var init = function() {
            self.el = J.g(J.EX.dom.parseDOM(self.pnl)[0]);

            var elPnlImg = J.g(J.EX.dom.parseDOM(self.pnl_img)[0]),
                elPnlTxt = J.g(J.EX.dom.parseDOM(self.pnl_txt)[0]),
                elPnlDesc = J.g(J.EX.dom.parseDOM(self.pnl_desc)[0]),
                elBtnCls = J.g(J.EX.dom.parseDOM(self.btn_close)[0]);

            elPnlDesc.html(self.ti.replace(/\{\$ph\}/g, self.ds.desc));
            elPnlTxt.append(elPnlDesc);

            self.el.append(elPnlImg);
            self.el.append(elPnlTxt);
            self.el.append(elBtnCls);

            /**
             <span class="normal-gray-color">10-80个字</span>
             <span class="pub-err-box"><em class="pub-icon-comm pub-icon-error"></em>字数在10-80字之间</span>
             */

            /**
             * bind event
             */
            elBtnCls.on('click', function(){
                self.close();
            });

            if(self.onfinishload) {
                self.onfinishload.call(self);
            }
        }

        init();
    }

    PropImg.prototype = {
        close: function(){
            this.el.remove();
        }
    }

    J.EX.inherit(PropImg, J.EX.widget.base);

    J.mix(J.EX.widget.VIP, {
        propphoto: PropImg
    });

    J.dom.fn.vip.propphoto = function(o) {
        return new PropImg(o);
    }
})(J);