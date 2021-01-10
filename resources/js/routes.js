import Home from "./components/Home";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
//Customers

import CustomersMain from "./components/customers/Main"
import CustomersList from "./components/customers/List"
import NewCustomer from "./components/customers/New"
import EditCustomer from "./components/customers/Update"
import Customer from "./components/customers/View"

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/customers',
        component: CustomersMain,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: CustomersList
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: ':id',
                component: Customer
            },
            {
                path: 'edit/:id',
                component: EditCustomer
            },
        ]
    },
]
