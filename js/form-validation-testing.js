! function (jQ) {
    /*$.fn.greenify = function(options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "#ececec",
            display: "inline-block",
            padding: "5px"
        }, options );
 
        console.log('i am in green');
        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor,
            display: settings.display,
            padding: settings.padding
        });
    };*/
    var abcform = function(currentObj, opts) {
        this.$form = jQ(currentObj),
        this.options = jQ.extend({}, abcform.DEFAULT_OPTIONS, opts),
        this.$invalidField = null,
        this.$validField = null,
        this.$submitButton = null,
        this.STATUS_NOT_VALIDATED = "NOT_VALIDATED",
        this.STATUS_VALIDATING = "VALIDATING",
        this.STATUS_INVALID = "INVALID",
        this.STATUS_VALID = "VALID";

        var tempDiv = document.createElement('div');
        this._changeEventOfContainer = 'oninput' in tempDiv ? 'input' : 'keyup';
        this._submitIfValid = null,
        this.init();
    };
    abcform.DEFAULT_OPTIONS = {
        elementClass: 'fv-form',
        defaultMessage: 'The specified value is not Valid',
        errorMessage: 'There is an Error',
        requiredMessage: 'This is a required component',
        excludedComponents: [":disabled", ":hidden", ":not(':visible')"],
        icons: {
            valid: null,
            invalid: null,
            validating: null
        },
        submitButton: "[type='submit']",
        components: null
    }, abcform.prototype = {
        constructor: abcform,
        init: function() {
            var a, b, c, d, e, f, g, h = this,
                inlineAttr = {
                    excludedComponents: this.$form.attr("data-fv-excluded"),
                    defaultMessage: this.$form.attr("data-fv-default-message"),
                    errorMessage: this.$form.attr("data-fv-error-message"),
                    requiredMessage: this.$form.attr("data-fv-required-message"),
                    submitButton: this.$form.attr("data-fv-submitButton"),
                    components: {},
                    icons: {
                        valid: this.$form.attr("data-fv-icon-valid"),
                        invalid: this.$form.attr("data-fv-icon-invalid"),
                        validating: this.$form.attr("data-fv-icon-validating")
                    }
                };
            this.$form.addClass(this.options.elementClass).on("submit.fv", function() {
                jQ.preventDefault(), h.validate()
            }).on("click", this.options.submitButton, function() {
                h.$submitButton = jQ(this), h._submitIfValid = !0
            }).find('[name]').each(function() {
                var formObject = jQ(this);
                if ( ! h._isExcludedComponent(formObject) ) {
                    var objName = formObject.attr("name");
                    console.log(objName);
                    var tempObj = {};
                    var n = {
                        
                    }
                }
            }).end().find(this.options.submitButton).each(function() {
                jQ('<input/>').attr("type", "hidden").attr("name", jQ(this).attr("name")).val(jQ(this).val()).appendTo(h.$form);
            })
        },
        _isExcludedComponent: function(b) {
            if (this.options.excludedComponents) {
                "string" == typeof this.options.excludedComponents && (this.options.excludedComponents = jQ.map(this.options.excludedComponents.split(","), function(b) {
                    return jQ.trim(b)
                }));
                for (var c = this.options.excludedComponents.length, d = 0; c > d; d++)
                    if ("string" == typeof this.options.excludedComponents[d] 
                        && b.is(this.options.excludedComponents[d]) 
                        || "function" == typeof this.options.excludedComponents[d] 
                        && 1 == this.options.excludedComponents[d].call(this, b, this)) {
                            return !0
                    }
            }
            return !1
        }
    }, $.fn.formValidate = function(options) {
        return this.each(function() {
            var $self = this;
            var validate = $.fn.validate;
            f = new abcform($self, options);    
        })

        /*var settings = validate.settings;
        
        validate._init = function(options) {
            //stop Chrome and other HTML5 compliant browsers from doing their own validation
            $self.attr('novalidate', 'novalidate');
            
            // extend defaults, existing settings (to save state)
            // and passed options.
            validator.settings = $.extend({}, {
                alert: 'The form has some invalid fields. Please review.',
                checkbox: true,
                dataErrorMsg: 'error-msg',
                defaultMsg: 'Required.',
                formGroupErrorClass: 'has-error',
                helpBlockClass: 'help-block with-errors',
                radio: true,
                validateSelecters: 'input[type="text"],input[type="email"],input[type="number"],select,textarea',
                validHandlers: {},
                validOnBlur: true,
                validOnKeyUp: false,
                validRadioCheckOnClick: true
            }, validator.settings, options);
        }*/
        
        return $self;
    };
}(window.jQuery);