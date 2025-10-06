import { createRoot } from 'react-dom/client'
import './src/index.css'
import App from './src/App.jsx'
import {Provider} from 'react-redux'
import store from './src/app/store.js'



createRoot(document.getElementById('root')).render(
  <>
    <Provider store = {store}>
      <App/>
    </Provider>
  </>,
)