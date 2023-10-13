import PropTypes from 'prop-types';
import { Box, Grid, Typography } from "@mui/material";
import ImagePreview from '../../../../components/editProfileModal/components/imagePreview';

function HeaderSection({accountData}) {
    return (
        <Grid container>
            <Grid item xs={12} sx={{display: {xs: "flex", md:""}, justifyContent:{xs:"center", md:"flex-start"}}}>
                <Box sx={{maxWidth:"206px"}}>
                    <ImagePreview image_file={accountData?.user?.profile_image_url}/>
                    <Typography variant="h6" fontWeight="bold" sx={{textAlign:"center"}}>{accountData?.user?.username}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

HeaderSection.propTypes = {
    accountData: PropTypes.object
}

export default HeaderSection;