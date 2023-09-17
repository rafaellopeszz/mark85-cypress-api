describe('GET /tasks', () => {

    it('get my tasks', () => {

        cy.fixture('tasks/get').then((tasks) => {
            const { user, task } = tasks.list

            cy.task('removeTaskLike', 'Estud4r')
            cy.task('removeUser', user.email)
            cy.postUser(user)

            cy.postSession(user)
                .then(respUser => {
                    task.forEach((e) => {
                        cy.postTask(e, respUser.body.token)
                    })

                    cy.getTask(respUser.body.token)
                        .then(response => {
                            expect(response.status).to.eq(200)
                        }).its('body')
                        .should('be.an', 'array')
                        .and('have.length', task.length)
                })
        })
    })
})

describe('GET /tasks/:id', () => {
    it('get unique task', () => {
        cy.fixture('tasks/get').then((tasks) => {
            const { user, task } = tasks.unique

            cy.task('removeTask', task.name)
            cy.task('removeUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(respUser => {

                    cy.postTask(task, respUser.body.token)
                        .then(respTask => {

                            cy.getUniqueTask(respTask.body._id, respUser.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(200)
                                })
                        })
                })
        })
    })
    it('task not found', () => {

        cy.fixture('tasks/get').then((tasks) => {
            const { user, task } = tasks.not_found

            cy.task('removeTask', task.name)
            cy.task('removeUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(respUser => {

                    cy.postTask(task, respUser.body.token)
                        .then(respTask => {

                            // let taskId = respTask.body._id
                            // cy.log(taskId)

                            cy.deleteTask(respTask.body._id, respUser.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(204)
                                })

                            cy.getUniqueTask(respTask.body._id, respUser.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(404)
                                })
                        })
                })
        })
    })
})