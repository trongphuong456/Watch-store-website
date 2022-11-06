import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, DISCOUNT_ACTION } from "../CONSTANTS/";

function* getDiscountSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.get("http://localhost:4000/discount", {
      params: {
        name: data,
      },
    });

    yield put({
      type: `${SUCCESS(DISCOUNT_ACTION.DISCOUNT)}`,
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: `${FAIL(DISCOUNT_ACTION.DISCOUNT)}`,
      payload: {
        error: "Mã không hợp lệ",
      },
    });
  }
}

export default function* commentsSaga() {
  yield takeEvery(REQUEST(DISCOUNT_ACTION.DISCOUNT), getDiscountSaga);
}
