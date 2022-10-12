/* --------------------------------------------------
	  Include Template
  -------------------------------------------------- */

$(document).ready(function () {
	$("#header-template").load("components/header.html");
	$("#footer-template").load("components/footer.html");
});

/* --------------------------------------------------
	  Validation
  -------------------------------------------------- */

$(document).ready(function () {
	$('form').validateMini({
		validates: {
			stronger: (params, value) => {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value) || "A Strong Password Required"
			},
			numonly: (params, value) => {
				return /^(?=.*[0-9])/.test(value) || "enter number only"
			}
		}
	});
});

/* --------------------------------------------------
  Datepicker
  -------------------------------------------------- */

  $( document ).ready(function() {

	$('.datepicker').datepicker({
		dateFormat: 'dd M yy',
		numberOfMonths: 1,
	});

	// Start date
	$('#start_date').datepicker({
		dateFormat: 'dd M yy',
		numberOfMonths: 1,
		onSelect: function (selected) {
			var dt = new Date(selected)
			dt.setDate(dt.getDate() + 1)
			$('#end_date').datepicker('option', 'minDate', dt)
		},
	});

	// End date
	$('#end_date').datepicker({
		dateFormat: 'dd M yy',
		numberOfMonths: 1,
		onSelect: function (selected) {
			var dt = new Date(selected)
			dt.setDate(dt.getDate() - 1)
			$('#start_date').datepicker('option', 'maxDate', dt)
		},
	});

});


$( document ).ready(function() {
	$('.timepicker-input').timepicker({
		format:'H:mm',
	});
});


/* --------------------------------------------------
	Phone Format
  -------------------------------------------------- */

$(document).ready(function () {
	$("input[name='phone_number']").keyup(function () {
		$(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d+)$/, "$1 $2 $3"));
	});
});



/* --------------------------------------------------
	  Destination - opening tab inside destination page
  -------------------------------------------------- */
 
// var langArray = [];
// $('.vodiapicker option').each(function () {
// 	var img = $(this).attr("data-thumbnail");
// 	var text = this.innerText;
// 	var value = $(this).val();
// 	var item = '<li><img src="' + img + '" alt="" value="' + value + '"/><span>' + text + '</span></li>';
// 	langArray.push(item);
// })

// $('#a').html(langArray);
 
// $('.btn-select').html(langArray[0]);
// $('.btn-select').attr('value', 'en');
 
// $('#a li').click(function () {
// 	var img = $(this).find('img').attr("src");
// 	var value = $(this).find('img').attr('value');
// 	var text = this.innerText;
// 	var item = '<li><img src="' + img + '" alt="" /><span>' + text + '</span></li>';
// 	$('.btn-select').html(item);
// 	$('.btn-select').attr('value', value);
// 	$(".b").toggle(); 
// });

// $(".btn-select").click(function () {
// 	$(".b").toggle();
// });
 
// var sessionLang = localStorage.getItem('lang');
// if (sessionLang) { 
// 	var langIndex = langArray.indexOf(sessionLang);
// 	$('.btn-select').html(langArray[langIndex]);
// 	$('.btn-select').attr('value', sessionLang);
// } else {
// 	var langIndex = langArray.indexOf('ch');
// 	console.log(langIndex);
// 	$('.btn-select').html(langArray[langIndex]); 
// }

// $(document).ready(function () {
// 	$(".progress-bar").animate({
// 		width: "100%",
// 	}, 5500);
// 	var progresshide = $('progress-bar-success').style.width = '100%';
// 	if (progresshide) {
// 		$('mail_sending').hide()
// 	}
// });


// $(document).ready(function () {

// 	$('.form_radio input').click(function () {
// 		if ($(this).attr('id') == 'yes_specify') {
// 			$(this).parent().siblings($('.show_specify_time')).show(200);
// 		}
// 		else {
// 			$(this).parent().parent().siblings('.yes_radiobox').children('.show_specify_time').hide(200);
// 		}
// 	});

