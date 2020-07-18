import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Queries from "GraphQL/queries";

@Component()
export default class UserNotes extends Vue {
    myNotesList = [];

    /**
     * Get the user notes to be render.
     */
    mounted() {
        axios.post('/graphql',
            {
                query: Queries.getUserNotes
            }).then((response) => {

                this.myNotesList = response.data.data.userNotes;
        });
    }
}
