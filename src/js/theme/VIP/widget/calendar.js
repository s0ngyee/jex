/**
 * JEX widget.calendar
 *
 * @module widget
 * @submodule calendar
 * @namespace J.EX.widget.VIP.calendar
 * @author songyee
 * @since 0.1.0
 */
;(function(J) {

    /**
     * Calendar ComboBox
     * @constructor
     */
    function Calendar() {
        var defOpts = {
            ds: '2000-01-01',
            de: '2031-12-31',
            elY: '',
            elYId: '',
            elM: '',
            elMId: '',
            elD: '',
            elDId: ''
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            self = this;

        this.ds = opts.ds;
        this.de = opts.de;
        this.elYId = opts.elYId || (opts.elId + '_y');
        this.elMId = opts.elMId || (opts.elId + '_m');
        this.elDId = opts.elDId || (opts.elId + '_d');

        Calendar.superclass.constructor.call(this, opts);
        var init = function() {
            var dsY = [],
                dsM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                dsD = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                sD = self.ds.split('-'),
                eD = self.de.split('-'),
                sy = sD[0],
                sm = sD[1],
                sd = sD[2],
                ey = eD[0],
                em = eD[1],
                ed = eD[2];

            for (var i = sy; i <= ey; i++ ) {
                dsY.push(i);
            }
            self.elY = J.g(self.elYId).vip.combobox({
                elId: self.elYId,
                ds: dsY,
                title: '选择年份',
                iks: '年',
                idk: '待定',
                onselect: function() {
                    var num = getDayNumInMonth(this.val, self.elM.val);
                    updateDayCombobox.call(self, num);
                }
            });

            self.elM = J.g(self.elMId).vip.combobox({
                elId: self.elMId,
                ds: dsM,
                title: '选择月份',
                iks: '月',
                idk: '待定',
                onselect: function() {
                    var num = getDayNumInMonth(self.elY.val, this.val);
                    updateDayCombobox.call(self, num);
                }
            });


            self.elD = J.g(self.elDId).vip.combobox({
                elId: self.elDId,
                ds: dsD,
                title: '选择日期' ,
                iks: '日',
                idk: '待定'
            });
        }

        var getDayNumInMonth = function (y, m) {
            return new Date(y, m, 0).getDate();
        }

        var updateDayCombobox = function (n) {
            var ov = this.elD.val,
                nv;
            dsD = [];
            for(var i = 1; i <= n ; i ++) {
                dsD.push(i);
                if (i == n) {
                    nv = i;
                }
            }
            self.elD.reload(dsD);

            /**
             *  check the last day of month
             */
            if(ov && !(ov in dsD)) {
                this.elD.elVal.val(nv);
                this.elD.elTxt.val(this.elD.ikp + nv + this.elD.iks);
                this.elD.val = nv;
            }
        }
        init();
    }

    J.EX.inherit(Calendar, J.EX.widget.base);

    J.mix(J.EX.widget.VIP, {
        calendar: Calendar
    });

    J.dom.fn.vip.calendar = function(o) {
        return new Calendar(o);
    }
})(J);