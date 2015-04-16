var ssArray = [];

function onPageLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    setInterval(function(){ 
        var oboardA=document.getElementById('boardA');
        var oboardB=document.getElementById('boardB');
        var oboardC=document.getElementById('boardC');

        //oboardA.innerHTML=""

        console.log("Scanning for our BLE Beacons...");      
        ssArray.push({'a':0, 'b':0, 'c':0});
        ble.scan([], 1, scanSuccess, scanFailure); 
        if (ssArray.length >= 2){
        console.log(ssArray[ssArray.length - 2].a+", "+ssArray[ssArray.length - 2].b+", "+ssArray[ssArray.length - 2].c);
         oboardA.innerHTML="A :"+ssArray[ssArray.length - 2].a;
         oboardB.innerHTML="B :"+ssArray[ssArray.length - 2].b;
         oboardC.innerHTML="C :"+ssArray[ssArray.length - 2].c;
        }
        // console.log(ssArray);
    }, 2000);

        


        
}

function scanSuccess(peripheral) {
        // Pass the peripheral for checking IDs of our tags
        // console.log(peripheral);
        checkBeaconID(peripheral);
}

function scanFailure(err) {
        console.log(err);
}
function checkBeaconID(dataSet){
    

    if (dataSet.id == "E24BFA09-29ED-425E-C715-CBCE048A2DDC"){
        // console.log("We found B!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        ssArray[ssArray.length - 1].b = dataSet.rssi;
    } else if(dataSet.id == "0F73F8FC-CE89-9C84-F48C-082E3EEC6008"){
        // console.log("We found C!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        ssArray[ssArray.length - 1].c = dataSet.rssi;
    } else if(dataSet.id == "1AFBF9A1-2E70-FF13-FC53-2E87A4019A45"){
        // console.log("We found A!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        ssArray[ssArray.length - 1].a = dataSet.rssi;
    }


}
