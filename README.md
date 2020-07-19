# Unlimiteck challenge

## Description

This project is to implement JWT and evaluate with the unlimiteck team if the proposed solution solves the problem and is efficient.

## Introduction
The first approach was an application made in vue, graphql and django to handle different types of user and handle request with JWT.
## Overview

The project has the following directory structure:
***/backend***: This folder containts the server files and the whole django app.
***/frontend***: This folder containts the frontend files.
***/dev***: This folder contains an environment activation script.


## Installation

1) First at all, clone this repo :B
2) Create a virtualEnv by running: `virtualenv env`
3) Install the dependiencies for the whole project by running these commands:
    `npm install` or `yarn install`
    `pip install -r requirements.txt`
4) At this point, you'll need to provide the database setup. With the purpose of providing a working project, that file is already set with a functional setup.


    ###### Create DB

        sudo -u postgres createuser unlimiteck
        sudo -u postgres createdb unlimiteckDb

    ###### Enter Postgres

        sudo -u postgres psql

    ###### Give privileges

        grant all privileges on database to unlimiteckDb

    ###### Set user password

        sudo -u postgres psql unlimiteck
        \password unlimiteck123
        Password
        unlimiteck123


5) Execute the migrations by running: `migrate` (*). It should reflect the django models in database.
6) At this time you must be able to run `serve` and watch your app working. (**)

(\*): The *enter.sh* script has many useful aliases for the most common operations and commands. Here is a list of these:

**serve**: Run the whole webapp.
**migrations**: Generate the migrations for the backend django app.
**migrationsall**: Generate the migrations for all the django app.
**migrateall**: Execute the migrations for all the django app.
**migrate**: Execute the migrations for the backend django app.
**shell**: Run the shell_plus.
**createuser**: Create.

7) Enjoy de project :F

