//import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { set_tasks } from "../models/models";
import { Task } from "../models/task_interface"
import { server } from "../src/index";

export function getRoutes() {

        //created global counter for new task to identify correct id value
        let id_val = set_tasks.length
        
       //create a new task
       server.route({
        method: 'POST',
        path: '/tasks',
        handler: (request, h) => {

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
            set_tasks[set_tasks.length] = new_task
            //increment id_val so new id's don't have repeats if deleted old ones
            id_val ++
            return h.response(new_task);
        }
    });

    //fetch all tasks in asc order
    server.route({
        method: 'GET',
        path: '/tasks',
        handler: (request, h) => {

            set_tasks.sort((task1, task2) => task1.id - task2.id)
            return h.response(set_tasks)
        }
    });

    //fetch all tasks depending on if they're true or false
    server.route({
        method: 'GET',
        path: '/tasks/filter{complete?}',
        handler: (request, h) => {

            //responsed with task with completed status = true
            if(request.params.complete == "true"){
                const completed_tasks = set_tasks.some(task => true === task.completed)
                if(completed_tasks){
                    return h.response(set_tasks.filter(task => true === task.completed))
                }else{
                    return "No task found with completed status being true"
                }          
            }
            //respond with task with completed status = false
            else if (request.params.complete == "false"){
                const incomplete_task = set_tasks.some(task => false === task.completed)
                if(incomplete_task){
                    return h.response(set_tasks.filter(task => false === task.completed))
                }else{
                    return "No task found with completed status being true"
                } 
            }
            else{
                return "Input received wasnt 'true' or 'false' "
            }      
        }
    });

    //get method that sorts by specified val: Descending name, createdDate, dueDate, or ID
    server.route({
        method: 'GET',
        path: '/tasks/sortBy{val?}',
        handler: (request, h) => {
            //sorts by having names appear in alphabetical order
            if(request.params.val == 'name'){
                var name_sort = set_tasks
                name_sort.sort((task1, task2) => task1.name < task2.name ? -1 : 1)
                return h.response(name_sort)
            }
            //sorts by creation date
            if(request.params.val == 'createdAt'){
                var create_sort = set_tasks
                create_sort.sort((task1, task2) => task1.createdAt < task2.createdAt ? -1 : 1)
                return h.response(create_sort)
            }
            //sorts by due date with
            if(request.params.val == 'dueDate'){
                var due_date_sort = set_tasks
                due_date_sort.sort((task1, task2) => task1.dueDate < task2.dueDate ? -1 : 1)
                return h.response(due_date_sort)
            }
            //sort by descending order for task (default is ascending order as you scroll down for ids)
            //descending starts with highest value
            if(request.params.val == "id"){
                var id_sort = set_tasks
                id_sort.sort((task1, task2) => task2.id - task1.id)
                return h.response(id_sort)
            }

            return "Input either no received or incorrect value"
        }
    });
    
    //fetch a single task specified by id 
    server.route({
        method: 'GET',
        path: '/tasks{id}',
        handler: (request, h) => {

            //check to see if task with specified id is in task set
            const specific_task = set_tasks.some(task => task.id === parseInt(request.params.id))
            if(specific_task){
                return h.response(set_tasks.filter(task => task.id === parseInt(request.params.id)))
            }else{
                //fail return statement
                 return "No task with that ID found"
            }

        }
    });

    //update a specified task specified by the id 
    server.route({
        method: 'PUT',
        path: '/tasks{id}',
        handler: (request, h) => {

            //created request_data as interface Task with request data
            const request_data = request.payload as Task 
            const specific_task = set_tasks.find(task => task.id === parseInt(request.params.id))
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
    });

    //remove a specified task by id 
    server.route({
        method: 'DELETE',
        path: '/tasks{id}',
        handler: (request, h) => {

            //searches through all task to see if ID matches any task id, if so then remove specified ID
            for (let i = 0; i < set_tasks.length; i++) {
                if (set_tasks[i].id == request.params.id ) {
                    set_tasks.splice(i, 1)
                    return h.response(set_tasks);
                }             
            }
            //return statement if failure occurs
            return "No task found to delete with the ID specified"
        }
    });
}