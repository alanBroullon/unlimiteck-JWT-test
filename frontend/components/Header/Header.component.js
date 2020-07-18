import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Mutations from "GraphQL/mutations";

@Component()
export default class Header extends Vue {

    logout() {
        axios.post(
            '/graphql',
            {
                query: Mutations.logout,
            })
    }
}
