import * as reminderTypes from './reminder.constant';
import * as toastTypes from '../toast/toast.constant';
import {
    createReminderApi,
    deleteReminderApi,
    updateReminderApi,
    getReminderDetailApi,
    listRemindersApi
  } from './reminder.service';

export const createReminder = (data) => async (
    dispatch
  ) => {
    const response = await createReminderApi(data); 
    if (response) {
        dispatch({
          type: reminderTypes.CREATE_REMINDER,
          payload: response.data,
        });
        dispatch({
          type: toastTypes.SUCCESS_TOAST,
          toastMessage: response?.msg,
        });
      }
  };

  export const deleteSingleReminder = (id) => async (
    dispatch
  ) => {
    const response = await deleteReminderApi(id);
    if (response) {
        dispatch({
          type: reminderTypes.DELETE_REMINDER,
          payload: response.data,
        });
        dispatch({
          type: toastTypes.DELETE_TOAST,
          toastMessage: response?.msg,
        });
      }
  };

  export const updateReminder = (id, data) => async (
    dispatch
  ) => {
    const response = await updateReminderApi(id, data);
    if (response) {
        dispatch({
          type: reminderTypes.UPDATE_REMINDER,
          payload: response.data,
        });
        dispatch({
          type: toastTypes.UDPATE_TOAST,
          toastMessage: response?.msg,
        });
      }
  };

  export const getReminderDetail = (id) => async (
    dispatch
  ) => {
    const response = await getReminderDetailApi(id);
    if (response) {
        dispatch({
          type: reminderTypes.REMINDER_DETAIL,
          payload: response.data,
        });
      }
  };

  export const listReminders = () => async (
    dispatch
  ) => {
    const response = await listRemindersApi(); 
    if (response) {
        dispatch({
          type: reminderTypes.REMINDERS_LIST,
          payload: response.data,
        });
      }
  };

  export const clearReminderData = () => async (
    dispatch
  ) => {
    dispatch({
        type: reminderTypes.REMINDER_DETAIL,
        payload: {},
    });
  };