import { _axios } from "@/server"

const onetry = async () => {
    const data = await _axios.get(
        '/api/index.php'
    )
    console.log(data)
}

export { onetry }