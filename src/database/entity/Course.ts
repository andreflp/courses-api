import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm"
import User from './User'

@Entity()
class Course {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    workload: string

    @ManyToMany(() => User, (user: User) => user.courses)
    @JoinTable()
    users: User[]

}

export default Course
