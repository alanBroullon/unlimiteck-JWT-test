import Vue from 'vue';
import Router from 'vue-router';
import HomeView from 'Components/HomeView';
import BaseLogin from 'Components/BaseLogin';
import axios from 'axios';
import Queries from "GraphQL/queries";
import UserNotes from "Components/UserNotes";

Vue.use(Router);

const AppRouter = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'baseLogin',
            component: BaseLogin,

        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/mis-notas/',
            name: 'userNotes',
            component: UserNotes,
        },
    ]
});

/**
 *Verify if the user is logged in before entering a route. I used this way because i dont have store scope here.
 * @param to
 * @param from
 * @param next
 */
AppRouter.beforeEach((to, from, next) => {
    axios.post('/graphql',
        {
            query: Queries.getIsAuthenticated
        }).then((response) => {
        const isAuthenticated = response.data.data.isAuthenticated;
        if (to.name !== 'baseLogin' && !isAuthenticated) {
            next({name: 'baseLogin'});
        } else if (to.name === 'baseLogin' && isAuthenticated) {
            next({name: 'home'});
        } else {
            next();
        }
    });
});

export default AppRouter;
