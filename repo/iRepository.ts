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
        if(this.task_list.find(({id}) => id === new_id)){
            return this.task_list.find(({id}) => id === new_id)
        }else{
            return "No task with ID specified found "
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
            if(sort_list.some(task => true === task.completed)){
                return sort_list.filter(task => true === task.completed)
            }
        }else if (val == 'false'){
            if(sort_list.some(task => false === task.completed)){
                 return sort_list.filter(task => false === task.completed)
            }
        }else{
            return "Input received does not match sort specification"
        }
        return sort_list 
    }

    public updateById(new_id, updated) {
        if (this.task_list.find(({id}) => id === new_id)){
            this.task_list.find(({id}) => id === new_id).name = updated.name
            this.task_list.find(({id}) => id === new_id).createdAt = updated.createdAt
            this.task_list.find(({id}) => id === new_id).dueDate = updated.dueDate
            this.task_list.find(({id}) => id === new_id).completed = updated.completed
            return this.task_list.find(({id}) => id === new_id)
        }else{
            return "No task found with ID specified"
        }
    }

    public removeById(new_id) {
        if (this.task_list.find(({id}) => id === new_id)){
            var index = this.task_list.findIndex(({id}) => id === new_id)
            return this.task_list.splice(index, 1)
        }else{
            return "No task found to delete with the ID specified"
        }
    }

}

//export object to routes so can be used globally
export const task_Repo = new taskRepository()

