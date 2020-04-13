import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        // nestks/typeorm expose IntjectRepository decorator which tells nestjs, there is this repository 
        // that we want to inject here in this private taskRepository parameter and it's private
        // so there is gonna be avalaible for the whole class, a class member
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

async deleteTask(
    id: number,
    ): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
    }
}
    // service is going to store[] tTask[]) =>hose tasks in memory
    // tasks property of this class
    // DELETE, were gonna get the task from the data base
    // private tasks: Task[] = [];
    
// the contoller need to have acces to the property,
// // expose a method 
//     getAllTasks(): Task[] {
//         // return the array
//         return this.tasks; 
//     }
    
//     getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
//         const { status, search } = filterDto;
//         // store all the task in tasks and apply fitler if it need it and then
//         // return all tasks
//         let tasks = this.getAllTasks();

//         if (status) {
//         // filter for each iteration return true the item will be include in the filter array
//         // otherwise it'll be exclude  
//             tasks = tasks.filter(task => task.status === status);
//         }
//         if (search) {

//           tasks = tasks.filter(task =>
//         // includes is a filter method for strings, if that string includes a substring
//         // "search" return true otherwise return false
//             task.title.includes(search) ||
//             task.description.includes(search),
//             );
//         }

//         return tasks;
//     }
// as long that is has async opertation in it is an async method
async getTaskById(id: number): Promise<Task> {
    // findOne will return a promess contain the entity
    // await until this operation finisth because is async operation
    const found = await this.taskRepository.findOne(id);
    // check that the task was found 
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }
async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task; 
}

async updateTaskStatus(
    id: number,
    status: TaskStatus,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

//     deteleTaskById(id: string): void {
//         // if the filter return false, that array will put out of the array
//         // return false just for the task'id that i want to delete
//         const found = this.getTaskById(id);
//         // at this point looping the array twice with find and filter method
//         this.tasks = this.tasks.filter(task => task.id !== found.id)
         
//     }
    

//     createTask(createTaskDto: CreateTaskDto): Task {
//         const { title, description } = createTaskDto;
//         const task: Task = {
//             id: uuid(),
//             // tittle is the key and the value
//             // same like tittle: tittle,
//             title,
//             description, 
//             status: TaskStatus.OPEN,
//         };
//         this.tasks.push(task);
//         // return new creating resource (good practice)
//         return task;
//     }

//     updateTaskStatus(id:string, status: TaskStatus): Task {
//         const task = this.getTaskById(id);
//         task.status = status; 
//         return task;
//     }
// 
}


