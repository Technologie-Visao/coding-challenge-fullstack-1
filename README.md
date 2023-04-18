
# Final Result
We start by having all items
![image](https://user-images.githubusercontent.com/51382208/232643109-44647483-0ad9-4e27-a92d-c226d63c3f1a.png)

After pressing two or more letters in the search bar you get the following results

![image](https://user-images.githubusercontent.com/51382208/232643142-ab1cc420-9efe-4e55-947f-e2ab993c695e.png)



























# Visao Coding Challenge
## Instructions
Design an API(backend) which serves suggestions of textures and a web page(frontend) 
which includes an autocomplete component to search them.
We have provided you with a skeleton React/Typescript project(frontend folder)
and another empty project(backend folder) which only includes a JSON data file for the textures.

1. Get your environment set up.
   - [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repo
   - Make sure node.js and yarn are installed for the frontend project
2. For the code:
   - We are looking for:
     - A finished product that meets the specs
     - Code readability and simplicity
     - Best practices around React components, frontend styling and backend apis
     - You to showcase your skill
   - Please don't:
     - Reach for any external UI components. We want to see you build.
   - Feel free to:
     - Create additional React components
     - Use any npm packages that are not UI component libraries(MUI, AntD, Bootstrap, etc...)
     - You can take as long as you like to complete this project
     - Inspire yourself from the web(dribbble, pinterest, etc...) to deliver a beautiful UI.
Make sure to reference it in your pull request. 
but we'd like you to keep track of much time you spend
3. Once finished, push your changes and open a pull request with:
   - How much time you spent
   - Any thoughts or extra context you want to provide about your code
   - Any thoughts or reflections you have about the project requirements

### Backend
Design an API endpoint that provides autocomplete suggestions for many textures.
- Setup the backend project
  - Provide the information to run it in the readme. Package installation, start command, port, etc...
  - Use either Python(what we use in our backend) or node.js as the language of choice
  - Use the backend framework of your choice
- Create an API endpoint must be exposed at `/textures/suggestions`
  - Use a query string parameter to pass the search term
  - Use a query string parameter to provide a limit of items that can be suggested
  - Based on the search term, 
use your imagination to apply a weight/score to find the best possible matches 
to find the best suggestions possible 
  - Should return a JSON response with an array of suggested textures
    - The suggestions should be sorted by descending weight(best match)
    - Return the number of suggestions corresponding to the limit parameter provided
    - Should follow this format
    ```
    [
      {
      "name": "Rustic Metal Texture",
      "description": "This free 3D texture features a rustic metal look, perfect for industrial scenes and settings.",
      "thumbnail_url": "https://example.com/textures/rustic_metal.jpg"
      }
    ]
    ```

### Frontend
Design an autocomplete component which and will show suggested textures
- As text is being typed into the component's input, a list of textures should render above/below it
- Suggestions must fetched from the api you designed
- Limit the number of suggestions fetched. For example, only show 5 items in the suggestion box.
- Suggested textures should contain the thumbnail, the name and part of the description
- The list items should be selectable by mouse click or hitting the enter key.
- The list of suggestions should NOT show when the input is less than two characters.
- Display a message when no suggestions are found
- The design should be mobile friendly
