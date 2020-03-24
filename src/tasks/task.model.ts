export interface Task {
    // properties
    id: string;
    tittle: string;
    description: string;
    status: TaskStatus; 
}

//enumartion or idioms
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}