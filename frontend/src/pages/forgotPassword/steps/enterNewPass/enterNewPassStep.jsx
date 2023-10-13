import PropTypes from 'prop-types';
import EnterNewPassContent from './components/enterNewPassContent';
import { useState } from 'react';

function EnterNewPassStep({handleEnterNewPassword, error}) {
    const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    });

    function updateForm(form) {
        setForm(form);
    }

    function handleSubmit() {
        if(handleEnterNewPassword) {
            handleEnterNewPassword(form);
        }
    }

    return (
        <EnterNewPassContent
            form = {form}
            updateForm = {updateForm}
            handleSubmit = {handleSubmit}
            error = {error}
        />
    )
}

EnterNewPassStep.propTypes = {
    handleEnterNewPassword: PropTypes.func,
    error: PropTypes.object,
};

export default EnterNewPassStep;