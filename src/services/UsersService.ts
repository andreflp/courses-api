import UsersRepository from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm'
import User from '../database/entity/User'
import Pagination from '../models/Pagination'

interface Request {
  name: string
  phone: string
  address: string
  number: string
  zip_code: string
  city: string
  country: string
  state: string
  admission_date: Date
}

class UsersService {

   public async findAll(query: any): Promise<Pagination> {
    const usersRepository = getCustomRepository(UsersRepository)
    const take = query.take || 5
    const skip = query.skip ? (query.skip - 1) * take : 0
    
    const [result, total] = await usersRepository.findAndCount({
      order: {
        name: 'ASC'
      },
      take: take,
      skip: skip
    })

    const pagination = new Pagination()
    pagination.count = total
    pagination.result = result
    
    return pagination
  }

  public async findAllToAssociate({ take, skip, userIds }: any): Promise<Pagination> {
    const usersRepository = getCustomRepository(UsersRepository)
    const takeQuery = take || 5
    const skipQuery = skip ? (skip - 1) * take : 0
    const userIdsQuery = JSON.parse(userIds)

    const query = usersRepository
      .createQueryBuilder('user')
      .where(`user.id NOT IN (${userIdsQuery})`)
      .orderBy({ name: 'ASC'})
      .skip(skipQuery)
      .take(takeQuery)
    
    const users = await query.getMany()
    const count = await query.getCount()
    
    const pagination = new Pagination()
    pagination.count = count
    pagination.result = users
    
    return pagination

  }
  
  public async save({ name, phone, address, number, zip_code, city, state, country, admission_date }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
  
    const user = usersRepository.create({
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

    await usersRepository.save(user)

    return user
  }

  public async update(id: string, { name, phone, address, number, zip_code, city, state, country, admission_date }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
  
    await usersRepository.update(id, {
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

    const user = await usersRepository.findOne(id) 

    return user
  }
}

export default UsersService