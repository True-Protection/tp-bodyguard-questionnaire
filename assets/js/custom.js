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
		stronger: (params, value)=>{
		  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value) || "A Strong Password Required"
		},
		numonly: (params, value)=>{
		  return /^(?=.*[0-9])/.test(value) || "enter number only"
		}
	  }
	});
  });

/* --------------------------------------------------
	  Destination - opening tab inside destination page
  -------------------------------------------------- */

$(document).ready(function () {
	var i = 1;
	$('#btn_yes_destination').click(function() {
		$(this).addClass("active");
		$("#yes_destination_box").show(100);
		$('.btn_addlocation').show();
	});
	$('#btn_no_destination').click(function() {
		$('#btn_yes_destination').removeClass("active");
		$("#yes_destination_box").hide(100);
		$('.btn_addlocation').hide();
	});
	var fun = function() {
		$('.tab_locations ul li.inactive').clone().appendTo( ".tab_locations ul" );
		$('.destination_forms_box').clone().appendTo( ".destination_forms" );
		$('.tab_locations ul li').next().addClass("active");
		$('.tab_locations ul li').prev().removeClass("inactive");
		$('.tab_locations ul li:last').addClass("inactive");
		$('.tab_locations ul li:last').removeClass("active");
		// $('.d_destination_forms'+ i++).show();


		if ($('.tab_locations ul li').length == 3) {
			$('.tab_locations ul li').css("width","33%");
		}
		else if ($('.tab_locations ul li').length == 4) {
			$('.tab_locations ul li').css("width","24.7%");
			$('.tab_locations ul li:nth-child(3)').addClass("thirdtab");
			$('.tab_locations ul li:nth-child(2)').addClass("secondtab");
			$('.tab_locations ul li:first-child .d_locations').css("left","-7vh");
		}
		else if ($('.tab_locations ul li').length == 5) {
			$('.tab_locations ul li').css("width","19.7%");
			$('.tab_locations ul li:nth-child(4)').addClass("fourthtab");
			$('.tab_locations ul li:nth-child(5)').addClass("fifthtab");
		}

		if (i++ == 8) {
			$('.btn_addlocation').off('click', fun);
		}	
	};

	$(".btn_addlocation").on('click', fun);

	$('.form_radio input').click(function() {
       if($(this).attr('id') == 'yes_specify') {
       		$(this).parent().siblings($('.show_specify_time')).show(200);     
       }
       else {
            $(this).parent().parent().siblings('.yes_radiobox').children('.show_specify_time').hide(200);   
       }
   });

  });

	$(function() {

	  var from_$input = $('#start_date').pickadate(),
	    from_picker = from_$input.pickadate('picker')

	  var to_$input = $('#end_date').pickadate(),
	    to_picker = to_$input.pickadate('picker')


	  // Check if there’s a “from” or “to” date to start with.
	  if ( from_picker.get('value') ) {
	    to_picker.set('min', from_picker.get('select'))
	  }
	  if ( to_picker.get('value') ) {
	    from_picker.set('max', to_picker.get('select'))
	  }

	  // When something is selected, update the “from” and “to” limits.
	  from_picker.on('set', function(event) {
	    if ( event.select ) {
	      to_picker.set('min', from_picker.get('select'))    
	    }
	    else if ( 'clear' in event ) {
	      to_picker.set('min', false)
	    }
	  })
	  to_picker.on('set', function(event) {
	    if ( event.select ) {
	      from_picker.set('max', to_picker.get('select'))
	    }
	    else if ( 'clear' in event ) {
	      from_picker.set('max', false)
	    }
	  })

	});

/* --------------------------------------------------
	Form Steps
-------------------------------------------------- */

