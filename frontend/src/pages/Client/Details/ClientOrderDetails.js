import { Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";


export default function ClientOrderDetails() {

    const basic = [
        {
            title: "Order Number",
            value: "IP576/A"
        },
        {
            title: "Order Date",
            value: "01/01/2024"
        },
        {
            title: "Client Name",
            value: "John Doe"
        },
        {
            title: "Product Name",
            value: "Lorem Ipsum"
        },
        {
            title: "Status",
            value: "Printing"
        },
    ]

    const specifications = [
        {
            title: "Product Size",
            value: "IP576"
        },
        {
            title: "Board/Paper",
            value: "Paperboard"
        },
        {
            title: "Process Colors",
            value: "CMYK"
        },
        {
            title: "Spl. Colors",
            value: "None"
        },
        {
            title: "Folling",
            value: "Lorem Ipsum"
        },
        {
            title: "Type",
            value: "Lorem Ipsum"
        },
        {
            title: "Finishing",
            value: "None"
        },
        {
            title: "Embossing/ Braille",
            value: "Lamination"
        },
        {
            title: "Product Quantity",
            value: 30000
        },
    ]

    const deliveryDetails = [
        {
            title: "Delivery Date",
            value: "03/04/2024"
        },
        {
            title: "Location",
            value: "Mumbai"
        },
        {
            title: "Mode",
            value: "Truck"
        }
    ]

    return (
        <Card sx={{ mt: 6 }}>
            <Stack spacing={4} >
                <Stack direction={'row'} alignItems={'center'} spacing={6} >
                    <Box
                        component={'img'}
                        src='https://asset.brandfetch.io/idMkuqyVA1/id1QGgBW0t.svg'
                        sx={{
                            width: 160
                        }}
                    />
                    <Stack direction={'row'} spacing={6} >
                        {
                            basic.map((data, idx) => (
                                <Stack spacing={2} >
                                    <Typography
                                        variant="orderDetailsText"
                                    >{data?.title}</Typography>
                                    <Typography
                                        variant="orderDetailsSUbText"
                                    >{data?.value}</Typography>
                                </Stack>
                            ))
                        }
                        <Stack spacing={1.4} >
                            <Typography variant="orderDetailsText">
                                Priority
                            </Typography>
                            <Chip
                                label={"Urgent"}
                                color="error"
                            />
                            {/* <Typography
                                variant="orderDetailsSUbText"
                            >Urgent</Typography> */}
                        </Stack>
                    </Stack>
                </Stack>
                <Divider />
                <Stack spacing={2.8} >
                    <Typography sx={{ fontSize: 20, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.6 }} >Specifications</Typography>
                    <Stack direction={'row'} flexWrap={'wrap'} spacing={6} useFlexGap >
                        {
                            specifications.map((data, idx) => (
                                <Stack spacing={2} >
                                    <Typography
                                        variant="orderDetailsText"
                                    >{data?.title}</Typography>
                                    <Typography
                                        variant="orderDetailsSUbText"
                                    >{data?.value}</Typography>
                                </Stack>
                            ))
                        }
                    </Stack>
                </Stack>
                <Divider />
                <Stack spacing={2.8} >
                    <Typography sx={{ fontSize: 20, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.6 }} >Delivery details</Typography>
                    <Stack direction={'row'} flexWrap={'wrap'} spacing={6} useFlexGap >
                        {
                            deliveryDetails.map((data, idx) => (
                                <Stack spacing={2} >
                                    <Typography
                                        variant="orderDetailsText"
                                    >{data?.title}</Typography>
                                    <Typography
                                        variant="orderDetailsSUbText"
                                    >{data?.value}</Typography>
                                </Stack>
                            ))
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}