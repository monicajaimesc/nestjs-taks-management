import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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
    
    getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        // store all the task in tasks and apply fitler if it need it and then
        // return all tasks
        let tasks = this.getAllTasks();

        if (status) {
        // filter for each iteration return true the item will be include in the filter array
        // otherwise it'll be exclude  
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {

          tasks = tasks.filter(task =>
        // includes is a filter method for strings, if that string includes a substring
        // "search" return true otherwise return false
            task.title.includes(search) ||
            task.description.includes(search),
            );
        }

        return tasks;
    }

     // name(parameters): return type
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deteleTaskById(id: string): void {
        // if the filter return false, that array will put out of the array
        // return false just for the task'id that i want to delete
        this.tasks = this.tasks.filter(task => task.id !==id)
         
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

    updateTaskStatus(id:string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status; 
        return task;
    }
}


