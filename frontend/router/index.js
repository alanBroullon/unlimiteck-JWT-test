import Vue from 'vue';
import Router from 'vue-router';
import HomeView from 'Components/HomeView';
import BaseLogin from 'Components/BaseLogin';
import axios from 'axios';
import Mutations from 'GraphQL/mutations';
import Queries from "GraphQL/queries";
import App from "Components/App/";
import store from "Services/store"

Vue.use(Router);

const AppRouter = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'basLogin',
            component: BaseLogin,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            beforeEnter(to, from, next) {
                axios.post('/graphql',
                    {
                        query: Queries.getIsAuthenticated
                    }).then((response) => {
                    if (!response.data.data.isAuthenticated) {
                        next({
                            name: 'baseLogin'
                        });
                    }
                    next();
                });
            },
        },
        {
            path: '/',
            name: 'app',
            component: App,
            beforeEnter(to, from, next) {
                axios.post('/graphql',
                    {
                        query: Queries.getIsAuthenticated
                    }).then((response) => {
                    if (response.data.data.isAuthenticated) {
                        next({
                            name: 'home'
                        });
                    } else {
                        next({
                            name: 'baseLogin'
                        });
                    }
                    next();
                });
            },
        },
    ]
});

export default AppRouter;
