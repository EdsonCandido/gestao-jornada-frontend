import { http } from "./http";

type IResponse = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    status: number;
    message: string;
    err: null | string;
}

export default {
    getUsers: async (): Promise<IResponse> => {
        const response = await http.get("/users").then((resp) => {
            return {
                data: resp.data.data,
                status: resp.status,
                message: resp.statusText,
                err: null
            }
        }).catch(err => {
            return {
                data: null,
                status: err.response.status,
                message: err.response.data.message || err.response.statusText,
                err: err.response.data.err
            }
        });

        return response;
    }
}	

