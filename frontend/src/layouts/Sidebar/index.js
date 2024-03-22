import { useMediaQuery, Typography, Drawer, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles'

// third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { BrowserView, MobileView } from 'react-device-detect';
import NavSection from "../../components/NavSection";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";

export default function Sidebar({ drawerOpen, drawerToggle, window }) {
    const { user } = useSelector((state) => state.auth)
    const theme = useTheme()
    const drawerWidth = 218
    // const drawerWidth = 260
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))
    // console.log(matchUpMd)

    const container = window !== undefined ? () => window.document.body : undefined
    // console.log(container)

    // const navConfig = [
    //     // {
    //     //     title: 'CLIENT & ORDERS',
    //     //     path: '/pre-press/order',
    //     //     icon: "mingcute:group-3-line"
    //     // },
    //     {
    //         title: 'ORDERS',
    //         path: '/client/order',
    //         icon: "lets-icons:order"
    //         // icon: "lets-icons:order-light"
    //     },
    //     {
    //         title: 'HELP',
    //         path: '/help',
    //         // icon: "lets-icons:question-light"
    //         icon: "octicon:question-24"
    //     },
    // ]

    // console.log("dlf", window)
    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 0, mx: 'auto' }}>
                    {/* <LogoSection /> */}
                    <Typography>Interprint</Typography>
                </Box>
            </Box>
            <NavSection
                // navConfig={navConfig}
                navConfig={user?.navConfig}
            />
        </>
    );

    return (
        <Box
            component="nav"
            sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
        >
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                // open={true}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        // background: "red",
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '64px'
                        },
                    },
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
}