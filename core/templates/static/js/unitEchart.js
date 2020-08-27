// 查询启动函数
getRoomInformation = function(){
    var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();
    var month = $('#monthData').val();
    roYeIn(region,year,room);
    monRen(region,room);
    monelectricity(region,year,room,month);
    monWater(region,year,room,month);
    roIncClafi(region,year,room);
    cursta(region,room);
    tenantInfo(region,room);

}

//这里得到的数据是某一区域，某一年，某一房间号：年总收入
roYeIn = function(region,year,room){
    var myChart = echarts.init(document.getElementById('roYearInc'));
    /*var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();*/
    var url = "/api/v1/unit/roomAllInc?region=" + region + "&year=" + year +  "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['sum_rent'];
            console.log(a)
        }
    });
}

// 这里得到的数据是某一区域，某一房间的参考租金
monRen = function(region,room){
    var myChart = echarts.init(document.getElementById('monRent'));
    /*var region = $('#region option:selected').val();
    var room = $('#roomNum').val();*/
    var url = "/api/v1/unit/roomRent?region=" + region +  "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['rent'];
            console.log(a)
        }
    });
}

// 这里得到的数据是某一区域，某一房间，某一时间的用电量
monelectricity = function(region,year,room,month){
    var myChart = echarts.init(document.getElementById('monEclet'));
    /*var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();
    var month = $('#monthData').val();*/
    var url = "/api/v1/unit/elecConsum?region=" + region + "&year=" + year + "&room=" + room + "&month=" + month;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['electricity'];
            console.log(a)
        }
    });
}

// 这里得到的数据是某一区域，某一房间，某一时间的用水量
monWater = function(region,year,room,month){
    var myChart = echarts.init(document.getElementById('monWat'));
    /*var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();
    var month = $('#monthData').val();*/
    var url = "/api/v1/unit/waterConsum?region=" + region + "&year=" + year + "&room=" + room + "&month=" + month;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['water'];
            console.log(a)
        }
    });
}

//这里返回的是 按月房租（专用于incClaFi（））
rentMon = function(data){
    var a = data;
    var x = new Array();
    for (i = 0;i<a.length/3;i++){
        x[i] = a[i].sum_rent;
    }
    return x;
}

//这里返回的是 按月电费（专用于incClaFi（））
elect = function(data){
     var a = data;
     var x = new Array();
     for (i = a.length/3;i<2*a.length/3;i++){
         x[i] = a[i].sum_e_c;
     }
     var y = new Array();
     for (i=0;i<a.length/3;i++){
        y[i]=x[i+a.length/3];
     }
     return y;
}

//这里返回的是 按月水费（专用于incClaFi（））
water = function(data){
    var a = data;
     var x = new Array();
     for (i = 2*a.length/3;i<a.length;i++){
         x[i] = a[i].sum_w_c;
     }
     var y = new Array();
     for (i=0;i<a.length/3;i++){
        y[i]=x[i+2*a.length/3];
     }
     return y;
}

// 这里得到的数据是某一区域，某一房间，某一年，全年各月的：1用水，2、用电，3、房租收入
roIncClafi = function(region,year,room){
    var myChart = echarts.init(document.getElementById('roomIncClafi'));
   /* var region = $('#region option:selected').val();
    var year = $('#yearDate').val();
    var room = $('#roomNum').val();*/
    var url = "/api/v1/unit/roomincClafi?region=" + region + "&year=" + year + "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var rent = rentMon(data);//这里返回的是按月房租收入
            console.log(rent)
            var elec_c = elect(data);//这里返回的是按月电费收入
            console.log(elec_c)
            var wate_c = water(data);//这里返回的是按月水费收入
            console.log(wate_c)

        }
    });
}

// 这里返回的值是某一区域，某一房间的房屋状态
cursta = function(region,room){
    var myChart = echarts.init(document.getElementById('curSta'));
    /*var region = $('#region option:selected').val();
    var room = $('#roomNum').val();*/
    var url = "/api/v1/unit/curaStat?region=" + region + "&room=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data['state'];
            console.log(a)
        }else {
            alert("无数据")
        }
    });
}


//获取用户信息
tenantInfo = function(region,room) {
    /*var region = $('#region option:selected').val();
    var room = $('#roomNum option:selected').val();*/
    var url = "/api/v1/unit/getUserInfo?region=" +region + "&roomNum=" + room;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success') {
            var tblInfoCode = dynamic_table(data)
            console.log(tblInfoCode)
            $("#userInfoTbl").html(tblInfoCode);
        } else {
            alert("无数据")
        }
    });
}