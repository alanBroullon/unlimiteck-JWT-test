const Queries = {
    getIsAuthenticated: `
        query isAuthenticated {
            isAuthenticated
        }
    `,
    getUserRole: `
        query userRole {
            userRole {
              id
              isStaff
              isSuperuser
            }
        }
    `,
    getAllUsers: `
        query allUsers {
          allUsers {
            firstName
            lastName
            email
             isStaff
             isSuperuser
           }

        }
    `,
};

export default Queries;
