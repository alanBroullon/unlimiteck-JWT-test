import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Mutations from "GraphQL/mutations";

@Component()
export default class Header extends Vue {
    showMenu = false;

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    /**
     * Delete the auth token and redirect to the login view.
     */
    logout() {
        axios.post(
            '/graphql',
            {
                query: Mutations.logout,
            }).then((response) => {
                this.$router.push('login');
        });
    }
}
