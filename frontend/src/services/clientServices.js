import { server } from '../utils/server'

const getQuotation = (id) => {
    return server.get(`api/client/quotation/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getAllEnquiryByUserId = (data) => {
    return server.post(`api/client/get-all/enquiry`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}



const clientServices = {
    getQuotation, getAllEnquiryByUserId
}
export default clientServices