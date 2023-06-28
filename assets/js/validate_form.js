function hideShowFields(t) {
    $(".chk-grp").val("").attr("disabled", true).hide();
    $(".txt_option").hide();
    
    if (t.id === "total_roof_area" && t.checked) {
        $(".txt_option1").show();
        $(".roof_area_type").show().attr("disabled", false);
        $("#panel_capacity").prop("checked", false);
    } else if (t.id === "panel_capacity" && t.checked) {
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
  
$(document).ready(function() {
    // Form validation logic
    $("#frm").submit(function(event) {
      // Prevent form submission
      event.preventDefault();
  
      // Reset any previous error messages
      $(".error").hide();
  
      // Validate form fields
      var valid = true;
  
      // Check if calculation type is selected
      var calculationType = $("input[name='calculation_type']:checked").val();
      if (!calculationType) {
        valid = false;
        $("#calculation_type-error").show();
      }
  
      // Check if roof area or panel capacity is filled based on calculation type
      if (calculationType == 1) {
        var roofArea = $("#roof_area_txt").val();
        if (!roofArea || isNaN(roofArea)) {
          valid = false;
          $("#roof_area_txt-error").show();
        }
      } else if (calculationType == 2) {
        var panelCapacity = $("#capacity_txt").val();
        if (!panelCapacity || isNaN(panelCapacity)) {
          valid = false;
          $("#capacity_txt-error").show();
        }
      }
  
      // Check if state is selected
      var state = $("#state").val();
      if (!state) {
        valid = false;
        $("#state-error").show();
      }
  
      // Check if electricity cost is filled and is a valid number
      var electricityCost = $("#electricity_txt").val();
      if (!electricityCost || isNaN(electricityCost)) {
        valid = false;
        $("#electricity_txt-error").show();
      }
  
      // If all fields are valid, submit the form
      if (valid) {
        this.submit();
      }
    });
  });
  