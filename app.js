const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
app.use(morgan('combined'))

app.get("/", (req, res) => {
    console.log("responding to root route")
    res.send("Hello from ROOT")
})

app.get("/api/register", (req, res) => {
    var user1 = { teacher: "teacherken@gmail.com", lastname: "kumar" }
    const user2 = { firstname: "Raju", lastname: "kumar" }
    res.json([user1, user2])
})

app.get("/api/commonstudents", (req, res) => {
    var commstudent = { students: "commonstudent1@gmail.com" }
    res.json([commstudent])
})

app.get("/users/:id", (req, res) => {
    console.log("Fetching User with id: " + req.params.id)
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: ''
    })
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id= ?"
    connection.query(queryString, [userId], (err, row, fields) => {
        if (err) {
            console.log("Failed to query for Users" + err)
            res.sendStatus(500)
            return
            //throw err
        }
        console.log("Fetched successfully")

        const users = rows.map((row) => {
            return { firstName: row.first_name, lastname: row.last_name }
        })
        res.json(rows)
    })

    res.end("Hello from ROOT")
})

//localhost:3003
app.listen(3003, () => {
    console.log("server is up and listening on 3003...")
})