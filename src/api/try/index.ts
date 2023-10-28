import { _axios } from "@/server"

const onetry = async () => {
    const data = await _axios.post<any, any, any>(
        '/saber/login',
        {
            "phone": "13880734508",
            "password": "123456"
        }
    )
    console.log(data)
    localStorage.setItem('token', data.data.token)
    localStorage.setItem('username', data.data.username)
}

export { onetry }