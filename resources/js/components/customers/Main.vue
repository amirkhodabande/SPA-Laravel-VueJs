<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <section class="card card-default">

                <header class="card-header">
                    Customers
                </header>

                <main class="card-body">
                    <router-view></router-view>
                </main>

            </section>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'customers-main'
}
</script>
