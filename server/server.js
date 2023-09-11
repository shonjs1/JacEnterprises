const express = require('express')
const app = express()
const names =['James', 'John', 'Jeff', 'Jim']
//const cors = require('cors');

//app.use(cors());

app.get("/users", (req,res) => {
    res.json(names)
})

app.listen(5000, () => {console.log("Server started on port 5000")})

