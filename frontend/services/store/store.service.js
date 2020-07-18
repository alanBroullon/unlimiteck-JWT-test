import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userRole: null,
    },
    getters: {
        getUserRole(state) {
            return state.userRole;
        },
    },
    mutations: {
        setUserRole(state, payload) {
            state.userRole = payload;
        },
    },
    actions: {},
});
