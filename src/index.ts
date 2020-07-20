import "reflect-metadata"
import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from 'cors'

import './database'
import routes from "./routes/index"

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
    console.log('Running on port 3000')
})
