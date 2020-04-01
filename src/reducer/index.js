const initialState = {
    isLoginSuccess: false,
    username: "",
    password: "",
    userActiveDetails: "",
    selectedDateDetails: ""
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'onLoginSuccess': return { ...state, isLoginSuccess: action.target };
        case 'username': return { ...state, username: action.target }
        case 'password': return { ...state, password: action.target }
        case 'UserActiveDetails': return { ...state, userActiveDetails: action.target }
        case 'SelectedDateDetails': return { ...state, selectedDateDetails: action.target }
        default:
            return state;

    }
}