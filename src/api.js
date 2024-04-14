import axios from "axios"

export const getMessageFromGPT = async (q) => {
    const message = await axios.get(`${process.env.REACT_APP_BASEURL}?t=${q}`)
    return message.data.response ?? ''
}