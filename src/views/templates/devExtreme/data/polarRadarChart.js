export default {
    polarRadarChart: {
        // * : 필수값
        chartType: 'polarRadar', // *차트타입 --> standard(바, 라인차트), polar, doughnut
        title: 'Dev polarRadar Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        option: {
            //멀티차트 에서 pane값은 기본이 bottom
            series: [
                { value: 'val1', name: '1.3-4 m/s' },
                { value: 'val2', name: '4-8 m/s' },
                { value: 'val3', name: '8-13 m/s' },
                { value: 'val4', name: '13-19 m/s' },
                { value: 'val5', name: '19-25 m/s' },
                { value: 'val6', name: '25-32 m/s' },
                { value: 'val7', name: '32-39 m/s' },
                { value: 'val8', name: '39-47 m/s' }
            ],
            // series에서 axis값을 적용했을때만 작성(옵션값을 여러개 작성한 후 series에서 선택하여 사용)
            axis: {
                    inverted: true, // 기능확인중
                    startAngle: 90, // 기능확인중
                    tickInterval: 30,
            },
            // legend 옵션 설정
            legend: {
                visible: true // 표시여부
            },
            options: {
                type: "", // area 차트 적용여부 (area, stackedarea, fullstackedarea)  --> 개발중(현재는 시리즈에 type값이 없을때만 적용됨)
                export: true, //내보내기 버튼 보임여부
                palette: "Soft"
            }
        }
    }
}