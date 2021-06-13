
import * as reminderTypes from './reminder.constant';
import { initialState } from './reminder.state';

export const reminderReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
      case reminderTypes.REMINDER_DETAIL:
      return {
        ...state,
        reminderDetail: action.payload,
      };
      case reminderTypes.REMINDERS_LIST:
      return {
        ...state,
        remindersList: action.payload,
      };
    default:
      return state;
  }
};
