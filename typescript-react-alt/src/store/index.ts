export * from "./storeConfig";
export * from "./actions";
export * from "./types";

import * as actionCreators from "store/actionCreators";
export { actionCreators };

import { connect } from "react-redux";
import { AppState } from "store/types";

// export const appConnect = connect((x: AppStateEx) => x);
export const appConnect = <T>(f: (appState: AppState) => T) => connect(f);
