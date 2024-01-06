export default {
    multiChart: {
        // * : 필수값
        chartType: 'multi', // *차트타입 --> standard(바, 라인차트), polar, doughnut
        title: 'Dev Multi Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        option: {
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
        }
    }
}