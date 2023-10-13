import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';
import ConfirmDowngradeContent from './confirmDowngradeContent/confirmDowngradeContent';
import ConfirmUpgradeContent from './confirmDowngradeContent/confirmUpgradeContent';
import ConfirmUncancelContent from './confirmDowngradeContent/confirmUncancelContent';

function ConfirmUpgradeModal({calculateData, handleConfirmModalClose, handleConfirmPayClick, subscriptionData}) {
    console.log(subscriptionData)
    return (
        <Dialog
            open={calculateData!==null && calculateData!==undefined}
            onClose={handleConfirmModalClose&&handleConfirmModalClose}
        >
            <DialogContent>
            {
                calculateData?.estimate_data?.upgrade?
                <ConfirmUpgradeContent
                    calculateData = {calculateData}
                />:
                subscriptionData?.subscriptionPlan?._id === calculateData?.subscriptionPlan?._id?
                <ConfirmUncancelContent
                    calculateData = {calculateData}
                />:
                <ConfirmDowngradeContent
                    calculateData = {calculateData}
                />
            }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmModalClose&&handleConfirmModalClose}>Cancel</Button>
                <Button onClick={()=>{handleConfirmPayClick&&handleConfirmPayClick(calculateData?.subscriptionPlan); handleConfirmModalClose()}}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}
ConfirmUpgradeModal.propTypes = {
    calculateData: PropTypes.object,
    handleConfirmModalClose: PropTypes.func,
    subscribedClicked: PropTypes.object,
    handleConfirmPayClick: PropTypes.func,
    subscriptionData: PropTypes.object,
}
export default ConfirmUpgradeModal;
