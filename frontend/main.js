import Vue from 'vue';
import bootstrap from 'bootstrap';
import App from 'Components/App';
import router from './router';
import store from 'Services/store';

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    bootstrap,
    render: h => h(App)
});
