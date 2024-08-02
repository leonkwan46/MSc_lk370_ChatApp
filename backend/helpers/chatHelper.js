import { Message } from '../db/modals/index.js'
import userDataHelper from './userDataHelper.js'

const chatHelper = {}

chatHelper.handleSendMessage = async (io, socket, props) => {
    console.log('handleSendMessage', props)
    const { roomId, message, userId, userRole } = props

    const newMessage = Message({
        message,
        senderId: userId,
        senderRole: userRole,
        roomId,
        sentAt: Date.now(),
        isRead: false,
    })

    console.log('newMessage', newMessage)

    // Save message to database
    await newMessage.save()

    io.emit('chatMessage', { sender: socket.id, data: newMessage })
}

chatHelper.generateRoomMemberData = async (userID, role, data) => {
    const { teacher, student, parent, child } = data
    let roomMemberData
    switch (role) {
        case 'teacher':
            roomMemberData = {
                teacher: await userDataHelper.fetchUserDataByIDAndRole(userID, 'teacher'),
                student: await userDataHelper.fetchUserDataByIDAndRole(student.split(',')[1], 'student'),
                parent: await userDataHelper.fetchUserDataByIDAndRole(parent.split(',')[1], 'parent')
            }
            break
        case 'parent':
            roomMemberData = {
                parent: await userDataHelper.fetchUserDataByIDAndRole(userID, 'parent'),
                teacher: await userDataHelper.fetchUserDataByIDAndRole(teacher.split(',')[1], 'teacher'),
                student: await userDataHelper.fetchUserDataByIDAndRole(child.split(',')[1], 'student')
            }
            break
        case 'student':
            roomMemberData = {
                student: await userDataHelper.fetchUserDataByIDAndRole(userID, 'student'),
                parent: await userDataHelper.fetchUserDataByIDAndRole(parent.split(',')[1], 'parent'),
                teacher: await userDataHelper.fetchUserDataByIDAndRole(teacher.split(',')[1], 'teacher')
            }
            break
        default:
            break
    }
    roomMemberData

    return roomMemberData
}

chatHelper.joinRoom = async (io, socket, roomData) => {
    const { roomId } = roomData
    const chatHistory = await Message.find({ roomId: roomId }).sort({ sentAt: 1 })

    socket.join(roomId)
    io.to(roomId).emit('roomJoined', { chatHistory })
}


export default chatHelper