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
};

export default Queries;
