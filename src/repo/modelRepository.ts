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
    getAll(completion: string, sortBy: string, orderBy: string)
    getId(id: uuid)
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

    //can get every task, completed/incomplete tasks only, and can sort task by createdAt,dueDate,and title while also ordering in ASC or DESC
    async getAll(completion, sortBy = 'createdAt', orderBy = 'ASC') {        
        const taskModel = taskModelLink.taskModel();
        var getTasks
        //if completion status defined
        if(completion != undefined || completion != null) {
            getTasks = await taskModel.findAll({
                where: {
                    completed: completion
                },
                order: [
                    [sortBy, orderBy]
                ]
            });
        } 
        //if either no inputs or combination of sortBy and orderBy
        else {
            getTasks = await taskModel.findAll({
                order: [
                    [sortBy, orderBy]
                ]
            });
        }
        return getTasks
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
        const updatedTask = await taskModel.findAll({
            where: {
                id: new_id
            }
        })
        return updatedTask
    }

    async removeById(new_id) {
        const taskModel = taskModelLink.taskModel();
        await taskModel.destroy({
            where: {
                id: new_id
            }
        });
        const getAllTasks = await taskModel.findAll();
        return getAllTasks
    }
}

//export object to routes so can be used globally
export const task_Repo = new taskRepository()

