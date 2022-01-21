# ToDo API
---
This is a proposal for my API Spec 
## End Points
---

### Create ToDo
`POST .com/ToDo`
request body: 
```
{
    "name": String
    "dueDate": String
    "completed": Bool
}
```

response body:
```
response code: 201 - Created
{
    "id": Int
    "name": String
    "dueDate": String
    "completed": Bool
}
```

### Fetch all ToDo 
`GET .com/ToDo/`
response body:
```
response code: 200 - OK
{
    "id": Int
    "name": String
    "dueDate": String
    "completed": Bool
}
```

### Fetch a ToDo
`GET .com/ToDo/{id}`
response body:
```
response code: 200 - OK
{
    "name": String
    "dueDate": String
    "completed": Bool
}
```

### Update a ToDo 
`PUT .com/ToDo/{id}`
request body:
```
{
    "name": String
    "dueDate": newString
    "completed": Bool
}
```

response body:
```
response code: 200 - OK
{
    "id": Int
    "name": String
    "dueDate": newString
    "completed": Bool
}
```

### Delete a ToDo 
`DELETE .com/ToDo/{id}`
response body:
```
response code: 200 - OK
```