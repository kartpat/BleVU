var ssArray = [];
var keyVal = [{'id':"1AFBF9A1-2E70-FF13-FC53-2E87A4019A45", 'name': "A", 'instruction': "Walk forward 20ft", 'currentVal': -100},
              {'id':"E24BFA09-29ED-425E-C715-CBCE048A2DDC", 'name': "B", 'instruction': "Turn left and walk 40ft", 'currentVal': -100},
              {'id':"0F73F8FC-CE89-9C84-F48C-082E3EEC6008", 'name': "C", 'instruction': "Walk forward 20ft", 'currentVal': -100},
              {'id':"7F56A336-A0E6-F661-D552-9B4DFABAA084", 'name': "D", 'instruction': "Turn right and walk 20ft", 'currentVal': -100},
              {'id':"017088A4-F540-560C-B27E-9A13E44CCDFA", 'name': "E", 'instruction': "Turn left and walk 40ft", 'currentVal': -100},
              {'id':"28EEDCB8-26B4-590A-DFAE-0F2A20BBBE00", 'name': "F", 'instruction': "Walk forward 20ft", 'currentVal': -100},
              {'id':"C1DA2102-0F0A-86CC-FAC8-7CA6D9BB8C5F", 'name': "G", 'instruction': "Destination Reached", 'currentVal': -100}];
var i = 0;

function onPageLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
        console.log("Page Load!");
}

function onDeviceReady() {
    
    setInterval(function(){ 
        //oboardA.innerHTML=""

        //console.log("Scanning for our BLE Beacons...new definitely");      
        ssArray.push({'a':-100, 'b':-100, 'c':-100, 'd':-100, 'e':-100, 'f':-100, 'g':-100});
        ble.scan([], 0.70, scanSuccess, scanFailure);

        if (ssArray.length >= 5){
        // console.log(ssArray[ssArray.length - 2].a+", "+ssArray[ssArray.length - 2].b+", "+ssArray[ssArray.length - 2].c);
         changeSS();
        }
        // console.log(ssArray);
    }, 1000);

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
        // ssArray[ssArray.length - 1].b = dataSet.rssi;
        if (dataSet.rssi == 127){
            ssArray[ssArray.length - 1].b = -100;
        }else{
        ssArray[ssArray.length - 1].b = dataSet.rssi;
        }
        keyVal[1].currentVal = ssArray[ssArray.length - 1].b;

    } else if(dataSet.id == "0F73F8FC-CE89-9C84-F48C-082E3EEC6008"){
        // console.log("We found C!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        // ssArray[ssArray.length - 1].c = dataSet.rssi;
        if (dataSet.rssi == 127){
            ssArray[ssArray.length - 1].c = -100;
        }else{
        ssArray[ssArray.length - 1].c = dataSet.rssi;
        }
        keyVal[2].currentVal = ssArray[ssArray.length - 1].c;
    } else if(dataSet.id == "1AFBF9A1-2E70-FF13-FC53-2E87A4019A45"){
        //console.log("We found A!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        // ssArray[ssArray.length - 1].a = dataSet.rssi;
        if (dataSet.rssi == 127){
            ssArray[ssArray.length - 1].a = -100;
        }else{
        ssArray[ssArray.length - 1].a = dataSet.rssi;
        }
        keyVal[0].currentVal = ssArray[ssArray.length - 1].a;
    } else if(dataSet.id == "7F56A336-A0E6-F661-D552-9B4DFABAA084"){
         console.log("We found D!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        // ssArray[ssArray.length - 1].a = dataSet.rssi;
        if (dataSet.rssi == 127){
            ssArray[ssArray.length - 1].d = -100;
        }else{
        ssArray[ssArray.length - 1].d = dataSet.rssi;
        }
        keyVal[3].currentVal = ssArray[ssArray.length - 1].d;
    } else if(dataSet.id == "017088A4-F540-560C-B27E-9A13E44CCDFA"){
        // console.log("We found E!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        // ssArray[ssArray.length - 1].a = dataSet.rssi;
        if (dataSet.rssi == 127){
            ssArray[ssArray.length - 1].e = -100;
        }else{
        ssArray[ssArray.length - 1].e = dataSet.rssi;
        }
        keyVal[4].currentVal = ssArray[ssArray.length - 1].e;
    } else if(dataSet.id == "28EEDCB8-26B4-590A-DFAE-0F2A20BBBE00"){
        // console.log("We found F!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        // ssArray[ssArray.length - 1].a = dataSet.rssi;
        if (dataSet.rssi == 127){
            ssArray[ssArray.length - 1].f = -100;
        }else{
        ssArray[ssArray.length - 1].f = dataSet.rssi;
        }
        keyVal[5].currentVal = ssArray[ssArray.length - 1].f;
    } else if(dataSet.id == "C1DA2102-0F0A-86CC-FAC8-7CA6D9BB8C5F"){
        // console.log("We found G!");
        // console.log("SignalStrength is :" + dataSet.rssi);
        // ssArray[ssArray.length - 1].a = dataSet.rssi;
        if (dataSet.rssi == 127){
            ssArray[ssArray.length - 1].g = -100;
        }else{
        ssArray[ssArray.length - 1].g = dataSet.rssi;
        }
        keyVal[6].currentVal = ssArray[ssArray.length - 1].g;
    } 


}

