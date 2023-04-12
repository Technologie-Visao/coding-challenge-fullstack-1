cd backend || exit
uvicorn api:app --reload &
cd ../frontend || exit
yarn dev