cd backend || exit
uvicorn api:app --reload &
cd ../frontend || exit
npm install &
yarn install &
yarn dev