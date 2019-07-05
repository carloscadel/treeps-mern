import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import { forbiddenWordsMiddleware } from '../middlewares'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  applyMiddleware(forbiddenWordsMiddleware)
)

export default store