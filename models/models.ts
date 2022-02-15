//In-Memory Storage 

import { v4 as uuid } from 'uuid';


export const setTasks = [
    {
        id: uuid(),
        name: 'Have a sandwich',
        createdAt: Date().toString(),
        dueDate: Date().toString(),
        completed: false
     },
    {
        id: uuid(),
        name: 'Go to the mall',
        createdAt: Date().toString(),
        dueDate: Date().toString(),
        completed: true
     },
    {
        id: uuid(),
        name: 'Harvest some corn',
        createdAt: Date().toString(),
        dueDate: Date().toString(),
        completed: false
     }
]