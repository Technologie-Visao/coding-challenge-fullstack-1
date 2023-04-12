# Visao Coding Challenge
### Solved by François Boulay-Handfield 
#### 2023-04-12

## Run Server
#### Option 1
```install.sh``` creates a Python virtual environment and installs necessary packages for FastAPI. In the event you'd like to quench your curiosity pertaining to packages to be installed, you can find more information below.

```run.sh``` launches Vite.

#### Option 2
Change directory to ```backend``` and ```uvicorn api:app --reload``` to start API once packages are installed with your favourite package manager. 

In the event you get `[Errno 48] Address already in use` from FastAPI if you start/stop the server for any reason, `lsof -i :8000` will list process IDs you should kill with `kill <put PID here without angle brackets>` 

```yarn dev``` in after changing directories to `frontend/src`.

## Backend 

#### FastAPI
[FastAPI](https://pypi.org/project/fastapi/) is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.

#### Uvicorn
[uvicorn](https://pypi.org/project/uvicorn/) is a lightning-fast ASGI server implementation, using uvloop and httptools. It's a great tool for running FastAPI.

#### Starlette
[Starlette](https://pypi.org/project/starlette/) is a lightweight ASGI framework/toolkit, which is used by FastAPI.

#### Dotenv
[python-dotenv](https://pypi.org/project/python-dotenv/) is a tool for loading environment variables from a ```.env``` file.

### Overview
Libraries are imported and middleware sets up CORS. Cache-Control headers caches responses for 1 day. Root has a friendly message requesting that you go to GET /textures/suggestions

```get_suggestions``` has 2 implementations; 
1. One reading directly from ```data.json```
2. One reading from a database I proactively developed for this assignment in order to prove my skills. Queries are read from the ```.env``` file. I pushed both on Github despite being security vulnerabilities outside assignments.

Query params `search_term` and `limit` are implemented.

My scoring algorithm grades input value found in the name 5 points, and 1 point for value found in description.

## Frontend

#### Installation
In the event you do not have SASS installed

`yarn add sass`
`npm install sass`

#### Overview
I like what I built and am excited to hear about your review, and how you see me snowball from here. 

Searching for a texture returns relevant results. User-friendly messages are above the input. Upon clicking on one of the results, it is stickied under the input with the option to remove it.

# Thank you Alex!
#### François