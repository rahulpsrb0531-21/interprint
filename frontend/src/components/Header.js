import { Avatar, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles'
import Iconify from "../components/Iconify";
import ProfilePopover from "../layouts/ProfilePopover";
// import ProfilePopover from "../ProfilePopover";

export default function Header({ handleLeftDrawerToggle }) {
    const theme = useTheme()
    const navigate = useNavigate()
    return (
        <Stack direction={'row'} justifyContent={'space-between'}
            sx={{ width: "100%" }}
        >
            <Stack direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{
                    width: 228,
                    height: 60,
                    // display: 'flex',
                    // [theme.breakpoints.down('md')]: {
                    //     width: 'auto'
                    // },
                    // bgcolor: "red"
                }}
            >
                <Box component="span"
                    sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
                >
                    <Typography sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        textTransform: "uppercase"
                    }} >Interprint</Typography>
                </Box>

                {/* <ButtonBase sx={{
                    borderRadius: '12px', overflow: 'hidden'
                }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            // background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                // background: theme.palette.secondary.dark,
                                // color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <Iconify icon={"material-symbols-light:menu"} />
                    </Avatar>
                </ButtonBase> */}
            </Stack>
            <ProfilePopover />
        </Stack>
    )
}