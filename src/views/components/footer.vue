<template>
  <div class="h-full w-full bg-blue-400" style="text-align: end;padding-left:10px ">
    <span style="font-size: 10pt; 'Helvetica Neue','Segoe UI',Helvetica,Verdana,sans-serif: 'Times New Roman'; color: #ffffff;">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'footerText',
  props: {
    title: {
      type: String,
      default: () => {
        return 'KAIST IT융합연구소 융합센서팀'
      }
    }
  },
  data() {
    return {}
  }
}
</script>
