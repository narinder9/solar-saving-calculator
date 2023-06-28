function hideShowFields(t) {
    $(".chk-grp").val("").attr("disabled", true).hide();
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
    
    var panel_based_on=$('#calculation_type').val();
    if (panel_based_on === "total_roof_area" && panel_based_on) {
    

    
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

const check_roof_select = function(target){
    const panel_based_on = $('#calculation_type').val();
    if (panel_based_on === "total_roof_area" || panel_based_on === "panel_capacity" ){
       return true;
    } 

    return false;
}

$(document).ready(function() {

    jQuery("#frm").validate({
     
        rules: {
            roof_area_txt:{
                required:true,
                number: true,
                depends:check_roof_select(),
               
                
            } ,
            capacity_txt: 
            {
               
                required:true,
                number: true,
                depends:check_roof_select(),
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
         errorElement : 'label',
         errorLabelContainer: '.errorTxt',
        //  errorPlacement: function(error, element) {
        //  },
         submitHandler: function(form) {
            calculateData();
         }
     });
    
});
