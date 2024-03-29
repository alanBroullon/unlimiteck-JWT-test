import Vue from 'vue';
import Component from 'vue-class-component';
import UserTable from "Components/UserTable";
import NoteModal from "Components/NoteModal";
import Queries from "GraphQL/queries";
import axios from "axios";

@Component({
    components: {
        NoteModal,
        UserTable,
    }
})
export default class HomeView extends Vue {
    image = null;
    showFileModal = false;

    /**
     * Open/Close file upload modal.
     */
    toggleModal() {
        this.showFileModal = !this.showFileModal;
    }

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

    /**
     * Get the role to know with actions could do.
     * @returns {String} the user role, could be null.
     */
    get role() {
        return this.$store.getters.getUserRole;
    }

    /**
     * Get the token to show them
     * @returns {any} The token information
     */
    get tokenPayload(){
        return this.$store.getters.getTokenPayload;
    }

}
