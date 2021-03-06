import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { UpdateStatusType } from '../../../types/types';
import ProfileStatus from './ProfileStatus';

const updateStatus: UpdateStatusType = (newStatus) => {}
describe('Profile status componen', () => {
    test('status should be in the state', () => {
        let component = null as ReactTestRenderer | null
        act(() => {
            component = create(<ProfileStatus status="test status" updateStatus={updateStatus} />)
        })
        if (!component) {
            return false
        }
        const instance = component.root
        const span = instance.findByType("span");
        expect(span.props.children).toBe("test status")
    });
    test('status should contain <span>', () => {
        const component = create(<ProfileStatus status="test status" updateStatus={updateStatus} />)
        const instance = component.root
        expect(instance.findAllByType("span").length).toBe(1)
    });
    test('status shouldn\'t contain <input>', () => {
        const component = create(<ProfileStatus status="test status" updateStatus={updateStatus} />)
        const instance = component.root
        expect(instance.findAllByType("input").length).toBe(0)
    });
    test('<input> should be shown after dblclick', () => {
        let component = null as ReactTestRenderer | null
        act(() => {
            component = create(<ProfileStatus status="test status" updateStatus={updateStatus} />)
        })
        if (!component) {
            return false
        }
        const instance = component.root
        const span = instance.findByType("span");
        act(() => {
            span.props.onDoubleClick()
        })
        const input = instance.findByType("input");
        expect(input.props.value).toBe("test status")
    });
    test('callback shoud be called', () => {
        const mockCallbeck = jest.fn()
        let component = null as ReactTestRenderer | null
        act(() => {
            component = create(<ProfileStatus status="test status" updateStatus={mockCallbeck}/>)
        })
        if (!component) {
            return false
        }
        const instance = component.root
        const span = instance.findByType("span");
        act(() => {
            span.props.onDoubleClick()
        })
        const input = instance.findByType("input");
        act(() => {
            input.props.onBlur()
        })
        expect(mockCallbeck.mock.calls.length).toBe(1)
    });
});