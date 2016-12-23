//CREATE A EMPTY OBJECT AND CHECK FOR JQUERY
if ( window.ABCFORM = {}, "undefined" == typeof jQuery ) throw new Error("ABCFORM requires jQuery");

//CHECK FOR JQUERY VERSION
! function($) {
    var version = $.fn.jquery.split(' ')[0].split('.');
    if ((+version[0] < 3 && +version[1] < 2) || (+version[0] === 2 && +version[1] === 1 && +version[2] < 2)) {
        throw new Error('ABCFORM requires jQuery version 2.1.1 or higher');
    }
}(jQuery);

! function($) {
    var ABCFORM = function(form, options) {
        this.$form = $(form);
        this.options = $.extend({}, $.fn.abcform.DEFAULTS, options);

        this.$invalidFields = $([]); //ARRAY OF INVALID FORM FIELDS
        this.$submitButton  = null;
        this.$hiddenButton  = null;

        //FORM FIELDS VALIDATION STATUS
        this.STATUS_VALID   = 'VALID';
        this.STATUS_INVALID = 'INVALID';

        var divEl = document.createElement('div');
        this._changeEvent = "oninput" in divEl ? 'input' : 'keyup';

        //FLAG TO INDICATE THAT THE FORM IS READY TO SUBMIT WHEN THE VALIDATOR RETURNS TRUE
        this.$submitIfValid = null;

        //FORM ELEMENTS
        this._cacheElements = {};

        //INIT THE VALIDATION PRCESS
        this.init();
    };
    ABCFORM.prototype = {
        constructor: ABCFORM,
        init: function() {
            var currentObj  = this,
                options     = {
                    autoFocus:      this.$form.attr("data-abc-autoFocus"),
                    container:      this.$form.attr("data-abc-container"),
                    excluded:       this.$form.attr("data-abc-excluded"),
                    message:        this.$form.attr("data-abc-message"),
                    onError:        this.$form.attr("data-abc-onerror"),
                    onSuccess:      this.$form.attr("data-abc-onsuccess"),
                    submitButton:   this.$form.attr("data-abc-submitbutton"),
                    fields:         {}
                };
            this.$form
        },
    },
    
    // Plugin definition
    $.fn.abcform = function(option) {
        var params = arguments;
        return this.each(function() {
            var $this   = $(this),
                data    = $this.data('abcform'),
                options = 'object' === typeof option && option;
            if (!data) {
                data = new ABCFORM(this, options);
                $this.data('abcform', data);
            }

            // Allow to call plugin method
            if ('string' === typeof option) {
                data[option].apply(data, Array.prototype.slice.call(params, 1));
            }
        });
    };
    $.fn.abcform.DEFAULTS = {
        message: 'Please provide some data'
    },
    $.fn.abcform.Constructor = ABCFORM;
    
}(jQuery);