$(document).ready(function(){


	$('#form-page').show();	
	$('#thankyou-page').hide();

	
	
	
	var api_baseurl = "https://dev-api.trueprotection.co.th/api/agency";
	var current_fs, next_fs, previous_fs; 
	var opacity;
	var current = 1;
	var steps = $("fieldset").length;
	
	setProgressBar(current);
	
	$(".next").click(function(){
	
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		current_fs_id = current_fs.attr('id');
		
		//console.log(current_fs_id)
	
		//show the next fieldset
		let allAreFilled = true;
		  document.getElementById(current_fs_id).querySelectorAll("[required]").forEach(function(i) {
			if (!allAreFilled) return;
			if (i.type === "radio") {
			  let radioValueCheck = false;
				document.getElementById(current_fs_id).querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
				if (r.checked) radioValueCheck = true;
			  })
			  allAreFilled = radioValueCheck;
			  return;
			}
			if (!i.value) { allAreFilled = false;  return; }
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
		  else{
			  //Add Class Active
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			
			  //hide the current fieldset with style
			current_fs.animate({opacity: 0}, {
			step: function(now) {
				
			// for making fielset appear animation
			opacity = 1 - now;
			
			current_fs.css({
			'display': 'none',
			'position': 'relative'
			});
			next_fs.css({'opacity': opacity});
			},
			duration: 500
			});
			setProgressBar(++current);
			  next_fs.show();
		  }
		
		
	});
	
	$(".previous").click(function(){
		
	$('.otp-msg-wrapper').hide();
	$("#agree").prop("checked", false);
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//Remove class active
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show();
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;
	
	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	previous_fs.css({'opacity': opacity});
	},
	duration: 500
	});
	setProgressBar(--current);
	});
	
	function setProgressBar(curStep){
	var percent = parseFloat(100 / steps) * curStep;
	percent = percent.toFixed();
	$(".progress-bar")
	.css("width",percent+"%")
	}
		$("#submit").click(function(){
			
			$('#form-page').hide();	
			$('#thankyou-page').show();
		
			if ($('input#agree').is(':checked')) {
		
				event.preventDefault();
				
				var params = $("#msform").serialize();
		
				grecaptcha.ready(function() {
					grecaptcha.execute('6LfhavcfAAAAAPwnS_gs7WozP6OyqdNWKnC5vx_3', {action: 'post'}).then(function(token) {
						$('#msform').prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');
						
							$.ajaxSetup({
								headers: { 'X-Language': 'th_TH', 'Accept-Language': 'th_TH' }
							});
							$.post(api_baseurl + "/auth/register", params, function(result) {
								   
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
	
	
	$("#next_step_1").click(function(){
		var type_val = $('input[name="type"]:checked').val();
		if (type_val == 'Freelancer') {
			$('#slide2_title').text("Freelancer Information");
			$('#slide2_description').text("We need to know your more about you, please fill the fields below.");
			$('#name_en').text("Your Name (English)");
			$('#name_local').text("Your Name (Thai)");
			$('#tax_id').text("ID Card Number");
			$('.company_type').hide();
		}
		else{
			$('#slide2_title').text("Company's Information");
			$('#slide2_description').text("We need to know your more about your company, please fill the fields below.");
			$('#name_en').text("Company Name (English)");
			$('#name_local').text("Company Name (Thai)");
			$('#tax_id').text("Company Registration Number");
			$('.company_type').show();
		}
	});
	
	$(document).ready(function () {
	  var input = document.querySelector("#f_phone_number");
	  window.intlTelInput(input, ({
		preferredCountries: ["th"],
		separateDialCode: true,
		autoPlaceholder: false,
		autoHideDialCode: true,
		utilsScript: "https://dev.trueprotection.co.th/wp-content/themes/picostrap5-child-base/custom/intlTelInput/utils.js",
	  }));
	  var country_code = $('.f-phone .iti__selected-dial-code').text();
	  $("#country_code_company_phone").val(country_code);
	  input.addEventListener("countrychange",function() {
		var country_code = $('.f-phone .iti__selected-dial-code').text();
		$("#country_code_company_phone").val(country_code);
	  });
	});
	
	//Phone format
	$(document).ready(function(){
		$("input[name='phone_number']").keyup(function() {
			$(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d+)$/, "$1 $2 $3"));
		});
	});



	/* --------------------------------------------------
		CuteSelect
	-------------------------------------------------- */

(function() {

	var CuteSelect = CuteSelect || {};
  
	FIRSTLOAD = true;
	SOMETHINGOPEN = false;
  
	CuteSelect.tools = {
	  canRun: function() {
		var myNav = navigator.userAgent.toLowerCase();
		var browser = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		if(browser) {
		  return (browser > 8) ? true : false;
		} else { return true; }
	  },
	  uniqid: function() {
		var n= Math.floor(Math.random()*11);
		var k = Math.floor(Math.random()* 1000000);
		var m = String.fromCharCode(n)+k;
		return m;
	  },
	  hideEverything: function() {
		if(SOMETHINGOPEN) {
		  SOMETHINGOPEN = false;
		  targetThis = false;
		  var cells = document.getElementsByTagName('div');
		  for (var i = 0; i < cells.length; i++) {
			if(cells[i].hasAttribute('data-cuteselect-options')) { 
			  var parent = cells[i].parentNode;
			  cells[i].style.opacity = '0';
			  cells[i].style.display = 'none';
			}
		  }
		}
	  },
	  getStyle: function() {
		var css = '';
		var stylesheets = document.styleSheets;
		var css = '';
		for(s = 0; s < stylesheets.length; s++) {
		  var classes = stylesheets[s].rules || stylesheets[s].cssRules;
		  for (var x = 0; x < classes.length; x++) {
			if(classes[x].selectorText != undefined) {
			  var selectPosition = classes[x].selectorText.indexOf('select');
			  var optionPosition = classes[x].selectorText.indexOf('option');
			  var selectChar = classes[x].selectorText.charAt(selectPosition - 1);
			  var optionChar = classes[x].selectorText.charAt(optionPosition - 1);
			  if(selectPosition >= 0 && optionPosition >= 0 && (selectChar == '' || selectChar == '}' || selectChar == ' ') && (optionChar == '' || optionChar == '}' || optionChar == ' ')) {
				text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
				css += text.replace(/\boption\b/g, '[data-cuteselect-value]').replace(/\bselect\b/g, '[data-cuteselect-item]');
				continue;
			  }
			  if(selectPosition >= 0) {
				var character = classes[x].selectorText.charAt(selectPosition - 1);
				if(character == '' || character == '}' || character == ' ') {
				  text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
				  css += text.replace(/\bselect\b/g, '[data-cuteselect-item]');
				}
			  }
			  if(optionPosition >= 0) {
				var character = classes[x].selectorText.charAt(optionPosition - 1);
				if(character == '' || character == '}' || character == ' ') {
				  text = (classes[x].cssText) ? classes[x].cssText : classes[x].style.cssText;
				  css += text.replace(/\boption\b/g, '[data-cuteselect-value]');
				}
			  }
			}
		  }
		}
  
		return css;
	  },
	  createSelect: function(item) {
  
		// Create custom select
		var node = document.createElement("div");
		if(item.hasAttribute('id')) { // Catch ID
		  node.setAttribute('id', item.getAttribute('id')); 
		  item.removeAttribute('id');
		}
		if(item.hasAttribute('class')) { // Catch Class
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
		  if(cells[i].hasAttribute('selected')) {
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
		  if(cells[i].hasAttribute('disabled')) { continue; }
		  if(cells[i].hasAttribute('class')) { var optionStyle = ' class="' + cells[i].getAttribute('class') + '"'; } else { var optionStyle = ''; }
		  if(cells[i].hasAttribute('id')) { var optionId = ' id="' + cells[i].getAttribute('id') + '"'; } else { var optionId = ''; }
		  if(cells[i].hasAttribute('selected')) { options += '<div data-cuteselect-value="' + cells[i].value + '" data-cuteselect-selected="true"' + optionStyle + optionId + '>' + cells[i].innerHTML + '</div>'; }
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
	  show: function(item) {
		if(item.parentNode.hasAttribute('data-cuteselect-item')) { var source = item.parentNode.getAttribute('data-cuteselect-item'); }
		else { var source = item.getAttribute('data-cuteselect-item'); }
		var cells = document.getElementsByTagName('select');
		if(item.hasAttribute('data-cuteselect-title')) { 
		  item = item.parentNode;
		  var cells = item.getElementsByTagName('div');  
		}
		else { var cells = item.getElementsByTagName('div');  }
		for (var i = 0; i < cells.length; i++) {
		  if(cells[i].hasAttribute('data-cuteselect-options')) {
			targetItem = cells[i];
			cells[i].style.display = 'block';
			setTimeout(function() { targetItem.style.opacity = '1'; }, 10);
			cells[i].style.position = 'absolute';
			cells[i].style.left = item.offsetLeft + 'px';
			cells[i].style.top = (item.offsetTop + item.offsetHeight) + 'px';
		  }
		}
  
		item.focus();
  
		SOMETHINGOPEN = item.getAttribute('data-cuteselect-item');
	  },
	  selectOption: function(item) {
		var label = item.innerHTML;
		var value = item.getAttribute('data-cuteselect-value');
		var parent = item.parentNode.parentNode.parentNode;
		var target = parent.getAttribute('data-cuteselect-item');
		var cells = parent.getElementsByTagName('div');
		for (var i = 0; i < cells.length; i++) {
		  if(cells[i].hasAttribute('data-cuteselect-title')) { cells[i].innerHTML = label; }
		}
  
		// Real select
		var cells = document.getElementsByTagName('select');
		for (var i = 0; i < cells.length; i++) {
		  var source = cells[i].getAttribute('data-cuteselect-target');
		  if(source == target) { cells[i].value = value; }
		}
		CuteSelect.tools.hideEverything();
	  },
	  writeStyles: function() {
		toWrite = '<style type="text/css">' + CuteSelect.tools.getStyle() + ' [data-cuteselect-options] { opacity: 0; display: none; }</style>';
		document.write(toWrite);
	  }
	};
  
	CuteSelect.event = {
	  parse: function() {
		var cells = document.getElementsByTagName('select'); 
		for (var i = 0; i < cells.length; i++) { CuteSelect.tools.createSelect(cells[i]); }
	  },
	  listen: function() {
		document.onkeydown = function(evt) {
		  evt = evt || window.event;
		  if (evt.keyCode == 27) { CuteSelect.tools.hideEverything(); }
		};
		document.onclick = function(event) {
		  FIRSTLOAD = false; 
		  if((!event.target.getAttribute('data-cuteselect-item') && !event.target.getAttribute('data-cuteselect-value') && !event.target.hasAttribute('data-cuteselect-title')) || ((event.target.hasAttribute('data-cuteselect-item') || event.target.hasAttribute('data-cuteselect-title')) && SOMETHINGOPEN)) { 
			CuteSelect.tools.hideEverything();
			return; 
		  }
		  var action = event.target;
		  if(event.target.getAttribute('data-cuteselect-value')) {
			CuteSelect.tools.selectOption(action);
			CuteSelect.tools.hideEverything();
		  } 
		  else { CuteSelect.tools.show(action); }
		  return false;
		}
	  },
	  manage: function() {
		if(CuteSelect.tools.canRun()) { // IE Compatibility
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
	  if ( submit.classList.contains("hidden")) {
		  submit.classList.remove("hidden");
		  submit.classList.add("show");
		  $('#submit').prop('disabled', false);
	  }
  }
  
  function checkSubmit() {
	  var submit = document.getElementById("btn-submit");
	  if ( submit.classList.contains("show")) {
		  document.getElementById("submit").disabled = false;
	  }
	  else{
		  document.getElementById("submit").disabled = true;
	  }
  }
	
	
	/* --------------------------------------------------
		Auto fields
	-------------------------------------------------- */
	
	$(document).ready(function(){
		
		$("#district div[data-cuteselect-title]").text('-- Select --');
		$("#subdistrict div[data-cuteselect-title]").text('-- Select --');
		
		function GetSortOrder(prop) {    
			return function(a, b) {    
				if (a[prop] > b[prop]) {    
					return 1;    
				} else if (a[prop] < b[prop]) {    
					return -1;    
				}   
				return 0;    
			}    
		}
		
		$.getJSON("assets/js/country/provinces.json", function(data){
		  var province_arr;
		  var num_rows = 0;
		  data.sort(GetSortOrder("name_en"));
		  for(province_arr in data) {
			if (data.hasOwnProperty(province_arr)) {
				
				$('#province div[data-cuteselect-options-container]').append( '<div data-id="'+ data[num_rows].id +'" data-cuteselect-value="'+ data[num_rows].name_en +'"> '+ data[num_rows].name_en +' </div>' );
				
			}
			num_rows++;
		  }
		  
	  
		}).fail(function(){
			console.log("An error has occurred.");
		});
		
		$('#province').click(function(e) {
			
			$("#district div[data-cuteselect-options-container] div").remove();
			
			$("#district div[data-cuteselect-title]").text('-- Select --');
			
			$('#zip_code').val('');
			
			var province_id = e.target.getAttribute('data-id');
			
			$.getJSON("assets/js/country/districts.json", function(data){
			var districts_arr;
			var num_rows = 0;
			data.sort(GetSortOrder("name_en"));
			for(districts_arr in data) {
				if (data.hasOwnProperty(districts_arr)) {
					if (data[num_rows].province_id == province_id) {
						$('#district div[data-cuteselect-options-container]').append( '<div data-id="'+ data[num_rows].id +'" data-cuteselect-value="'+ data[num_rows].name_en +'"> '+ data[num_rows].name_en +' </div>' );
					}
				}
				num_rows++;
			}
			}).fail(function(){
				console.log("An error has occurred.");
			});
		});
		
	  
	
		$('#district').click(function(e) {
	
			//$("#subdistrict div[data-cuteselect-options-container] div").remove();
			//$("#subdistrict div[data-cuteselect-title]").text('-- Select --');
	
			var amphure_id = e.target.getAttribute('data-id');
			 $('#zip_code').val('');
			
			$.getJSON("assets/js/country/subdistricts.json", function(data){
			var districts_arr;
			var num_rows = 0;
			
			for(districts_arr in data) {
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
	
			}).fail(function(){
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
	
	
	$(document).ready(function(){
		
		// GET Country
		$("#country div[data-cuteselect-title]").text('Thailand');
		$('.foreign-address').hide();
		$('.local-address').show();
		$.getJSON("assets/js/country/countries.json", function(data){
		  for (var i=0; i < data.length; i++) {
			if (data[i].name == 'Thailand') {
				  $('#country div[data-cuteselect-options-container]').append( '<div data-id="'+ data[i].id +'" data-cuteselect-value="'+ data[i].name +'" style="border-bottom: solid 1px #cde4f6 !important;"> '+ data[i].name +' </div>' );
			  }
		  }
		  for (var j=0; j < data.length; j++) {
			if (data[j].name != 'Thailand') {
				  $('#country div[data-cuteselect-options-container]').append( '<div data-id="'+ data[j].id +'" data-cuteselect-value="'+ data[j].name +'"> '+ data[j].name +' </div>' );
			  }
		  }
		}).fail(function(){
			console.log("An error has occurred.");
		});
		
		 
		$('#country').click(function(e) {
			
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
			$.getJSON("https://dev.trueprotection.co.th/register/js/json/states.json", function(data){
			var state_arr;
			var num_rows = 0; 
			$('#zip_code').val('');
			 
			for(state_arr in data) {
				
				if (data.hasOwnProperty(state_arr)) {
					if (data[num_rows].country_id == country_id) {
						$('#state div[data-cuteselect-options-container]').append( '<div data-id="'+ data[num_rows].id +'" data-cuteselect-value="'+ data[num_rows].name +'"> '+ data[num_rows].name +' </div>' );
					}
				}
				if (state_arr.length == num_rows) {
					$("#state div[data-cuteselect-title]").text('-- Select --');
				}
				num_rows++;
			}
			}).fail(function(){
				console.log("An error has occurred.");
			});
		});
		
		$('#state').click(function(e) {
			
			$("#city div[data-cuteselect-options-container] div").remove();
			$("#city div[data-cuteselect-title]").text('-- Select --');
			
			var state_id = e.target.getAttribute('data-id');
			$("#city div[data-cuteselect-title]").text('Loading..');
			
			$.getJSON("https://dev.trueprotection.co.th/register/js/json/cities.json", function(data){
				
				var city_arr;
				var num_rows = 0;
				
				for(city_arr in data) {
					
					
					if (data.hasOwnProperty(city_arr)) {
						if (data[num_rows].state_id == state_id) {
							$('#city div[data-cuteselect-options-container]').append( '<div data-id="'+ data[num_rows].id +'" data-cuteselect-value="'+ data[num_rows].name +'"> '+ data[num_rows].name +' </div>' );
						}
					}
					if (city_arr.length == num_rows) {
						$("#city div[data-cuteselect-title]").text('-- Select --');
					}
					num_rows++;
				}
				
				
			}).fail(function(){
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
		  stronger: (params, value)=>{
			return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value) || "A Strong Password Required"
		  },
		  numonly: (params, value)=>{
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
	  else{
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
		  }else {
			if(event.key == 'Backspace'){
				$(this).prev().focus();
			}
		  }
		
		});
		
		$('.verification-code input').on("paste",function(event,pastedValue){
		  console.log(event)
		  $('#txt').val($content)
		  console.log($content)
		});
		
		$editor.on('paste, keydown', function() {http:
		var $self = $(this);            
				  setTimeout(function(){ 
					var $content = $self.html();             
					$clipboard.val($content);
				},100);
		});
		 
	});
	
	$(document).ready(function(){
		
		$("input.only_number").keypress(function(event) {
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
		
	  if (!input){
		  return false;
	  }
	  else{
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