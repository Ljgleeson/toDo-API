import { v4 as uuid } from 'uuid';
const taskModelLink = require('../models/sqlModels');


//define Task data values and types
export interface Task {
    id: uuid;
    createdAt: Date;
    title: string;
    dueDate: string;
    completed: boolean;
}
 
//generic repository interface
interface IRepo<Task>{
    create(T: Task)
    getAll()
    getId(id: uuid)
    getCompleted(val: string)
    sortBy(val: string)
    updateById(id: string, updated: Task)
    removeById(id: string)
}


//implementation of generic repository interface 
class taskRepository implements IRepo<Task>  {
    
    async create(T: Task){
        try {
            const taskModel = taskModelLink.taskModel();
            const createTask = await taskModel.create({              
                id: T.id,
                createdAt: T.createdAt,
                title: T.title,
                dueDate: T.dueDate,
                completed: T.completed
            });
            return createTask
        } catch (err) {
            return null
        }
    }

    async getAll(){        
        try {
            const taskModel = taskModelLink.taskModel();
            const getAllTasks = await taskModel.findAll();
            return getAllTasks
        } catch (err) {
            return null
        }
    }
 
    async getId(new_id){
        try {
            const taskModel = taskModelLink.taskModel();
            const getATasks = await taskModel.findAll({
                where: {
                    id: new_id
                }
            });
            return getATasks
        } catch (err) { 
            return null
        }
    }

    async getCompleted(val) {
        if (val == 0 || val == 1) {
            const taskModel = taskModelLink.taskModel();
            const getCompletedTasks = await taskModel.findAll({
                where: {
                    completed: val
                }
            });
            return getCompletedTasks
        } else {
            return null
        }
    }

    async sortBy(val) {
        try {
            const taskModel = taskModelLink.taskModel();
            const getSortedTasks = await taskModel.findAll({
                order: [
                    [val, 'ASC']
                ]
            });
            return getSortedTasks
        } catch (err) {
            return null
        }
    }

    async updateById(new_id, updated) {
        try {
            const taskModel = taskModelLink.taskModel();
            await taskModel.update({
                title: updated.title,
                dueDate: updated.dueDate,
                completed: updated.completed },
                {
                where: {
                    id: new_id
                }
            });
            //need to return the task that has been updated
            const updatedTask = await taskModel.findAll({
                where: {
                    id: new_id
                }
            })
            return updatedTask
        } catch (err) {
            return null
        }
    }

    async removeById(new_id) {
        try {
            const taskModel = taskModelLink.taskModel();
            const deleteTasks = await taskModel.destroy({
                where: {
                    id: new_id
                }
            });
            return deleteTasks
        } catch (err) {
            return null
        }
    }
}

//export object to routes so can be used globally
export const task_Repo = new taskRepository()