// });

/* --------------------------------------------------
	  Destination - opening tab inside destination page 2
  -------------------------------------------------- */

// $(document).ready(function () {
// 	var i = 1;
// 	$('#btn_Iyes_destination').click(function () {
// 		$(this).addClass("active");
// 		$("#Iyes_destination_box").show(100);
// 		$('.btn_addlocation').show();
// 	});
// 	$('#btn_Ino_destination').click(function () {
// 		$('#btn_Iyes_destination').removeClass("active");
// 		$("#Iyes_destination_box").hide(100);
// 		$('.btn_addlocation').hide();
// 	});
// 	$('#btn_denyes_destination').click(function () {
// 		$(this).addClass("active");
// 		$("#denyes_destination_box").show(100);
// 		$('.btn_addlocation').show();
// 	});
// 	$('#btn_denno_destination').click(function () {
// 		$('#btn_denyes_destination').removeClass("active");
// 		$("#denyes_destination_box").hide(100);
// 		$('.btn_addlocation').hide();
// 	});
// });



/* --------------------------------------------------
	Form Steps
-------------------------------------------------- */

$(document).ready(function () {

	$('#form-page').show();
	$('#thankyou-page').hide();

	var api_baseurl = "https://dev-api.trueprotection.co.th/api/agency";
	var current_fs, next_fs, previous_fs;
	var opacity;
	var current = 1;
	var steps = $("fieldset").length;

	setProgressBar(current);

	$(".next").click(function () {

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		current_fs_id = current_fs.attr('id');

		//console.log(current_fs_id)

		//show the next fieldset
		let allAreFilled = true;
		document.getElementById(current_fs_id).querySelectorAll("[required]").forEach(function (i) {
			if (!allAreFilled) return;
			if (i.type === "radio") {
				let radioValueCheck = false;
				document.getElementById(current_fs_id).querySelectorAll(`[name=${i.name}]`).forEach(function (r) {
					if (r.checked) radioValueCheck = true;
				})
				allAreFilled = radioValueCheck;
				return;
			}
			if (!i.value) { allAreFilled = false; return; }
		})
		
		if (!allAreFilled) { // if (!allAreFilled) {

			var formData = $("#register").serializeArray();

			console.log(formData)

			var len = formData.length - 1;

			for (var i = 0; i < len; i++) {
				if (formData[i].value.length < 1) {
					console.log(formData[i].name);
					$("input[name='" + formData[i].name + "']").focus();
				}
			}

		}
		else {
			//Add Class Active
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

			//hide the current fieldset with style
			current_fs.animate({ opacity: 0 }, {
				step: function (now) {

					// for making fielset appear animation
					opacity = 1 - now;

					current_fs.css({
						'display': 'none',
						'position': 'relative'
					});
					next_fs.css({ 'opacity': opacity });
				},
				duration: 500
			});
			setProgressBar(++current);
			next_fs.show();
		}


	});

	$(".previous").click(function () {

		$('.otp-msg-wrapper').hide();
		$("#agree").prop("checked", false);

		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();

		//Remove class active
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

		//show the previous fieldset
		previous_fs.show();

		//hide the current fieldset with style
		current_fs.animate({ opacity: 0 }, {
			step: function (now) {
				// for making fielset appear animation
				opacity = 1 - now;

				current_fs.css({
					'display': 'none',
					'position': 'relative'
				});
				previous_fs.css({ 'opacity': opacity });
			},
			duration: 500
		});
		setProgressBar(--current);
	});

	function setProgressBar(curStep) {
		var percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		$(".progress-bar")
			.css("width", percent + "%")
	}
	$("#submit").click(function () {

		$('#form-page').hide();
		$('#thankyou-page').show();

		if ($('input#agree').is(':checked')) {

			event.preventDefault();

			var params = $("#msform").serialize();

			grecaptcha.ready(function () {
				grecaptcha.execute('6LfhavcfAAAAAPwnS_gs7WozP6OyqdNWKnC5vx_3', { action: 'post' }).then(function (token) {
					$('#msform').prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');

					$.ajaxSetup({
						headers: { 'X-Language': 'th_TH', 'Accept-Language': 'th_TH' }
					});
					$.post(api_baseurl + "/auth/register", params, function (result) {

						if (result.code != 200) {
							return false;
						}
					});
				});
			});

		}
		else {
			alert('Please checked the box');
			return false;
		}

		return false;
	});
});


