import Vue from 'vue';
import Component from 'vue-class-component';
import Mutations from "GraphQL/mutations";
import axios from "axios";
import BaseLogin from "Components/BaseLogin";
import Header from "Components/Header";

@Component({
    components:{
        BaseLogin,
        Header,
    }
})
export default class HomeView extends Vue {
    image = null;

    dataImage(event) {
        this.image = event.target.files[0];
    }

    /**
     * Send the image as a form data, this is because graphql dosen't support files, so we should append all the
     * information to put in the request header to capture in the back.
     * For more information you can visit the following link to stack overflow: https://bit.ly/3fFsRFj
     */
    uploadImage() {
        let formData = new FormData();
        const query = Mutations.uploadImage;
        const variables = {
            name: this.name,
            note: this.note,
            image: null,
        }
        const operations = JSON.stringify({query, variables});
        const map = {
            '0': ['variables.image']
        };
        formData.append('operations', operations); // opreations is the query
        formData.append('map', JSON.stringify(map));
        formData.append('0', this.image); // the key of the form 0 is the image
        axios.post(
            '/graphql',
            formData).then((response) => {
        }).catch(() => {
        })
    }
}
