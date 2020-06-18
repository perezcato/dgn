/**
 * @Description: Bookmark epic
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */

 /** LIBRARY */
import { filter, mergeMap } from 'rxjs/operators';

/** COMMON */
import Helper from '~/utils/helpers';
import { Key } from '~/config';

/** TYPES ACTIONS */
import * as actionTypes from '../actions/types';

export const bookmarkEpic = action$ => action$.pipe(
  filter(action => action.type === actionTypes.ASYNC_STORAGE_BOOKMARK),
  mergeMap(async obj => {
    let params = obj.payload.data
    let _tmpDataStr = await Helper.getAsyncStorageBookmark(Key.ASYNC_STORAGE_BOOKMARK);
    return 
  })
)

export const result = (isSuccess, data) => {
  if (isSuccess) {
    return ({
      type: actionTypes.FETCH_USER_SUCCESS,
      data: param
    })
  }
}