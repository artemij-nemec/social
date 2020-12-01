import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UsersFilterType } from '../../redux/users-reducer';
import { getFilter } from '../../redux/users-selectors';

type PropsType = {
    onFilterChanged: (filter: UsersFilterType) => void
}
enum FriendsVal {
    FindAll = 'Find all',
    Friends = 'Friends',
    NotFriends = 'Not friends'
}
type FormType = {
    term: string
    friends: FriendsVal
}
export const UserSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
    const { Option } = Select
    const [form] = Form.useForm()
    const filter = useSelector(getFilter)
    let friends = filter.friends === true
        ? FriendsVal.Friends
        : filter.friends === false ? FriendsVal.NotFriends : FriendsVal.FindAll
    const onFinish = (values: FormType) => {
        let friends = values.friends === FriendsVal.FindAll
            ? undefined
            : values.friends === FriendsVal.Friends ? true : false
        const filter: UsersFilterType = {
            term: values.term,
            friends
        }
        onFilterChanged(filter)
    }
    const onReset = () => {
        form.setFieldsValue({ term: '', friends: FriendsVal.FindAll })
        form.submit()
    }

    useEffect(
        () => {
            form.setFieldsValue({ term: filter.term, friends })
        },
        [ filter ]
    )

    return <Form
        form={form}
        initialValues={{ term: filter.term || '', friends:  friends || FriendsVal.FindAll }}
        onFinish={onFinish}
    >
        <Form.Item
            name="term"
            style={{ display: "inline-block", marginRight: '10px', width: 200 }}
        >
            <Input
                value={filter.term}
                placeholder="Search"
            />
        </Form.Item>
        <Form.Item
            name="friends"
            style={{ display: "inline-block", marginRight: '10px', width: 200 }}
        >
            <Select value={friends}>
                <Option value={FriendsVal.FindAll}>Find all</Option>
                <Option value={FriendsVal.Friends}>Friends</Option>
                <Option value={FriendsVal.NotFriends}>Not friends</Option>
            </Select>
        </Form.Item>
        <Form.Item style={{ display: "inline-block", marginRight: '10px' }}>
            <Button
                type="primary"
                htmlType="submit"
            >
                Find
            </Button>
        </Form.Item>
        <Form.Item style={{ display: "inline-block" }}>
            <Button htmlType="button" onClick={onReset}>
                Clear
            </Button>
        </Form.Item>
    </Form>
}
