let initialState = {
    mainMenu: [
        { id: 1, link: '/profile', name: 'Profile' },
        { id: 2, link: '/dialogs', name: 'Dialogs' },
        { id: 3, link: '/messages', name: 'Messages' },
        { id: 4, link: '/users', name: 'Users' },
    ]
}

const navbarReducer = (state = initialState, action) => {
    return state
}

export default navbarReducer