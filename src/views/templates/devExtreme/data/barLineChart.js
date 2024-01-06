export default {
    barLineChart: {
        // * : 필수값
        chartType: 'barLine', // *차트타입 --> standard(바, 라인차트), polar, doughnut
        title: 'Dev Standard Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        option: {
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
                },{
                    name: "ECT",
                    interval: "5",
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
    }

}