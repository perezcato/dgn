/**
 * @Description: Category epic
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** LIBRARY */
import { filter, mergeMap } from 'rxjs/operators';

/** TYPES ACTIONS */
import * as actionTypes from '../actions/types';

/** API */
import Api from '~/services/api';
import wpApi from '~/config/wp.api';

export const categoryEpic = action$ => action$.pipe(
  filter(action => action.type === actionTypes.GET_ALL_CATEGORY),
  mergeMap(obj => {
    return Api.get(wpApi.categories.list).then((resp) => {
      return {
        data: resp
      }
    })
  })
)