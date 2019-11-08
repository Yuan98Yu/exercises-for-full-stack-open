const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0-0gczo.mongodb.net/full-stack?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personScheme = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personScheme)

if (process.argv.length < 4) {
    Person
        .find({})
        .then(response => {
            console.log('phonebook:')
            response.forEach(person => console.log(`${person.name} ${person.number}`))
            mongoose.connection.close()
        })
        .catch(error => console.log(error))
}
else {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number
    })

    person
        .save()
        .then(response => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
        .catch(error => console.log(error))
}
