import CoursesRepository from '../repositories/CoursesRepository'
import { getCustomRepository } from 'typeorm'
import Course from '../database/entity/Course'
import UsersRepository from '../repositories/UsersRepository'
import User from '../database/entity/User'

interface Request {
  title: string
  description: string
  workload: string
  userIds: number[]
}

class CoursesService {
  
  public async save({ title, description, workload, userIds }: Request): Promise<Course> {
    const coursesRepository = getCustomRepository(CoursesRepository)
    const usersRepository = getCustomRepository(UsersRepository)
    let users = userIds.map(id => { 
      return { id } 
    })

    const course = coursesRepository.create({
      title,
      description,
      workload,
      users
    })

    await coursesRepository.save(course)

    return course
  }

  public async update(id: string, { title, description, workload,  userIds}: Request): Promise<Course> {
    const coursesRepository = getCustomRepository(CoursesRepository)
    const usersRepository = getCustomRepository(UsersRepository)
     
    const users = await Promise.all(userIds.map(userId => usersRepository.findOne(userId)))
  
    await coursesRepository.update(id, {
      title,
      description,
      workload,
      users
    })

    const course = await coursesRepository.findOne(id) 

    return course
  }
}

export default CoursesService