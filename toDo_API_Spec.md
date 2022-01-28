# Task API
---
This is a proposal for my API Spec for the Task manager.
## End Points
---

### Create Task
`POST /tasks`
request body: 
```
{
    "name": "String",
    "createdAt: "Datetime",
    "dueDate": "Date",
    "completed": Bool
}
```

response code: 

    201 - Created

response body:
```
{
    "id": "GUID",
    "name": "String",
    "createdAt: "Datetime",
    "dueDate": "Date",
    "completed": Bool
}
```
response code: 

     400 - Bad request

response body:
```
{
    "errorMessage": "String"
}
```
### Fetch all Tasks 
`GET /tasks`
URL parameters:

    Name: completed
    Possible Values: true, false
    Required: No
    Description: If present, filters the results.  If completed=true, then only tasks that have been completed will be returned; if completed=false, then only tasks that have not been completed will return

    Name: sort_field
    Possible Values: name, dueDate, createdDate
    Required: No
    Description: If present, defines the sort field; must be combined with the sort_direction URL param

    Name: sort_direction
    Possible Values: asc, desc
    Required: No
    Description: If present, defines the sort direction; must be combined with the sort_field URL param

response code: 

    200 - OK

response body:
```
{ 
   [{
        "id": "GUID",
        "name": "String",
        "createdAt: "Datetime",
        "dueDate": "Date",
        "completed": Bool
    },
    {
        "id": "GUID",
        "name": "String",
        "createdAt: "Datetime",
        "dueDate": "Date",
        "completed": Bool
    },
    ... ]
}
```
response code:

    400 - Bad Syntax

response body:
```
{
    "errorMessage": "String"
}
```

### Fetch a task
`GET /tasks/{id}`
response code: 

    200 - OK 

response body:
```
{
    "id": "GUID",
    "name": "String",
    "createdAt: "Datetime", 
    "dueDate": "Date",
    "completed": Bool
}
```
response code:
    
    404 - Not found

response body:
```
{
    "errorMessage": "String"
}
```


### Update a Task 
`PUT /tasks/{id}`
request body:
```
{
    "id": "GUID",
    "name": "String",
    "createdAt: "Datetime",
    "dueDate": "Date",
    "completed": Bool
}
```

response code: 

    200 - OK

response body:
```
{
    "id": "GUID",
    "name": "String",
    "createdAt: "Datetime", 
    "dueDate": "Date",
    "completed": Bool
}
```

response code:
    
    4xx: Client error status

response body:
```
{
    "errorMessage": "String"
}
```

### Delete a Task 
`DELETE /tasks/{id}`
response code: 
    
    200 - OK

response body:
```
{
    "id": "GUID"
}
```

response code:

    404 - Not found