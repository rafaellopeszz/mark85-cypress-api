const { MongoClient } = require('mongodb')
const mongoUri = 'mongodb+srv://rafaellopeszz:xperience@cluster0.qyd89x9.mongodb.net/markdb?retryWrites=true&w=majority'
const client = new MongoClient(mongoUri)

async function connect() {
    await client.connect()
    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }