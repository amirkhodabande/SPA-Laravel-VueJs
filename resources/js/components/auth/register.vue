<template>

    <div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">

                <header class="card-header">
                    register
                </header>

                <main class="card-body">
                    <form @submit.prevent="register">
                        <div class="form-group row">
                            <label for="name">
                                Name:
                            </label>
                            <input id="name" type="text" v-model="form.name" class="form-control"
                                   placeholder="Your name">
                        </div>

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
                            <button type="submit" class="btn btn-success">Register</button>
                        </div>

                    </form>

                    <!-- Show errors -->
                    <ul class="list-group" v-if="errors">
                        <li v-if="authError">{{ authError }}</li>
                        <li class="alert alert-danger shadow" v-for="(fieldsError, fieldName) in errors"
                            :key="fieldName">
                            <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                        </li>
                    </ul>
                </main>

            </div>
        </div>
    </div>

</template>

<script>
import {register} from '../../helpers/auth'
import {login} from '../../helpers/auth'
import validate from 'validate.js';

export default {
    name: "register",
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
            errors: null,
        };
    },

    computed: {
        authError() {
            return this.$store.getters.authError;
        }
    },

    methods: {
        register() {
            const constraints = this.getConstraints();

            const errors = validate(this.$data.form, constraints)

            if (errors) {
                this.errors = errors;
                return;
            }

            register(this.$data.form)
                .then((res) => {

                    //login user after registeration completed
                    this.$store.dispatch('login');

                    login(this.$data.form)
                        .then((res) => {
                            this.$store.commit("loginSuccess", res);
                            this.$router.push({path: '/'});
                        })
                        .catch((error) => {
                            this.$store.commit("loginFailed", {error});
                        });

                })
                .catch((error) => {

                    console.log("error error")

                })

        },

        getConstraints() {
            return {
                name: {
                    presence: true,
                    length: {
                        minimum: 3,
                        message: 'Must be at least 3 charactors long'
                    }
                },
                email: {
                    presence: true,
                    email: true,
                },
                password: {
                    presence: true,
                    length: {
                        minimum: 8,
                        message: 'Must be at least 8 charactors long'
                    }
                }
            }
        },
    },
}
</script>

<style scoped>
li {
    list-style: none;
}
</style>
