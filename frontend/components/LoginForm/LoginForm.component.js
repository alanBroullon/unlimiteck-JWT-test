import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Mutations from "GraphQL/mutations";

@Component()
export default class LoginForm extends Vue {
    userName = '';
    password = '';

    /**
     * Send username and password to the mutation, both vars can't be null.
     */
    login() {
        axios.post(
            '/graphql',
            {
                query: Mutations.login,
                variables: {
                    username: this.userName,
                    password: this.password
                }
            }).then((response) => {
        });
    }
}
