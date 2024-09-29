import { Reducer } from "redux";
import IActionProps from "../../models/IActionsProps";
import IAppSettingsProps from "../../models/IAppSettingsProps";

const initialState: IAppSettingsProps = {
  darkMode: false
};

const taskReducer: Reducer<IAppSettingsProps, IActionProps<IAppSettingsProps | any>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "APPSETTINGS_REDUCER/CHANGE_VIEW_MODE":
      return {
        ...state,
        darkMode: action.payload.darkMode,
      };

    default:
      return state;
  }
};

export default taskReducer;
