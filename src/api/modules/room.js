import axiosClient from '../axiosClient/axios'

const roomEndpoints = {
    getRoomByNumber: (number) => `api/v1/rooms/${number}`,
    getAllRooms: 'api/v1/rooms/all',
    createRoom: 'api/v1/rooms/create',
    deleteRoomByNumber: (number) => `api/v1/rooms/delete/${number}`,
    updateRoom: 'api/v1/rooms/update'
}

const roomApis = {
    getRoomByNumber: async (number) => {
        try {
            console.log('send request')
            const response = await axiosClient.get(roomEndpoints.getRoomByNumber(number))
            return { response }
        }
        catch (err) { return { err } }
    },
    getAllRooms: async () => {
        try {
            console.log('send request')
            const response = await axiosClient.get(roomEndpoints.getAllRooms)
            return { response }
        }
        catch (err) { return { err } }
    },
    createRoom: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.post(roomEndpoints.createRoom, data)
            return { response }
        }
        catch (err) { return { err } }
    },
    deleteRoomByNumber: async (number) => {
        try {
            console.log('send request')
            const response = await axiosClient.delete(roomEndpoints.deleteRoomByNumber(number))
            return { response }
        }
        catch (err) { return { err } }
    },
    updateRoom: async (data) => {
        try {
            console.log('send request')
            const response = await axiosClient.put(roomEndpoints.updateRoom, data)
            return { response }
        }
        catch (err) { return { err } }
    },
}

export default roomApis
