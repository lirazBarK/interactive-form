$(document).ready(function () {
    $('#name').focus();
});

const blankNameMsg = "&#9900; Please enter a name";
const nameNotValidMsg = "&#9900; Name can only contain letters a-z";
const blankMailMsg = "&#9900; Please enter an Email address";
const mailNotValidMsg = "&#9900; Must be a valid Email address";
const activitieMsg = "&#9900; Please choose at least one Activitie";
const paymentMsg = "&#9900; Please choose a Payment Mathed";
const blankCcMsg = "&#9900; Please enter a credit card number";
const ccNotValidMsg = "&#9900; Please enter a number that is between 13 and 16 digits long"
const blankZipCodeMsg = "&#9900; Please enter a zip code";
const zipCodeNotValidMsg = "&#9900; Zip Code must be 5 digits long";
const blankCvvMsg = "&#9900; Please enter a CVV number";
const cvvNotValidMsg = "&#9900; CVV must be 3 digits long";

$('#other-title').hide();
$('#colors-js-puns').hide();
$('#payPal').hide();
$('#bitcoin').hide();

//Show 'other-title' textarea when 'other' is chosen in the 'Job Role' section
$('#title').change(function () {
    if ($('#title option:selected').val() === 'other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

/* Show specific values in the 'color' menu for each value in the 'design' options and hide 
 that menu when no design is selected*/
$('#design').change(function () {
    $('#color').children('option').hide();
    $("#color option:selected").prop('selected', false);
    if ($('#design option:selected').val() === 'js puns') {
        $('#color option').each(function (value) {
            const $colorVal = $(this).val();
            if ($colorVal === 'cornflowerblue' || $colorVal === 'darkslategrey' || $colorVal === 'gold') {
                $(this).show();
                if ($colorVal === 'cornflowerblue') {
                    $(this).prop('selected', true);
                }
            }
            $('#colors-js-puns').show();
        })
    } else if ($('#design option:selected').val() === 'heart js') {
        $('#color option').each(function (value) {
            const $colorVal = $(this).val();
            if ($colorVal === 'tomato' || $colorVal === 'steelblue' || $colorVal === 'dimgrey') {
                $(this).show();
                if ($colorVal === 'tomato') {
                    $(this).prop('selected', true);
                }
            }
            $('#colors-js-puns').show();
        })

    } else {
        $('#colors-js-puns').hide();

    }


});

//When choosing an activitie, disable activities that occurs at the same day and time

function activitiesCheck(checkedInput, disabledInput) {
    if ($(`input[name=${checkedInput}]:checked`).length > 0) {
        $(`input[name=${disabledInput}]`).prop({ disabled: true, checked: false });
        $(`input[name=${disabledInput}]`).parents("label").css("color", "#817b7b");
    } else {
        $(`input[name=${disabledInput}]`).prop("disabled", false);
        $(`input[name=${disabledInput}]`).parents("label").css("color", "#000");
    }
};

$(".activities input").change(function () {
    let $this = $(this);
    if ($this.is("input[name='js-frameworks']")) {
        activitiesCheck('js-frameworks', 'express')
    } else if ($this.is("input[name='express']")) {
        activitiesCheck('express', 'js-frameworks')
    } else if ($this.is("input[name='js-libs']")) {
        activitiesCheck('js-libs', 'node')
    } else if ($this.is("input[name='node']")) {
        activitiesCheck('node', 'js-libs')
    }
});

//When choosing an activitie, show the sum of the activities that got chosen based on their value
let $total = $('<h3></h3>');
$('.activities').append($total);
$total.hide();

$(".activities input").click(function (event) {
    let cost = 0;
    $(".activities input:checked").each(function () {
        cost += parseInt($(this).val());
    });

    if (cost == 0) {
        $total.hide();
    } else {
        $total.show();
        $total.text('Total: $' + cost);
    }
});

//Display payment section based on the payment option chosen
function showHidePaymentOption(showPayment, firstHidepayment, secondHidePayment) {
    $(showPayment).show();
    $(firstHidepayment).hide();
    $(secondHidePayment).hide();
}

$('#payment').change(function () {
    $('#payment').next('span').remove();
    if ($('#payment option:selected').val() === 'paypal') {
        showHidePaymentOption('#payPal', '#credit-card', '#bitcoin');
    } else if ($('#payment option:selected').val() === 'bitcoin') {
        showHidePaymentOption('#bitcoin', '#payPal', '#credit-card');
    } else {
        showHidePaymentOption('#credit-card', '#payPal', '#bitcoin');
    }
})


/*1.checks if the value that entered to the input is valid (based on the 'test' parameter).
  2.insert messages based on the if statment result
  3.preform some css on the inputs  */

function validationIndicator(Selector, message, test, secondMsg) {
    let reference = $(Selector);
    let firstErorrMessage = $('<span>' + message + '</span>');
    let secondErorrMessage = $('<span>' + secondMsg + '</span>');

    firstErorrMessage.css('color', '#a45555');
    secondErorrMessage.css('color', '#a45555');

    reference.next('span').remove();
    if (reference.val() == '') {
        reference.css('border-color', 'red');
        firstErorrMessage.insertAfter(reference);
    } else if (test == false) {
        reference.css('border-color', 'red');
        secondErorrMessage.insertAfter(reference);
        return false;
    } else {
        reference.css('border-color', 'black');
        return true;
    }
};



const validationFunctions = [
    function nameValidation() {
        const test = /^[a-z]+$/i.test($('#name').val());
        validationIndicator('#name', blankNameMsg, test, nameNotValidMsg);
    },

    function mailValidation() {
        const test = /^[^@]+@[^@.]+\.[a-z]+$/i.test($('#mail').val())
        validationIndicator('#mail', blankMailMsg, test, mailNotValidMsg);
    },

    function activitiesValidation() {
        const actMessage = $('<span>' + activitieMsg + '</span>');
        actMessage.css('color', '#a45555');
        $('.activities legend').next('span').remove();
        if ($('.activities input:checked').length > 0) {
            $('.activities legend').css('color', 'black');
            return true;
        } else {
            $('.activities legend').css('color', 'red');
            actMessage.insertAfter('.activities legend')
            return false;
        }

    },

    function creditCardValidation() {
        const payMessage = $('<span>' + paymentMsg + '</span>');
        const ccTest = /^\d{13,16}$/.test($('#cc-num').val());
        const zipTest = /^\d{5}$/.test($('#zip').val());
        const cvvTest = /^\d{3}$/.test($('#cvv').val());

        payMessage.css('color', '#a45555');
        if ($('#payment option:selected').val() == 'select_method') {
            $('#payment').next('span').remove();
            payMessage.insertAfter('#payment')
            return false;
        } else if ($('#payment option:selected').val() === 'credit card') {
            const ccNumValidation = validationIndicator('#cc-num', blankCcMsg, ccTest, ccNotValidMsg);
            const zipCodeValidation = validationIndicator('#zip', blankZipCodeMsg, zipTest, zipCodeNotValidMsg);
            const cvvNumValidation = validationIndicator('#cvv', blankCvvMsg, cvvTest, cvvNotValidMsg);
            if (ccNumValidation && zipCodeValidation && cvvNumValidation) {
                return true;
            } else {
                return false;
            }
        }
    }

];

//Perform form validation based on the functions in the 'validationFunctions' array when clicking the 'Submit' button
$("#submitButton").click(function (e) {
    $.each(validationFunctions, function (index, func) {
        if (func() == false) {
            e.preventDefault();
        }
    }
    )
});


/*1.checks if the value that entered to the input is valid (based on the 'test' parameter).
  2.insert messages based on the if statment result
  3.preform some css on the inputs  */
function validateonOnKeyup(Selector, message, test) {
    let reference = $(Selector);
    let firstErorrMessage = $('<span>' + message + '</span>');

    firstErorrMessage.css('color', '#a45555');

    reference.next('span').remove();
    if (reference.val() == '') {
        reference.css('border-color', 'transparent');
    } else if (test == false) {
        reference.css('border-color', 'red');
        firstErorrMessage.insertAfter(reference);
        return false;
    } else {
        reference.css('border-color', 'black');
        return true;
    }
};

//Perform validation on 'keyup'

$("#name").keyup(function () {
    const test = /^[a-z]+$/i.test($('#name').val());
    validateonOnKeyup('#name', nameNotValidMsg, test);
})

$("#mail").keyup(function () {
    const test = /^[^@]+@[^@.]+\.[a-z]+$/i.test($('#mail').val())
    validateonOnKeyup('#mail', mailNotValidMsg, test);
})