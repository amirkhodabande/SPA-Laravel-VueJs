<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="">
                SPA with Laravel and VueJs
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">

                    <template v-if="!currentUser">
                        <li>
                            <router-link to="/login" class="nav-link">Login</router-link>
                        </li>
                        <li>
                            <router-link to="/register" class="nav-link">register</router-link>
                        </li>
                    </template>

                    <template v-else>
                        <li>
                            <router-link to="/customers" class="nav-link">Customers</router-link>
                        </li>
                        <li class="item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                {{currentUser.name}} <span class="caret"></span>
                            </a>

                            <div class="dropdown-menu">
                                <a href="#" @click.prevent="logout" class="dropdown-item">Logout</a>
                            </div>
                        </li>
                    </template>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "app-header",

    computed: {
      currentUser() {
          return this.$store.getters.currentUser;
      }
    },

    methods: {
        logout() {
            this.$store.commit('logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>

</style>
