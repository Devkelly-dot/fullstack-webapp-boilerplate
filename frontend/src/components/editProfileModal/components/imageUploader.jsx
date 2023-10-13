import PropTypes from 'prop-types';
import { Button, Grid } from "@mui/material";
import ImagePreview from './imagePreview';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

function ImageUploader({handleImageChange, image}) {
    return (
        <Grid container>
            <Grid item xs={12} sx={{display:"flex", gap:"1rem", alignItems:"flex-end"}}>
                <ImagePreview
                    image_file={image}
                />
                <Button sx={{height:"3rem"}} component="label" variant="contained" startIcon={<FileUploadOutlinedIcon />}>
                    <input type="file" style={{display:"none"}} accept="image/*" onChange={handleImageChange&&handleImageChange}/> 
                    Change
                </Button>
            </Grid>
        </Grid>
    )
}

ImageUploader.propTypes = {
    handleImageChange: PropTypes.func,
    image: PropTypes.any
}
export default ImageUploader;