import { server } from '../utils/server'

const createQuotationWithClient = (data) => {
    return server.post(`api/sales/create/quotation`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getAllQuotation = () => {
    return server.get(`api/sales/get-all/quotation`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getAllClient = () => {
    return server.get(`api/sales/get-all/client`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}



const salesServices = {
    createQuotationWithClient, getAllQuotation, getAllClient
}
export default salesServices