import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import CoursesRepository from '../repositories/CoursesRepository'
import CoursesService from '../services/CoursesService'

const coursesRouter = Router()

coursesRouter.get('/', async (request, response) => {
  const coursesRepository = getCustomRepository(CoursesRepository)
  const courses = await coursesRepository.find()

  return response.json(courses)
})

coursesRouter.post('/', async (request, response) => {
  try {
    const { title, description, workload, userIds } = request.body

    const coursesService = new CoursesService()

    const address = await coursesService.save({
      title,
      description,
      workload,
      userIds
    })

    return response.json(address)

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

coursesRouter.put('/:id', async (request, response) => {
  try {
    const { title, description, workload, userIds } = request.body
    const { id } = request.params

    const coursesService = new CoursesService()

    const address = await coursesService.update(id, {
      title,
      description,
      workload,
      userIds
    })

    return response.json(address)

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

coursesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const coursesRepository = getCustomRepository(CoursesRepository)

    await coursesRepository.delete(id)

    return response.json()

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default coursesRouter