$("#next_step_1").click(function () {
	var type_val = $('input[name="type"]:checked').val();
	if (type_val == 'Freelancer') {
		$('#slide2_title').text("Freelancer Information");
		$('#slide2_description').text("We need to know your more about you, please fill the fields below.");
		$('#name_en').text("Your Name (English)");
		$('#name_local').text("Your Name (Thai)");
		$('#tax_id').text("ID Card Number");
		$('.company_type').hide();
	}
	else {
		$('#slide2_title').text("Company's Information");
		$('#slide2_description').text("We need to know your more about your company, please fill the fields below.");
		$('#name_en').text("Company Name (English)");
		$('#name_local').text("Company Name (Thai)");
		$('#tax_id').text("Company Registration Number");
		$('.company_type').show();
	}
});



/* --------------------------------------------------
	CuteSelect
-------------------------------------------------- */

(function () {

	var CuteSelect = CuteSelect || {};

	FIRSTLOAD = true;
	SOMETHINGOPEN = false;

	CuteSelect.tools = {
		canRun: function () {
			var myNav = navigator.userAgent.toLowerCase();
			var browser = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
			if (browser) {
				return (browser > 8) ? true : false;
			} else { return true; }
		},
		uniqid: function () {
			var n = Math.floor(Math.random() * 11);
			var k = Math.floor(Math.random() * 1000000);
			var m = String.fromCharCode(n) + k;
			return m;
		},
		hideEverything: function () {
			if (SOMETHINGOPEN) {
				SOMETHINGOPEN = false;
				targetThis = false;
				var cells = document.getElementsByTagName('div');
				for (var i = 0; i < cells.length; i++) {
					if (cells[i].hasAttribute('data-cuteselect-options')) {
						var parent = cells[i].parentNode;
						cells[i].style.opacity = '0';
						cells[i].style.display = 'none';
					}
				}
			}
		},
		getStyle: function () {
			var css = '';
			var stylesheets = document.styleSheets;
			var css = '';
			for (s = 0; s < stylesheets.length; s++) {
				var classes = stylesheets[s].rules || stylesheets[s].cssRules;
				for (var x = 0; x < classes.length; x++) {
					if (classes[x].selectorText != undefined) {
						var selectPosition = classes[x].selectorText.indexOf('select');
						var optionPosition = classes[x].selectorText.indexOf('option');
						var selectChar = classes[x].selectorText.charAt(selectPosition - 1);
						var optionChar = classes[x].selectorText.charAt(optionPosition - 1);
						if (selectPosition >= 0 && optionPosition >= 0 && (selectChar == '' || selectChar == '}' || selectChar == ' ') && (optionChar == '' || optionChar == '}' || optionChar == ' ')) {
							text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
							css += text.replace(/\boption\b/g, '[data-cuteselect-value]').replace(/\bselect\b/g, '[data-cuteselect-item]');
							continue;
						}
						if (selectPosition >= 0) {
							var character = classes[x].selectorText.charAt(selectPosition - 1);
							if (character == '' || character == '}' || character == ' ') {
								text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
								css += text.replace(/\bselect\b/g, '[data-cuteselect-item]');
							}
						}
						if (optionPosition >= 0) {
							var character = classes[x].selectorText.charAt(optionPosition - 1);
							if (character == '' || character == '}' || character == ' ') {
								text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
								css += text.replace(/\boption\b/g, '[data-cuteselect-value]');
							}
						}
					}
				}
			}

			return css;
		},
		createSelect: function (item) {

			// Create custom select
			var node = document.createElement("div");
			if (item.hasAttribute('id')) { // Catch ID
				node.setAttribute('id', item.getAttribute('id'));
				item.removeAttribute('id');
			}
			if (item.hasAttribute('class')) { // Catch Class
				node.setAttribute('class', item.getAttribute('class'));
				item.removeAttribute('class');
			}

			// Hide select
			item.style.display = 'none';

			// Get Default value (caption)
			var caption = null;
			var cells = item.getElementsByTagName('option');
			for (var i = 0; i < cells.length; i++) {
				caption = cells[0].innerHTML;
				if (cells[i].hasAttribute('selected')) {
					caption = cells[i].innerHTML;
					break;
				}
				else {
					console.log("not have cell");
				}
			}

			// Get select options
			var options = '<div data-cuteselect-title>' + caption + '</div><div data-cuteselect-options><div data-cuteselect-options-container>';
			var cells = item.getElementsByTagName('option');
			for (var i = 0; i < cells.length; i++) {
				if (cells[i].hasAttribute('disabled')) { continue; }
				if (cells[i].hasAttribute('class')) { var optionStyle = ' class="' + cells[i].getAttribute('class') + '"'; } else { var optionStyle = ''; }
				if (cells[i].hasAttribute('id')) { var optionId = ' id="' + cells[i].getAttribute('id') + '"'; } else { var optionId = ''; }
				if (cells[i].hasAttribute('selected')) { options += '<div data-cuteselect-value="' + cells[i].value + '" data-cuteselect-selected="true"' + optionStyle + optionId + '>' + cells[i].innerHTML + '</div>'; }
				else { options += '<div data-cuteselect-value="' + cells[i].value + '"' + optionStyle + optionId + '>' + cells[i].innerHTML + '</div>'; }
			}
			options += '</div></div>';

			// New select customization
			node.innerHTML = caption;
			node.setAttribute('data-cuteselect-item', CuteSelect.tools.uniqid());
			node.innerHTML = options; // Display options
			item.setAttribute('data-cuteselect-target', node.getAttribute('data-cuteselect-item'));
			item.parentNode.insertBefore(node, item.nextSibling);

			// Hide all options
			CuteSelect.tools.hideEverything();
		},
		show: function (item) {
			if (item.parentNode.hasAttribute('data-cuteselect-item')) { var source = item.parentNode.getAttribute('data-cuteselect-item'); }
			else { var source = item.getAttribute('data-cuteselect-item'); }
			var cells = document.getElementsByTagName('select');
			if (item.hasAttribute('data-cuteselect-title')) {
				item = item.parentNode;
				var cells = item.getElementsByTagName('div');
			}
			else { var cells = item.getElementsByTagName('div'); }
			for (var i = 0; i < cells.length; i++) {
				if (cells[i].hasAttribute('data-cuteselect-options')) {
					targetItem = cells[i];
					cells[i].style.display = 'block';
					setTimeout(function () { targetItem.style.opacity = '1'; }, 10);
					cells[i].style.position = 'absolute';
					cells[i].style.left = item.offsetLeft + 'px';
					cells[i].style.top = (item.offsetTop + item.offsetHeight) + 'px';
				}
			}

			item.focus();

			SOMETHINGOPEN = item.getAttribute('data-cuteselect-item');
		},
		selectOption: function (item) {
			var label = item.innerHTML;
			var value = item.getAttribute('data-cuteselect-value');
			var parent = item.parentNode.parentNode.parentNode;
			var target = parent.getAttribute('data-cuteselect-item');
			var cells = parent.getElementsByTagName('div');
			for (var i = 0; i < cells.length; i++) {
				if (cells[i].hasAttribute('data-cuteselect-title')) { cells[i].innerHTML = label; }
			}

			// Real select
			var cells = document.getElementsByTagName('select');
			for (var i = 0; i < cells.length; i++) {
				var source = cells[i].getAttribute('data-cuteselect-target');
				if (source == target) { cells[i].value = value; }
			}
			CuteSelect.tools.hideEverything();
		},
		writeStyles: function () {
			toWrite = '<style type="text/css">' + CuteSelect.tools.getStyle() + ' [data-cuteselect-options] { opacity: 0; display: none; }</style>';
			document.write(toWrite);
		}
	};

	CuteSelect.event = {
		parse: function () {
			var cells = document.getElementsByTagName('select');
			for (var i = 0; i < cells.length; i++) { CuteSelect.tools.createSelect(cells[i]); }
		},
		listen: function () {
			document.onkeydown = function (evt) {
				evt = evt || window.event;
				if (evt.keyCode == 27) { CuteSelect.tools.hideEverything(); }
			};
			document.onclick = function (event) {
				FIRSTLOAD = false;
				if ((!event.target.getAttribute('data-cuteselect-item') && !event.target.getAttribute('data-cuteselect-value') && !event.target.hasAttribute('data-cuteselect-title')) || ((event.target.hasAttribute('data-cuteselect-item') || event.target.hasAttribute('data-cuteselect-title')) && SOMETHINGOPEN)) {
					CuteSelect.tools.hideEverything();
					return;
				}
				var action = event.target;
				if (event.target.getAttribute('data-cuteselect-value')) {
					CuteSelect.tools.selectOption(action);
					CuteSelect.tools.hideEverything();
				}
				else { CuteSelect.tools.show(action); }
				return false;
			}
		},
		manage: function () {
			if (CuteSelect.tools.canRun()) { // IE Compatibility
				CuteSelect.event.parse();
				CuteSelect.event.listen();
				CuteSelect.tools.writeStyles();
			}
		}
	};

	CuteSelect.event.manage();

})();


