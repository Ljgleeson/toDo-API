//import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { setTasks } from "../models/models";
import { Task } from "../models/taskInterface"


export const routes = [
    {  
        method: 'POST',
        path: '/tasks',
        handler: (request, h) => {

            let id_val = setTasks.length
            //created request_data as interface Task with request data
            const request_data = request.payload as Task
            const new_id = id_val;
            //create new_task with interface Task to be added to set_task array
            const new_task: Task = { 
                id: new_id + 1,
                name: request_data.name,
                createdAt: request_data.createdAt,
                dueDate: request_data.dueDate,
                completed: request_data.completed
            }
            setTasks[setTasks.length] = new_task
            //increment id_val so new id's don't have repeats if deleted old ones
            id_val ++
            return h.response(new_task);
        }
    },
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, h) => {
            return h.response(setTasks)
        }
    },
    {
        method: 'GET',
        path: '/tasks/sortBy{val?}',
        handler: (request, h) => {
            //sorts by having names appear in alphabetical order
            if(request.params.val == 'name'){
                var name_sort  = [ ...setTasks]
                name_sort.sort((task1, task2) => task1.name < task2.name ? -1 : 1)
                return h.response(name_sort)
            }
            //sorts by creation date
            else if(request.params.val == 'createdAt'){
                var create_sort  = [ ...setTasks]
                create_sort.sort((task1, task2) => task1.createdAt < task2.createdAt ? -1 : 1)
                return h.response(create_sort)
            }
            //sorts by due date with
            else if(request.params.val == 'dueDate'){
                var due_date_sort  = [ ...setTasks]
                due_date_sort.sort((task1, task2) => task1.dueDate < task2.dueDate ? -1 : 1)
                return h.response(due_date_sort)
            }
            //sort by descending order for task (default is ascending order as you scroll down for ids)
            //descending starts with highest value
            else if(request.params.val == "id"){
                var id_sort  = [ ...setTasks]
                id_sort.sort((task1, task2) => task2.id - task1.id)
                return h.response(id_sort)
            }
            //sort by incomplete tasks
            else if( request.params.val == "false" ){
                const false_task = setTasks.some(task => false === task.completed)
                if(false_task){
                    return h.response(setTasks.filter(task => false === task.completed))
                }else{
                    return "No task found with completed status being false"
                }          
            }
            //sort by completed task
            else if(request.params.val == "true"){
                const true_task = setTasks.some(task => true === task.completed)
                if(true_task){
                    return h.response(setTasks.filter(task => true === task.completed))
                }else{
                    return "No task found with completed status being true"
                }          
            }
             else {
                 return "Input either not received or incorrect value"
            }
        }
    },
    {
        method: 'GET',
        path: '/tasks{id}',
        handler: (request, h) => {

            //check to see if task with specified id is in task set
            const specific_task = setTasks.some(task => task.id === parseInt(request.params.id))
            if(specific_task){
                return h.response(setTasks.filter(task => task.id === parseInt(request.params.id)))
            }else{
                //fail return statement
                return "No task with that ID found"
            }

        }
    },
    {
        method: 'PUT',
        path: '/tasks{id}',
        handler: (request, h) => {

            //created request_data as interface Task with request data
            const request_data = request.payload as Task 
            const specific_task = setTasks.find(task => task.id === parseInt(request.params.id))
            //if specified task found, change all data to updated values
            if(specific_task){
                specific_task.name = request_data.name
                specific_task.createdAt = request_data.createdAt
                specific_task.dueDate = request_data.dueDate
                specific_task.completed = request_data.completed
                return h.response(specific_task);
            }else{
                //return statement if ID isnt in task list
                return "No task found with ID specified"
            }

        }
    },
    {
        method: 'DELETE',
        path: '/tasks{id}',
        handler: (request, h) => {

            //searches through all task to see if ID matches any task id, if so then remove specified ID
            for (let i = 0; i < setTasks.length; i++) {
                if (setTasks[i].id == request.params.id ) {
                    setTasks.splice(i, 1)
                    return h.response(setTasks);
                }             
            }
            //return statement if failure occurs
            return "No task found to delete with the ID specified"
        }
    }
]

