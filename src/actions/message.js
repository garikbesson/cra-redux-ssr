export const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = messageText => ({ type: SET_MESSAGE, message: messageText });

export const setAsyncMessage = messageText => dispatch => (
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 2000);
    })
        .then(() => dispatch(setMessage(messageText)))
);