function user(state={username:'',userid:''}, action) {
    switch (action.type) {
        case 'SETUSER':
            state.username = action.data.username;
            state.userid = action.data.id;
            return state;
        default:
            return state;
    }
}

export default user;