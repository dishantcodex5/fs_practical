import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../features/loginSlicer.js'


const store = configureStore({
    reducer: {
        login: loginReducer
    }
})

export default store