import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import config from '../../../config';

function ImagePreview({image_file, width, height}) {
    const [previewURL, setPreviewURL] = useState('');

    useEffect(() => {
        
        if (image_file) {
            if(typeof image_file === 'string') {
                setPreviewURL(image_file);
            } else {
                const reader = new FileReader();
    
                reader.onload = (e) => {
                setPreviewURL(e.target.result);
                };
        
                reader.readAsDataURL(image_file);
            } 
        }else {
          setPreviewURL(config.default_profile_pic)
        }
        
    }, [image_file]);
  
    return (
      <Box
        component="div"
        sx={{
          height: height?height:206,
          width: width?width:206,
          maxHeight: { xs: height?height:206 },
          maxWidth: { xs: width?width:206 },
        }}
      >
        {previewURL && (
          <img
            src={previewURL}
            alt="The house from the offer."
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              borderRadius:"1rem"
            }}
          />
        )}
      </Box>
    );
}

ImagePreview.propTypes = {
    image_file: PropTypes.any,
    height: PropTypes.number,
    width: PropTypes.number,
}
export default ImagePreview;