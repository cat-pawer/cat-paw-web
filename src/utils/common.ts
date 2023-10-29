import { CONSTANTS } from "@/constants";
import { type User } from "@/utils/type";

export const getUuid = (): string => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			const r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		},
	);
};

export const loadLocalStorage = (key: string): any => {
	const data = window.localStorage.getItem(encodeString(key));
	if (data) return JSON.parse(decodeString(data));

	return null;
};
//로컬스토리지 저장
export const saveLocalStorage = (key: string, value: string) => {
	window.localStorage.setItem(encodeString(key), encodeString(value));
};
//제거
export const removeLocalStorage = (key: string) => {
	window.localStorage.removeItem(encodeString(key));
};
//모든데이터제거
export const clearLocalStorage = () => {
	window.localStorage.clear();
};

export const encodeString = (v: string): string => {
	return encodeURIComponent(v);
};

export const decodeString = (v: string): string => {
	return decodeURIComponent(v);
};

export const getUserInfo = (): User | undefined => {
	const loadUserInfo = loadLocalStorage(CONSTANTS.KEY.USER_INFO);

	return loadUserInfo ?? undefined;
};
