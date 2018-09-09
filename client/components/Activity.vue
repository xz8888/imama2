<template>
   <div>
    <div v-for="activity in activities" v-bind:key="activity.id">
       <div class="title-small">{{activity.title}}</div>
    </div>
   </div>
</template>

<script>
    export default {
        props: {
            activities: {
                type: Array,
                default: () => []
            },
        },

        mounted() {
            console.log(this.activities)
        }
    }
</script>

<style scoped>

</style>