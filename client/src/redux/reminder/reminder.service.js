import { http } from '../common/http.service';   

export const createReminderApi = async (data) =>

  await http.post(`/api/v1/reminder`, data).then((response) => {
    return response.data;
  });

export const deleteReminderApi = async (id) =>
  await http.delete(`/api/v1/reminder/${id}`).then((response) => {
    return response.data;
});

export const updateReminderApi = async (id, data) =>
  await http.put(`/api/v1/reminder/${id}`, data).then((response) => {
    return response.data;
});

export const getReminderDetailApi = async (id) =>
  await http.get(`/api/v1/reminder/${id}`).then((response) => {
    return response.data;
});

export const listRemindersApi = async (id) =>
  await http.get(`/api/v1/reminders-list`).then((response) => {
    return response.data;
});