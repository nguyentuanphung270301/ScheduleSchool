import axiosClient from '../axiosClient/axios'


const authEndpoints = {
    login: 'api/v1/auth/login',
    logout: 'api/v1/auth/logout',
    register: 'api/v1/auth/register'
}
const authApis = {
    login: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(authEndpoints.login, data )
            return { response }
        }
        catch (err) { return { err } }
    },
    logout: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(authEndpoints.logout)
            return { response }
        }
        catch (err) { return { err } }
    },
    register: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(authEndpoints.register(data))
            return { response }
        }
        catch (err) { return { err } }
    }
}

export default authApis