import * as ac from "store/actions/private";

export type PrivateActions =
  | ReturnType<typeof ac.mutateState>
  ;

