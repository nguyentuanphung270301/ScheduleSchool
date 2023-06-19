import axiosClient from "../axiosClient/axios";

const departmentEndpoints = {
    getDepartment : (identifier) => `api/v1/departments/${identifier}`,
    getAll: 'api/v1/departments/all'
}

const departmentApis = {
    getDepartment: async (identifier) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(departmentEndpoints.getDepartment(identifier))
            return { response }
        }
        catch (err) { return { err } }
    },
    getAll: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(departmentEndpoints.getAll)
            return { response }
        }
        catch (err) { return { err } }
    },
}

export default departmentApis