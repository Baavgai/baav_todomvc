export * from "./storeConfig";
export * from "./actions";
export * from "./types";
import { DispatchProp } from "react-redux";
import { connect } from "react-redux";
import { AppState } from "store/types";

export type ConnectedProps<TProps> = TProps & DispatchProp;
export const appConnect = <TStateProps, TOwnProps>(f: (appState: AppState, ownProps: TOwnProps) => TStateProps) => connect(f);
