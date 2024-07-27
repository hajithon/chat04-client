import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://15.165.157.131:8080/', // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // JSON 형식의 요청을 보낼 때 사용
    Accept: 'application/json', // 서버로부터 JSON 형식의 응답을 받기를 기대
  },
  timeout: 10000, // 요청 타임아웃 설정 (10초)
});

// 요청 인터셉터 추가 (필요에 따라 인증 토큰 등을 설정할 수 있음)
axiosInstance.interceptors.request.use(
  (config) => {
    // 예를 들어, 인증 토큰을 추가할 수 있음
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 (응답에 대한 전역 처리)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 오류 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.error('응답 오류:', error.response.data);
      console.error('상태 코드:', error.response.status);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답이 없는 경우
      console.error('요청 오류:', error.request);
    } else {
      // 오류를 발생시킨 요청 설정 문제
      console.error('오류:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
