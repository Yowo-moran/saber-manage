import { _axios } from "@/server"
import type { PagingParams } from "../types/paramsType"
import type { } from "../types/dataType"
import type { BaseResponce, GetRobotRes } from "../types/resType"

const getRobot = async (page_no: number, page_size: number) => {
    const data = await _axios.get<GetRobotRes, PagingParams>(
        '/saber/robot/list',
        {
            page_no,
            page_size
        }
    );
    if (data.result_code !== 'success') {
        ElMessage.error(data.message);
        return;
    }
    return data;
}
export { getRobot }