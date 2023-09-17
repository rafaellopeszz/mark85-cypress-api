describe('POST / sessions', () => {

    it('user session', () => {

        cy.fixture('users').then((users) => {
            const userData = users.login

            cy.task('removeUser', userData.email)
            cy.postUser(userData)

            cy.postSession(userData)
                .then(response => {

                    expect(response.status).to.eq(200)

                    const { user, token } = response.body

                    expect(user.name).to.eq(userData.name)
                    expect(user.email).to.eq(userData.email)
                    expect(token).not.to.be.empty
                })
        })
    })

    it('email not found', () => {

        cy.fixture('users').then((users) => {
            const user = users.email_404

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.eq(401)
                })
        })
    })

    it('invalid password', () => {

        cy.fixture('users').then((users) => {
            const user = users.inv_pass

            cy.postSession(user)
                .then(response => {
                    expect(response.status).to.eq(401)
                })
        })
    })
})