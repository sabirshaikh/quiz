import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current: 0,
    questions: [],
    score: 0
}


const quizSlice = createSlice({
    name: 'quizSlice',
    initialState,
    reducers: {
        setQuestions(state, action) {
            state.questions = action.payload;
        },
        setCurrent(state, action) {
            state.current = state.current + 1
        },
        setScore(state) {
            state.score = state.score + 1
        },
        resetQuiz(state) {
            state.current = 0;
            state.score = 0;
        }
    }
});

export default quizSlice;