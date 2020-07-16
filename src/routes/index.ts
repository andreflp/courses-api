import { Router } from 'express'
import coursesRouter from './courses.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/courses', coursesRouter)
routes.use('/users', usersRouter)

export default routes