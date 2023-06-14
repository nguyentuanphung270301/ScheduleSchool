import axiosClient from '../axiosClient/axios'

const tranningProgramEndpoints = {

    getAllCourseByMajor: (major) => `api/v1/training-program/${major}`,
    addCourseToTrainingProgram: (major, courseNumber) => `api/v1/training-program/add/${major}/${courseNumber}`,
    deleteCourseFromTrainingProgram: (major, courseNumber) => `api/v1/training-program/delete/${major}/${courseNumber}`,
    updateCourseOfTrainingProgram: (major, oldCourseNumber, newCourseNumber) => `api/v1/training-program/update/${major}/${oldCourseNumber}/${newCourseNumber}`
}
const tranningProgramApis = {
    getAllCourseByMajor: async (major) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(tranningProgramEndpoints.getAllCourseByMajor(major))
            return { response }
        }
        catch (err) { return { err } }
    },
    addCourseToTrainingProgram: async (major, courseNumber) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(tranningProgramEndpoints.addCourseToTrainingProgram(major, courseNumber))
            return { response }
        }
        catch (err) { return { err } }
    },
    deleteCourseFromTrainingProgram: async (major, courseNumber) => {
        try {
            console.log('send request')
            const response = await axiosClient.delete(tranningProgramEndpoints.deleteCourseFromTrainingProgram(major, courseNumber))
            return { response }
        }
        catch (err) { return { err } }
    },
    updateCourseOfTrainingProgram: async (major, oldCourseNumber, newCourseNumber) => {
        try {
            console.log('send request')
            const response = await axiosClient.put(tranningProgramEndpoints.updateCourseOfTrainingProgram(major, oldCourseNumber, newCourseNumber))
            return { response }
        }
        catch (err) { return { err } }
    },
}


export default tranningProgramApis