import PropTypes from 'prop-types';
import { Box, Grid, Typography } from "@mui/material";
import config from '../../../../config';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

function BonusSection({accountData}) {

    return (
        <Grid container>
            <Grid item xs={12} sx={{marginBottom:"1rem"}}>
                <Typography sx={{color:config.brand_text_color_main}} fontWeight='bold' variant="h5">Bonus</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Box sx={{display:"flex", gap:"0.25rem"}}>
                        <MessageOutlinedIcon sx={{color:config.brand_color_main}}/>
                        <Typography fontWeight="bold">Bonus Messages: {accountData.user.extra_messages}</Typography>
                    </Box>
                    <Box sx={{display:"flex", gap:"0.25rem"}}>
                        <SavingsOutlinedIcon sx={{color:config.brand_color_main}}/>
                        <Typography fontWeight="bold">Ai Coins: {accountData.user.tokens}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

BonusSection.propTypes = {
    accountData: PropTypes.object
}

export default BonusSection;