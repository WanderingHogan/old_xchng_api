// ui clear input on click
$("#focusedInput").click(function () {
    $("#focusedInput").val('');
});

//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 700;  //time in ms, 5 second for example
var $input = $('#focusedInput');

//on keyup, start the countdown
$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping() {
    //do something
    $.ajax({
        url: 'api/getBestRate/' + $("#focusedInput").val(),
        success: drawfunction,
        dataType: 'json'
    });
}

function drawfunction(data){
    for(var item in data){
        // console.warn(data[item], data, item)
        if(item === 'BTC-DSH'){
            for(var a in data[item].allRates){
                if(data[item].allRates[a].exchange === 'btc-e'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#dash0').addClass('success')
                    }
                    else {
                        $('#dash0').removeClass('success')
                    }
                    $('#dash0').html(data[item].allRates[a].exchangeValue)
                }
                if(data[item].allRates[a].exchange === 'polo'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#dash1').addClass('success')
                    }
                    else {
                        $('#dash1').removeClass('success')
                    }
                    $('#dash1').html(data[item].allRates[a].exchangeValue)
                }
                if(data[item].allRates[a].exchange === 'bittrex'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#dash2').addClass('success')
                    }
                    else {
                        $('#dash2').removeClass('success')
                    }
                    $('#dash2').html(data[item].allRates[a].exchangeValue)
                }
            }
        }
        if(item === 'BTC-ETH'){
            for(var a in data[item].allRates){
                // console.warn(data[item].allRates[a])
                if(data[item].allRates[a].exchange === 'btc-e'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#eth0').addClass('success')
                    }
                    else {
                        $('#eth0').removeClass('success')
                    }
                    $('#eth0').html(data[item].allRates[a].exchangeValue)
                }
                if(data[item].allRates[a].exchange === 'polo'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#eth1').addClass('success')
                    }
                    else {
                        $('#eth1').removeClass('success')
                    }
                    $('#eth1').html(data[item].allRates[a].exchangeValue)
                }
                if(data[item].allRates[a].exchange === 'bittrex'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#eth2').addClass('success')
                    }
                    else {
                        $('#eth2').removeClass('success')
                    }
                    $('#eth2').html(data[item].allRates[a].exchangeValue)
                }
            }
        }
        if(item === 'BTC-LTC'){
            for(var a in data[item].allRates){
                // console.warn(data[item].allRates[a])
                if(data[item].allRates[a].exchange === 'btc-e'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#ltc0').addClass('success')
                    }
                    else {
                        $('#ltc0').removeClass('success')
                    }
                    $('#ltc0').html(data[item].allRates[a].exchangeValue)
                }
                if(data[item].allRates[a].exchange === 'polo'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#ltc1').addClass('success')
                    }
                    else {
                        $('#ltc1').removeClass('success')
                    }
                    $('#ltc1').html(data[item].allRates[a].exchangeValue)
                }
                if(data[item].allRates[a].exchange === 'bittrex'){
                    if(data[item].allRates[a].value === data[item].bestRate){
                        $('#ltc2').addClass('success')
                    }
                    else {
                        $('#ltc2').removeClass('success')
                    }
                    $('#ltc2').html(data[item].allRates[a].exchangeValue)
                }
            }
        }
    }
}