import PropTypes from 'prop-types';
import { useState } from 'react';
import EnterCodeContent from './components/enterCodeContent';

function EnterCodeStep({handleEnterCode, error}) {
    const [form, setForm] = useState({
        code: ''
    });

    function updateForm(form) {
        setForm(form);
    }

    function handleSubmit() {
        if(handleEnterCode) {
            handleEnterCode(form);
        }
    }

    return (
        <EnterCodeContent
            form = {form}
            updateForm={updateForm}
            handleSubmit={handleSubmit}
            error = {error}
        />
    )
}
EnterCodeStep.propTypes = {
    handleEnterCode: PropTypes.func,
    error: PropTypes.object,
};

export default EnterCodeStep;