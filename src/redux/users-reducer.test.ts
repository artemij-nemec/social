import { ResponseCodes, ResponseType } from "../api/api"
import { UserAPI } from "../api/users-api"
import usersReducer, { followUser, unfollowUser, usersActions, UsersStateType } from "./users-reducer"
jest.mock("../api/users-api")

let state: UsersStateType
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'User 1',
                status: 'status 1',
                followed: false,
                followingInProgress: false,
                photos: { small: null, large: null }
            },
            {
                id: 1,
                name: 'User 2',
                status: 'status 2',
                followed: false,
                followingInProgress: false,
                photos: { small: null, large: null }
            },
            {
                id: 2,
                name: 'User 3',
                status: 'status 3',
                followed: true,
                followingInProgress: false,
                photos: { small: null, large: null }
            },
            {
                id: 3,
                name: 'User 4',
                status: 'status 4',
                followed: true,
                followingInProgress: false,
                photos: { small: null, large: null }
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false
    }
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test('Follow success', () => {
    const newState = usersReducer(state, usersActions.follow(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('Unfollow success', () => {
    const newState = usersReducer(state, usersActions.unfollow(2))
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})
//thunk
const UserAPIMock = UserAPI as jest.Mocked<typeof UserAPI>
const resultSuccess: ResponseType = {
    resultCode: ResponseCodes.Success,
    messages: [],
    data: {}
}
const resultError: ResponseType = {
    resultCode: ResponseCodes.Error,
    messages: [ 'Some error' ],
    data: {}
}

test('Follow thunk success', async () => {
    UserAPIMock.follow.mockReturnValue(Promise.resolve(resultSuccess))
    const userId = 1
    const thunk = followUser(userId)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(userId, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.follow(userId))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(userId, false))
})
test('Follow thunk error', async () => {
    UserAPIMock.follow.mockReturnValue(Promise.resolve(resultError))
    const userId = 1
    const thunk = followUser(userId)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(userId, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.toggleFollowingProgress(userId, false))
})

test('Unfollow thunk success', async () => {
    UserAPIMock.unfollow.mockReturnValue(Promise.resolve(resultSuccess))
    const userId = 1
    const thunk = unfollowUser(userId)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(userId, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollow(userId))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(userId, false))
})
test('Unfollow thunk error', async () => {
    UserAPIMock.unfollow.mockReturnValue(Promise.resolve(resultError))
    const userId = 1
    const thunk = unfollowUser(userId)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(userId, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.toggleFollowingProgress(userId, false))
})
