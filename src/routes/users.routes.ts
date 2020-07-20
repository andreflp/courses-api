import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import UsersService from '../services/UsersService'

const usersRouter = Router()

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository)

  const users = await usersRepository.find({
    order: {
      name: 'ASC'
    }
  })

  return response.json(users)
})


usersRouter.get('/associate', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository)
  const { userIds } = request.query
  let users

  console.log('userIds', userIds)
 
  const query = usersRepository
    .createQueryBuilder('user')
    .where(`user.id NOT IN (${userIds})`)

  try {
    users = await query.getMany()  
    console.log(users)
    return response.json(users)
  } catch (error) {
    return new Error(`User error ${error}`)
  }
})


usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  try {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findOne(id)

    if(!user) {
      return new Error("User not found")
    }

    return response.json(user)
  } catch (error) {
    new Error(`User error ${error}`)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const { name, phone, address, number, zip_code, city, state, country, admission_date } = request.body

    const usersService = new UsersService()

    const user = await usersService.save({
      name,
      phone,
      address,
      number,
      zip_code,
      city,
      state,
      country,
      admission_date
    })

    return response.json(user)

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

usersRouter.put('/', async (request, response) => {
  try {
    const { id, name, phone, address, number, zip_code, city, state, country, admission_date } = request.body

    const usersService = new UsersService()

    const user = await usersService.update(id, {
      name,
      phone,
      address,
      number,
      zip_code,
      city,
      state,
      country,
      admission_date
    })

    return response.json(user)

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const usersRepository = getCustomRepository(UsersRepository)

    await usersRepository.delete(id)

    return response.json()
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default usersRouter