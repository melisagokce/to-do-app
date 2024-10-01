import { Reducer } from "redux";
import IActionProps from "../../models/IActionsProps";
import ITaskProps from "../../models/ITaskProps";
import ICardProps from "../../models/ICardProps";

const initialState: ITaskProps = {
  selectedTask: null,
  tasks: [],
};

const taskReducer: Reducer<ITaskProps, IActionProps<ICardProps | any>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "TASK_REDUCER/ADD_TASK": {
      const existingTask: ICardProps | undefined = state.tasks.find(
        (task) => task.taskId === action.payload.taskId
      );

      if (!existingTask) {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      }

      return state;
    }

    case "TASK_REDUCER/SET_SELECTED_TASK": {
      const existingTask: ICardProps | undefined = state.tasks.find(
        (task) => task.taskId === action.payload.taskId
      );

      return {
        ...state,
        selectedTask: existingTask || null,
      };
    }

    case "TASK_REDUCER/STORE_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "TASK_REDUCER/REMOVE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.taskId !== action.payload),
      };
    }

    case "TASK_REDUCER/UPDATE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskId === action.payload.taskId ? { ...task, ...action.payload } : task
        ),
      };
    }

    case "TASK_REDUCER/UPDATE_TASK_STATUS": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.taskId === action.payload.taskId) {
            return { ...task, checkStatus: action.payload.checkStatus };
          }
          return task;
        }),
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
