export interface BaseReducerAction<T, P = {}> {
  type: T;
  payload?: P;
}
