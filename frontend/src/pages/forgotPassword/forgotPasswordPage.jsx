import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ForgotPasswordTransferer from "./holders/forgotPasswordTransferer";

function ForgotPasswordPage() {
    const location = useLocation();
    const [code, setCode] = useState(null);
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        setCode(code);
    }, [location]);
    
    return (
        <Grid container>
            <Grid item xs={12}>
                <ForgotPasswordTransferer
                    param_code = {code}
                />
            </Grid>
        </Grid>
    )
}

export default ForgotPasswordPage;