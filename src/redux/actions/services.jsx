import Axios from "axios";
const configJson = {
    headers: {
        "Content-type": "application/json",
    },
};
const baseUrl = 'http://localhost:5000/api/v1';

export const loadServices = () => async (dispatch) => {
    try {
        //dispatch(showLoading());
        const result = await Axios.get(`${baseUrl}/services`, configJson);
        dispatch({
            type: "LOAD_SERVICES",
            payload: result.data.data.services
        });
        //dispatch(closeLoading());
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: "ERR_LOAD"
        });
        //dispatch(closeLoading());
        //dispatch(showPopUp("Something Went Wrong!"));
    }
};
export const addServices = (data) => async (dispatch) => {
    try {
        //dispatch(showLoading());
        const result = await Axios.post(`${baseUrl}/service`, data, configJson);
        dispatch(loadServices());
        //dispatch(closeLoading());
        //dispatch(showPopUp(result.data.message));
    } catch (error) {
        console.log(error.response);
        //dispatch(closeLoading());
        //dispatch(showPopUp("Something Went Wrong!"));
    }
};
export const deleteServices = (data) => async (dispatch) => {
    try {
        //dispatch(showLoading());
        const result = await Axios.delete(`${baseUrl}/service/${data}`, configJson);
        dispatch(loadServices());
        //dispatch(closeLoading());
        //dispatch(showPopUp(result.data.message));
    } catch (error) {
        console.log(error.response);
        //dispatch(closeLoading());
        //dispatch(showPopUp("Something Went Wrong!"));
    }
}