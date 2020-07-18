const Mutations = {
    login: `
        mutation login($username: String!, $password: String!) {
            tokenAuth(username: $username, password: $password) {
                token
                payload
            }
        }
    `,
    register: `
        mutation registration($fields: RegisterFieldsType) {
            register(fields: $fields) {
                ok
                errors
            }
        }
    `,
    logout: `
        mutation {
          deleteTokenCookie {
            deleted
          }
        }
    `,

    uploadImage: `
            mutation ($image: Upload, $name: String!, $note: String!) {
                uploadImage(image: $image, name: $name, note: $note) {
                    ok
                    errors
                }
            }
        `,
};

export default Mutations;
