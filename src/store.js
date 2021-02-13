import { configureStore } from '@reduxjs/toolkit'

import timerReducer from "./timer.js"

export default configureStore({
    reducer: {
        timer: timerReducer
    }
})
