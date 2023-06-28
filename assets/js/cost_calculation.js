function check_fill(t) {
    $(".chk-grp").val(""), $(".chk-grp").attr("disabled", !0), $(".chk-grp").hide(), $(".txt_option").hide(), "checkbox_fill_one" == t.id && t.checked ? ($(".txt_option1").show(), $(".chk-grp1").show(), $(".chk-grp1").attr("disabled", !1), $("#checkbox_fill_two").attr("checked", !1), $("#checkbox_fill_three").attr("checked", !1)) : "checkbox_fill_two" == t.id && t.checked ? ($(".txt_option2").show(), $(".chk-grp2").show(), $(".chk-grp2").attr("disabled", !1), $("#checkbox_fill_one").attr("checked", !1), $("#checkbox_fill_three").attr("checked", !1), $("#radio_gp").prop("checked", !1)) : "checkbox_fill_three" == t.id && t.checked && ($(".txt_option3").show(), $(".chk-grp3").show(), $(".chk-grp3").attr("disabled", !1), $("#checkbox_fill_one").attr("checked", !1), $("#checkbox_fill_two").attr("checked", !1), $("#radio_gp").prop("checked", !1))
}
function hideShowFields(t) {
        $(".chk-grp").val(""), $(".chk-grp").attr("disabled", !0), $(".chk-grp").hide(), $(".txt_option").hide(), "checkbox_fill_one" == t.id && t.checked ? ($(".txt_option1").show(), $(".chk-grp1").show(), $(".chk-grp1").attr("disabled", !1), $("#checkbox_fill_two").attr("checked", !1), $("#checkbox_fill_three").attr("checked", !1)) : "checkbox_fill_two" == t.id && t.checked ? ($(".txt_option2").show(), $(".chk-grp2").show(), $(".chk-grp2").attr("disabled", !1), $("#checkbox_fill_one").attr("checked", !1), $("#checkbox_fill_three").attr("checked", !1), $("#radio_gp").prop("checked", !1)) : "checkbox_fill_three" == t.id && t.checked && ($(".txt_option3").show(), $(".chk-grp3").show(), $(".chk-grp3").attr("disabled", !1), $("#checkbox_fill_one").attr("checked", !1), $("#checkbox_fill_two").attr("checked", !1), $("#radio_gp").prop("checked", !1))
}
function calculateData(){
    //calculation
     const totDaysMonth =  25;
     const eleGenPerDay = 3.7;
     const plantCost = 60000;
     const eleGenYear1Kw = 1250;
     const co2emisYear = 3000;
     const tree25YearKw = 38;
     //var
     var avgEleCost, plantSizeKW;
     var totEleGenYear,totEleGen25Year;
     var tarrifMonth,tarrifYear,tarrif25Years;
     var co2emisRed25Year;
     var totTreePlant;
     //condetional statmant for radio buttons 
     if($('#checkbox_fill_one').is(':checked')){
         if($('#sq_m_rad_btn').is(':checked')){
             plantSizeKW = ($('#roof_area_txt').val())/10;
         }else if($('#sq_f_rad_btn').is(':checked')){
             plantSizeKW = ($('#roof_area_txt').val())/100;
         }
     }else{
         plantSizeKW = $('#capacity_txt').val();
     }
     //calculation for cost 
     avgEleCost = $('#electricity_txt').val();
     totEleGenYear = plantSizeKW * eleGenYear1Kw;
     totEleGen25Year = totEleGenYear * 25;
     tarrifMonth = avgEleCost*eleGenPerDay*totDaysMonth;
     tarrifYear = tarrifMonth * 12;
     tarrif25Years = tarrifYear * 25;
     co2emisRed25Year = plantSizeKW * co2emisYear * 25;
     totTreePlant = tree25YearKw * plantSizeKW;
       //print data on popup form 
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
     $("#output_co2").text(Math.round( co2emisRed25Year));
     }
 
    
     function validate() {
        var isCheckedOne = $('#checkbox_fill_one').prop('checked');
        var isCheckedTwo = $('#checkbox_fill_one').prop('checked');
        
        if(isCheckedOne) {
            $('#errorValidation').text('')
            calculateData();
        } else if (isCheckedTwo) {
            $('#errorValidation').text('')
            calculateData();
        } else {
            $('#errorValidation').text('Required.')
    
        }
    }
  
    $(document).ready(function()
    {   //on submit button popup
      $('#frm').on('submit', function(e){
        
        $('#calculator_modal').modal('show');
        e.preventDefault();
    
      });

});
    

// 