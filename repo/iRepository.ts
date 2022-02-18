import { v4 as uuid } from 'uuid';

//define Task data values and types
interface Task {
    id: uuid;
    name: string;
    createdAt: string;
    dueDate: string;
    completed: boolean;
}

//generic repository interface
interface IRepo<Task>{
    add(T: Task)
    getId(id: uuid)
    sortBy(val: string)
    updateById(id: string, updated: Task)
    removeById(id: string)
}


//implementation of generic repository interface 
class taskRepository implements IRepo<Task>  {

    //Not using a db yet so create local array to store vals
    task_list: Task[] = []
    
    public add(T){
        T.payload.id = uuid()
        this.task_list.push(T.payload)
        return T.payload
    }

    public getId(new_id){
        const result = this.task_list.find(({id}) => id === new_id)
        if(result){
            return result
        }else{
            return null
        }
    }

    public sortBy(val) {
        var sort_list = [ ...this.task_list]
        if(val == 'name'){
            sort_list.sort((task1, task2) => task1.name < task2.name ? -1: 1)
        }else if (val == 'createdAt'){
            sort_list.sort((task1, task2) => task1.createdAt < task2.createdAt ? -1: 1)
        }else if (val == 'dueDate'){
            sort_list.sort((task1, task2) => task1.dueDate < task2.dueDate ? -1: 1)
        }else if (val == 'true'){
            return sort_list.filter(task => true === task.completed)
        }else if (val == 'false'){
            return sort_list.filter(task => false === task.completed)
        }else{
            return null
        }
        return sort_list 
    }

    public updateById(new_id, updated) {
        const result = this.task_list.find(({id}) => id === new_id)
        if (result){
            result.name = updated.name
            result.createdAt = updated.createdAt
            result.dueDate = updated.dueDate
            result.completed = updated.completed
            return result
        }else{
            return null
        }
    }

    public removeById(new_id) {
        var index = this.task_list.findIndex(({id}) => id === new_id)
        if (index != -1){
            return this.task_list.splice(index, 1)
        }else{
            return null
        }
    }
}

//export object to routes so can be used globally
export const task_Repo = new taskRepository()

