import axiaConfig from '../config/axiosConfig'

export const  fetchservices = async() => {
  // try {
    const response = await axiaConfig.get("/services/getAllservices");
    // console.log(response.data);
    return response.data
  // } catch (error) {
  //   // console.log(error)
  //   return error
  // }
}
fetchservices