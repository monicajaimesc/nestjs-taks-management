import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
    // service is going to store[] those tasks in memory
    // tasks property of this class
    private tasks: Task[] = [];
// the contoller need to have acces to the property,
// expose a method 
    getAllTasks(): Task[] {
        // return the array
        return this.tasks; 
    }
    createTask(tittle: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            // tittle is the key and the value
            // same like tittle: tittle,
            tittle,
            description, 
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        // return new creating resource (good practice)
        return task;
    }
}
