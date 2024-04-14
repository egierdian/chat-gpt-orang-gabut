import axios from "axios"

export const getMessageFromGPT = async (q) => {
    const message = await axios.get(`${process.env.REACT_APP_BASEURL}?t=${q}`)
    // console.log({message: message.data.response})
    // console.log({resukt: message.data})
    return message.data.response ?? ''
}