import axios, { AxiosResponse } from "axios";

// 제네릭 타입을 지정해서 Promise의 함수 반환값을 유연성 있게 처리
interface ApiResponseType<T> {
  list: T[];
  valid: boolean;
}

// 제네릭을 선언해 axios의 인자 값을 유연성 있게 처리
export const UseAxios = async <T>(
  url: string,
  type: "POST" | "GET",
  data?: object
): Promise<ApiResponseType<T>> => {
  try {
    let response: AxiosResponse<T>;

    switch (type) {
      case "POST":
        response = await axios.post<T>(url, data);
        break;

      case "GET":
        response = await axios.get<T>(url);
        break;
    }

    if (response.status === 200) {
      return { list: [response.data], valid: true };
    } else {
      return { list: [], valid: false };
    }
  } catch (error) {
    return {
      list: [],
      valid: false,
    };
  }
};
