import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// material
import { alpha, useTheme } from '@mui/material/styles'
import { Stack, Typography, Divider, Avatar } from '@mui/material'
// components
import Iconify from '../../components/Iconify'
import MenuPopover from '../../components/MenuPopover'
import User1 from '../../assets/images/user/user-round.svg';
// ----------------------------------------------------------------------

export default function ProfilePopover() {
    const theme = useTheme()
    const navigate = useNavigate()
    const anchorRef = useRef(null)
    const [open, setOpen] = useState(false)
    // console.log(user)
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {/* <IconButton
                ref={anchorRef}
                onClick={handleOpen}
            >
                {/* <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} /> */}
            {/* <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 18, height: 18, transform: "rotate(270deg)" }} />
            </IconButton> */}
            <Avatar
                // component={'img'}
                src={User1}
                sx={{
                    ...theme.typography.mediumAvatar,
                    margin: '8px 0 8px 8px !important',
                    cursor: 'pointer'
                }}
                ref={anchorRef}
                onClick={handleOpen}
                aria-haspopup="true"
                color="inherit"
            />

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{
                    mt: 1.5,
                    ml: 0.75,
                    width: 180,
                    '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
                }}
            >
                <Stack spacing={0.75}>
                    <Stack direction={'row'} alignItems={'center'} >
                        <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} />
                    </Stack>
                    <Divider />
                    <Stack spacing={0.7} >
                        <Typography sx={{ fontSize: 10, fontWeight: 400 }} >support</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 500 }} >Help</Typography>
                        <Typography
                            sx={{
                                fontSize: 12, fontWeight: 500,
                                ":hover": {
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                    cursor: "pointer"
                                }
                            }}
                        >Log out</Typography>
                    </Stack>
                </Stack>
            </MenuPopover>
        </>
    );
}
