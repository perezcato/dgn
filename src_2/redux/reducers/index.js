/**
 * @Description: index reducer
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** REDUCER */
import { combineReducers } from 'redux';
import categoryReducer from './category';
import bookmarkReducer from './bookmark';
import sideMenuReducer from './side_menu';
import settingsReducer from './settings';
import connectionReducer from './connection';

export default combineReducers({
  category: categoryReducer,
  bookmark: bookmarkReducer,
  sideMenu: sideMenuReducer,
  setting: settingsReducer,
  connection: connectionReducer
});