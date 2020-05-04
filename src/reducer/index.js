const initialState = {
    isLoginSuccess: false,
    username: "",
    password: "",
    userVideoLink: "",
    userRelevantQuestions:"",
    userId:""
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'onLoginSuccess': return { ...state, isLoginSuccess: action.target };
        case 'username': return { ...state, username: action.target }
        case 'password': return { ...state, password: action.target }
        case 'UserVideoLink': return { ...state, userVideoLink: action.target }
        case "UserId":return {...state,userId:action.target}
        case 'UserRelevantQuestions': return { ...state,userRelevantQuestions: action.target }
        default:
            return state;

    }
}