# Clarity — A Todoist-inspired Task Manager (React)

This is a complete, working React app. Below is everything you need to run it
and understand how it's built, even if you've never touched React before.

## 1. What you need installed

You only need **Node.js** (which comes with `npm`, the tool that installs
JavaScript packages).

1. Go to https://nodejs.org
2. Download the **LTS** version and install it (Next, Next, Finish — default
   options are fine)
3. Confirm it worked by opening a terminal and running:
   ```
   node -v
   npm -v
   ```
   Both should print a version number.

## 2. Running this project

1. Unzip/copy this `todo-app` folder anywhere on your computer
2. Open a terminal **inside that folder** (on Windows: open the folder in
   File Explorer, type `cmd` in the address bar, press Enter)
3. Install the dependencies (one-time step, downloads React itself):
   ```
   npm install
   ```
4. Start the app:
   ```
   npm start
   ```
5. Your browser should open automatically to `http://localhost:3000`. If not,
   open it manually. You'll see the app live, and it auto-reloads whenever
   you edit a file.

## 3. How a React app is structured (the mental model)

React breaks a UI into **components** — small, reusable, self-contained
pieces of UI, each written as a JavaScript function that returns what looks
like HTML (this is called **JSX**).

```
src/
  index.js         → the entry point; tells React "render <App /> into the page"
  App.js            → the top-level component; holds the master list of tasks
  App.css           → all the visual styling
  components/
    TaskInput.js    → the text field + "Add task" button
    TaskList.js     → loops over tasks and renders one TaskItem per task
    TaskItem.js     → a single row: checkbox, text, edit/delete buttons
    StatusBar.js     → progress ring, filter tabs (All/Active/Completed), theme toggle
  hooks/
    useLocalStorage.js → a reusable helper that saves/loads data from the browser
```

## 4. The two core ideas you need to understand React

**State** is data that can change and that React watches. When state changes,
React automatically re-renders the screen to match. In this app, the master
state is the `tasks` array, declared in `App.js`:

```js
const [tasks, setTasks] = useState([]);
```

`tasks` is the current value. `setTasks` is the *only* correct way to change
it — you never modify it directly.

**Props** are how a parent component passes data (or functions) down to a
child. For example, `App.js` passes the task array and an `onAddTask`
function down to `TaskInput`:

```jsx
<TaskInput onAddTask={addTask} />
```

Inside `TaskInput.js`, that function is received as a prop and called when
the form is submitted. This "data and behavior flow downward, events flow
back up through callback functions" pattern is the heart of React — once it
clicks, the rest of the framework makes sense.

## 5. Feature walkthrough (where to look in the code)

| Feature | File | How it works |
|---|---|---|
| ➕ Add a task | `TaskInput.js` → `App.js`'s `addTask` | Form submit creates a new task object and prepends it to the array |
| ✏️ Edit a task | `TaskItem.js` (double-click text) | Toggles a local "editing" state, swaps text for an input box |
| 🗑️ Delete a task | `TaskItem.js` trash icon → `App.js`'s `deleteTask` | Filters the task out of the array |
| ✅ Complete a task | `TaskItem.js` checkbox → `App.js`'s `toggleTask` | Flips the `completed` boolean on that one task |
| 💾 Persistence | `hooks/useLocalStorage.js` | Wraps `useState` and automatically saves to the browser's `localStorage` on every change, and reloads it on startup |
| 🌓 Dark/light theme | `App.js` `theme` state + `App.css` `[data-theme='dark']` | Swaps a set of CSS variables |
| 📱 Responsive | `App.css` bottom `@media` block | Adjusts layout under 480px width |

## 6. Suggested next experiments

Once it's running, try these small changes to build intuition:
- Change `--signal-red` in `App.css` to a different hex color and watch the
  whole app's accent color update
- Add a `dueDate` field to the task object in `addTask` (in `App.js`) and
  display it in `TaskItem.js`
- Add a "Clear completed" button in `StatusBar.js` that calls a new function
  in `App.js`

## 7. If something goes wrong

- **"npm: command not found"** → Node.js isn't installed correctly; reinstall
  from nodejs.org and restart your terminal
- **Port 3000 already in use** → close other running apps, or press `Y` when
  the terminal asks to run on a different port
- **Blank white page** → open your browser's DevTools (F12) and check the
  Console tab for a red error message; it usually points exactly at the typo
