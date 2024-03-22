import { server } from '../utils/server'

const login = (role, data) => {
    // console.log('authServer', role, data)
    return server.post(`api/${role}/login`, data)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}



const authServices = {
    login
}
export default authServices