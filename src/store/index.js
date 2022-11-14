import {configureStore, combineReducers} from '@reduxjs/toolkit';
import quiz from './quizSlice';
const rootReducer = combineReducers({ 
    quizReducer: quiz.reducer
  })

const store = configureStore({  
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export const quizActions = quiz.actions;
export default store;