
/**
 * 基于Baidu Echarts的图表应用
 * @date 2017.06.16
 * @author gaoyouan https://github.com/EmeraldDreamland
 *
 *
 *
 */
var EouCharts = {};

/**
 * 饼图1：带栏目 & 仅显示top10
 * @param dom
 * @param params 期望结构：
 *      {
 *          name: tooltip名称,
 *          title: 标题（左上方显示，可选项）
 *          color: 自定义颜色组 ["#fff",...]
 *          data/url&query: 本地数据或远程数据
 *          #data结构：array|[Object{name,value}]
 *              eg: [
 *                  {name:"", value: number},
 *                  ...
 *              ]
 *      }
 */
EouCharts.pie4Top10 = function( dom, params ){
    EouCharts._init(dom, params, function(params, data){
        var len = data.length,
            nameData = [],
            result = [];
        if( len <= 10 ){
            for( var i=0; i<len; i++){
                nameData.push(data[i].name);
            }
        }else{
            var restValue = 0;
            for( var j=0; j<len; j++){
                if( j<=8 ){
                    nameData.push(data[j].name);
                    result.push(data[j]);
                }else{
                    restValue += data[j].value;
                }
            }
            nameData.push($.i18n("label.common.rests"));
            result.push( {name:$.i18n("label.common.rests"), value:restValue} );
            data = result;
        }

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: 20,
                data: nameData
            },
            series: [
                {
                    name: params.name,
                    type: 'pie',
                    radius: ['45%', '85%'],
                    center: ["60%", "50%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            formatter: "{b}\n{c} ({d}%)"
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data
                }
            ]
        };
        if( params.title ){
            option.title = {
                text: params.title,
                left: "left",
                textStyle: {
                    fontSize: 14
                }
            };
        }
        if (params.color) {
            option.color = params.color;
        }
        return option;
    });
};

/**
 * 省会级别的中国地图
 */
EouCharts.chinaMapAtProvince = function( dom, params ){
    EouCharts._init(dom, params, function(params, data){
        var max = 0;
        for( var i=0,len=data.length; i<len; i++){
            var name = data[i].name, value = data[i].value;
            if(name){
                var areas = name.split("."),
                    areaName = areas.length === 1 ? $.i18n("cn.region." + areas[0]) : "",
                    region = areas.length >= 4 ? $.i18n("cn.region." + areas[3]) : "";
                // country = areas.length >= 3 ? $.i18n("country."+areas[2]) : "";
                name = areaName || region;
            }
            data[i].name = name || $.i18n("cn.region.beijing");
            if (value) {
                if (params.ratio) {
                    data[i].value = value = toDecimals(value / params.ratio, 2);
                }
                max = value > max ? parseInt(value) : max;
            }
        }
        var option = {
            backgroundColor: '#404a59',
            tooltip: {
                trigger: 'item',
                formatter: params.formatter || function (params) {
                    if (!params || !params.value) {
                        return undefined;
                    }
                    return params.name + ' : ' + params.value;
                }
            },
            visualMap: {
                show:true,
                min: 0,
                max: max + 100,
                left: 'left',
                top: 'bottom',
                calculable: true,
                inRange: {
                    color: ['#363c49', '#d94e5d']
                },
                textStyle: {
                    color: '#fff'
                }
            },
            toolbox: {
                show: true,
                // orient: 'vertical',
                left: 'right',
                top: 'top',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            // geo: {
            //     map: 'china',
            //     label: {
            //         normal: {
            //             show: false
            //         },
            //         emphasis: {
            //             show: false
            //         }
            //     },
            //     roam: true,
            //     itemStyle: {
            //         normal: {
            //             areaColor: '#323c48',
            //             borderColor: '#404a59'
            //         },
            //         emphasis: {
            //             areaColor: '#2a333d',
            //             borderColor: '#fff',
            //             borderWidth: 1
            //         }
            //     }
            // },
            series: [
                {
                    name: params.name,
                    type: 'map',
                    mapType: 'china',
                    data: data,
                    roam: false,
                    zoom: 1.2,
                    symbolSize: 12,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            areaColor: '#2a333d',
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    }
                }
            ]
        };
        if( params.title ){
            option.title = {
                text: params.title,
                left: "left",
                textStyle: {
                    fontSize: 14,
                    color: '#fff'
                }
            };
        }
        return option;
    });
};

/**
 * 内部主入口实现
 * @param dom
 * @param params
 * @param callback
 * @private
 * @return option for echarts
 */
EouCharts._init = function(dom, params, callback){
    if( !dom || !params || !callback || !(params.data||params.url)){
        layer.msg.error("Params local data or remote url is missing, check please.");
    }
    var myChart = echarts.getInstanceByDom(dom) ?
        echarts.getInstanceByDom(dom) :
        echarts.init(dom, params.theme||'walden');
    if( params.data){
        myChart.setOption(callback(params, params.data));
    }else{
        EouCharts._ajax({
            url: params.url,
            query: params.query || {},
            success: function(data){
                if( !data || !callback ){
                    return ;
                }
                myChart.setOption(callback(params, data));
            }
        }, myChart);
    }
};

/**
 * 内部用于echarts的ajax请求方法
 * @param params:
 *  {
 *      url: 请求地址,
 *      query: 请求参数|Object,
 *      success: function(data){ } >> 绘制/更新echarts
 *      其他参数不重要...
 *  }
 */
EouCharts._ajax = function(params, myChart){
    myChart && myChart.showLoading();
    $.ajax({
        url: params.url,
        type: params.type || "post",
        timeout: params.timeout || 20000,
        data: params.query || {},
        contentType: params.contentType, //设置请求头信息
        dataType: params.dataType || "json",
        success: function (res) {
            myChart.hideLoading();
            if( !res || !res.data ){
                return;
            }
            if (params.success) params.success(res.data);
        }
    });

};