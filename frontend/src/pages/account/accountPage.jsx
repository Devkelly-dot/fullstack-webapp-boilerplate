import { Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import LoginModal from './components/loginModal/loginModal';
import AccountFetcher from './holders/accountFetcher';

function AccountPage() {
    const token = useSelector((state)=>state.auth.token); 
    return (
        <Grid container>
            {
                !token && 
                <LoginModal
                    isOpen={!token} 
                />
            }
            <Grid item xs={12}>
                <AccountFetcher/>
            </Grid>
        </Grid>
    )
}

export default AccountPage;