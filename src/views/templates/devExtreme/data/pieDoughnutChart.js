export default {
    pieDoughnutChart: {
        // * : 필수값
        chartType: 'pieDoughnut', // *차트타입 --> standard(바, 라인차트), polar, doughnut(도넛, 파이차트)
        title: 'Dev Doughnut Chart', // * 차트제목, 미표시는 ''값 전달, 차트를 구분하는 고유값으로도 사용함
        option: {
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
        }
    }
}