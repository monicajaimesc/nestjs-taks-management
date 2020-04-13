import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    // inject the service into the controller
    constructor(private tasksService: TasksService) {}

    // @Get()
    // // get method that will return all tasks to the client
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //   // if we have filter (length)
    //   if(Object.keys(filterDto).length) {
    //     return this.tasksService.getTaskWithFilters(filterDto);
    //   } else {
    //     // call the service and get the array of tasks
    //     return this.tasksService.getAllTasks();
    //   }
    
      
    // }

    @Get('/:id')
    // guarantee that it's a number, parseIntPipe on run time will parse de id (value) in a integer
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
      return this.tasksService.deleteTask(id);
    }


    // /*
    // first option: retrieve the entire request body
    // @Post()
    // createTask(@Body() body) {
    //   console.log('body', body);
    // }
    // */

    // /* specifically extract specific body parameters, each decoration before the 
    // parameter we can specify exactly the key in the request body that you want to
    // extract
    // */
    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //   // get the new desk and return it back to the client
    //   return this.tasksService.createTask(createTaskDto);

    // }
    @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
    

}
