let finedustgrade = '측정 미완료';
let ultrafinedustgrade = '측정 미완료';
let finedust = 0;
let ultrafinedust = 0;
let outtime = 0;
function getfinedust(stationname) {
    let corsproxyurl = 'https://cors-anywhere.herokuapp.com/';
    let url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=$stationname&dataTerm=daily&pageNo=1&numOfRows=1&ServiceKey=mFxbImx4ztIyKEFs%2B3zzvo6G5AbYypLLeBEXFPmNVAXffjtWDyfJAWe8unD9CNcPoUOTSn%2F5Yw1wxYPLlbD1ZQ%3D%3D&ver=1.3&_returnType=json'.replace(
        '$stationname',
        stationname
    );
    url = corsproxyurl + url;
    console.log(url);
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            finedust = myJson.list[0].pm10Value;
            ultrafinedust = myJson.list[0].pm25Value;
            console.log('------미세먼지 농도------');
            console.log(finedust);
            console.log('------초미세먼지 농도------');
            console.log(ultrafinedust);
        });

    if (finedust <= 30) {
        finedustgrade = '좋음';
    } else if (finedust <= 80) {
        finedustgrade = '보통';
    } else if (finedust <= 150) {
        finedustgrade = '나쁨';
    } else {
        finedustgrade = '매우 나쁨';
    }

    if (ultrafinedust <= 15) {
        ultrafinedustgrade = '좋음';
    } else if (ultrafinedust <= 35) {
        ultrafinedustgrade = '보통';
    } else if (ultrafinedust <= 75) {
        ultrafinedustgrade = '나쁨';
    } else {
        ultrafinedustgrade = '매우 나쁨';
    }
    setTimeout(function() {
        printdust(finedust, ultrafinedust, finedustgrade, ultrafinedustgrade, 0);
    }, 3000);
    console.log('------미세먼지 등급------');
    console.log(finedustgrade);
    console.log('------초미세먼지 등급------');
    console.log(ultrafinedustgrade);
}

function dustfeedback(finedust, finedustgrade, ultrafinedust) {
    current = '현재 미세먼지 등급은 $finedustgrade, 초미세먼지 등급은 $ultrafinedustgrade으로, '
        .replace('$finedustgrade', finedustgrade)
        .replace('$ultrafinedustgrade', ultrafinedustgrade);
    micrometer =
        '<br><br>µm(마이크로미터)와 µg(마이크로그램)은 미세먼지 정보 표시에 사용되는 단위입니다. 1 마이크로미터는 1 센티미터의 1/10000길이로써 미세먼지의 반경은 약 10µm이고, 초미세먼지의 반경은 약 2.5µm입니다.';
    microgram =
        '1마이크로그램은 1그램의 백만분의 1 무게입니다. 현재 대기중에는 세제곱미터 당 ' +
        finedust +
        'µg의 미세먼지가 있습니다. 이는 ' +
        finedust / 1000000 +
        '그램의 무게입니다.';
    ending =
        '<br><br>이처럼 미세먼지는 매우 작고 가볍습니다. 눈에 보이지 않는 만큼 우리들에게는 별로 와닿지 않습니다. <br>하지만 그만큼 우리 호흡기에게는 ' +
        '<span style="font-size:20px;color:red;">위협적</span>' +
        ' 입니다.<br><br>' +
        "<span style='font-size:20px;color:rgb(50, 135, 168);'>우리 모두 미세먼지를 줄일 수 있도록 노력해야할 것입니다.</span>";
    if (finedust <= 30) {
        document.getElementById('feed').innerHTML =
            current + '야외 활동에 적합한 대기 상태입니다.' + micrometer + microgram + ending;
    } else if (finedust <= 80) {
        document.getElementById('feed').innerHTML =
            current +
            '실외활동시 특별히 행동에 제약을 받을 필요는 없지만 몸상태에 따라 유의하여 활동해야 합니다.' +
            micrometer +
            microgram +
            ending;
    } else if (finedust <= 150) {
        document.getElementById('feed').innerHTML =
            current +
            '장시간 또는 무리한 실외활동 제한, 특히 천식을 앓고 있는 사람이 실외에 있는 경우 흡입기를 더 자주 사용할 필요가 있습니다.' +
            micrometer +
            microgram +
            ending;
    } else {
        document.getElementById('feed').innerHTML =
            current +
            '실외에서의 모든 신체활동 금지, 심장질환 혹은 폐질환이 있는 사람, 노인, 어린이는 실내에 있어야 하며 활동정도를 약하게 유지해야 합니다.' +
            micrometer +
            microgram +
            ending;
    }
}
function citychecked() {
    var e = document.getElementById('city');
    var city = e.options[e.selectedIndex].id;
    console.log(city);
    if (city != 'none') {
        // .replace('$city', city)
        // .replace('$select', '-select')
        document.getElementById(city + '-select').style = 'display:block';
    }
}
function citydetailchecked() {
    var temp1 = document.getElementById('city');
    var city = temp1.options[temp1.selectedIndex].id;
    var temp2 = document.getElementById(city + '-select');
    var stationname = temp2.options[temp2.selectedIndex].text;
    console.log(stationname);
    getfinedust(stationname);
    document.getElementById('checkedcity').innerHTML = '사용자님이 선택하신 지역은 $detailcity입니다.'.replace(
        '$detailcity',
        stationname
    );
    document.getElementById('lungdust').innerHTML = '곧 미세먼지 정보가 나옵니다..';
}

