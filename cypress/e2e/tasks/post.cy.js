describe('POST /tasks', () => {

    it('register a new task', () => {
        cy.fixture('tasks/post').then((tasks) => {

            const { user, task } = tasks.create

            cy.task('removeUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(userResp => {

                    // let userId = userResp.body.user._id
                    // cy.log(userId)

                    cy.task('removeTask', task.name)
                    cy.postTask(task, userResp.body.token).then(response => {
                        expect(response.status).to.eq(201)
                        expect(response.body.name).to.eq(task.name)
                        expect(response.body.tags).to.eql(task.tags)
                        expect(response.body.is_done).to.be.false
                        expect(response.body.user).to.eq(userResp.body.user._id)
                        expect(response.body._id.length).to.eq(24)
                    })
                })
        })
    })

    it('duplicate task', () => {
        cy.fixture('tasks/post').then((tasks) => {

            const { user, task } = tasks.dup

            cy.task('removeUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(userResp => {
                    // let userId = userResp.body.user._id
                    // cy.log(userId)

                    cy.task('removeTask', task.name)
                    cy.postTask(task, userResp.body.token)

                    cy.postTask(task, userResp.body.token).then(response => {
                        expect(response.status).to.eq(409)
                        expect(response.body.message).to.eq('Duplicated task!')
                    })
                })
        })
    })

})