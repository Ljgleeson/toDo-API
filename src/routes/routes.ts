import { v4 as uuid } from 'uuid';
import { task_Repo, Task } from "../repo/iRepository"

export const routes = [
    {  
        method: 'POST',
        path: '/tasks',
        handler: (request, h) => {

            var payload = request.payload
            var id = uuid()
            var createdAt = new Date()   

            const task: Task = {
                id, createdAt, ...payload as Task
            }
            return task_Repo.create(task)
        }
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: async (request, h) => {
            return await task_Repo.getAll()
        }
    },
    {
        method: 'GET',
        path: '/tasks{id}',
        handler: (request, h) => {
            return task_Repo.getId(request.params.id)
        }
    },
    {
        method: 'GET',
        path: '/tasks/completed{val}',
        handler: (request, h) => {
            return task_Repo.getCompleted(request.params.val) 
        }
    },
    {
        method: 'GET',
        path: '/tasks/sortBy{val?}',
        handler: (request, h) => {
            return task_Repo.sortBy(request.params.val) 
        }
    },
    {
        method: 'PUT',
        path: '/tasks{id}',
        handler: (request, h) => {
            return task_Repo.updateById(request.params.id, request.payload)
        }
    },
    {
        method: 'DELETE',
        path: '/tasks{id}',
        handler: (request, h) => {
            return task_Repo.removeById(request.params.id)
        }
    }
]