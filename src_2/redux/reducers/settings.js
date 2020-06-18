/**
 * @Description: Setting reducer
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** ACTION TYPE */
import * as actionTypes from '../actions/types';

const initialState = {
  settingsV2: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        settingsV2: action.data.settingsV2
      };
    case actionTypes.REMOVE_ALL_SETTING:
      return {
        ...state,
        settingsV2: {}
      };
  
    default:
      return state;
  }
}