# corporate-event-planner-backend

[Product Canvas](https://docs.google.com/document/d/1ZZl5PvRdH3rN4U2iFprFKlrf3IO-Uvm3kvv9KFfpiM0/edit?usp=sharing)

All API requests made to: https://event-planner-pt.herokuapp.com/

Aevent makes it easier for users to manage all aspects of event planning, from tracking tasks, items which need to be purchased, and vendors facilitating the event, all in one place.

### Technologies

Node | Express | Jest| Knex | SqlLite3 | PostgresSQL| Supertest | Bcrypt | JsonWebToken

**Back End URL**: 

## API documentation

## Credentials

### Register a user

*method url*: `/api/auth/register`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `email`        | String | Yes      | Must be unique           |
| `first_name`   | String | Yes      |                          |
| `last_name`    | String | No       |                          |
| `password`     | String | Yes      |                          |
| `company`      | String | No       |                          |
| `role`         | String | No       |                          |


#### Request
###### Example request
```
{
	"email": "collette@test.com",
	"first_name": "colette",
	"last_name": "michaels",
	"password": "123456",
	"company": "Tech Corp",
	"role": "admin"
}
  ```
  
  #### Response
  ##### 201 (Created)
  ###### Example Response

```
{
    "id": 6,
    "email": "collettea@test.com",
    "first_name": "colette",
    "last_name": "michaels",
    "company": "Tech Corp",
    "role": "admin"
}
```

##### 400 (Bad Request)
###### Example Response
```
  {
    "errorMessage": "Missing required fields."
  }
```

### Login a user
*method url*: `/api/auth/login`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `email`        | String | Yes      | must be registered user  |
| `password`     | String | Yes      |                          |


#### Request
###### Example request
```
  {
    "email": "collette@test.com",
    "password": "123456",
  }
  ```
#### Response
##### 200 (OK)
###### Example response
```
{
    "user_id": 7,
    "first_name": "colette",
    "last_name": "michaels",
    "email": "colette@test.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo3LCJlbWFpbCI6ImFuZHJlYUB0ZXN0LmNvbSIsImlhdCI6MTU2MTU0MDM3NywiZXhwIjoxNTYxNTQzOTc3fQ.NQT52VuneLK9MfRVZbnyc8dYVT_6Iq_Vb_gE8ybCNaE"
}
```
##### 400 (Bad Request)
```
  {
    "errorMessage": "Missing email or password."
  }
  ```
  ##### 401 (Unauthorized)
  ```
  {
    errorMessage: "Invalid credentials."
  }
  ```

## Events

### Get all events

*method url*: `/api/events`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | --------------------------- |
| `Content-Type` | String | Yes      | Must be application/json    |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### 200 (OK)

###### Example response
```
[
    {
        "id": 2,
        "event_title": "Tech Conference",
        "event_description": "a great tech conference",
        "image_url": "https://picsum.photos/id/237/200/300",
        "event_date": "25-08-2019",
        "event_time": "10:00 PM",
        "attendees": 15,
        "budget": 600,
        "user_id": 2,
        "completed": 0
    },
    {
        "id": 3,
        "event_title": "Negotiations Skills 2",
        "event_description": "a session on negotiation",
        "image_url": "https://picsum.photos/id/237/200/300",
        "event_date": "20-08-2019",
        "event_time": "12:00 PM",
        "attendees": 10,
        "budget": 600,
        "user_id": 3,
        "completed": 0
    },
    {
        "id": 4,
        "event_title": "Boss's birthday party",
        "event_description": "it's a secret, don't tell anyone",
        "image_url": "https://picsum.photos/id/237/200/300",
        "event_date": "17-09-2019",
        "event_time": "16:00 PM",
        "attendees": 25,
        "budget": 200,
        "user_id": 4,
        "completed": 0
    },
]
```

### Get an event

*method url*: `/api/events/:id`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | --------------------------- |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response

```
{
    "id": 2,
    "event_title": "Tech Conference",
    "event_description": "a great tech conference",
    "image_url": "https://picsum.photos/id/237/200/300",
    "event_date": "25-08-2019",
    "event_time": "10:00 PM",
    "attendees": 15,
    "budget": 600,
    "user_id": 2,
    "completed": 0,
    "tasks": [
        {
            "id": 2,
            "task_name": "Another task",
            "task_completed": false
        },
        {
            "id": 11,
            "task_name": "Practice speech and cry",
            "task_completed": false
        }
    ],
    "items": [
        {
            "id": 2,
            "item_name": "another item",
            "item_acquired": true
        },
        {
            "id": 4,
            "item_name": "buy cake",
            "item_acquired": false
        }
    ]
}
```

### Get events from user

*method url*: `/api/events/?user_id=${:user_id}`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | --------------------------- |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response

```[
       {
           "id": 2,
           "event_title": "Tech Conference",
           "event_description": "a great tech conference",
           "image_url": "https://picsum.photos/id/237/200/300",
           "event_date": "25-08-2019",
           "event_time": "10:00 PM",
           "attendees": 15,
           "budget": 600,
           "user_id": 2,
           "completed": 0
       }
   ]
```

### Create an event

*method url*: `/api/events`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name                 | type   | required | description              |
| -------------------- | ------ | -------- | ------------------------ |
| `event_title`        | String  | Yes     |                          |
| `event_description`  | String  | No      |                          |
| `image_url`          | String  | No       |                          |
| `event_date`         | String  | No      |                          |
| `event_time`         | String  | No       |                          |
| `attendees`          | Integer | No       |                          |
| `budget`             | Integer | No       |                          |


#### Request
##### Example request

```
{
	"event_title": "Surprise birthday party", 
	"event_description": "It's a secret, don't tell anyone", 
	"event_date": "17-09-2019", 
	"event_time": "16:00 PM",
	, "attendees": 25,
	, "budget": 200,
}
```

#### Response
##### Example response
```
{
    "id": 8,
    "event_title": "Surprise birthday party",
    "event_description": "It's a secret, don't tell anyone",
    "image_url": "https://picsum.photos/id/237/200/300",
    "event_date": "17-09-2019",
    "event_time": "16:00 PM",
    "attendees": 25,
    "budget": 200,
    "user_id": 7,
    "completed": false,
    "tasks": [],
    "shopping_list": [],
    "vendors": []
}
```

### Update an event

*method url*: `/api/events/:id`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name                 | type   | required | description              |
| -------------------- | ------ | -------- | ------------------------ |
| `event_title`        | String  | No     |                          |
| `event_description`  | String  | No      |                          |
| `image_url`          | String  | No       |                          |
| `event_date`         | String  | No      |                          |
| `event_time`         | String  | No       |                          |
| `attendees`          | Integer | No       |                          |
| `budget`             | Integer | No       |                          |

#### Response
##### Example response 
```
{
    "id": 3,
    "event_title": "Negotiations Skills 2",
    "event_description": "a session on negotiation",
    "image_url": "https://picsum.photos/id/237/200/300",
    "event_date": "20-08-2019",
    "event_time": "12:00 PM",
    "attendees": 25,
    "budget": 600,
    "user_id": 4,
    "completed": false
}
```

### Delete an event

*method url*: `/api/events/:id`

*http method*: **[DELETE]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | --------------------------- |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response
```
{
    "message": "The event has now been removed from the database."
}
```


## Tasks

### Get all tasks

*method url*: `/api/tasks`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description                 |
| -------------- | ------ | -------- | --------------------------- |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response

```
[
    {
        "id": 1,
        "task_name": "reserve seats",
        "event_id": 1,
        "task_completed": 0
    },
    {
        "id": 2,
        "task_name": "order food",
        "event_id": 2,
        "task_completed": 1
    },
]

```

### Get tasks for an event

*method url*: `/api/tasks/?event_id={event_id}`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response

```
[
    {
        "id": 2,
        "task_name": "Another task",
        "event_id": 2,
        "task_completed": 0
    },
    {
        "id": 11,
        "task_name": "Practice speech",
        "event_id": 2,
        "task_completed": 0
    }
]
```

### Get task by id

*method url*: `/api/tasks/:id`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response

```
    {
        "id": 2,
        "task_name": "Another task",
        "event_id": 2,
        "task_completed": false
    },
```

### Create a task for an event

*method url*: `/api/tasks/?event_id={event_id}`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `task_name`        | String | Yes      |           |
| `task_completed`   | String | No      |                          |

#### Request
##### Example request

```
{
	"task_name": "Set up conference room",
	"task_completed": true
}
```

#### Response
##### Example response

```
{
    "id": 8,
    "task_name": "Set up conference room",
    "event_id": 3,
    "task_completed": true
}
```

### Delete a task

*method url*: `/api/tasks/:id`

*http method*: **[DELETE]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response

```
{
    "message": "The task has now been removed from the database."
}
```

### Update a task

*method url*: `/api/tasks/:id`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `task_name`        | String | No      |            |
| `task_completed`   | Boolean |No      |                          |

#### Request
##### Example request

```
{
	"task_name": "Read speech",
	"task_completed": false
}
```

#### Response
##### Example response

```
{
    "success": true
    "task_name": "Read speech",
    "task_completed": true,
    "id": 2,
    "event_id": 4
}
```
## Shopping list
### Get shopping list items for event

*method url*: `/api/events/?event_id={event_id}`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response
```
[
    {
        "id": 2,
        "item_name": "Water bottles",
        "event_id": 2,
        "item_price": 150,
        "item_acquired": 1
    },
    {
        "id": 4,
        "item_name": "Cake",
        "event_id": 2,
        "item_price": null,
        "item_acquired": 0
    }
]
```

### Get item from shopping list by id

*method url*: `/api/shopping/:id`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response
```
    {
        "id": 2,
        "item_name": "Water bottles",
        "event_id": 2,
        "item_price": 150,
        "item_acquired": 1
    }
```

### Add an item to the shopping list

*method url*: `/api/shopping/?event_id={event_id}`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `item_name`        | String | Yes      |           |
| `item_acquired`   | Boolean | No      |                          |

#### Request
##### Example request

```
{
	"item_name": "cake",
	"item_acquired": false,
	"item_price": 40
}
```

#### Response
##### Example response
```
{
    "id": 5,
    "item_name": "cake",
    "event_id": 2,
    "item_price": 40,
    "item_acquired": false
}
```

### Delete an item from the shopping list

*method url*: `/api/shopping/:id`

*http method*: **[DELETE]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response
```
{
    "message": "The item has now been removed from the database."
}
```

### Update an item

*method url*: `/api/shopping/:id`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `item_name`        | String | No      |            |
| `item_acquired`   | Boolean |No      |                          |

#### Request
##### Example request

```
{
    "item_acquired": true,
    "item_name": "notepads"
}
```

#### Response
##### Example response

```
{
    "success": true,
    "item_acquired": true,
    "item_name": "notepads"
}
```

### Get a vendor

*method url*: `/api/vendors/:id`

*http method*: **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response
```
{
  "id": 4,
  "vendor_name": "Andres",
  "event_id": 2,
  "contact_number": "07842156431",
  "contact_email": "andres@test.com"
}
```
### Add a vendor

*method url*: `/api/vendors/:event_id={event_id}`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `vendor_name`        | String | Yes      |           |
| `contact_number`   | String | No      |                          |
| `contact_email`   | String | No      |                          |

#### Request
##### Example request

```
{
  "vendor_name": "Andres",
  "contact_number": "07842156431",
  "contact_email": "andres@test.com"
}
```
```
{
  "id": 4,
  "vendor_name": "Andres",
  "event_id": 2,
  "contact_number": "07842156431",
  "contact_email": "andres@test.com"
}
```

### Delete a vendor

*method url*: `/api/vendors/:id`

*http method*: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Response
##### Example response

```
{
    "message": "The vendor has now been removed from the database."
}
```

### Update a vendor

*method url*: `/api/vendors/:id`

*http method*: **[PUT]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |
| `Authorization`| String | Yes      | token to Authorize request  |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `vendor_name`        | String | No      |            |
| `contact_number`   | String |No      |                          |
| `contact_email`   | String |No      |                          |

#### Request
##### Example request

```
{
   	"vendor_name": "Andres",
   	"contact_number": "07842156431",
   	"contact_email": "andres@test.com"
   }
```
#### Response
##### Example response

```
{
    "id": 4,
    "vendor_name": "Andres",
    "event_id": 2,
    "contact_number": "07842156431",
    "contact_email": "andres@test.com"
}
