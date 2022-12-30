import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://54.66.180.9:3000",
});

const reqInterceptor = axiosIns.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("bile-user-token");

    //this code is extra for no server crash when hit api without token while getting profile
    if (request.url === "/auth_api/get_profile_data" && !accessToken) {
      return Promise.reject(new Error("Cannot get profile without tokenn"));
    }

    request.headers["Authorization"] = "Bearer " + accessToken;
    // request.headers["Content-Type"] = "application/json";
    if (!request.data) {
      request.data = {};
    }

    request.data.deviceType = "123456";
    request.data.deviceID = "123456";
    request.data.deviceToken = "123456";
    request.data.country_code = "+91";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//const reqInterceptor = axiosInstance.interceptors.request.use(
//    (request) => {
//      const accessToken = localStorage.getItem('access_token');
//      request.headers['Authorization'] = 'Bearer ' + accessToken;
//      request.headers['Content-Type'] = 'application/json';
//      return request;
//    },
//    (error) => Promise.reject(error)
//  );

//const resInterceptor = axiosInstance.interceptors.response.use(
//  (response) => response,
//  async (error) => {
//    const originalRequest = error.config;
//    if (error.response.status == 401 && !originalRequest._retry) {
//      //401 unauthorized // invalid token / expired token
//      console.log('Refreshing...');
//      originalRequest._retry = true;
//      try {
//        const refreshJWT = localStorage.getItem('refresh_token');
//        const res = await axiosInstance.get(`/authUser/newtoken/${refreshJWT}`);
//        if (res.status == 200) {
//          localStorage.setItem('access_token', res.data.AccessToken);
//          return axiosInstance(originalRequest); //request again with previous configuration
//        }
//        return error;
//      } catch (err) {
//        console.log('refreshing error', err.response);
//        return err;
//      }
//    }
//    return error;
//  }
//);

export default axiosIns;