function recaptchaCallback() {
	var submit = document.getElementById("submit");
	if (submit.classList.contains("hidden")) {
		submit.classList.remove("hidden");
		submit.classList.add("show");
		$('#submit').prop('disabled', false);
	}
}

function checkSubmit() {
	var submit = document.getElementById("btn-submit");
	if (submit.classList.contains("show")) {
		document.getElementById("submit").disabled = false;
	}
	else {
		document.getElementById("submit").disabled = true;
	}
}


/* --------------------------------------------------
	Auto fields
-------------------------------------------------- */

$(document).ready(function () {

	$("#district div[data-cuteselect-title]").text('-- Select --');
	$("#subdistrict div[data-cuteselect-title]").text('-- Select --');

	function GetSortOrder(prop) {
		return function (a, b) {
			if (a[prop] > b[prop]) {
				return 1;
			} else if (a[prop] < b[prop]) {
				return -1;
			}
			return 0;
		}
	}

	$.getJSON("assets/js/country/provinces.json", function (data) {
		var province_arr;
		var num_rows = 0;
		data.sort(GetSortOrder("name_en"));
		for (province_arr in data) {
			if (data.hasOwnProperty(province_arr)) {

				$('#province div[data-cuteselect-options-container]').append('<div data-id="' + data[num_rows].id + '" data-cuteselect-value="' + data[num_rows].name_en + '"> ' + data[num_rows].name_en + ' </div>');

			}
			num_rows++;
		}


	}).fail(function () {
		console.log("An error has occurred.");
	});
	$('#province').click(function (e) {
		$("#district div[data-cuteselect-options-container] div").remove();
		$("#district div[data-cuteselect-title]").text('-- Select --');
		$('#zip_code').val('');

		var province_id = e.target.getAttribute('data-id');

		$.getJSON("assets/js/country/districts.json", function (data) {
			var districts_arr;
			var num_rows = 0;
			data.sort(GetSortOrder("name_en"));
			for (districts_arr in data) {
				if (data.hasOwnProperty(districts_arr)) {
					if (data[num_rows].province_id == province_id) {
						$('#district div[data-cuteselect-options-container]').append('<div data-id="' + data[num_rows].id + '" data-cuteselect-value="' + data[num_rows].name_en + '"> ' + data[num_rows].name_en + ' </div>');
					}
				}
				num_rows++;
			}
		}).fail(function () {
			console.log("An error has occurred.");
		});
	});


	$('#district').click(function (e) {

		//$("#subdistrict div[data-cuteselect-options-container] div").remove();
		//$("#subdistrict div[data-cuteselect-title]").text('-- Select --');

		var amphure_id = e.target.getAttribute('data-id');
		$('#zip_code').val('');

		$.getJSON("assets/js/country/subdistricts.json", function (data) {
			var districts_arr;
			var num_rows = 0;

			for (districts_arr in data) {
				if (data.hasOwnProperty(districts_arr)) {
					if (data[num_rows].amphure_id == amphure_id) {
						if (data[num_rows].zip_code != 0) {
							$('#zip_code').val(data[num_rows].zip_code);
						}

						//$('#subdistrict div[data-cuteselect-options-container]').append( '<div data-id="'+ data[num_rows].id +'" data-cuteselect-value="'+ data[num_rows].name_en +'"> '+ data[num_rows].name_en +' </div>' );
					}
				}
				num_rows++;
			}

		}).fail(function () {
			console.log("An error has occurred.");
		});
	});
	/*
  $('#subdistrict').click(function(e) {
  	
	  var amphure_id = e.target.getAttribute('data-id');
	  $.getJSON("https://dev.trueprotection.co.th/register/js/json/subdistricts.json", function(data){
	  var subdistricts_arr;
	  var num_rows = 0;
	  for(subdistricts_arr in data) {
		  if (data.hasOwnProperty(subdistricts_arr)) {
			  if (data[num_rows].amphure_id == amphure_id) {
				  if (data[num_rows].zip_code != 0) {
					  $('#zip_code').val(data[num_rows].zip_code);
				  }
			  }
		  }
		  num_rows++;
	  }
	
	  }).fail(function(){
		  console.log("An error has occurred.");
	  });
  });
	
  */

});


