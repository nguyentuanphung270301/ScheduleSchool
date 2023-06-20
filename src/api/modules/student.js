import axiosClient from '../axiosClient/axios'

const studentEndpoints = {
    getStudentById: (idOrUsername) => `api/v1/students/${idOrUsername}`,
    getAllStudents: 'api/v1/students/all',
    createStudent: 'api/v1/students/create',
    deleteStudentById: (id) => `api/v1/students/delete/${id}`,
    updateStudent: 'api/v1/students/update',
    addTimeTableForStudent: (studentId, timeTableId) => `api/v1/students/schedule/${studentId}/${timeTableId}`,
    getScheduleOfStudent: (studentId) => `api/v1/students/schedule/${studentId}`
}


const studentApis = {
    getStudentById: async (idOrUsername) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(studentEndpoints.getStudentById(idOrUsername))
            return { response }
        }
        catch (err) { return { err } }
    },
    getAllStudents: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(studentEndpoints.getAllStudents)
            return { response }
        }
        catch (err) { return { err } }
    },
    createStudent: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(studentEndpoints.createStudent(data))
            return { response }
        }
        catch (err) { return { err } }
    },
    deleteStudentById: async (id) => {
        try {
            console.log('send request')
            const response = await axiosClient.delete(studentEndpoints.deleteStudentById(id))
            return { response }
        }
        catch (err) { return { err } }
    },
    updateStudent: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.put(studentEndpoints.updateStudent, data)
            return { response }
        }
        catch (err) { return { err } }
    },
    addTimeTableForStudent: async (studentId, timeTableId) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(studentEndpoints.addTimeTableForStudent(studentId, timeTableId))
            return { response }
        }
        catch (err) { return { err } }
    },
    getScheduleOfStudent: async (studentId) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(studentEndpoints.getScheduleOfStudent(studentId))
            return { response }
        }
        catch (err) { return { err } }
    },
}
export default studentApis