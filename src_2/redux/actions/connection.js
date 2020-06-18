/**
 * @Description: Connection actions
 * @Created by ZiniTeam
 * @Date create: 16/11/2018
 */
import * as actionTypes from './types';

export const updateNetStatus = (status) => ({ type: actionTypes.UPDATE_CONNECTION_STATUS, status });