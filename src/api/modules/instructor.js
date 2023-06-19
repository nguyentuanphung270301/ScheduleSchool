import axiosClient from '../axiosClient/axios'

const instructorEndpoints = {
    getInstructorById: (idOrUsername) => `api/v1/instructors/${idOrUsername}`,
    getAllInstructors: 'api/v1/instructors/all',
    createInstructor: 'api/v1/instructors/create',
    deleteInstructorById: (id) => `api/v1/instructors/delete/${id}`,
    updateInstructor: 'api/v1/instructors/update'
}

const instructorsApis = {
    getInstructorById: async (idOrUsername) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(instructorEndpoints.getInstructorById(idOrUsername))
            return { response }
        }
        catch (err) { return { err } }
    },
    getAllInstructors: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(instructorEndpoints.getAllInstructors)
            return { response }
        }
        catch (err) { return { err } }
    },
    createInstructor: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(instructorEndpoints.createInstructor, data)
            return { response }
        }
        catch (err) { return { err } }
    },
    deleteInstructorById: async (id) => {
        try {
            console.log('send request')
            const response = await axiosClient.delete(instructorEndpoints.deleteInstructorById(id))
            return { response }
        }
        catch (err) { return { err } }
    },
    updateInstructor: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.put(instructorEndpoints.updateInstructor, data)
            return { response }
        }
        catch (err) { return { err } }
    },
}

export default instructorsApis