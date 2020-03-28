import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalidad status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        // the index will return -1 if the status is not in the array
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
} 