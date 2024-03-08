import { useEffect, useState } from "react";
import {
    Box, CssBaseline,
    Toolbar, AppBar
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles'
import Header from "../components/Header";
import Sidebar from "./Sidebar";

// import Sidebar from "./Sidebar";

const APP_BAR_MOBILE = 64;
// const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});


const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: 102,
        // paddingTop: APP_BAR_DESKTOP + 24,
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2)
    }
}))

// styles
// export const drawerWidth = 260
// const Main = styled('main', {
//     shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme'
// })(({ theme, open }) => ({
//     ...theme.typography.mainContent,
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     transition: theme.transitions.create(
//         'margin',
//         open
//             ? {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen
//             }
//             : {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen
//             }
//     ),
//     // [theme.breakpoints.up('md')]: {
//     //     marginLeft: open ? 0 : -(drawerWidth - 20),
//     //     width: `calc(100% - ${drawerWidth}px)`
//     // },
//     // [theme.breakpoints.down('md')]: {
//     //     marginLeft: '20px',
//     //     width: `calc(100% - ${drawerWidth}px)`,
//     //     padding: '16px'
//     // },
//     // [theme.breakpoints.down('sm')]: {
//     //     marginLeft: '10px',
//     //     width: `calc(100% - ${drawerWidth}px)`,
//     //     padding: '16px',
//     //     marginRight: '10px'
//     // }
// }));


export default function MainLayout() {
    const theme = useTheme()
    // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    // const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
    const [sidebarOpen, setSidebarOpen] = useState(true); // Default value true
    const [isMobileView, setIsMobileView] = useState(false)

    // Handle left drawer
    const handleLeftDrawerToggle = () => {
        setSidebarOpen(!sidebarOpen)
    }

    // useEffect(() => {
    //     const handleResize = () => {
    //         setSidebarOpen(window.innerWidth > 768);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [])
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
            if (window.innerWidth <= 768) {
                setSidebarOpen(false); // Close sidebar in mobile and tablet view
            } else {
                setSidebarOpen(true); // Open sidebar in browser view
            }
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <Box
            sx={{ display: 'flex' }}
        >
            <CssBaseline />
            {/* header */}
            <AppBar
                // enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: sidebarOpen ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header
                        handleLeftDrawerToggle={handleLeftDrawerToggle}
                    />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={sidebarOpen} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            {/* <Main theme={theme} open={setSidebarOpen} >
                <Outlet />
            </Main> */}
            <RootStyle>
                {/* <Header /> */}
                <MainStyle>
                    <Outlet />
                </MainStyle>
            </RootStyle>
        </Box>
    )
}
// <RootStyle>
//     <Header />
//     <MainStyle>
//         <Outlet />
//     </MainStyle>
// </RootStyle>