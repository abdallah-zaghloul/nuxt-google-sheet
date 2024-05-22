export default function (valid: boolean, ...args: any) {
    ! valid && console.log(...args)
    return valid
}