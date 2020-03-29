import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

//custom repository which should contain methods to work with your databas

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}
