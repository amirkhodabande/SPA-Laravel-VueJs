<template>

    <div class="container">
        <section class="card col-8 m-auto">
            <app-header class="card-header font-weight-bolder">SPA with Laravel and VueJs</app-header>
            <main class="card-body">{{welcome}}</main>
        </section>
    </div>

</template>

<script>
export default {
    name: "Home",
    computed: {
        welcome() {
            return this.$store.getters.welcome
        }
    }
}
</script>

<style scoped>

</style>
