# To Do App

This is a simple app that let's you:

- **Create** an account.
- **Add** multiple to-do items.
- **Check** said to-dos as completed.
- **Translate** them from English to Spanish.

You can also create an account as an **admin**, which enables you to see the to-dos of the non-admin users.

The app is successfully deployed in Google Cloud, you can check it out [here](https://spring-ember-377519.uc.r.appspot.com/).

## Deployment to Google Cloud

If you'd like to deploy this app to gcloud yourself, the following instructions should help you out.

### 1. Clone this repository

```
git clone https://github.com/jjnietoc/todo-app.git
```

### 2. Create an account in Google Cloud

Enter [this link](https://cloud.google.com/), and create the button "start free". It should prompt you to sign up with a Google Account. If this is your first time using Gcloud it gives you free credits so you can try the deploy for free.

It's necessary that you give your credit card information to continue, but Google says it won't charge you once your free trial ends.

### 3. The Google Cloud console

Once you're finished with your setup, you will be redirected to the GCloud console. You should be in "My First Project". Feel free to rename it to whatever you'd like.

### 4. Create an App Engine

In the search bar above, look for "App Engine" and click it. Once it opens, click "Create Application". Choose your area and click in App Engine Default service account, and continue. Once its created, download and install the Google Cloud SDK. Follow the instructions to initialize it and set it up in your local environment. You will need this to deploy your app later on.

### 5. Create a Database Instance

In the search bar above, look for "SQL" and click it. Once it opens, click "Create Instance". This specific project uses [PostgreSQL](https://www.postgresql.org/) and [Prisma](https://www.prisma.io/docs/concepts/overview/what-is-prisma), so we will also choose the PostgreSQL option. Click Enable API to continue. This will take a few seconds.

Once it loads, fill your info. Choose a password that does not include any of your personal info. Choose the configuration that you need. I recommend using Single Zone availability if you're thinking of using this for a small project. Click on **Customize your Instance** and go to **Connections**. In there, check Public IP if its not checked and then click on Add Network. There, choose a name for the public connections, and write '0.0.0.0/0' on the Network\* field. This will allow you to connect to your db from your computer.This isn't recommended, but because this is a small project you can continue.

Let the Database create itself. This could take a few minutes.

### 6. Back to the code

Open your favorite editor, I'm using VSCode for this example. Go to the cloned repo. We will need to add a few files to run this. But don't worry, most of the code is already in there.

Go ahead and run `npm run` in the root directory, the backend directory and the frontend directory. Once this is done, run `yarn` as well in the three directories. There's a couple of bugs with the Prisma and the Google Translate API dependencies that are fixed by doing this.

#### 6.1 Setting up Prisma

For this project, I've used Prisma as an ORM. We need to set it up so it connects to the Cloud Database you created.

Move to the backend directory and input the following commands in your terminal:

```
npx prisma generate
```

```
npx prisma migrate dev
```

This should create a .env file in your backend root, if it doesn't create automatically, create one yourself. Prisma uses this file to connect with your remote database. In there, create a variable with the following structure:

```
DATABASE_URL="<CONNECTOR>://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>"
```

In the case of gcloud, your HOST is the Public IP address provided by the Cloud Database you created. The CONNECTOR is 'postgresql' and the USER is postgres by default. You can omit the PORT.

You should end up with something that looks like this:

```
DATABASE_URL="postgresql://postgres:mypassword@0.0.0.0/mydatabase?schema=public"
```

#### 6.2 Understanding Google Cloud Docs

All of the cloud documents needed to deploy have already been provided to you. But I will explain what they do. You could've notice by now that each major directory has a .yaml file. Because our project is comprised of two services (front and backend), we need to indicate to gcloud what are they and how they work.

We achieve this with the .yaml files. The back and frontend ones provide the runtime we'll be using, and what service it is. The most important one is the dispatch.yaml in the root directory. This one gives the routes that gcloud should use and the service it should link them to. In this way, we connect our backend API with our frontend routes.

### 7. Deployment

Once you're done. Go to your terminal and input the following commands.

```
gcloud app deploy backend/backend.yaml frontend/frontend.yaml dispatch.yaml
```

This will make gcloud deploy the services in that order. This is important because our backend scripts create files that the frontend will need to be deployed correctly. Finally, the dispatch.yaml will create the routes.

If everything goes as it should, your two services should deploy successfully, and you should be able to visualize your app by inputing the following command:

```
gcloud app browse
```

## References

- https://console.cloud.google.com/logs/
- https://www.prisma.io/docs/concepts/database-connectors/postgresql
- https://www.prisma.io/docs/guides/development-environment/environment-variables/managing-env-files-and-setting-variables
