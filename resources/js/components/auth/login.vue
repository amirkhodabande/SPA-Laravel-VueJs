<template>

    <div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">

                <header class="card-header">
                    login
                </header>

                <main class="card-body">
                    <form @submit.prevent="authenticate">
                        <div class="form-group row">
                            <label for="email">
                                Email:
                            </label>
                            <input id="email" type="text" v-model="form.email" class="form-control"
                                   placeholder="Email Address">
                        </div>

                        <div class="form-group row">
                            <label for="password">
                                Password:
                            </label>
                            <input id="password" type="text" v-model="form.password" class="form-control"
                                   placeholder="Enter your password">
                        </div>

                        <div class="form-group row">
                            <button type="submit" class="btn btn-success">Login</button>
                        </div>

                        <!-- Show errors -->
                        <ul class="list-group" v-if="authError">
                            <li class="alert alert-danger  shadow">
                                {{ authError }}
                            </li>
                        </ul>
                    </form>
                </main>

            </div>
        </div>
    </div>

</template>

<script>
import {login} from '../../helpers/auth'

export default {
    name: "login",
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            error: null,
        };
    },

    computed: {
        authError() {
            return this.$store.getters.authError;
        }
    },

    methods: {
        authenticate() {
            this.$store.dispatch('login');

            login(this.$data.form)
                .then((res) => {
                    this.$store.commit("loginSuccess", res);
                    this.$router.push({path: '/'});
                })
                .catch((error) => {
                    this.$store.commit("loginFailed", {error});
                });
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
}
</style>
