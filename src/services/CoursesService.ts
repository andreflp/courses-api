import CoursesRepository from '../repositories/CoursesRepository'
import { getCustomRepository } from 'typeorm'
import Course from '../database/entity/Course'
import Pagination from '../models/Pagination'

interface Request {
  id: number
  title: string
  description: string
  workload: string
  userIds?: number[]
}

class CoursesService {

  public async findAll(query: any): Promise<Pagination> {
    const coursesRepository = getCustomRepository(CoursesRepository)
    const take = query.take || 5
    const skip = query.skip ? (query.skip - 1) * take : 0
    
    const [result, total] = await coursesRepository.findAndCount({
      order: {
        title: 'ASC'
      },
      take: take,
      skip: skip
    })

    const pagination = new Pagination()
    pagination.count = total
    pagination.result = result
    
    return pagination
  }
  
  public async save({ title, description, workload, userIds }: Request): Promise<Course> {
    const coursesRepository = getCustomRepository(CoursesRepository)
   
    let users = []

    if(userIds) {
      users = userIds.map(id => { 
        return { id } 
      })
    }

    const course = coursesRepository.create({
      title,
      description,
      workload,
      users
    })

    await coursesRepository.save(course)

    return course
  }

  public async update({ id, title, description, workload,  userIds }: Request): Promise<Course> {
    const coursesRepository = getCustomRepository(CoursesRepository)
    let users = []

    if(userIds) {
      users = userIds.map(id => { 
        return { id } 
      })
    }
  
    await coursesRepository.save({
      id,
      title,
      description,
      workload,
      users
    })

    const course = await coursesRepository.findOne(id) 

    return course
  }

  public async updatePartial({ id, title, description, workload } : Request): Promise<Course> {
    const coursesRepository = getCustomRepository(CoursesRepository)
  
    await coursesRepository.save({
      id,
      title,
      description, 
      workload
    })

    const response = await coursesRepository.findOne(id) 

    return response
  }
}

export default CoursesService