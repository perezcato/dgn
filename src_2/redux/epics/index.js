/**
 * @Description: index epic
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** LIBRARY */
import { combineEpics } from 'redux-observable';

/** EPIC */
import { categoryEpic } from './category';
import { bookmarkEpic } from './bookmark';

export default combineEpics(
  categoryEpic,
  bookmarkEpic
)