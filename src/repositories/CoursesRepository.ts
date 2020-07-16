import Course from '../database/entity/Course'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Course)
class CoursesRepository extends Repository<Course> {}

export default CoursesRepository