$(document).ready(function () {

	// GET Country
	$("#country div[data-cuteselect-title]").text('Thailand');
	$('.foreign-address').hide();
	$('.local-address').show();
	$.getJSON("assets/js/country/countries.json", function (data) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].name == 'Thailand') {
				$('#country div[data-cuteselect-options-container]').append('<div data-id="' + data[i].id + '" data-cuteselect-value="' + data[i].name + '" style="border-bottom: solid 1px #cde4f6 !important;"> ' + data[i].name + ' </div>');
			}
		}
		for (var j = 0; j < data.length; j++) {
			if (data[j].name != 'Thailand') {
				$('#country div[data-cuteselect-options-container]').append('<div data-id="' + data[j].id + '" data-cuteselect-value="' + data[j].name + '"> ' + data[j].name + ' </div>');
			}
		}
	}).fail(function () {
		console.log("An error has occurred.");
	});


	$('#country').click(function (e) {

		// Checking if Thailand

		var country_name = e.target.getAttribute('data-cuteselect-value');

		if (country_name == '' || country_name == null) {
			var country_name = $('#country div[data-cuteselect-title]').text();
		}
		if (country_name != 'Thailand') {
			$('.foreign-address').hide();
			$('.local-address').hide();
			$('.address').hide();
			$('.zip_code').hide();
		}
		else {
			$('.foreign-address').hide();
			$('.local-address').show();
			$('.address').show();
			$('.zip_code').show();
		}


		$("#state div[data-cuteselect-options-container] div").remove();
		$("#state div[data-cuteselect-title]").text('-- Select --');
		$("#city div[data-cuteselect-options-container] div").remove();
		$("#city div[data-cuteselect-title]").text('-- Select --');

		var country_id = e.target.getAttribute('data-id');
		$("#state div[data-cuteselect-title]").text('Loading..');
		$.getJSON("https://dev.trueprotection.co.th/register/js/json/states.json", function (data) {
			var state_arr;
			var num_rows = 0;
			$('#zip_code').val('');

			for (state_arr in data) {

				if (data.hasOwnProperty(state_arr)) {
					if (data[num_rows].country_id == country_id) {
						$('#state div[data-cuteselect-options-container]').append('<div data-id="' + data[num_rows].id + '" data-cuteselect-value="' + data[num_rows].name + '"> ' + data[num_rows].name + ' </div>');
					}
				}
				if (state_arr.length == num_rows) {
					$("#state div[data-cuteselect-title]").text('-- Select --');
				}
				num_rows++;
			}
		}).fail(function () {
			console.log("An error has occurred.");
		});
	});

	$('#state').click(function (e) {

		$("#city div[data-cuteselect-options-container] div").remove();
		$("#city div[data-cuteselect-title]").text('-- Select --');

		var state_id = e.target.getAttribute('data-id');
		$("#city div[data-cuteselect-title]").text('Loading..');

		$.getJSON("https://dev.trueprotection.co.th/register/js/json/cities.json", function (data) {

			var city_arr;
			var num_rows = 0;

			for (city_arr in data) {


				if (data.hasOwnProperty(city_arr)) {
					if (data[num_rows].state_id == state_id) {
						$('#city div[data-cuteselect-options-container]').append('<div data-id="' + data[num_rows].id + '" data-cuteselect-value="' + data[num_rows].name + '"> ' + data[num_rows].name + ' </div>');
					}
				}
				if (city_arr.length == num_rows) {
					$("#city div[data-cuteselect-title]").text('-- Select --');
				}
				num_rows++;
			}


		}).fail(function () {
			console.log("An error has occurred.");
		});
	});
});

