import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Header from "Components/Header";
import FileUploader from "Components/FileUploader";
import Queries from "GraphQL/queries";

@Component({
    components: {
        Header,
        FileUploader,
    }
})
export default class HomeView extends Vue {
    image = null;

    /**
     * Verify the user role to know the actions can do.
     */
    mounted() {
        axios.post('/graphql',
            {
                query: Queries.getUserRole
            }).then((response) => {
            const role = response.data.data.userRole;
            if (role.isSuperuser) {
                this.$store.commit('setUserRole', 'superUser');
            } else {
                this.$store.commit('setUserRole', 'staff');
            }
        });
    }

    get role() {
        return this.$store.getters.getUserRole

    }

}
