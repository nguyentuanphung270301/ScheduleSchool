import axiosClient from '../axiosClient/axios'

const courseEndpoints = {
getCourse: (number) => `api/v1/courses/${number}`,
getAllCourses: 'api/v1/courses/all',
createCourse: 'api/v1/courses/create',
deleteCourse: (number) => `api/v1/courses/delete/${number}`,
getAllCoursesByDepartment:(departmentId) => `api/v1/courses/department/${departmentId}`,
updateCourse: 'api/v1/courses/update'
}

const courseApis = {
    getCourse: async (number) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(courseEndpoints.getCourse(number))
            return { response }
        }
        catch (err) { return { err } }
    },
    getAllCourses: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(courseEndpoints.getAllCourses)
            return { response }
        }
        catch (err) { return { err } }
    },
    createCourse: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(courseEndpoints.createCourse(data))
            return { response }
        }
        catch (err) { return { err } }
    },
    deleteCourse: async (number) => {
        try {
            console.log('send request')
            const response = await axiosClient.delete(courseEndpoints.deleteCourse(number))
            return { response }
        }
        catch (err) { return { err } }
    },
    getAllCoursesByDepartment: async (departmentId) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(courseEndpoints.getAllCoursesByDepartment(departmentId))
            return { response }
        }
        catch (err) { return { err } }
    },
    updateCourse: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.put(courseEndpoints.updateCourse)
            return { response }
        }
        catch (err) { return { err } }
    },
}


export default courseApis