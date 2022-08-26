
$.fn.validateMini = function(options = {}){
    
    let inputs  = this.find('[validates]');
    let useKeyup = true;
    let useFocus = true;
    let useBlur  = true;

    if(options.useKeyup)
        useKeyup = useKeyup;
    if(options.useFocus)
        useFocus = useFocus;
    if(options.useBlur)
        useBlur = useBlur;

    this.submit(function(){

        let flag    = true;

        for(let i=0; i< inputs.length; i++){
            let input       = $(inputs[i]);
            let validates   = input.attr('validates'); 
            let value       = input.val();
            let result      = doValidate(validates, value);
            makeDom(input, result);
            if(result !== true)
                flag = false;
        }
        return flag;

    });

    if(useKeyup)
    inputs.keyup(e=> {
        let input       = $(e.target);
        let validates   = input.attr('validates'); 
        let value       = input.val();
        let result      = doValidate(validates, value);
        makeDom(input, result);
    });
    
    if(useBlur)
    inputs.blur(e=> {
        let input       = $(e.target);
        let validates   = input.attr('validates'); 
        let value       = input.val();
        let result      = doValidate(validates, value);
        makeDom(input, result);
    });
    
    if(useFocus)
    inputs.focus(e=> {
        let input = $(e.target);
        makeDom(input,-1);
    });


    let baseValidates = {
        required: (params, value)=> { 
            return value != "" || `Please enter correct information!`
        },
        email: (params, value)=> {
            return /\S+@\S+\.\S+/.test(value) || `Please enter correct information!`; //value is not an email
        },
        between: (params, value)=>{ 
            let min = params[0], max = params[1];
            let len = value.length; 
            return min <= len && len <= max || `Value required form ${min} to ${max} character!`
        },
        min: (params, value)=> { 
            let min = params[0];
            return min <= value.length || `Value smaller ${min} character!` 
        },
        max: (params, value)=> { 
            let max = params[0];
            return max >= value.length || `Value bigger ${max} character!`
        },
        numeric: (params, value)=> {
            return !isNaN(value) || `value is not a number!`;
        },
        num_min: (params, value)=> { 
            let min = params[0];
            return min <= parseInt(value) || `Value bigger ${min} required!` 
        },
        num_max: (params, value)=> {
            let max = params[0]; 
            return max >= parseInt(value) || `Value smaller ${max} required!`
        },
        num_between: (params, value)=> { 
            let min = params[0], max = params[1];
            value = parseInt(value);
            return min <= value && value <= max || `Value bigger ${min} and smaller ${max} required!`
        },
        same: (params, value)=>{
            let other = $('#'+ params[0]).val();
            return other === value || `Value not match ${params[0]}`
        },
    };

    let validateOptions = {...baseValidates, ...options.validates};

    function doValidate(strValidates = null, value = null){
        if(!strValidates)
            return true;

        valids = strValidates.split('|');

        for(i = 0; i < valids.length; i++){
            let valid       = valids[i];
            let subvalids   = valid.split(':') || null;
            if(!validateOptions[subvalids[0]])
                continue;
            let params = subvalids[1]? subvalids[1].split(','): null;
            let r = validateOptions[subvalids[0]](params, value);
            if (r !== true)
                return r;
        }

        return true;
    }

    function makeDom(input, result){
        
        let parent = input.parent();
        let txtError = parent.find('div.error-text');
        if(txtError.length === 0)
            txtError = $(`<div class="error-text">${result}</div>`);
        txtError.html(result);

        if(result === true){
            input.removeClass('valid-error');
            input.addClass('valid-pass');
            txtError.remove();
        }
        else if(result === -1){
            input.removeClass('valid-pass');
            input.removeClass('valid-error');
            txtError.remove();
        }else{
            input.removeClass('valid-pass');
            input.addClass('valid-error');
            parent.append(txtError[0]);
        }
    }
}


/* --------------------------------------------------
	Auto fields
-------------------------------------------------- */

// $(document).ready(function(){

//     //var default_lang = (localStorage.LanguageDefault == null) ? 'en' : localStorage.LanguageDefault;

//     $.getJSON("js/json/provinces.json", function(data){
//       var province_arr;
//       var num_rows = 0;
//       for(province_arr in data) {
//         if (data.hasOwnProperty(province_arr)) {
//             $('#province').append( '<option data-id="'+ data[num_rows].id +'" value="'+ data[num_rows].name_en +'"> '+ data[num_rows].name_en +' </option>' );
//         }
//         num_rows++;
//       }
//     }).fail(function(){
//         console.log("An error has occurred.");
//     });

//     $('#province').on('change', function(){

//         $("#district option").remove();
//         $('#zip_code').val('');

//         var province_id = $('#province').find(":selected").attr("data-id");
            
//         $('#district').append( '<option data-id="" value=" " selected> -- Select -- </option>' );

//         $.getJSON("js/json/districts.json", function(data){
//         var districts_arr;
//         var num_rows = 0;
//         for(districts_arr in data) {
//             if (data.hasOwnProperty(districts_arr)) {
//                 if (data[num_rows].province_id == province_id) {
//                     $('#district').append( '<option data-id="'+ data[num_rows].id +'" value="'+ data[num_rows].name_en +'"> '+ data[num_rows].name_en +' </option>' );     
//                 }
//             }
//             num_rows++;
//         }
//         }).fail(function(){
//             console.log("An error has occurred.");
//         });
//     });
// });
// $(document).ready(function(){
//     $('#district').on('change', function(){

//         $("#subdistrict option").remove();

//         var amphure_id = $('#district').find(":selected").attr("data-id");

//         $('#subdistrict').append( '<option data-id="" value=" " selected> -- Select -- </option>' );

//         $.getJSON("js/json/subdistricts.json", function(data){
//         var districts_arr;
//         var num_rows = 0;
//         for(districts_arr in data) {
//             if (data.hasOwnProperty(districts_arr)) {
//                 if (data[num_rows].amphure_id == amphure_id) {
//                     console.log(data[num_rows].zip_code)
//                     if (data[num_rows].zip_code != 0) {
//                         $('#zip_code').val(data[num_rows].zip_code);
//                     }
//                     $('#subdistrict').append( '<option data-id="'+ data[num_rows].id +'" value="'+ data[num_rows].name_en +'"> '+ data[num_rows].name_en +' </option>' ); 
//                 }
//             }
//             num_rows++;
//         }

//         }).fail(function(){
//             console.log("An error has occurred.");
//         });
//     });
//     $('#subdistrict').on('change', function(){
//         var amphure_id = $('#district').find(":selected").attr("data-id");
//         $.getJSON("js/json/subdistricts.json", function(data){
//         var subdistricts_arr;
//         var num_rows = 0;
//         for(subdistricts_arr in data) {
//             if (data.hasOwnProperty(subdistricts_arr)) {
//                 if (data[num_rows].amphure_id == amphure_id) {
//                     console.log(data[num_rows].zip_code)
//                     if (data[num_rows].zip_code != 0) {
//                         $('#zip_code').val(data[num_rows].zip_code);
//                     }
//                 }
//             }
//             num_rows++;
//         }

//         }).fail(function(){
//             console.log("An error has occurred.");
//         });
//     });
// });