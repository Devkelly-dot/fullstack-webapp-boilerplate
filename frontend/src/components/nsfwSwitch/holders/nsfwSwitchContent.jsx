import { Box, Switch, Typography, alpha, styled } from "@mui/material";
import PropTypes from 'prop-types';
import config from "../../../config";

function NsfwSwitchContent({handleToggle, show_nsfw}) {
    const BrandSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: config.brand_color_main,
          '&:hover': {
            backgroundColor: alpha(config.brand_color_main, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: config.brand_color_main,
        },
    }));

    return (
        <Box sx={{display:"flex", alignItems:"center"}}>
            <Typography variant="body2" fontWeight="bold" sx={{color:config.brand_text_color_main}}>NSFW</Typography>
            <BrandSwitch checked={show_nsfw} color="error" onClick={()=>handleToggle()}/>
        </Box>
    )
}

NsfwSwitchContent.propTypes = {
    handleToggle: PropTypes.func,
    show_nsfw: PropTypes.bool,
}

export default NsfwSwitchContent;