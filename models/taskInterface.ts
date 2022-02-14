export interface baseTask {
    name: string;
    createdAt: string;
    dueDate: string;
    completed: boolean;
}

export interface Task extends baseTask {
    id: number;
}