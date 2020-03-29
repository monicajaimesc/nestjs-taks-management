import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { TaskStatus } from "./task.model";
// entity represents tables 
@Entity()
export class Task extends BaseEntity {
    // properties of the task
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

}