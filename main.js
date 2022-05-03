/* Importing the database module. */
const { Db } = require('./index')

/* Initializing the database. */
Db.InitDatabase(10).then(() => {
    /* Creating a table called Users with 3 columns: name, email and password. */
    Db.CreateTable("Users", ["name", "email", "password"])


})

setTimeout(() => {
    Db.SetDataInTable("Users", ["name", "email", "password"], ["jose savio", "jsoliveira1032000@gmail.com", "jse1003811996058530"])
    Db.SetDataInTable("Users", ["name", "email", "password"], ["jose samuel", "jsoliveira1032000@gmail", "jse10038119960"])
    data = Db.SearchInTable("Users", "name", "jose savio")

    Db.DeleteDatainTable("Users", data[0].id)
}, 2000)


Db.InitBackup(10)