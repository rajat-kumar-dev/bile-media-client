import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://13.246.105.57/auth_api",
});

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
