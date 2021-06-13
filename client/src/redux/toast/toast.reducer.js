import toast from './toast.service';
import * as toastTypes from './toast.constant';

export const initialToastState = {};

export const toastReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case toastTypes.SUCCESS_TOAST:
      toast.success(action.toastMessage);
      return null;
    case toastTypes.UDPATE_TOAST:
      toast.info(action.toastMessage);
      return null;
    case toastTypes.DELETE_TOAST:
      toast.error(action.toastMessage, 'Delete');
      return null;
    default:
      return state;
  }
};
