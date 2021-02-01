# Project Title

Task Manager using React.js, Firebase and Google Authenitication. Goal is to keep track of your daily tasks, and time spent on each task.

## Getting Started

1. First clone this repository.

2. Open the folder in your terminal and run `npm install` to install all the dependencies.

### Prerequisites

We are using firebase cloud firestore for database. Open the firebase google console and make a new project. Now create a database and add a new web app. You can also check the documentation for creating the cloud firestore database.

Copy all the credentials of new web app which you created and copy it in the `.env` file inside the src folder.

```

REACT_APP_API_KEY=""
REACT_APP_AUTH_DOM=""
REACT_APP_PROJECT_ID=""
REACT_APP_STORAGE_BUCKET=""
REACT_APP_MESSAGE_SENDER_ID=""
REACT_APP_APP_ID=""
REACT_APP_MEASUREMENT_ID=""

```

Go to the Authentication tab and enable the Email/Password

### Running Application

Run `npm start` to start the application (cd firebase-taskmanager -> `npm start`) and in the terminal.

Sign Up

```

Signup window will open so click on the Sign Up link.

Now enter email and password to create account. If any error is made while signing up an error will be popped up.

```

Login

```

Now on successful creation of account go to login page and sign in.

After signing in you will go to task list page with all tasks listed there.

Click on the `Add` menu to add a new task.

So enter your task details here

1. Task name
2. Priority
3. Deadline
4. Notes

```

Handle Task

```

You can start task-timer by clicking `Start` button to keep track of spent time.

You can also pause the time by clicking the `Stop` button.

Task will be auto-completed if timer exceeds the given deadline.

You can also check the task completed by clicking `Complete` button.

```

## Demo Link

Add additional notes about how to deploy this on a live system

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

```

```