/* --------------------------------------------------
	Validate JS
-------------------------------------------------- */

$(document).ready(function () {
	$('form').validateMini({
		validates: {
			stronger: (params, value) => {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value) || "A Strong Password Required"
			},
			numonly: (params, value) => {
				return /^(?=.*[0-9])/.test(value) || "enter number only"
			}
		}
	});
});

/* --------------------------------------------------
	Show Hide OTP
-------------------------------------------------- */

function showHideOTP() {

	var agree = document.getElementById("agree");

	var phone = $('.iti__selected-dial-code').text() + $('#f_phone_number').val();
	$('#otp-phonenumber').text(phone);

	$('input[name="login_phone"]').val($('#f_phone_number').val());
	$('input[name="login_phone_code"]').val($('.iti__selected-dial-code').text());

	if (agree.checked == true) {

		$.ajax({
			type: "POST",
			data: {
				login_phone: $('#f_phone_number').val(),
				login_phone_code: $('.iti__selected-dial-code').text(),
			},
			url: "https://dev-api.trueprotection.co.th/api/agency/request_otp",
			success: function (data) {
				$('.otp-msg-wrapper').show();
				$("#otp_verification_1").focus();
			},
			error: function (thrownError) {
				$('.otp-msg-wrapper').show();
				$('.otp-response-message').text('Error' + thrownError);
			}
		});

	}
	else {
		$('.otp-msg-wrapper').hide();
	}
}

