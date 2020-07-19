import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Mutations from "GraphQL/mutations";

@Component()
export default class LoginForm extends Vue {
    userName = '';
    password = '';
    formErrors = '';


    /**
     * Emit event to BaseLogin component to show the registration component.
     */
    showRegister() {
        this.$emit('showRegistrationForm');
    }

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
            if (response.data.data.tokenAuth !== null) {
                this.$store.commit('setTokenPayload', response.data.data);
                this.$router.push('/');
            } else {
                this.formErrors = 'Usuario o contraseña; incorrectos';
            }
        });
    }
}
