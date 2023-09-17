describe('PUT /tasks/:id/done', () => {
    it('update task to done', () => {
        cy.fixture('tasks/put').then((tasks) => {
            const { user, task } = tasks.update

            cy.task('removeTask', task.name)
            cy.task('removeUser', user.email)
            cy.postUser(user)
            cy.postSession(user)
                .then(respUser => {

                    cy.postTask(task, respUser.body.token)
                        .then(respTask => {

                            cy.putTaskDone(respTask.body._id, respUser.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(204)
                                })

                            cy.getUniqueTask(respTask.body._id, respUser.body.token)
                                .then(response => {
                                    expect(response.body.is_done).to.be.true
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


                            cy.putTaskDone(respTask.body._id, respUser.body.token)
                                .then(response => {
                                    expect(response.status).to.eq(404)
                                })
                        })
                })
        })
    })
})