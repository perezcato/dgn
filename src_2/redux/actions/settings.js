/**
 * @Description: Settings actions
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
import * as actionTypes from './types';

export const fetchSettingsSuccess = (data) => ({ type: actionTypes.FETCH_SETTINGS_SUCCESS, data: data });
export const removeAllSetting = (data) => ({ type: actionTypes.REMOVE_ALL_SETTING });