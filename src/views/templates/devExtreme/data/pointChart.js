export default {
    pointChart: {
        // * : 필수값
        chartType: 'point', // *차트타입 --> point
        title: 'Dev Point Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        //배열형태로 전달, 여러개 series 적용가능
        option: {
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
            //멀티축 지원안함
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
        }
    }
}