function printdust(finedust, ultrafinedust, finedustgrade, ultrafinedustgrade, outtime) {
    if (finedust != '-') {
        document.getElementById('finedust').innerHTML = '현재 미세먼지 등급은 $grade입니다.'.replace(
            '$grade',
            finedustgrade
        );
        document.getElementById('ultrafinedust').innerHTML = '현재 초미세먼지 등급은 $grade입니다.'.replace(
            '$grade',
            ultrafinedustgrade
        );
        document.getElementById('lungdust').innerHTML =
            '현재 미세먼지 농도는' +
            "<span style='font-size:40px'>$finedust$micrometer</span>"
                .replace('$finedust', finedust)
                .replace('$micrometer', 'µg/m³') +
            ', 초미세먼지 농도는' +
            "<span style='font-size:40px'>$ultrafinedust$micrometer</span>"
                .replace('$ultrafinedust', ultrafinedust)
                .replace('$micrometer', 'µg/m³') +
            '입니다.';
            
        if (outtime != 0) {
            let outfinedust = outtime * 480 * finedust;
            let outultrafinedust = outtime * 480 * ultrafinedust;
            let grf = outfinedust*0.002;
            let gru = outultrafinedust*0.004;
            $('.drinkf').height(grf);
            $('.drinku').height(gru);
            document.getElementById('lungdusttime').innerHTML =
                '$time시간 동안 밖에 계신 사용자님이 총 흡입한 미세먼지 양은 약 '.replace('$time', outtime) +
                "<span style='font-size:40px;'>$finedust$microgram</span>"
                    .replace('$microgram', 'µg')
                    .replace('$finedust', outfinedust) +
                ', 초미세먼지 농도는' +
                "<span style='font-size:40px'>$ultrafinedust$micrometer</span>"
                    .replace('$ultrafinedust', outultrafinedust)
                    .replace('$micrometer', 'µg') +
                '입니다.';
        }

        dustfeedback(finedust, finedustgrade, ultrafinedustgrade);
    } else {
        document.getElementById('lungdust').innerHTML =
            '측정소에 문제가 있어 정보가 나오지 않고 있습니다.. 근접한 지역을 선택해 주십시오.';
    }
}

function outtimechecked() {
    outtime = document.getElementById('outtime').value;
    setTimeout(function() {
        printdust(finedust, ultrafinedust, finedustgrade, ultrafinedustgrade, outtime);
    }, 3000);
}