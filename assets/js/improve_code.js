function hideShowFields(t) {
    // $(".chk-grp").val("").attr("disabled", true).hide();
    $(".txt_option").hide();
    var panel_based_on=$('#calculation_type').val();
    if (panel_based_on === "total_roof_area" && panel_based_on) {
        $(".txt_option1").show();
        $(".roof_area_type").show().attr("disabled", false);
        $("#panel_capacity").prop("checked", false);
    } else if (panel_based_on === "panel_capacity" && panel_based_on) {
        $(".txt_option2").show();
        $(".kw_capacity").show().attr("disabled", false);
        $("#total_roof_area, #roof_area_type").prop("checked", false);
    }
    console.log($('#calculation_type').val());
}

function calculateData() {
    $('#calculator_modal').modal('show');
    const totDaysMonth = 25;
    const eleGenPerDay = 3.7;
    const plantCost = 60000;
    const eleGenYear1Kw = 1250;
    const co2emisYear = 3000;
    const tree25YearKw = 38;
    
    var avgEleCost, plantSizeKW;
    var totEleGenYear, totEleGen25Year;
    var tarrifMonth, tarrifYear, tarrif25Years;
    var co2emisRed25Year;
    var totTreePlant;
    

    if ($('#total_roof_area').is(':checked')) {
        if ($('#sq_m_rad_btn').is(':checked')) {
            plantSizeKW = $('#roof_area_txt').val() / 10;
        } else if ($('#sq_f_rad_btn').is(':checked')) {
            plantSizeKW = $('#roof_area_txt').val() / 100;
        }
    } else {
        plantSizeKW = $('#capacity_txt').val();
    }
    
    avgEleCost = $('#electricity_txt').val();
    totEleGenYear = plantSizeKW * eleGenYear1Kw;
    totEleGen25Year = totEleGenYear * 25;
    tarrifMonth = avgEleCost * eleGenPerDay * totDaysMonth;
    tarrifYear = tarrifMonth * 12;
    tarrif25Years = tarrifYear * 25;
    co2emisRed25Year = plantSizeKW * co2emisYear * 25;
    totTreePlant = tree25YearKw * plantSizeKW;
    
    $("#output_state").text($('#state').val());
    $("#output_size span").text(plantSizeKW);
    $("#bench_cost").text(plantCost);
    $("#output_electricity_annual").text(Math.round(totEleGenYear));
    $("#output_electricity_lifetime").text(Math.round(totEleGen25Year));
    $("#output_saving_monthly").text(Math.round(tarrifMonth));
    $("#output_saving_annually").text(Math.round(tarrifYear));
    $("#output_saving_lifetime").text(Math.round(tarrif25Years));
    $("#output_generate").text(eleGenPerDay);
    $("#output_tree").text(Math.round(totTreePlant));
    $("#output_co2").text(Math.round(co2emisRed25Year));
}

// function validate() {
//     var isCheckedOne = $('#total_roof_area').prop('checked');
//     var isCheckedTwo = $('#panel_capacity').prop('checked');
    
//     if (isCheckedOne || isCheckedTwo) {
//         $('#errorValidation').text('');
//         calculateData();
//     } else {
//         $('#errorValidation').text('Required.');
//     }
// }

$(document).ready(function() {

    jQuery("#frm").validate({
        // errorElement: 'span',
        // errorClass: 'error_msg',
        // errorContainer: "error_msg",
        // errorPlacement: function(){
        //     return false;  // suppresses error message text
        // },
        rules: {
            roof_area_txt:{
                required:'#total_roof_area:checked',
                number: true
            } ,
            capacity_txt: 
            {
                required:'#panel_capacity:checked',
                number: true
            },
            electricity_txt: {
               required: true,
               number: true
           },
        },
        messages: {
            roof_area_txt: 'Please Enter Numeric Value',
            capacity_txt: 'Please Enter Numeric Value',
            electricity_txt: 'Please Enter Numeric Value',
         },
         highlight: function(element) {
            $(element).parent().addClass('has-error');
          },
          unhighlight: function(element) {
            $(element).parent().removeClass('has-error');
          },
        //   errorElement: 'span',
        //   errorClass: 'validation-error-message help-block form-helper bold',
        //   errorPlacement: function(error, element) {
        //     if (element.parent('.input-group').length) {
        //       error.insertAfter(element.parent());
        //     } else {
        //       error.insertAfter(element);
        //     }
        //   },
         submitHandler: function(form) {
            calculateData();
         }
     });
     
    // $('#roof_area_txt').keyup(function () { 
    //     this.value = this.value.replace(/[^0-9\.]/g,'');
    // });
  
    // $('#capacity_txt').keyup(function () { 
    //     this.value = this.value.replace(/[^0-9\.]/g,'');
    // });
    // $('#electricity_txt').keyup(function () { 
    //     this.value = this.value.replace(/[^0-9\.]/g,'');
    // });

    // roof_area_error
    // kw_capacity_error
    // electricity_unit_error

    // $('.numericval').on('input', function (event) { 
    //     // this.value = this.value.replace(/[^0-9\.]/g, '');
    //     if(!this.value.match(/[^0-9\.]/g))
    //     {

        
    //     if(event.id=='#roof_area_txt')
    //     {
    //         // $("#roof_area_error").style="display:block";
    //         $("#roof_area_error").attr("style", "display:block")
    //     }
         
    //      if(event.id=='#roof_area_txt')
    //      {
    //         $("#kw_capacity_error").show();
    //      }
    //      if(event.id=='#electricity_txt')
    //      {
    //         $("#electricity_unit_error").show();
    //      }
    //     }
    // });
    // $('#frm').on('submit', function(e) {
    //     e.preventDefault();
    //     // $('#calculator_modal').modal('show');
    //     var roof_area_value = $('#roof_area_txt').val();
    //     var size_capacity = $('#capacity_txt').val();
    //     var price_unit = $('#electricity_txt').val();
    //     console.log(roof_area_value);
    //     console.log(size_capacity);
    //     console.log(price_unit);
    //     var numeric_reg=(/[^0-9\.]/g);
    //     var flag=true;
    //     if(roof_area_value && numeric_reg.test(roof_area_value)=== false)
    //     {
    //         // $(".roof_area_error").show();
    //     console.log(1);
    //         // $(".roof_area_error").attr("style", "display:block");
    //         // $(".roof_area_error").css("display", "block");
    //        document.getElementsByClassName("roof_area_error")[0].style.display = "none";
    
    //         flag= false;
    //     }
        // else if(size_capacity && numeric_reg.test(size_capacity)=== false)
        // {
        //     console.log(2);
        //     // $(".kw_capacity_error").show();
        //     // $(".kw_capacity_error").attr("style", "display:block");
        //     document.getElementsByClassName("kw_capacity_error")[0].style.display = "none";
        //     flag= false;
        // }
    //     else if(numeric_reg.test(price_unit)=== false)
    //     {
    //         console.log(3);
    //         // $(".electricity_unit_error").show();
    //         // $(".electricity_unit_error").attr("style", "display:block");
    //         document.getElementsByClassName("electricity_unit_error")[0].style.display = "none";
    //         flag= false;
    //     }
      
    //     return  flag;
    // });

    
});
