// Store/configureStore.js

import { createStore, combineReducers } from 'redux';
import toogleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'

export default createStore(combineReducers({toogleFavorite, setAvatar}))