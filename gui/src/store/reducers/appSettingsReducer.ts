import { Reducer } from "redux";
import IActionProps from "../../models/IActionsProps";
import IAppSettingsProps from "../../models/IAppSettingsProps";

const initialState: IAppSettingsProps = {
  darkMode: false,
  language: "tr"
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

      case "APPSETTINGS_REDUCER/CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload.language,
      };


    default:
      return state;
  }
};

export default taskReducer;
