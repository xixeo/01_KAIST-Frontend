export default {
    default: {
        // * : 필수값
        chartType: 'standard', // *차트타입 --> standard(바, 라인차트), polar, doughnut
        title: 'Dev custom Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        //배열형태로 전달, 여러개 series 적용가능
        option:{
            series: [
                {
                    name: "testData #1", //legend에 표시될 이름
                    valueField: "testData1", // *Data필드 명
                    axis: "frequency", // 사용자정의 축정보를 적용, 없으면 default 값, 단, 적용시 아래 axis 값 필요함
                    type: "bar", // *표시타입 bar(바). spline(라인), ....
                    //color: "#fac29a", // 색상(생략가능, 생략시 테마에 따라 default값 지정)
                    labelVisivle: false //라벨 표시 여부
                },{
                    name : "testData #2",
                    valueField:"testData2",
                    axis:"percentage",
                    type:"spline",
                    //color:"#6b71c3",
                    labelVisivle: false
                }
            ],
            // series에서 axis값을 적용했을때만 작성(옵션값을 여러개 작성한 후 series에서 선택하여 사용)
            axis: [
                {
                    name: "frequency", // 설정 이름
                    interval: "200", // 표시간격
                    position: "left" // 표시위치

                },{
                    name: "percentage",
                    interval: "20",
                    position: "right"
                },{
                    name: "etc",
                    interval: "50",
                    position: "right"
                }
            ],
            // legend 옵션 설정
            legend: {
                vertical: "top", // 세로위치
                horizontal: "right", // 가로위치
                visible: true // 표시여부
            },
            options: {
                type: "", // area 차트 적용여부 (area, stackedarea, fullstackedarea)  --> 개발중(현재는 시리즈에 type값이 없을때만 적용됨)
                export: true //내보내기 버튼 보임여부
            }
        }
    },
    standardChart: {
        // * : 필수값
        chartType: 'standard', // *차트타입 --> standard(바, 라인차트), polar, doughnut
        title: 'Dev Standard Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        //배열형태로 전달, 여러개 series 적용가능
        series: [
            {
                name: "testData #1", //legend에 표시될 이름
                valueField: "testData1", // *Data필드 명
                axis: "frequency", // 사용자정의 축정보를 적용, 없으면 default 값, 단, 적용시 아래 axis 값 필요함
                type: "bar", // *표시타입 bar(바). spline(라인), ....
                color: "#fac29a", // 색상(생략가능, 생략시 테마에 따라 default값 지정)
                labelVisivle: false, //라벨 표시 여부
                labelText: "명" //라벨 표시 여부
            },{
                name : "testData #2",
                valueField:"testData2",
                axis:"percentage",
                type:"spline",
                color:"#6b71c3",
                labelVisivle: true,
                labelText: ""
            }
        ],
        // series에서 axis값을 적용했을때만 작성(옵션값을 여러개 작성한 후 series에서 선택하여 사용)
        axis: [
            {
                name: "frequency", // 설정 이름
                interval: "200", // 표시간격
                position: "left" // 표시위치

            },{
                name: "percentage",
                interval: "20",
                position: "right"
            }
        ],
        // legend 옵션 설정
        legend: {
            vertical: "top", // 세로위치
            horizontal: "right", // 가로위치
            visible: true // 표시여부
        },
        options: {
            type: "", // area 차트 적용여부 (area, stackedarea, fullstackedarea)  --> 개발중(현재는 시리즈에 type값이 없을때만 적용됨)
            export: true //내보내기 버튼 보임여부
        }
        
    },
    doughnutChart: {
        // * : 필수값
        chartType: 'doughnut', // *차트타입 --> standard(바, 라인차트), polar, doughnut(도넛, 파이차트)
        title: 'Dev Doughnut Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        //series: '',  // doughnut 차트에서 series는 datasource에 region value값임, 여기서는 필요없음        
        axis: '', // 사용안함
        // legend 옵션 설정
        legend: {
            vertical: "bottom", // 세로위치
            horizontal: "center", // 가로위치
            visible: true, // 표시여부
            margin: 0 //마진크기
        },
        options: {
            type: "pie", // doughnut, pie(기본 파이차트)
            export: false //내보내기 버튼 보임여부
        }
        
    },
    pointChart: {
        // * : 필수값
        chartType: 'point', // *차트타입 --> point
        title: 'Dev Point Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        //배열형태로 전달, 여러개 series 적용가능
        series: [
            {
                name: "Europe", //legend에 표시될 이름
                valueField: "older1", // * y 축 
                argumentField: "total1", // * x 축 
                sizeField: "perc1", // * bubble 사이즈
                tagField: "tag1" // *
            },{
                name: "Africa",
                valueField: "older2", 
                argumentField: "total2", 
                sizeField: "perc2",
                tagField: "tag2" 
            },{
                name: "Asia", 
                valueField: "older3", 
                argumentField: "total3",
                sizeField: "perc3",
                tagField: "tag3" 
            },{
                name: "North America",
                valueField: "older4", 
                argumentField: "total4",
                sizeField: "perc4", 
                tagField: "tag4" 
            },
        ],
        axis: {
            xAxisTitle: "Total Population", // x축 설명
            yAxisTitle: "Population with Age over 60", // y축 설명
        },
        // legend 옵션 설정
        legend: {
            vertical: "top", // 세로위치
            horizontal: "right", // 가로위치
            visible: true, // 표시여부
        },
        options: {
            export: true, //내보내기 버튼 보임여부
            seriesType: "bubble", // 포인트 형태(bubble, scatter)
            palette: ['#00ced1', '#008000', '#ffd700', '#ff7f50'] // bubble 색상정보(시리즈 수만큼 정의)
        }
    },
    multiChart: {
        // * : 필수값
        chartType: 'multi', // *차트타입 --> standard(바, 라인차트), polar, doughnut
        title: 'Dev Multi Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        //멀티차트 에서 pane값은 기본이 bottom
        series: [
            {
                name: "Average Temperature, °C", //legend에 표시될 이름
                valueField: "avgT", // * Data필드 명(y축 데이터)
                pane: "top", // 데이터를 표시할 위치(현재, top, bottom만 가능) default : bottom
                type: "bar", // *표시타입 bar(바). spline(라인), ....
                argumentField: "month" //* Data필드 명(x축 데이터)
            },{
                name : "Average Humidity, %",
                valueField:"avgH",
                pane:"bottom",
                type:"bar",
                argumentField: "month"
            }
        ],
        // series에서 axis값을 적용했을때만 작성(옵션값을 여러개 작성한 후 series에서 선택하여 사용)
        axis: {
                topAxisTitle: "Temperature, °C", // 기능확인중
                topGridVisible: true, // 기능확인중
                topTickInterval: 5, // 상단차트 y축 간격
                bottomAxisTitle: "Humidity, %", // 기능확인중
                bottomGridVisible: true, // 기능확인중
                bottomTickInterval: 30, // 하단차트 y축 간격
        },
        // legend 옵션 설정
        legend: {
            vertical: "bottom", // 세로위치
            horizontal: "right", // 가로위치
            visible: true // 표시여부
        },
        options: {
            type: "", // area 차트 적용여부 (area, stackedarea, fullstackedarea)  --> 개발중(현재는 시리즈에 type값이 없을때만 적용됨)
            export: true //내보내기 버튼 보임여부
        }
        
    },

}