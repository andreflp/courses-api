import UsersRepository from '../repositories/UsersRepository'
import { getCustomRepository } from 'typeorm'
import User from '../database/entity/User'

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