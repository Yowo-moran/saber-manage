type CallbackFn = (item?: any) => void

let timer: any = null
export default function (Callback: CallbackFn, delay = 1000) {
    timer != null ? clearTimeout(timer) : null
    timer = setTimeout(() => {
        Callback && Callback()
    }, delay)
}