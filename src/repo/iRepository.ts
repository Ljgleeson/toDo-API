import { v4 as uuid } from 'uuid';

//Access dbs instances without request object
const instances = require('hapi-sequelizejs').instances;

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
        const [results, metadata] = await instances.dbs.todoDB.sequelize.query(
            'INSERT INTO tasks VALUES ( ?, ?, ?, ?, ?)', {
                replacements: [T.id, T.createdAt, T.title, T.dueDate, T.completed]
            } )
        return results
    }

    async getAll(){
        try{
            const [results, metadata] = await instances.dbs.todoDB.sequelize.query('SELECT * FROM tasks')
            return results
        } catch(err){
            return null
        }
    }
 
    async getId(new_id){
        try{
            const [results, metadata] = await instances.dbs.todoDB.sequelize.query('SELECT * FROM tasks WHERE id = ?',{
                replacements: [new_id]
            })
            return results
        } catch(err){
            return null
        }
    }

    async getCompleted(val) {
        try{
            const [results, metadata] = await instances.dbs.todoDB.sequelize.query('SELECT * FROM tasks WHERE completed = ?',{
                replacements: [val]
            })
            return results
        } catch(err){
            return null
        }
    }

    //cant use ? as the replacement value adds quotes which cause order by to ignore specified val
    async sortBy(val) {
        try{
            const sortQuery = 'SELECT * FROM tasks ORDER BY ' + val + ' ASC'
            const [results, metadata] = await instances.dbs.todoDB.sequelize.query(sortQuery)
            return results
        }catch(err){
            return null
        }
    }

    async updateById(new_id, updated) {
        try{
            const [results, metadata] = await instances.dbs.todoDB.sequelize.query('UPDATE tasks SET title = ?, dueDate = ?, completed = ? WHERE id = ?',{
                replacements: [updated.title, updated.dueDate, updated.completed, new_id]
            })
            return results
        } catch(err){
            return null
        }
    }

    async removeById(new_id) {
        try{
            const [results, metadata] = await instances.dbs.todoDB.sequelize.query('DELETE FROM tasks WHERE id = ?',{
                replacements: [new_id]
            })
            return results
        } catch(err){
            return null
        }
    }
}

//export object to routes so can be used globally
export const task_Repo = new taskRepository()