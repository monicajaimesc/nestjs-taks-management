import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    // service is going to store[] tTask[]) =>hose tasks in memory
    // tasks property of this class
    private tasks: Task[] = [];
// the contoller need to have acces to the property,
// expose a method 
    getAllTasks(): Task[] {
        // return the array
        return this.tasks; 
    }

     // name(parameters): return type
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);


    }
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            // tittle is the key and the value
            // same like tittle: tittle,
            title,
            description, 
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        // return new creating resource (good practice)
        return task;
    }
}
