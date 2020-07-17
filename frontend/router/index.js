import Vue from 'vue';
import Router from 'vue-router';
import App from 'Components/App';

Vue.use(Router);

const AppRouter = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: App
        },
    ]
});

export default AppRouter;
