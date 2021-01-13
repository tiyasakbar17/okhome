import Axios from "axios";
import { loadServices } from "./services";
const configJson = {
    headers: {
        "Content-type": "application/json",
    },
};
const baseUrl = 'https://okhome-tiyas.herokuapp.com/api/v1';

export const updateInstance = (data) => async (dispatch) => {
    try {
        //dispatch(showLoading());
        const result = await Axios.patch(`${baseUrl}/instance`, data, configJson);
        dispatch(loadServices());
        //dispatch(closeLoading());
        //dispatch(showPopUp(result.data.message));
    } catch (error) {
        console.log(error.response);
        //dispatch(closeLoading());
        //dispatch(showPopUp("Something Went Wrong!"));
    }
};
export const addInstance = (data) => async (dispatch) => {
    try {
        //dispatch(showLoading());
        const result = await Axios.post(`${baseUrl}/instance`, data, configJson);
        dispatch(loadServices());
        //dispatch(closeLoading());
        //dispatch(showPopUp(result.data.message));
    } catch (error) {
        console.log(error.response);
        //dispatch(closeLoading());
        //dispatch(showPopUp("Something Went Wrong!"));
    }
};
export const deleteInstance = (data) => async (dispatch) => {
    try {
        //dispatch(showLoading());
        const result = await Axios.delete(`${baseUrl}/instance/${data}`, configJson);
        dispatch(loadServices());
        //dispatch(closeLoading());
        //dispatch(showPopUp(result.data.message));
    } catch (error) {
        console.log(error.response);
        //dispatch(closeLoading());
        //dispatch(showPopUp("Something Went Wrong!"));
    }
}