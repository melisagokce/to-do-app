import ICardProps from "../models/ICardProps";
import IRequestProps from "../models/request/IRequestProps";
import TaskActions from "../store/actions/TaskActions";
import RequestManager from "./RequestManager";

class TaskManager {
    static async getTask() { }

    static async addTask() { }

    static async deleteTask(taskId: string) {
        const config: IRequestProps = {
            url: `${window.MkeConfig.api.protocol}://${window.MkeConfig.api.url}/task-sil/${taskId}`,
            method: "DELETE",
            data: {},
        };
        const tasks = await RequestManager.send(config);
        return tasks;
    }

    static async updateTask(task: ICardProps){
        const config: IRequestProps = {
            url: `${window.MkeConfig.api.protocol}://${window.MkeConfig.api.url}/task-guncelle/${task.taskId}`,
            method: "PUT",
            data: {
                title: task.title,
                description: task.description,
                checkStatus: task.checkStatus,
            },
            headers:{
                "Content-Type": "application/json"
            }
        };

        const response = await RequestManager.send(config);

        return response.status;
    }

    static async updateCheckStatus(taskId: string, checkStatus: boolean){
        const config: IRequestProps = {
            url: `${window.MkeConfig.api.protocol}://${window.MkeConfig.api.url}/task-status-guncelle/${taskId}/${checkStatus}`,
            method: "PUT",
            data: {},
        };
        const response = await RequestManager.put(config);

        return response.status;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async getAllTask(): Promise<any> {
        const config: IRequestProps = {
            url: `${window.MkeConfig.api.protocol}://${window.MkeConfig.api.url}/task-list`,
            method: "GET",
            data: {},
        };
        const tasks = await RequestManager.send(config);
        return tasks;
    }

    static async refresh() {
        const response = await TaskManager.getAllTask();
        TaskActions.storeTasks(response.data);
    }
}

export default TaskManager;
