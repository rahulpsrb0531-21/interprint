import { server } from '../utils/server'

const createUps = (data) => {
    return server.post(`api/sales/create/ups`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getAllEnquiry = () => {
    return server.get(`api/prepress/all/enquiry`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const updateUps = (data) => {
    return server.post(`api/prepress/update/ups`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const prepressServices = {
    createUps, getAllEnquiry, updateUps
}
export default prepressServices