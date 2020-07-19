import Vue from 'vue';
import Component from 'vue-class-component';
import RegisterForm from "Components/RegisterForm";
import LoginForm from "Components/LoginForm";

import axios from "axios";
import Mutations from "GraphQL/mutations";

@Component({
    components: {
        RegisterForm,
        LoginForm,
    }
})
export default class BaseLogin extends Vue {
    showRegisterForm = false;

    /**
     * Show register component, events can call this function.
     */
    displayRegistration(){
            this.showRegisterForm = !this.showRegisterForm;
    }

}
