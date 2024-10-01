import ICardProps from "../../models/ICardProps";
import ITaskProps from "../../models/ITaskProps";
import store from "../store";

class TaskActions {
  static getTasks(): ITaskProps {
    return (store.getState()).taskReducer;
  }

  static addTask(task: ICardProps) {
    store.dispatch({ type: 'TASK_REDUCER/ADD_TASK', payload: task });
  }

  static selectTask(task: ICardProps) {
    store.dispatch({ type: 'TASK_REDUCER/SET_SELECTED_TASK', payload: task });
  }

  static storeTasks(task: ICardProps) {
    store.dispatch({ type: 'TASK_REDUCER/STORE_TASKS', payload: task });
  }

  static removeTask(taskId: string) {
    store.dispatch({ type: 'TASK_REDUCER/REMOVE_TASK', payload: taskId });
  }

  static updateTask(updatedTask: ICardProps) {
    store.dispatch({ type: 'TASK_REDUCER/UPDATE_TASK', payload: updatedTask });
  }

  static updateTaskStatus(taskId: string, checkStatus: boolean) {
    store.dispatch({ type: 'TASK_REDUCER/UPDATE_TASK_STATUS', payload: {taskId, checkStatus} });
  }

}

export default TaskActions;