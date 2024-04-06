const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express();

app.set('view engine', 'ejs');

app.use('/static',express.static(path.join(__dirname,'public')))

const users = require("./routes/users")
const home = require("./routes/home")

app.use(cors())
app.use(express.json())

app.use('/users',users)
app.use('/',home)

const port = process.env.PORT || 3000


app.listen(port,()=> console.log(`Lİstening port on ${port}`))

