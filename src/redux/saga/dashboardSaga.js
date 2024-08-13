import * as actionTypes from "../actionTypes";
import { put, takeLeading } from "redux-saga/effects";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  get_dashboard,
} from "../../utils/Constants";


function* getDashboard(actions) {
  try {

    const response = yield ApiRequest.getRequest({
      url: api_url + get_dashboard,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_DASHBOARD,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

export default function* dashboardSaga() {
  yield takeLeading(actionTypes.GET_DASHBOARD, getDashboard);
}
