import { Controller, Get, Post, Body } from '@nestjs/common';
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

    /*
    first option: retrieve the entire request body
    @Post()
    createTask(@Body() body) {
      console.log('body', body);
    }
    */

    /* specifically extract specific body parameters, each decoration before the 
    parameter we can specify exactly the key in the request body that you want to
    extract
    */
    @Post()
    createTask(
      @Body('title') title: string,
      @Body('description') description: string,
    ): Task {
      // get the new desk and return it back to the client
      return this.taskService.createTask(title, description);

    }


}
