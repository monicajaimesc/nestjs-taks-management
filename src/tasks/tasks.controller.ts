import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';


@Controller('tasks')
export class TasksController {
    // inject the service into the controller
    constructor(private taskService: TasksService) {}

    @Get()
    // get method that will return all tasks to the client
    getAllTasks(): Task[] {
    // call the service and get the array of tasks
      return this.taskService.getAllTasks();

    }
}
