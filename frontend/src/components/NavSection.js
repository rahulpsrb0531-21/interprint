import { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, List, Collapse, ListItemIcon, ListItemButton, Typography } from '@mui/material'
import Iconify from './Iconify'

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  // height: 40,
  position: 'relative',
  textTransform: 'capitalize',
  color: '#282C3F',
  // color: 'gold',
  fontWeight: 300,
  // backgroundColor: "black",
  width: 100,
  borderRadius: '4px',
  // textAlign: "center"
}));

const ListItemIconStyle = styled(ListItemIcon)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  // const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, children } = item;
  console.log("fd", path)

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    // color: '#0f6fff ',
    color: "#5e35b1",
    bgcolor: '#ede7f6',
    fontWeight: 400,
    // p: 2,
    // transform: 'scale(2)',
    // bgcolor: '#f2f8ff',
    // bgcolor: 'red',
    // opacity: 0.6,
  };

  const activeSubStyle = {
    color: 'text.primary',
    // bgcolor: 'red',
    // p: 4,
    // color: 'text.primary',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}>
          <Typography variant='sidebarHeading' >{title}</Typography>
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                    pl: 2,
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          // transform: 'scale(2)',
                          // bgcolor: 'primary.main',
                          // color: 'blue',
                          color: "#5e35b1",
                          bgcolor: '#ede7f6',
                        })

                      }}
                    />
                  </ListItemIconStyle>
                  <Typography variant='sidebarHeading' >{title}</Typography>
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
        my: 1,
        p: 1,
        width: 200,
        // height: 100,
        "&:hover": {
          // color: '#0f6fff ',
          // color: '#0f6fff ',
          color: "#5e35b1",
          bgcolor: '#ede7f6',
          fontWeight: 400,
          p: 1,
          // transform: 'scale(2)',
          // bgcolor: '#f2f8ff',
          // bgcolor: 'green',
          // opacity: 0.6,
          // width: 90
        },
        // bgcolor: 'green',
      }}
    >
      {/* <Stack direction={'row'}
        alignItems={'center'} justifyContent={'center'}
        sx={{ bgcolor: "red" }}
      // width={"100%"} 
      > */}
      <Iconify icon={icon} sx={{
        width: 32, height: 32
      }} />

      <Typography sx={{
        fontSize: 14,
        fontWeight: 600,
        // color: "#5e35b1"
        pl: 1
      }} >{title}</Typography>
      {/* </Stack> */}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();

  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <List sx={{ p: 1 }} >
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} active={match} />
      ))
      }
    </List >
  );
}
