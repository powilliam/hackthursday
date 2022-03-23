export interface BaseViewModel<S, E> {
  readonly uiState: S;
  readonly events?: E;
}
