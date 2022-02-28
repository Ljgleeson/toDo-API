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
    sortBy(val: string, sort: string)
    updateById(id: string, updated: Task)
    removeById(id: string)
}


//implementation of generic repository interface 
class taskRepository implements IRepo<Task>  {
    
    async create(T: Task){
        const taskModel = taskModelLink.taskModel();
        const createTask = await taskModel.create({              
            id: T.id,
            createdAt: T.createdAt,
            title: T.title,
            dueDate: T.dueDate,
            completed: T.completed
        });
        return createTask
    }

    async getAll(){        
        const taskModel = taskModelLink.taskModel();
        const getAllTasks = await taskModel.findAll();
        return getAllTasks
    }
 
    async getId(new_id){
        const taskModel = taskModelLink.taskModel();
        const getATasks = await taskModel.findAll({
            where: {
                id: new_id
            }
        });
        return getATasks
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

    //sorts by title, duedate, or createdAt and can be sorted in ASC or DESC
    //ex: dueDated = sort by dueDate in desc order. titleA = title in ascending 
    async sortBy(val) {
        const sortVal = val.charAt(val.length-1)
        var new_val = val.slice(0, val.length - 1)
        var sort = 'ASC'
        if (sortVal == 'd'){
            sort = 'DESC'
        }
        const taskModel = taskModelLink.taskModel();
        const getSortedTasks = await taskModel.findAll({
            order: [
                [new_val, sort]
            ]
        });
        return getSortedTasks
    }

    async updateById(new_id, updated) {
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
    }

    async removeById(new_id) {
        const taskModel = taskModelLink.taskModel();
        const deleteTasks = await taskModel.destroy({
            where: {
                id: new_id
            }
        });
        return deleteTasks
    }
}

//export object to routes so can be used globally
export const task_Repo = new taskRepository()

