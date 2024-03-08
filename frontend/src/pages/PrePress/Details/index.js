import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Stack, Tab, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import OrderDetails from './OrderDetails'
import Download from './Download'
import ArtWork from './Artwork'


export default function Details() {
    // const navigate = useNavigate()
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box>
            {/* <Typography sx={{ fontSize: { xs: 26, lg: 32 }, fontWeight: 500, pl: 1, py: 2 }} >Edit your profile</Typography> */}
            <TabContext value={value}>
                {/* <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                // width={'100%'}
                // sx={{
                //     // borderBottom: 1, borderColor: 'divider'
                //     bgcolor: "red",
                //     width: "100%"
                // }}
                > */}
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab sx={{ textTransform: "uppercase" }} label="order details" value="1" />
                    <Tab sx={{ textTransform: "uppercase" }} label="Artwork" value="2" />
                    <Tab sx={{ textTransform: "uppercase" }} label="download" value="3" />
                </TabList>
                {/* </Stack> */}
                <TabPanel sx={{ "&.MuiTabPanel-root": { p: 0 } }} value="1"><OrderDetails /></TabPanel>
                <TabPanel sx={{ "&.MuiTabPznel-root": { p: 0 } }} value="2"><ArtWork /></TabPanel>
                <TabPanel sx={{ "&.MuiTabPznel-root": { p: 0 } }} value="3"><Download /></TabPanel>
            </TabContext>
        </Box>
    );
}