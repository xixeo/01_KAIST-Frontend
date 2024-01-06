<template>
    <svg
        id="itemPlace"
        :viewBox="viewBox"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        xml:space="preserve"
    >    
        <foreignObject class="node" x="0" y="0" :width="resolution.width" :height="resolution.height">
            <img :src="require(`@/assets/images/camera/${imageName}`)" :style="`width: 100%; height: 100%;`" />
            <div v-for="(position, idx) in positions" :key="idx">
                <div class="rectangle" :style="styleObject(position, items.lineStyle) " @click="clickBox(position)"/>
            </div>
        </foreignObject>
    </svg>
</template>


<script>
import EventBus from '@/components/event-bus'
export default {
    props: {
        items: {
            type: Object,
            default: function() {
            return { }
            }
        },
        positions: {
            type: Array,
            default: () => ['']
        },
        resolution: {
            type: Object,
            default: function() {
            return { width: 1920, height: 1080 }
            }
        }
    },
    data() {
        return {
            viewBox: "0" + " " + "0" + " " + this.resolution.width + " " + this.resolution.height,
            routeName: this.$route.name,
            imageName: this.items.imageName,
        };
    },
    mounted() { },
    destroyed() {
        console.log("EventBus.$off -> "+this.routeName+ '_itemPlace')
        EventBus.$off(this.routeName + '_itemPlace')
    },
    computed: { },
    methods: {
        clickBox(e) {
            console.log("EventBus.$emit -> "+this.routeName+ '_itemPlace')
            EventBus.$emit(this.routeName + '_itemPlace', e)
        },
        styleObject (obj, lineStyle) {
            let mig = (val) => { return `${val}%` }
            let px = (val) => { return `${val}px` }
            return {
                left: px(obj.x),
                top: px(obj.y),
                width: px(obj.w),
                height: px(obj.h),
                border: lineStyle
            }
        },
    }    
};
</script>


<style>
    .rectangle {
        position: absolute;
        border: solid 8px #2703f3ee;
    }
</style>