/* --------------------------------------------------
	Verification Code
-------------------------------------------------- */

$(document).ready(function () {

	$('.otp-msg-wrapper').hide();
	$('#submit').prop('disabled', true);

	var verificationCode = [];
	$(".verification-code input[type=text]").keyup(function (e) {

		$(".verification-code input[type=text]").each(function (i) {
			verificationCode[i] = $(".verification-code input[type=text]")[i].value;
			$('#verificationCode').val(Number(verificationCode.join('')));
		});

		if ($(this).val() > 0) {
			if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9 || event.key == 0) {
				$(this).next().focus();
			}
		} else {
			if (event.key == 'Backspace') {
				$(this).prev().focus();
			}
		}

	});

	$('.verification-code input').on("paste", function (event, pastedValue) {
		console.log(event)
		$('#txt').val($content)
		console.log($content)
	});

	$editor.on('paste, keydown', function () {
		http:
		var $self = $(this);
		setTimeout(function () {
			var $content = $self.html();
			$clipboard.val($content);
		}, 100);
	});

});

$(document).ready(function () {

	$("input.only_number").keypress(function (event) {
		return /\d/.test(String.fromCharCode(event.keyCode));
	});

});
function removeMessage() {
	$('.error').text('');
	$('.error').hide('');
	$('.success').hide();
	$('.loading').hide();
}
function verifyOTPSend() {

	var input = $('#otp_verification_1').val() + $('#otp_verification_2').val() + $('#otp_verification_3').val() + $('#otp_verification_4').val() + $('#otp_verification_5').val() + $('#otp_verification_6').val();

	if (!input) {
		return false;
	}
	else {
		$.ajax({
			type: "POST",
			data: {
				login_phone: $('#f_phone_number').val(),
				login_phone_code: $('.iti__selected-dial-code').text(),
				otp_code: input,
			},
			url: "https://dev-api.trueprotection.co.th/api/agency/verify_otp",
			success: function (data) {
				if (data.code != 200) {
					$('.error').show();
					$('.error').text(data.message);
				}
				else {
					$('.error').text('');
					$('.error').hide('');
					$('.success').show();
					$('#submit').prop('disabled', false);
				}
			},
			error: function (thrownError) {
				$('.error').show();
				$('.error').text('Something wrong! ' + thrownError);
			}
		});
	}

}

