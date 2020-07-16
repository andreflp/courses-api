import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany} from "typeorm"
import Course from "./Course"

@Entity()
class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column()
    number: string;

    @Column()
    zip_code: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column({nullable: true})
    country: string;

    @Column("timestamp with time zone")
    admission_date: Date

    @ManyToMany(() => Course, (course: Course) => course.users)
    courses: Course[]

}

export default User
