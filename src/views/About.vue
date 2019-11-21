<template>
  <div class="about">
    <Slider v-model="value" range />
  </div>
</template>
<script>
    export default {
        data () {
            return {
                value: [20, 50]
            }
        }
    }
</script>