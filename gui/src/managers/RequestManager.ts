/* eslint-disable @typescript-eslint/no-explicit-any */
import IRequestProps from "../models/request/IRequestProps";
import axios from 'axios';
class RequestManager{
    static async send(config: IRequestProps){
        try {
            const response = await axios(config);
            
            return {status: true, data: response.data};
        } catch (error: any) {
            console.log(error);
            return {status: false, data: []};
        }
    }

    static async put(config: IRequestProps){
        try {
            const response = await axios.put(config.url);
            
            return {status: true, data: response.data};
        } catch (error: any) {
            console.log(error);
            return {status: false, data: []};
        }
    }
}

export default RequestManager;