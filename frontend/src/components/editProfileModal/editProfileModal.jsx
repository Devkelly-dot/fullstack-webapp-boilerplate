import PropTypes from 'prop-types';
import { Dialog, DialogContent } from "@mui/material"
import EditProfilePage from './holders/editProfilePage';

function EditProfileModal({onClose}) {

    return (
        <Dialog
            open={true}
            onClose = {onClose&&onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogContent>
                <EditProfilePage/>
            </DialogContent>
        </Dialog>
    )
}

EditProfileModal.propTypes = {
    onClose: PropTypes.func,
}

export default EditProfileModal