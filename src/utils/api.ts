import axios from "axios";
import { CONSTANTS } from "../constants";
import {TopicType} from "@/utils/type";

const axiosInstance = axios.create({
    baseURL: CONSTANTS.API_SERVER,
    timeout: 1000 * 60 * 3,
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const apiClient = async (url: string, data: string) => {
    return await axiosInstance
        .post(url, data)
        .then((res) => {
            if (res.status === 200) {
                return res;
            } else {
                return undefined;
            }
        })
        .catch((e) => {
            console.error(e);
        });
};

export const apiGetClient = async (url: string): Promise<any> => {
    // try {
    //     const res = await axiosInstance.get(url, {params});
    //     if (res.status === 200) {
    //         return res;
    //     } else {
    //         return undefined;
    //     }
    // } catch (e) {
    //     console.error(e);
    // }
    return await axiosInstance
        .get(url)
        .then((res) => {
            if (res.status === 200) {
                return res;
            } else {
                return undefined;
            }
        })
        .catch((e) => {
            console.error(e);
        });
}

