import Vue from 'vue';
import Component from 'vue-class-component';
import axios from "axios";
import Queries from "GraphQL/queries";
import Mutations from "GraphQL/mutations";

@Component()
export default class UserTable extends Vue {
    userList = [];

    mounted() {
        this.getAllUsers();
    }

    /**
     * Get the users from the data base.
     */
    getAllUsers() {
        axios.post(
            '/graphql',
            {
                query: Queries.getAllUsers,
            }).then((response) => {
            this.userList = response.data.data.allUsers;
        });
    }

    /**
     * Generate the columns based on the information we have. In this case is all the users.
     * For more information visit the following link https://www.developerdrive.com/creating-a-data-table-in-vue-js/
     *
     * @returns {string[]|*[]}
     */
    get gridColumns() {
        if (this.userList.length === 0) {
            return [];
        }
        return Object.keys(this.userList[0]);
    }

    /**
     * Delete selected user and refech the userList.
     * @param userId {Number} The id of the user, cant be null.
     */
    deleteUser(userId) {
        axios.post(
            '/graphql',
            {
                query: Mutations.deleteUser,
                variables: {
                    userId: userId
                }
            }).then((response) => {
            if (response.data.data.deleteUser.ok) {
                this.getAllUsers();
            }
        });
    }

    givePermissions(userId, permissions) {
        axios.post(
            '/graphql',
            {
                query: Mutations.givePermissions,
                variables: {
                    userId: userId,
                    permissions: permissions
                }
            }).then((response) => {
            if (response.data.data.givePermissions.ok) {
                this.getAllUsers();
            }
        });
    }
}
