describe('DELETE /tasks/:id', () => {
    it('remove a task', () => {
        cy.fixture('tasks/delete').then((tasks) => {
            const { user, task } = tasks.remove

            cy.task('removeTask', task.name)
            cy.task('removeUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(respUser => {

                    cy.postTask(task, respUser.body.token)
                        .then(respTask => {

                            let taskId = respTask.body._id
                            cy.log(taskId)

                            cy.deleteTask(taskId, respUser.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(204)
                                })
                        })
                })
        })
    })

    it('task not found', () => {

        cy.fixture('tasks/delete').then((tasks) => {
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

                            cy.deleteTask(respTask.body._id, respUser.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(404)
                                })
                        })
                })
        })
    })
})