function changeSS(){
    // Maintains only the latest 20 values of Signal strength
    //console.log("inside changeSS");
    if (ssArray.length > 20){
        ssArray.shift();
    }
    var oboardA=document.getElementById('boardA');
    var oboardB=document.getElementById('boardB');
    var oboardC=document.getElementById('boardC');
    var oboardD=document.getElementById('boardD');
    var oboardE=document.getElementById('boardE');
    var oboardF=document.getElementById('boardF');
    var oboardG=document.getElementById('boardG');
    
    var oboard=document.getElementById('board');

    var att = document.createAttribute('role');
    att.value = "alert";
    oboard.setAttributeNode(att);

 /*   // Compare the 5th newest value to the average of second, third and fourth values (The First wont be updated when this function is running)
    var changeA = ((ssArray[ssArray.length - 2].a + ssArray[ssArray.length - 3].a + ssArray[ssArray.length - 4].a)/3) - ssArray[ssArray.length - 5].a ;
    var changeB = ((ssArray[ssArray.length - 2].b + ssArray[ssArray.length - 3].b + ssArray[ssArray.length - 4].b)/3) - ssArray[ssArray.length - 5].b ;
    var changeC = ((ssArray[ssArray.length - 2].c + ssArray[ssArray.length - 3].c + ssArray[ssArray.length - 4].c)/3) - ssArray[ssArray.length - 5].c ;
 */   
    var changeA = (ssArray[ssArray.length - 2].a + ssArray[ssArray.length - 3].a)/2 - (ssArray[ssArray.length - 4].a + ssArray[ssArray.length - 5].a)/2 ;
    var changeB = (ssArray[ssArray.length - 2].b + ssArray[ssArray.length - 3].b)/2 - (ssArray[ssArray.length - 4].b + ssArray[ssArray.length - 5].b)/2 ;
    var changeC = (ssArray[ssArray.length - 2].c + ssArray[ssArray.length - 3].c)/2 - (ssArray[ssArray.length - 4].c + ssArray[ssArray.length - 5].c)/2 ;

    //Average of last two values of rssi
    var avgA = (ssArray[ssArray.length - 2].a + ssArray[ssArray.length - 3].a)/2;
    var avgB = (ssArray[ssArray.length - 2].b + ssArray[ssArray.length - 3].b)/2;
    var avgC = (ssArray[ssArray.length - 2].c + ssArray[ssArray.length - 3].c)/2;

    
    // var distA = getRange(-60, ssArray[ssArray.length - 2].a);
    // var distB = getRange(-60, ssArray[ssArray.length - 2].b);    
    // var distC = getRange(-60, ssArray[ssArray.length - 2].c);

    // test to print out the averaged values.

    // oboardA.innerHTML="A :"+avgA.toFixed(2);
    // oboardB.innerHTML="B :"+avgB.toFixed(2);
    // oboardC.innerHTML="C :"+avgC.toFixed(2);

    // oboardA.innerHTML="A :"+ssArray[ssArray.length - 2].a;
    // oboardB.innerHTML="B :"+ssArray[ssArray.length - 2].b;
    // oboardC.innerHTML="C :"+ssArray[ssArray.length - 2].a;

    oboardA.innerHTML="A :"+keyVal[0].currentVal;
    oboardB.innerHTML="B :"+keyVal[1].currentVal;
    oboardC.innerHTML="C :"+keyVal[2].currentVal;
    oboardD.innerHTML="D :"+keyVal[3].currentVal;
    oboardE.innerHTML="E :"+keyVal[4].currentVal;
    oboardF.innerHTML="F :"+keyVal[5].currentVal;
    oboardG.innerHTML="G :"+keyVal[6].currentVal;
    
    // var loopCount = 
    

    var statA = "o";
    var statB = "o";
    var statC = "o";

    if (changeA >= 2){
        oboardA.innerHTML+=" +";
        statA = "+";
    }else if(changeA <= -2){
        oboardA.innerHTML+=" -";
        statA = "-";
    }else{
        oboardA.innerHTML+=" o";
        statA = "o";
    }

    
    if (changeB >= 2){
        oboardB.innerHTML+=" +";
        statB = "+";
    }else if(changeB <= -2){
        oboardB.innerHTML+=" -";
        statB = "-";
    }else{
        oboardB.innerHTML+=" o";
        statB = "o";
    }

    if (changeC >= 2){
        oboardC.innerHTML+=" +";
        statC = "+";
    }else if(changeC <= -2){
        oboardC.innerHTML+=" -";
        statC = "-";
    }else{
        oboardC.innerHTML+=" o";
        statC = "o";
    }

    //check for location and direction

    if ((statA=="+" && statB == "+" && statC == "+") || (statA=="+" && statB == "+" && statC == "o") || (statA=="+" && statB == "o" && statC == "o")){
        //oboard.innerHTML="Towards A";
    }else if((statA=="-" && statB == "+" && statC == "+") || (statA=="-" && statB == "+" && statC == "o") || (statA=="o" && statB == "+" && statC == "+") || (statA=="o" && statB == "+" && statC == "o")){
        //oboard.innerHTML="Towards B from A";
    }else if((statA=="-" && statB == "-" && statC == "+") || (statA=="o" && statB == "-" && statC == "+") || (statA=="o" && statB == "o" && statC == "+")){
        //oboard.innerHTML="Towards C from B";
    }else if((statA=="-" && statB == "-" && statC == "-") || (statA=="o" && statB == "-" && statC == "-") || (statA=="o" && statB == "o" && statC == "-")){
        //oboard.innerHTML="Leaving C";
    }else{
        //oboard.innerHTML="Calculating...";
    }

    oboard.innerHTML=keyVal[i].instruction;

    
    if (keyVal[i].currentVal > -65.0 && i < keyVal.length){

        if(keyVal.length == i+1){
            keyVal[i].instruction = "Destination Reached!"
        }else{ 
            // oboard.setAttributeNode(att);
        i++;
        }
        
    }
}

function wayfind(dest,instruct){
    //this fucntion should return an array list of strings with instructions



}

function getRange(txCalibratedPower, rssi) {
    var ratio_db = txCalibratedPower - rssi;
    var ratio_linear = Math.pow(10, ratio_db / 10);

    var r = Math.sqrt(ratio_linear);
    return r;
}
