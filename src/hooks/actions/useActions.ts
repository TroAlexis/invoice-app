import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  ActionCreator,
  ActionCreatorsMapObject,
  bindActionCreators,
} from "redux";

export function useActions<A, M extends ActionCreatorsMapObject<A>>(
  actionCreators: M
): M;
export function useActions<A, M extends ActionCreator<A>>(actionCreators: M): M;
export function useActions<
  N extends ActionCreator<any>,
  M extends ActionCreator<any>
>(actionCreators: N): M;

export function useActions<M extends ActionCreatorsMapObject>(
  actionCreators: M
): M {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [actionCreators, dispatch]);
}
