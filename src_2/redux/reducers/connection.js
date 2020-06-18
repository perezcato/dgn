/**
 * @Description: Connection reducer
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
/** ACTION TYPE */
import * as types from '../actions/types';

const initialState = {
  connection: false
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
      case types.UPDATE_CONNECTION_STATUS:
        return Object.assign({}, state, {
            connection: action.status
        });
    
      default:
        return state
    }
}