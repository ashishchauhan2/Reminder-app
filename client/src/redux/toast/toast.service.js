import iZtoast from 'izitoast';

const toast = {
  error: (message, title) => {
    return iZtoast.error({
      progressBar: false,
      position: 'bottomCenter',
      message,
      title,
    });
  },
  success: (message, title='' ) => {
    return iZtoast.success({
      progressBar: false,
      position: 'bottomCenter',
      message,
      title,
    });
  },
  info: (message, title='') => {
    return iZtoast.info({
      progressBar: false,
      position: 'bottomCenter',
      message,
      title,
    });
  },
};

export default toast;
