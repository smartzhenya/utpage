var FormHandler = function() {
	var objInner = {};
	var $form;
	var $button;
	var options;
	var notValidFields = [];

	objInner.init = function(optionsP) {
		initOptions(optionsP);

		$form = $(options.formSelector);
		if ($form && $form.length) {
			addEvents();
		};
	};

	function initOptions(optionsP) {
		options = optionsP;
	};

	function addEvents() {
		$button = $form.find(options.buttonSelector);
		if ($button && $button.length) {
			$button.on("click", function(e) {
				onButtonClick();
			});
		};
	};

	function onButtonClick() {
		if (validateFields()) {
			// $form.submit();
			checkCredentials();
			// console.log('submit');
		};
	};

	function validateFields() {
		notValidFields = [];

		var areFieldsValid = false;
		var serializedData = getSerializedData();

		serializedData.split("&").forEach(function(item, i) {
			var field = item.split("=");
			var isValid = validateAndMarkField(field[0], field[1]);
			if (!isValid) {
				notValidFields.push(field[0])
			};
		});

		if (notValidFields.length == 0) {
			areFieldsValid = true;
		};

		return areFieldsValid;
	};

	function getSerializedData() {
		return $form.serialize();
	};

	function validateAndMarkField(fieldName, fieldValue) {
		var isValid = false;
			
		if (fieldValue && fieldValue.length > 0) {
			var regExsp = /^[a-zA-Z]+$/;
			isValid = regExsp.test(fieldValue);
		};

		markField(fieldName, isValid);

		return isValid;
	};

	function markField(fieldName, isValid) {
		var $field = $form.find("[name='"+fieldName+"']");
		$field.removeClass(options.validFieldClass);
		$field.removeClass(options.notValidFieldClass);

		if (isValid) {
			$field.addClass(options.validFieldClass);
		} else {
			$field.addClass(options.notValidFieldClass);
		};
	};

	function checkCredentials() {
		var action = "/admin/checkcredentials";
		var serializedData = getSerializedData();
		
		$.ajax({
		    type: 'POST',
		    url: action,
		    data: serializedData,
		    success: function(resp) {
		    	if (resp === "true") {
		    		setRedirectToAdminPage();
		    	} else {
		    		showMessage("Неверные логин или пароль");
		    	};
		    },
		}); 
	};

	function toXML(data) {
		var rootEl = '<?xml version="1.0"?><formData>';
		data.split("&").forEach(function(item, i) {
			var field = item.split("=");
			rootEl = rootEl + '<'+field[0]+'>' + field[1]+'</'+field[0]+'>';
		});
		
		return rootEl;
	}

	function setRedirectToAdminPage() {
		$(location).attr("href", "/admin/index");
	};

	function showMessage(message) {
		var messageEl = document.createElement('div');
        messageEl.className = options.messageClass;
        messageEl.append(message);
		$form.find(options.messageContainerSelector).html(messageEl);
	};

	return objInner;
};

var params = {
	"formSelector": ".form-login",
	"buttonSelector": "button",
	"validFieldClass": "is-valid",
	"notValidFieldClass": "not-valid",
	"messageClass": "message",
	"messageContainerSelector": ".message-container",
};
var loginFormHandler = new FormHandler();
loginFormHandler.init(params);