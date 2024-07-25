import { Parent, Student, Teacher } from "../db/modals/index.js"

const userDataHelper = {}

// Fetch parent user data
userDataHelper.fetchParentUserData = async (user) => {
    const children = user.children ? await fetchChildren(user.children): []
    const teachers = user.teachers ? await fetchTeachers(user.teachers): []

    return {
        isInvited: user.isInvited,
        isInvitationVerified: user.isInvitationVerified,
        contacts: {
            children,
            teachers,
        }
    }
}

// Fetch teacher user data
userDataHelper.fetchTeacherUserData = async (user) => {
    const parents = user.parents ? await fetchParents(user.parents): []
    const students = user.students ? await fetchStudents(user.students): []

    return {
        isDocUploaded: user.isDocUploaded,
        isDocVerified: user.isDocVerified,
        contacts: {
            parents,
            students,
        }
    }
}

// Fetch student user data
userDataHelper.fetchStudentUserData = async (user) => {
    const parent = user.parent ? await fetchParent(user.parent): null
    const teachers = user.teachers ? await fetchTeachers(user.teachers): []

    return {
        instrument: user.instruments,
        contacts: {
            parent,
            teachers,
        }
    }
}

// Fetch user data by role and return ID
userDataHelper.fetchUserDataByIDAndRole = async (id, role) => {
    let userData
    switch (role) {
        case 'teacher':
            userData = await fetchTeacher(id)
            break
        case 'parent':
            userData = await fetchParent(id)
            break
        case 'student':
            userData = await fetchStudent(id)
            break
        default:
            break
    }
    return userData
}

// Fetch children data
const fetchChildren = async (childIds) => {
    const children = await Promise.all(childIds.map(async (childId) => {
        const child = await Student.findById(childId)
        return child ? { ...child.toObject() } : null
    }))
    return children.filter(child => child !== null)
}

// Fetch teachers data
const fetchTeachers = async (teacherIds) => {
    const teachers = await Promise.all(teacherIds.map(async (teacherId) => {
        const teacher = await Teacher.findById(teacherId)
        return teacher ? { ...teacher.toObject() } : null
    }))
    return teachers.filter(teacher => teacher !== null)
}

// Fetch parents data
const fetchParents = async (parentIds) => {
    const parents = await Promise.all(parentIds.map(async (parentId) => {
        const parent = await Parent.findById(parentId)
        return parent ? { ...parent.toObject() } : null
    }))
    return parents.filter(parent => parent !== null)
}

// Fetch students data
const fetchStudents = async (studentIds) => {
    const students = await Promise.all(studentIds.map(async (studentId) => {
        const student = await Student.findById(studentId)
        return student ? { ...student.toObject() } : null
    }))
    return students.filter(student => student !== null)
}

// Fetch parent data
const fetchParent = async (parentId) => {
    const parent = await Parent.findById(parentId)
    return parent ? { ...parent.toObject() } : null
}

// Fetch teacher data
const fetchTeacher = async (teacherId) => {
    const teacher = await Teacher.findById(teacherId)
    return teacher ? { ...teacher.toObject() } : null
}

// Fetch student data
const fetchStudent = async (studentId) => {
    const student = await Student.findById(studentId)
    return student ? { ...student.toObject() } : null
}

export default userDataHelper