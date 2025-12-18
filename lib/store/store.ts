import { configureStore } from "@reduxjs/toolkit"
import formReducer from "./slices/formSlice"
import templateReducer from "./slices/templateSlice"
import websiteReducer from "./slices/websiteSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      template: templateReducer,
      website: websiteReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
