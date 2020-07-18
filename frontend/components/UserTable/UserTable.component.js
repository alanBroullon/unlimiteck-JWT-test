import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Queries from "GraphQL/queries";

@Component()
export default class UserTable extends Vue {
userList = []

    mounted() {
        axios.post(
            '/graphql',
            {
                query: Queries.getAllUsers,
            }).then((response) => {
            this.userList = response.data.data.allUsers;
        });
    }
}
