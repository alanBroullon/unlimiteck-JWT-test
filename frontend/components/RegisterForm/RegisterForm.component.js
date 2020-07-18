import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Mutations from "GraphQL/mutations";

@Component()
export default class RegisterForm extends Vue {
    firstName = 'rolon';
    lastName = 'brou';
    email = 'rolon@gmail.com';
    password = '123456789a';
    formErrors =''

    /**
     * Send user registration data, any vars can't be null, in case the email alrady exist it's not going to register.
     */
    register() {
        axios.post(
            '/graphql',
            {
                query: Mutations.register,
                variables: {
                    fields: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                    }
                }
            }).then((response) => {
                const registerResponse = response.data.data.register;
                if(!registerResponse.ok) {
                    debugger
                    this.formErrors = registerResponse.errors[0].message;
                }
        });
    }
}
