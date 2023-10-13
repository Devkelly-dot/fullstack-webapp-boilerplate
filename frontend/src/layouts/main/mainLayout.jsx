import sideBarRoutes from "../../sideBarRoutes";
import ResponsiveDrawer from "./components/responsiveDrawer";
import PropTypes from 'prop-types';

function MainLayout({ children }) {

    return (
        <ResponsiveDrawer
            routes = {sideBarRoutes}
        >
            {children}
        </ResponsiveDrawer>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default MainLayout;