import axios from "axios"

export const axiosWrapper = async (method, url, options = null) => {
  let formData = null
  if (options) {
    formData = new FormData()
    Object.keys(options).forEach((key) => {
      formData.append(key, options[key])
    })
  }
  return await axios({
    method,
    url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
