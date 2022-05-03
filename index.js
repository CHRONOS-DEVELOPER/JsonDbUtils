/* Importing the file system module. */
const fs = require('fs');


/* Creating an empty object for DataBase */
var DB = {}

/* Creating an empty object for Tables. */
var Tables = {}

/* Creating a constant variable called config that is an object with two properties, DB_PATH and
DB_BACKUP_PATH for configuration DataBase and Backup path */
const config = {
    DB_PATH: "./DataBase",
    DB_BACKUP_PATH: "./Backup"
}

const Db = {
    /* A function that is setting the path of the DataBase. */
    path: (path) => {
        config.DB_PATH = path

    },

    /* A function that is setting the path of the Backup. */
    BackupPath: (path) => {
        config.DB_BACKUP_PATH = path

    },

    /* Creating a DataBase and saving it in a file. */
    InitDatabase: async(TimeInterval) => {
        await fs.readFile(config.DB_PATH + '/DataBase.json', 'utf8', (err, data) => {
            /* Creating a folder called DataBase. */
            if (err) {
                fs.mkdir(config.DB_PATH, {}, (err) => {
                    if (err) {
                        console.error(err);
                    } else /* Creating a file called DataBase.json in the DataBase folder. */ {
                        console.log("DataBase Created successfully");
                        fs.writeFile(config.DB_PATH + '/DataBase.json', JSON.stringify(DB), (err) => {
                            if (err) console.error(err);
                        })
                    }
                })

            } else /* Loading the DataBase. */ {
                console.log("DataBase Loaded successfully")
                DB = JSON.parse(data)
            }
            /* Update DataBase every Time-Interval seconds. */
            if (TimeInterval) {
                setInterval(() => {
                    fs.writeFile(config.DB_PATH + '/DataBase.json', JSON.stringify(DB), (err) => {
                        if (err) console.error(err);
                        console.log("DataBase Update Successfully")
                    })
                }, TimeInterval * 1000)
            }

        })
    },

    /* Creating a backup of the DataBase. */
    InitBackup: (TimeInterval) => {
        /* Reading the file Backup.json in the Backup folder. */
        fs.readFile(config.DB_BACKUP_PATH + '/Backup.json', 'utf8', (err, data) => {
            /* Reading the file Backup.json in the Backup folder. */
            if (err) {
                /* Creating a folder called Backup. */
                fs.mkdir(config.DB_BACKUP_PATH, {}, (err) => {

                    /* Checking if there is an error and if there is, it will print the error. */
                    if (err) {
                        console.error(err);
                    } else /* Creating a backup of the DataBase. */ {
                        console.log("Backup Initialization Successfully")
                        data = [DB]
                            /* Writing the data in the file Backup.json in the Backup folder. */
                        fs.writeFile(config.DB_BACKUP_PATH + '/Backup.json', JSON.stringify(data), (err) => {
                            if (err) console.error(err);
                        })
                    }
                })

            } else /* Loading the backup. */ {
                console.log("Backup Loaded Successfully")
                data = JSON.parse(data)

            }
            /* Creating a backup of the DataBase every TimeInterval seconds. */
            if (TimeInterval) {
                setInterval(() => {
                    console.log("New Backup Point Created")
                    data.push(DB)
                    fs.writeFile(config.DB_BACKUP_PATH + '/Backup.json', JSON.stringify(data), (err) => {
                        if (err) console.error(err);
                    })
                }, TimeInterval * 1000)
            }
        })

    },

    /* Creating a table in the DataBase. */
    CreateTable: (TableName, Itens) => {
        data = []
        DB[TableName] = {}
        Itens.forEach(element => {
            data.push(element)
            DB[TableName][element] = []
        })
        Tables[TableName] = data

    },

    /* Searching for a value in a table with Iten`s Name */
    SearchInTable: (TableName, Itens, Value) => {
        /* Searching for a value in a table. */
        let data = []

        DB[TableName][Itens].forEach((element, id) => {


            if (element == Value) {
                data.push(id)
            }
        });
        /* Creating an array with the results of the search. */
        dataresult = []
        i = 0
        data.forEach(elementID => {
                dataresult.push({})
                Tables[TableName].forEach((element, id) => {
                    dataresult[i][element] = DB[TableName][element][elementID]
                })
                dataresult[i]["id"] = elementID
                i++
            })
            /* Returning the result of the search. */
        return dataresult
    },

    /* Adding data in a table. */
    SetDataInTable: (TableName, Itens, Data) => {

        Itens.forEach((element, id) => {
            DB[TableName][element].push(Data[id])
        })

    },

    /* Deleting data in a table. */
    DeleteDatainTable: (TableName, table) => {

        /* Going through all the elements of the table. */
        Tables[TableName].forEach(element => {
            /* Deleting the element in the table. */
            DB[TableName][element].splice(id, 1)
        });

    },

    /* Returning the DataBase. */
    all: () => {
        return DB
    }
}

module.exports = {
    Db
}