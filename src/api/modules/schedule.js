import axiosClient from '../axiosClient/axios'

const scheduleEndpoints = {
    generateSchedule: 'api/v1/schedules/generateSchedule',
    getSchedule: 'api/v1/schedules/getSchedule',
    saveSchedule: 'api/v1/schedules/getSchedule'
}

const scheduleApis = {
    generateSchedule: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(scheduleEndpoints.generateSchedule)
            return response
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
            return response
        }
        catch (err) {
            return { err }
        }
    }
}

export default scheduleApis