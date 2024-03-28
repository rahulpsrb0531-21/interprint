import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Auth/login'
import ClientEnquiryTable from './pages/Client/Table/EnquiryTable'
import ClientQuotationTable from './pages/Client/Table/QuotationTable'
// import ClientDetails from './pages/Client/Details'
import EnquiryForm from './pages/EnquiryForm'
import EnquiryTable from './pages/Sales/Table/EnquiryTable'
import EnquiryDetails from './pages/Sales/EnquiryDetails'
import ClientTable from './pages/Sales/Table/ClientTable'
import ClientQuotationDetails from './pages/Client/Details/ClientQuotationDetails'
import CreateClient from './pages/Sales/CreateQuotationAndClient'
import CreateQuotationAndClient from './pages/Sales/CreateQuotationAndClient'
import QuotationTable from './pages/Sales/Table/QuotationTable'
import ThankYouPage from './pages/ThankYouPage'
import ClientLogin from './pages/Auth/Client/login'
import PrepressEnquiryTable from './pages/PrePress/Table/PrepressEnquiryTable'
import PrepressEnquiryDetails from './pages/PrePress/Table/PrepressEnquiryDetails'
import CreateEnquiry from './pages/Client/CreateEnquiry'


export default function Router() {
    return useRoutes([
        // client 
        {
            path: '/client',
            element: < MainLayout />,
            children: [
                { path: 'enquiry/lists', element: <ClientEnquiryTable /> },
                { path: 'quotation/lists', element: <ClientQuotationTable /> },
                { path: 'quotation/:name/details', element: <ClientQuotationDetails /> },
                { path: 'create/new/enquiy', element: <CreateEnquiry /> },
            ]

        },

        // sales 
        {
            path: '/sales',
            element: < MainLayout />,
            children: [
                { path: 'enquiry/lists', element: <EnquiryTable /> },
                { path: 'enquiry/:name/details', element: <EnquiryDetails /> },
                { path: 'client/lists', element: <ClientTable /> },
                { path: 'create/new/client', element: <CreateClient /> },
                { path: 'quotation/lists', element: <QuotationTable /> },
            ]

        },

        // pre-press 
        {
            path: '/pre-press',
            element: < MainLayout />,
            children: [
                { path: 'enquiry/lists', element: <PrepressEnquiryTable /> },
                { path: 'enquiry/:name/details', element: <PrepressEnquiryDetails /> },
            ]

        },


        // login 
        // { path: "/login", element: <Login /> },
        { path: "/", element: <Login /> },

        // client login page 
        { path: "/client/login", element: <ClientLogin /> },

        // Enquiry Form
        { path: "/enquiry", element: <EnquiryForm /> },

        // Thank you page 
        { path: "/thank-you", element: <ThankYouPage /> }
    ])
}