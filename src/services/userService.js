import axios from '../axios'
//gọi đến axios trong file axios chứ ko phải library
//lý do khi gởi request cần 1 access token, nếu có 10 api, thì phải gởi access token 10 lần
//-> bất tiện: chính vì vậy ta phải customize axios

const handleLoginApi = (emailInput, passwordInput) => {
    return axios.post('/api/login', { email: emailInput, password: passwordInput });
}

const getAllUsers = (inputId) => {
    // return axios.get(`/api/get-all-users?id=${inputId}`)
    return axios.get('/api/get-all-users', {
        params: {
            id: inputId
        }
    })
}

const createNewUserService = (newUser) => {
    return axios.post('/api/create-new-users', newUser)
}

const deleteUserService = (userId) => {
    console.log('check user', userId)
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
}