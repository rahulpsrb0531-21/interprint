import { server } from '../utils/server'

const getQuotation = (email) => {
    return server.get(`api/client/quotation/${email}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const checkByEmailIdClientExist = (email) => {
    return server.get(`api/client/existence/${email}`)
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
    getQuotation, getAllEnquiryByUserId, checkByEmailIdClientExist
}
export default clientServices