$('.not-require').keyup(function () {
	if ($.trim($('.not-require').val()).length) {
		$(this).addClass('active-text');
	} else {
		$(this).removeClass('active-text');
	}
});



/* --------------------------------------------------
	  data import
  -------------------------------------------------- */

// function update() {
// 	var select = document.getElementById('fruitSelector');
// 	var option = select.options[select.selectedIndex];
// 	document.getElementById('fruitSelector1').value = option.text;

// 	var select1 = document.getElementById('country_code');
// 	var option1 = select1.options[select1.selectedIndex];
// 	document.getElementById('con_code').value = option1.text;
// }

// update();

// function person() {

// 	var firstName = document.getElementById('firstname').value;
// 	var lastName = document.getElementById('lastname').value;

// 	var fphone = document.getElementById('phone').value;
// 	var femail = document.getElementById('email').value;
// 	var dateOfBirth = document.getElementById('date_of_birth').value;
// 	var nationality = document.getElementById('nationality').value;
// 	var relationship = document.getElementById('relationship').value;


// 	document.getElementById('firstnamevalue').value = firstName;
// 	document.getElementById('middlenamevalue').value = middletName;
// 	document.getElementById('lastnamevalue').value = lastName;

// 	document.getElementById('dphone').value = fphone;
// 	document.getElementById('demail').value = femail;
// 	document.getElementById('ddate_of_birth').value = dateOfBirth;
// 	document.getElementById('dnationality').value = nationality;
// 	document.getElementById('drelationship').value = relationship;
// }

// THIS CONSTANT REPRESENTS THE <select> ELEMENT
// const theSelect = document.getElementById('fruitSelector')
// theSelect.addEventListener('input', function () {

// 	let selectedOptText = theSelect.options[theSelect.selectedIndex].text
// 	document.querySelector('.hiddenField').value = selectedOptText;

// })
// function updateTextInput(val) {
// 	document.getElementById('textInput').innerHTML = val;
// }

// function myFunction_l(event) {
// 	document.getElementById("le_redio").innerHTML = event.target.value;

// }

// function myFunction_p(event) {
// 	document.getElementById("p_redio").innerHTML = event.target.value;
// }
// function myFunction_fm(event) {
// 	document.getElementById("fm_redio").innerHTML = event.target.value;
// }
// function myFunction_yn(event) {
// 	document.getElementById("yn_redio").innerHTML = event.target.value;
// }

