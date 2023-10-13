import { AccountCircle } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import config from './config'
const sideBarRoutes = [
    {
        key: "home",
        icon: <HomeIcon sx={{color: config.brand_color_main}}/>,
        route: "/",
        title: "Home"
    },
    {
        key: "account",
        icon: <AccountCircle sx={{color: config.brand_color_main}}/>,
        route: "/account",
        title: "Account"
    },
    {
        key: "pricing",
        icon: <CreditCardIcon sx={{color: config.brand_color_main}}/>,
        route: "/pricing",
        title: "Pricing"
    }
]

export default sideBarRoutes;