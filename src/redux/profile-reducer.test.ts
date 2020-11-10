import { ProfileStateType } from './profile-reducer'
// import React from 'react'
// import { render } from '@testing-library/react'
import profileReducer, { actions } from './profile-reducer'

const { addPostActionCreator, deletePostActionCreator } = actions
let state: ProfileStateType = {
    posts: [
        { id: 1, message: 'Message 1' },
        { id: 2, message: 'Message 2' },
        { id: 3, message: 'Messs 3' },
    ],
    profile: null,
    status: ''
}

test('length of posts should be encremented', () => {
    let action = addPostActionCreator('new post text')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)
})

test('new post text should be correct', () => {
    let action = addPostActionCreator('correct post text')
    let newState = profileReducer(state, action)
    expect(newState.posts[3].message).toBe('correct post text')
})

test('length of posts should be decremented after deleting', () => {
    let action = deletePostActionCreator(1)
    let newState = profileReducer(state, action)
    expect(newState).toEqual({
        posts: [
            { id: 2, message: 'Message 2' },
            { id: 3, message: 'Messs 3' },
        ],
        profile: null,
        status: ''
    } as ProfileStateType)
})