describe('POST /users', () => {
  it('register a new user', () => {
    
    cy.fixture('users').then((users)=>{
      const user = users.create
  
      cy.task('removeUser', user.email)
      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(201)
        })
    })
  })

  it('duplicate email', () => {

    cy.fixture('users').then((users)=>{
      const user = users.dup_email
  
      cy.task('removeUser', user.email)
  
      cy.postUser(user)
  
      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(409)
          expect(response.body.message).to.eq('Duplicated email!')
        })
    })
  })

  context('required fields', () => {

    let user;

    beforeEach(() => {

      cy.fixture('users').then((users)=>{
        user = users.required
      })
    })

    it('name is required', () => {

      delete user.name

      //      const {message} = response.body

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"name\" is required')
        })
    })

    it('email is required', () => {

      delete user.email

      //      const {message} = response.body

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"email\" is required')
        })
    })

    it('password is required', () => {

      delete user.password

      //      const {message} = response.body

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
          expect(response.body.message).to.eq('ValidationError: \"password\" is required')
        })
    })

  })

})
