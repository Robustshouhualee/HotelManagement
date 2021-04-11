show_global_data = function() {
    tolincome();
    rentinc();
    roomqual();
    shopqual();
    onrent();
    monlinc();
    incom();
    regipro();
    rateComp();
}


//这里返回全部物业年的总收入
tolincome = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/allIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var totalIncome = data;//这里返回全部物业的总收入
            var totalIncomeHtml = "<h4>总收入：" + totalIncome + " 万元</h4>";
            $("#global_total_income").html(totalIncomeHtml);

        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回纯房租年总收入
rentinc = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/rentIncome?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var toltal = data;//这里返回房租的总收入
            console.log(toltal)
            var toltalHtml = "<h4>房租收入：" + toltal + " 万元</h4>";
            $("#global_rent_income").html(toltalHtml);
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租房间数
roomqual = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/roomQuantity?year="+year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;//直接返回房间数
            var numb = "<h4>可租房间：" + a + "/73间</h4>";
            $("#room_Number").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

// 这里返回可租商铺数
shopqual = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/shopQuantity?year="+year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = data;// 这里直接返回商铺数
            var numb = "<h4>可租铺位：" + a + "/5间</h4>";
            $("#shop_Number").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

current_rate = function(data){
    var a = data;
    var x = (a.rate_c / 78).toFixed(2);
    return x;
}

// 这里返回当前出租率
onrent = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/rentalRate?year="+year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = current_rate(data) * 100
            console.log(a)

//            var a = data;//这里直接返回出租率
            var numb = "<h4>当前出租率：" + a + "%" + "</h4>";
            $("#rate").html(numb);
        }
        else {
            alert("无数据")
        }
    });
}

totalinc = function(data){
    var a = data;
    var x = new Array();
    for (i = 0;i<a.length;i++){
        x[i] = a[i].sum_rent;
    }
    return x;
}

