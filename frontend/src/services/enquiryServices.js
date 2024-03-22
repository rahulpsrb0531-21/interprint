import { server } from '../utils/server'

const createEnquiry = (data) => {
    return server.post(`api/enquiry/create`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getAllEnquiry = () => {
    return server.get(`api/enquiry/all`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const enquiryServices = {
    createEnquiry, getAllEnquiry
}
export default enquiryServices