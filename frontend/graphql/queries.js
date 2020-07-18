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
          id
            firstName
            lastName
            email
             isStaff
             isSuperuser
           }

        }
    `,
    getUserNotes: `
    query userNotes {
      userNotes {
        name
        note
        image    
      }
    }
    `,

};

export default Queries;
