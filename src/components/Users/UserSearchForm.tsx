import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { UsersFilterType } from '../../redux/users-reducer';
import { getFilter } from '../../redux/users-selectors';

type PropsType = {
    onFilterChanged: (filter: UsersFilterType) => void
}
enum FriendsVal {
    FindAll     = 'Find all',
    Friends     = 'Friends',
    NotFriends  = 'Not friends'
}
type FormType = {
    term:       string
    friends:    FriendsVal
}
export const UserSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
    const userSearchFormValidate = (values: FormType) => {
        const errors = {}
        return errors
    }
    const userSearchFormOnSubmit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        let friends = values.friends === FriendsVal.FindAll
            ? undefined
            : values.friends === FriendsVal.Friends ? true : false
        const filter: UsersFilterType = {
            term: values.term,
            friends
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }
    const filter = useSelector(getFilter)
    let friends = filter.friends === true
            ? FriendsVal.Friends
            : filter.friends === false ? FriendsVal.NotFriends : FriendsVal.FindAll
    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={{ term: filter.term, friends}}
            validate={userSearchFormValidate}
            onSubmit={userSearchFormOnSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friends" as="select">
                        <option value={FriendsVal.FindAll}>Find all</option>
                        <option value={FriendsVal.Friends}>Friends</option>
                        <option value={FriendsVal.NotFriends}>Not friends</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
