import { Check, Close } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import config from "../../../../../../config";

function Features({features}) {

    return (
        <>
        {
            features && 
            <Grid container>
                <Grid item xs={12}>
                {
                    features.map((feature, i)=>{
                        return (
                            <Box key={`${i}:${feature.title}`} sx={{display:"flex", gap:"0.5rem", alignItems:"flex-end", marginBottom:"0.5rem"}}>
                                {feature.includes ? (
                                    <Check style={{ color: 'green' }} />
                                ) : (
                                    <Close style={{ color: config.brand_color_main }} />
                                )}
                                <Typography variant="body2" sx={{color:feature.color?feature.color:"black"}}>{feature.title}</Typography>
                            </Box>
                        )
                    })
                }
                </Grid>
            </Grid>
        }
        </>
        
    )
}
Features.propTypes = {
    features: PropTypes.array,
};

export default Features;