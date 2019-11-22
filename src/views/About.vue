<template>
<div>
    <i-switch v-model="switch1"/>
    <Button>Default</Button>
</div>
</template>
<script>
    export default {
        data () {
            return {
                switch1: false
            }
        }
    }
</script>