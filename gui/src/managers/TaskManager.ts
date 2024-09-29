import IRequestProps from "../models/request/IRequestProps";
import RequestManager from "./RequestManager";

class TaskManager{
    static async getTask(){

    }

    static async addTask(){

    }

    static async deleteTask(taskId: string){
        const config: IRequestProps = {
            url: `${window.MkeConfig.api.protocol}://${window.MkeConfig.api.url}/task-sil/${taskId}`,
            method: "DELETE",
            data: {}
        }
        const tasks = await RequestManager.send(config);
        return tasks;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async getAllTask(): Promise<any>{
        const config: IRequestProps = {
            url: `${window.MkeConfig.api.protocol}://${window.MkeConfig.api.url}/task-list`,
            method: "GET",
            data: {}
        }
        const tasks = await RequestManager.send(config);
        return tasks;
    }
}

export default TaskManager;