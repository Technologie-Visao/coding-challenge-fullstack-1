wt -M -d "./frontend" cmd /k npm run dev; ^
split-pane -V -d "./backend" cmd /k npm run dev; ^
move-focus left; ^
split-pane -H -d "./frontend" cmd /k npm test; ^
move-focus right; ^
split-pane -H -d "./backend" cmd /k npm run test-watch