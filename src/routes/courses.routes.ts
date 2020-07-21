import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import CoursesRepository from '../repositories/CoursesRepository'
import CoursesService from '../services/CoursesService'
import Course from '../database/entity/Course'

const coursesRouter = Router()

coursesRouter.get('/', async (request, response) => {
  const coursesRepository = getCustomRepository(CoursesRepository)

  const courses = await coursesRepository.find({
    relations: ['users'],
    order: {
      title: 'ASC'
    }
  })

  return response.json(courses)
})

coursesRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  try {
    const coursesRepository = getCustomRepository(CoursesRepository)
    const course = await coursesRepository.findOne(id)

    if(!course) {
      return new Error("Course not found")
    }

    return response.json(course)
  } catch (error) {
    console.log(error)
    new Error("User error" + error)
  }
})

coursesRouter.get('/:id/users', async (request, response) => {
  const { id } = request.params
  try {
    const coursesRepository = getCustomRepository(CoursesRepository)
    const course = await coursesRepository.find({
      where: { id }, 
      relations: ['users']
    })

    if(!course) {
      return new Error("Course not found")
    }

    return response.json(course)
  } catch (error) {
    console.log(error)
    new Error("User error" + error)
  }
})



coursesRouter.post('/', async (request, response) => {
  try {
    const { id, title, description, workload } = request.body

    const coursesService = new CoursesService()

    const course = await coursesService.save({
      id,
      title,
      description,
      workload,
      userIds: []
    })

    return response.json(course)

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

coursesRouter.put('/', async (request, response) => {
  try {
    const { id, title, description, workload, userIds } = request.body

    const coursesService = new CoursesService()

    const address = await coursesService.update({
      id,
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

coursesRouter.patch('/', async (request, response) => {
  try {
    const { id, title, description, workload } = request.body

    const coursesService = new CoursesService()

    const address = await coursesService.updatePartial({
      id,
      title,
      description,
      workload
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


coursesRouter.delete('/:idCourse/:idUser', async (request, response) => {
  try {
    const { idCourse, idUser } = request.params

    const coursesRepository = getCustomRepository(CoursesRepository)

    await coursesRepository.createQueryBuilder()
      .relation(Course, "users")
      .of(idCourse)
      .remove(idUser)

    return response.json()
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default coursesRouter