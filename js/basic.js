function onPageLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
        console.log("Page Load!");
}

function onDeviceReady() {
    
    setTimeout(function(){ 
        ble.scan([], 3, scanSuccess, scanFailure);
    }, 8000);

}

function scanSuccess(peripheral) {
        // Pass the peripheral for checking IDs of our tags
        console.log(peripheral);
        // checkBeaconID(peripheral);
}

function scanFailure(err) {
        console.log(err);
}
