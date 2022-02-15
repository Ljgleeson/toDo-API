import { task_Repo } from "../repo/iRepository"

export const routes = [
    {  
        method: 'POST',
        path: '/tasks',
        handler: (request, h) => {
            return task_Repo.add(request)
        }
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, h) => {
            return task_Repo
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