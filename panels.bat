wt -M -d "./frontend" cmd /k "npm install && npm run dev"; ^
split-pane -V -d "./backend" cmd /k "npm install && npm start"