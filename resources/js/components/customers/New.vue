<template>
    <div>
        <form @submit.prevent="add">
            <table class="table">
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.name" placeholder="Customer Name">
                    </td>
                </tr>

                <tr>
                    <th>Email</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.email" placeholder="Customer Email">
                    </td>
                </tr>

                <tr>
                    <th>Phone</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer Phone">
                    </td>
                </tr>

                <tr>
                    <th>Website</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.website"
                               placeholder="Customer Website">
                    </td>
                </tr>

                <tr>
                    <td>
                        <router-link to="/customers" class="btn">Cancle</router-link>
                    </td>
                    <td class="text-right ">
                        <button class="btn btn-primary ">Create</button>
                    </td>
                </tr>
            </table>
        </form>

        <!-- Show errors -->
        <ul class="list-group" v-if="errors">
            <li class="alert alert-danger shadow" v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
            </li>
        </ul>

    </div>
</template>

<script>
import validate from 'validate.js';

export default {
    name: 'new',

    data() {
        return {
            customer: {
                name: '',
                email: '',
                phone: '',
                website: '',
            },
            errors: null,
        }
    },

    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
        customers() {
            return this.$store.state.customers;
        }
    },

    methods: {
        add() {
            this.errors = null;

            const constraints = this.getConstraints();

            const errors = validate(this.$data.customer, constraints)

            if (errors) {
                this.errors = errors;
                return;
            }

            axios.post('/api/customers', this.$data.customer)
                .then((response) => {
                    this.customers.unshift(response.data.customer)

                    this.$toaster.success(
                        `Customer: ${this.$data.customer.name}, Created successfuly.`
                    );
                    this.$router.push('/customers')
                });

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
                phone: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 10,
                        message: 'Must be at least 10 digits long'
                    }
                },
                website: {
                    presence: true,
                    url: true
                }
            }
        },
    }
}
</script>

<style scoped>
li {
    list-style: none;
}
</style>
