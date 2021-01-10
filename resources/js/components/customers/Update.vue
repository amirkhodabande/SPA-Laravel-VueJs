<template>
    <div>
        <form @submit.prevent="update">
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
                        <button class="btn btn-primary ">Update</button>
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
    name: 'update',

    created() {
        if (this.customers.length) {
            this.customer = this.customers.find((customer) => customer.id == this.$route.params.id);
        } else {
            axios.get(`/api/customers/${this.$route.params.id}`)
                .then((response) => {
                    this.customer = response.data.customer
                })
        }
    },


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
        update() {
            this.errors = null;

            const constraints = this.getConstraints();

            const errors = validate(this.$data.customer, constraints)

            if (errors) {
                this.errors = errors;
                return;
            }

            axios.put(`/api/customers/${this.$route.params.id}`, this.$data.customer)
                .then((response) => {

                    if(this.customers.length) {
                        const index = this.customers.findIndex(item => {
                            return (this.$data.customer.id === item.id)
                        })
                        this.customers.splice(index, 1, this.$data.customer)
                    }

                    this.$toaster.success(
                        `Customer: ${this.$data.customer.name}, Updated successfuly.`
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
