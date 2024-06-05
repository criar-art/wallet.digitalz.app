import { CommonState } from "@store/expenseSlice/types";
import utils from "@utils";

const reducers = {
  setRegister(state: CommonState, action: any) {
    console.log(
      "utils.sortDataByDateDesc(action.payload)",
      utils.sortDataByDateDesc(action.payload)
    );
    return {
      ...state,
      registers: utils.sortDataByDateDesc(action.payload),
    };
  },
  setEditRegister(state: CommonState, action: any) {
    const itemIndex = state.registers.findIndex(
      ({ id }) => id === action.payload.id
    );
    const newRegisters = [...state.registers];
    newRegisters[itemIndex] = action.payload;
    return {
      ...state,
      registers: newRegisters,
    };
  },
  setRegisterFilter(state: CommonState, action: any) {
    return {
      ...state,
      registerFilter: {
        ...state.registerFilter,
        ...action.payload,
      },
    };
  },
  setResetFilter(state: CommonState, action: any) {
    return {
      ...state,
      registerFilter: action.payload,
    };
  },
  setRegisterData(state: CommonState, action: any) {
    return {
      ...state,
      registerData: action.payload,
    };
  },
  setEyeStatus(state: CommonState, action: any) {
    return {
      ...state,
      eyeStatus: action.payload,
    };
  },
};

export default reducers;
