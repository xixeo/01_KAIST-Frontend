export default function getData() {
    return {
        'type': 'FeatureCollection',
        'cameraImage': require(`@/assets/images/camera/20210611_110247.jpg`),
        'features': [{
            geometry: {
            coordinates: [
                [
                [0,0],
                [0,20],
                [20,20],
                [20,0],
                [0,0]
                ],[
                [40,40],
                [40,60],
                [60,60],
                [60,40],
                [40,40]
                ],[
                [-50,-50],
                [-70,-50],
                [-70,-70],
                [-50,-70],
                [-50,-50]
                ]
            ]
            }
        }]
    }
}
