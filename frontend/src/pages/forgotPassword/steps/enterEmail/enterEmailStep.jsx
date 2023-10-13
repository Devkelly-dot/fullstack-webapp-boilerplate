import PropTypes from 'prop-types';
import { useState } from 'react';
import EnterEmailContent from './components/enterEmailContent';

function EnterEmailStep({handleEnterEmail, error}) {
    const [form, setForm] = useState({
        email: ''
    });

    function updateForm(form) {
        setForm(form);
    }

    function handleSubmit() {
        if(handleEnterEmail) {
            handleEnterEmail(form);
        }
    }

    return (
        <EnterEmailContent
            form = {form}
            updateForm={updateForm}
            handleSubmit={handleSubmit}
            error = {error}
        />
    )
}
EnterEmailStep.propTypes = {
    handleEnterEmail: PropTypes.func,
    error: PropTypes.object,
};

export default EnterEmailStep;