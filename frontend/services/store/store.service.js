import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userRole: null,
        tokenPayload: null
    },
    getters: {
        getUserRole(state) {
            return state.userRole;
        },
        getTokenPayload(state) {
            return state.tokenPayload;
        },
    },
    mutations: {
        setUserRole(state, payload) {
            state.userRole = payload;
        },
        setTokenPayload(state, payload) {
            state.tokenPayload = payload;
        },
    },
    actions: {},
});
