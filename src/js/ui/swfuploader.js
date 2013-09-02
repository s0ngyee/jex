/**
 * Created with IntelliJ IDEA.
 * User: bsy
 * Date: 13-8-3
 * Time: 上午1:17
 * To change this template use File | Settings | File Templates.
 */
;(function(J) {
    /**
     * SWFUploader Base
     * Rely on SWFUploader
     * @constructor
     */
    function SWFUploaderBase() {
        var defOpts = {
            ds: [],
            enable: true
        };

        var defSwfOpts = {
            file_post_name : 'file',
            file_size_limit : '5MB',
            file_types : '*.gif;*.jpg;*.png',
            file_types_description : '所有图片',
            file_upload_limit: 10,

            button_placeholder_id: '',
            button_image_url: '',
            button_width: 100,
            button_height: 50,
            button_cursor : SWFUpload.CURSOR.HAND,
            button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,

            //event handler
            upload_start_handler: null,
            upload_success_handler: null,
            upload_complete_handler: function(file) {
                if (this.getStats().files_queued !== 0) {
                    this.startUpload();
                }
            },
            file_dialog_complete_handler: function(numFilesSelected, numFilesQueued) {
                if (this.getStats().files_queued !== 0) {
                    this.startUpload();
                }
            }
        };

        var a = arguments,
            o = a[0] || {},
            opts = J.mix(defOpts, o),
            swfopts = J.mix(defSwfOpts, o.swfopts),
            self = this;
        delete opts.swfopts;

        this.ds = opts.ds;
        this.enable = opts.enable;
        this.swfu = null;
        this.swfopts = swfopts;

        SWFUploaderBase.superclass.constructor.call(this, opts);
    }

    SWFUploaderBase.prototype = {
        _init: function() {
            var self = this;
            this.swfu = new SWFUpload(this.swfopts);

            if(this.onload) {
                this.onload.call(this);
            }
        }
    }
    J.EX.inherit(SWFUploaderBase, J.EX.ui.base);

    J.mix(J.EX.ui, {
        swfuploader: SWFUploaderBase
    });
})(J);