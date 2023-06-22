import axiosClient from '../axiosClient/axios'

const scheduleEndpoints = {
    generateSchedule: 'api/v1/schedules/generateSchedule',
    getSchedule: 'api/v1/schedules/getSchedule',
    saveSchedule: 'api/v1/schedules/saveSchedule',
    generateExtraTimeTableForNewCourse: (instructorId, courseNumber) => `api/v1/schedules/extra/${instructorId}/${courseNumber}`,
    saveExtraTimeTable: 'api/v1/schedules/extra/save'
}

const scheduleApis = {
    generateSchedule: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(scheduleEndpoints.generateSchedule)
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    getSchedule: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(scheduleEndpoints.getSchedule)
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    saveSchedule: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.post(scheduleEndpoints.saveSchedule)
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    generateExtraTimeTableForNewCourse: async (instructorId, courseNumber) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(scheduleEndpoints.generateExtraTimeTableForNewCourse(instructorId, courseNumber))
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
    saveExtraTimeTable: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(scheduleEndpoints.saveExtraTimeTable)
            return { response }
        }
        catch (err) {
            return { err }
        }
    },
}

export default scheduleApis