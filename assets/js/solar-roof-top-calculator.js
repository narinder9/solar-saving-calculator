function hideShowFields(t) {
    $(".chk-grp").val("").attr("disabled", true).hide();
    $(".txt_option").hide();
    var panel_based_on=$('#calculation_type').val();
    if (panel_based_on === "total_roof_area" && panel_based_on) {
        $(".txt_option1").show();
        $(".roof_area_type").show().attr("disabled", false);
        // $("#panel_capacity").prop("checked", false);
    } else if (panel_based_on === "panel_capacity" && panel_based_on) {
        $(".txt_option2").show();
        $(".kw_capacity").show().attr("disabled", false);
        // $("#total_roof_area, #roof_area_type").prop("checked", false);
    }
 
}

function calculateData() {
    // $('#calculator_modal').modal('show');
    $("#model_container").css("display","block");
    $("#calculator_modal").css("display","block");
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
    
    var state_val =$('#state').val();
    var irradiation_val='';
    if(state_val == 'JK')
    {
        irradiation_val ="is 1738  W / sq.m";
    }
    
    else if(state_val == 'PB')
    {
        irradiation_val ="is 1702  W / sq.m";
    }
    else if(state_val == 'HR')
    {
        irradiation_val ="is 1702  W / sq.m";
    }
    else if(state_val =='UK')
    {
        irradiation_val ="is 1738  W / sq.m";
    } 
    $("#state_irradiation").text(irradiation_val);
    $("#output_state").text($('#state option:selected').text());
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

$(document).ready(function() {

    
const roof_area_select = function(target){
    const panel_based_on = $('#calculation_type').find(":selected").val();
    
    console.log("a ="+panel_based_on);
    if (panel_based_on == "total_roof_area"){
       return true;
    } 

    return false;
}
const panel_capacity_select = function(target){
    const panel_based_on = $('#calculation_type').find(":selected").val();
    console.log("a ="+panel_based_on);
    if (panel_based_on == "panel_capacity" ){
       return true;
    } 

    return false;
}

    jQuery("#frm").validate({
     
        rules: {
            calculation_type:
            {
                required:true,
            },
            roof_area_txt:{
                required:true,
            //     required:function(element) {
            //         return $('#calculation_type').find(":selected").val() == 'total_roof_area';
            //   },
                number: true,
                depends:roof_area_select(),
            } ,
            capacity_txt: 
            {
                required:true,
            //     required:function(element) {
            //         return $('#calculation_type').find(":selected").val() == 'panel_capacity';
            //   },
                number: true,
                depends:panel_capacity_select(),
            },
            electricity_txt: {
               required: true,
               number: true
           },
        },
        messages: {
            roof_area_txt:
            {
                required:'Please enter valid value'
            },
            capacity_txt: {
                required:'Please enter valid value'
            }, 
            electricity_txt:{
                required:'Please enter valid value'
            } 
         },
        //  errorElement : 'label',
        //  errorLabelContainer: '.errorTxt',
        
         submitHandler: function(form) {
            calculateData();
         }
     });
    
     $(".cancel").click(function(){
        $("#model_container").fadeOut();
        $("#calculator_modal").fadeOut();
    });

});
