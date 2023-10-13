import PropTypes from 'prop-types';
import { Alert, Box, Button, Grid, Input, Typography } from "@mui/material";
import ImageUploader from '../components/imageUploader';
import config from '../../../config';
function EditProfileContent({image, handleFileChange, attemptSave, form, updateForm, postError}) {
    const inputStyle = {
        border: "1px solid lightgray",
        padding:"6px 12px",
        borderRadius:"8px",
        width:"100%"
    }
    const buttonStyle = {
        padding:"8px 12px",
        borderRadius:"8px",
        width:"100%"
    }

    function updateUsername(e) {
        updateForm(
            {
                ...form, 
                username: e?.target?.value
            });
    }

    function updateBio(e) {
        updateForm({
            ...form,
            bio: e.target.value
        })
    }

    return (
        <Grid container>
            <Grid item xs={12} sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:{md:"60vh"}}}>
                <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{color:config.brand_text_color_main}}>Edit Profile</Typography>
                    {
                        postError && postError.message && 
                        <Alert severity={postError.severity?postError.severity:'error'}>{postError.message}</Alert>
                    }
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight="bold">Username</Typography>
                    <Input sx={inputStyle} value={form?.username}  onChange={updateUsername}/>
                </Box>
                
                <Box>
                    <Typography variant="h6" fontWeight="bold">Your Avatar</Typography>
                    <ImageUploader
                        handleImageChange = {handleFileChange}
                        image = {image}
                    />
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight="bold"> Bio </Typography>
                    <Input sx={inputStyle} value={form?.bio} onChange={updateBio}/>
                </Box>

                <Box>
                    <Button 
                        variant="contained" 
                        sx={{...buttonStyle, backgroundColor:config.brand_color_main, color:config.brand_text_color_secondary}}
                        onClick = {()=>attemptSave()}
                    >
                        Save
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}
EditProfileContent.propTypes = {
    user: PropTypes.object,
    image: PropTypes.any,
    handleFileChange: PropTypes.func,
    attemptSave: PropTypes.func,
    form: PropTypes.object,
    updateForm: PropTypes.func,
    postError: PropTypes.object
}

export default EditProfileContent;