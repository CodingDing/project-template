<template>
    <div>{{test}}</div>
</template>
<script>
    export default{
        el: '#app',
        data: {
            test: 'hello world'
        }
    }
</script>
<style lang="sass?outputStyle=expanded">
    body{
        padding: 0;
        margin: 0;
        div {
            color: #006666;
            background-color: #004444;
        }
    }
</style>