// 这里返回业全部物总收入中按月收入分析
monlinc = function(){
    var new_data = new Array();
    var old_data = new Array();
    var current_month = new Array();
    var year = $('#global_year_choose option:selected').val();
    var for_year = $('#global_year_choose option:selected').val()-1;
    var url1 = "/api/v1/globalanalysis/allIncomeMon?year=" +year;
    var url2 = "/api/v1/globalanalysis/allIncomeMon?year=" +for_year;
    console.log(url1);
    console.log(url2);

    $.ajaxSettings.async = false;
    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            new_data = totalinc(data);
            console.log(new_data)
            for (i = 0;i<new_data.length;i++){
                current_month[i] = i+1;
            }
            console.log(current_month)
            }
        else {
            alert("NO DATA")
        }
    });


    $.get(url2,function(data,status){
        if(status == 'success'){
            console.log(data)
            old_data = totalinc(data);
            console.log(old_data)
            console.log(new_data)

            var myChart = echarts.init(document.getElementById('monlInc'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '按月总收入同比（元）',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            series: [{
                name: year,
                color:'#003366',
                type: 'bar',
                data: new_data,
                label:{
                    show: true,
                    color:"rgba(255, 255, 255, 0.5)",
                    fontWeight:"bolder"
                }
            },
            {
                name: for_year,
                color:'#e5323e',
                type: 'bar',
                data: old_data,
                label:{
                    show: true,
                    color:"rgba(255, 255, 255, 0.5)",
                    fontWeight:"bolder"
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
    $.ajaxSettings.async = true;
}


// 返回纯房租收入对比
incom = function(){
    var new_data = new Array();
    var old_data = new Array();
    var current_month = new Array();
    var year = $('#global_year_choose option:selected').val();
    var for_year = $('#global_year_choose option:selected').val()-1;
    var url1 = "/api/v1/globalanalysis/reveCompar?year=" +year;
    var url2 = "/api/v1/globalanalysis/reveCompar?year=" +for_year;
    console.log(url1);
    console.log(url2);

    $.ajaxSettings.async = false;
    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            new_data = totalinc(data);
            console.log(new_data)
            for (i = 0;i<new_data.length;i++){
                current_month[i] = i+1;
            }
            console.log(current_month)
            }
        else {
            alert("NO DATA")            //避免中文输入
        }
    });


    $.get(url2,function(data,status){   //jquary中的get函数只能在其内部获取
        if(status == 'success'){
            console.log(data)
            old_data = totalinc(data);
            console.log(old_data)
            console.log(new_data)


            var myChart = echarts.init(document.getElementById('incom'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '纯房租收入同比（元）',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            series: [{
                name: year,
                color:'#003366',
                type: 'bar',
                data: new_data,
                label:{
                    show: true,
                    color:"rgba(255, 255, 255, 0.5)",
                    fontWeight:"bolder"
                }
            },
            {
                name: for_year,
                color:'#e5323e',
                type: 'bar',
                data: old_data,
                label:{
                    show: true,
                    color:"rgba(255, 255, 255, 0.5)",
                    fontWeight:"bolder"
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
    $.ajaxSettings.async = true;
}


// 这里返回各区域收入对比
regipro = function(){
    var year = $('#global_year_choose option:selected').val();
    var url = "/api/v1/globalanalysis/regionCompar?year=" +year;
    console.log(url);

    $.get(url,function(data,status){
        if(status == 'success'){
            console.log(data)
            var a = totalinc(data);
            console.log(a)
            var myChart = echarts.init(document.getElementById('regipro'));
            var option = {
                backgroundColor: "#F0FFFF",
                title: {
                    text: '各区域收入占比（元）',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        fontSize: 20
                    }
                },
                legend:{
                    show:true,
                    type:"plain",
                    right:"4%",
                    orient:"vertical"
                },
                tooltip: {
                    extraCssText: 'width:250px;height:100px;;',
                    trigger: 'item',
                },
                series: [
                    {
                        name: '占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['40%', '50%'],
                        data: [
                            {value:a[0], name:'A栋'},
                            {value:a[1], name:'B栋'},
                            {value:a[2],name:'C区'},
                            {value:a[3],name:'D栋'},
                            {value:a[4],name:'E区'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]

            };
            myChart.setOption(option);
        }
        else {
            alert("NO DATA")
        }
    });
}

ratedeal = function(data){
    var a = data;
    var x = new Array();
    for(i=0;i<a.length;i++){
        x[i] = (a[i].rate_c / 78).toFixed(2);
    }
    return x;
}

old_ratedeal = function(data){
    var a = data;
    var x = new Array();
    for(i=0;i<a.length;i++){
        x[i] = (a[i].rate_c / 43).toFixed(2);
    }
    return x;
}

//出租率同比
rateComp = function(){
    var current_month = new Array();
    var new_data = new Array();
    var old_data = new Array();
    var for_year = $('#global_year_choose option:selected').val()-1;
    var year = $('#global_year_choose option:selected').val();
    var url1 = "/api/v1/globalanalysis/renRateCompar?year=" +year;
    var url2 = "/api/v1/globalanalysis/renRateCompar?year=" +for_year;
    console.log(url1);
    console.log(url2);

    $.get(url1,function(data,status){
        if(status == 'success'){
            console.log(data)
            new_data = ratedeal(data);
            console.log(new_data)
            for (i = 0;i<new_data.length;i++){
                current_month[i] = i+1;
            }
            console.log(current_month)
            }
        else {
            alert("NO DATA")            //避免中文输入
        }
    });

    $.get(url2,function(data,status){   //jquary中的get函数只能在其内部获取
        if(status == 'success'){
            console.log(data)
            old_data = old_ratedeal(data);
            console.log(old_data)
            console.log(new_data)

            var myChart = echarts.init(document.getElementById('rateCompara'));
            var option = {
            backgroundColor: "#F0FFFF",
            title: {
                text: '出租率同比',
                left: "center",
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                extraCssText: 'width:250px;height:100px;;',
                trigger: 'axis',
                axisPointer: {
                   type: "shadow"
                }
            },
            legend: {
                data:current_month
            },
            xAxis: {
                type: "category",
                data: current_month,
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            yAxis: {
                axisLabel: {
                    show:true,
                    color:"rgba(86, 72, 72, 1)",
                    fontWeight:"bold",
                    fontSize:10
                }
            },
            legend: {
                 show:true,
                 type:"plain",
                 right:"4%",
                 orient:"vertical"
            },
            series: [
            {
                name: year,
                color:'#003366',
                type: 'line',
                data: new_data,
                label:{
                    show: true,
                    position: "top",
                    color:"rgba(0,0,205,1)",
                    fontWeight:"bolder"
                }
            },
            {
                name: for_year,
                color:'#e5323e',
                type: 'line',
                data: old_data,
                label:{
                    show: true,
                    position: "bottom",
                    color:"rgba(220,20,60, 1)",
                    fontWeight:"bolder"
                }
            }]
        };
        myChart.setOption(option);
        }
        else {
            alert("无数据")
        }
    });
}