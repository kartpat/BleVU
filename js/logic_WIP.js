var ssArray = [];

function onPageLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
        console.log("Page Load!");
}

function onDeviceReady() {
    
    setInterval(function(){ 
        //oboardA.innerHTML=""

        console.log("Scanning for our BLE Beacons...new definitely");      
        ssArray.push({'a':-127, 'b':-127, 'c':-127});
        ble.scan([], 1, scanSuccess, scanFailure);

        if (ssArray.length >= 5){
        console.log(ssArray[ssArray.length - 2].a+", "+ssArray[ssArray.length - 2].b+", "+ssArray[ssArray.length - 2].c);
         changeSS();
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
        if (ssArray[ssArray.length - 1].b) == 127{
            ssArray[ssArray.length - 1].b = -127;
        }else{
        ssArray[ssArray.length - 1].b = dataSet.rssi;
        }
    } else if(dataSet.id == "0F73F8FC-CE89-9C84-F48C-082E3EEC6008"){
        // console.log("We found C!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        if (ssArray[ssArray.length - 1].c) == 127{
            ssArray[ssArray.length - 1].c = -127;
        }else{
        ssArray[ssArray.length - 1].c = dataSet.rssi;
        }
    } else if(dataSet.id == "1AFBF9A1-2E70-FF13-FC53-2E87A4019A45"){
        // console.log("We found A!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        if (ssArray[ssArray.length - 1].a) == 127{
            ssArray[ssArray.length - 1].a = -127;
        }else{
        ssArray[ssArray.length - 1].a = dataSet.rssi;
        }
    }


}

function changeSS(){
    // Maintains only the latest 20 values of Signal strength
    console.log("inside changeSS");
    if (ssArray.length > 20){
        ssArray.shift();
    }
    var oboardA=document.getElementById('boardA');
    var oboardB=document.getElementById('boardB');
    var oboardC=document.getElementById('boardC');

    // Compare the 5th newest value to the average of second, third and fourth values (The First wont be updated when this function is running)
    var changeA = ((ssArray[ssArray.length - 2].a + ssArray[ssArray.length - 3].a + ssArray[ssArray.length - 4].a)/3) - ssArray[ssArray.length - 5].a ;
    var changeB = ((ssArray[ssArray.length - 2].b + ssArray[ssArray.length - 3].b + ssArray[ssArray.length - 4].b)/3) - ssArray[ssArray.length - 5].b ;
    var changeC = ((ssArray[ssArray.length - 2].c + ssArray[ssArray.length - 3].c + ssArray[ssArray.length - 4].c)/3) - ssArray[ssArray.length - 5].c ;
    


    oboardA.innerHTML="A :"+ssArray[ssArray.length - 2].a;
    oboardB.innerHTML="B :"+ssArray[ssArray.length - 2].b;
    oboardC.innerHTML="C :"+ssArray[ssArray.length - 2].c;

    
    // var loopCount = 
    



    if (changeA >= 5){
        oboardA.innerHTML+=" +";
    }else if(changeA <= -5){
        oboardA.innerHTML+=" -";
    }else{
        oboardA.innerHTML+=" o";
    }

    
    if (changeB >= 5){
        oboardB.innerHTML+=" +";
    }else if(changeB <= -5){
        oboardB.innerHTML+=" -";
    }else{
        oboardB.innerHTML+=" o";
    }

    if (changeC >= 5){
        oboardC.innerHTML+=" +";
    }else if(changeC <= -5){
        oboardC.innerHTML+=" -";
    }else{
        oboardC.innerHTML+=" o";
    }


}
