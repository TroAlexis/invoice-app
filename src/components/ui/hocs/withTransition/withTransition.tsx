import React, { ComponentType } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { TransitionGroupProps } from "react-transition-group/TransitionGroup";
import { isUndefined } from "utils/common";

type WithoutRef<T> = Omit<T, "ref">;

interface Props<P> {
  visible?: boolean;
  props?: P;
}

type TransitionCSSProps<C> = C extends CSSTransitionProps
  ? Partial<CSSTransitionProps>
  : CSSTransitionProps;

type TransitionCSSGroupProps<G> = WithoutRef<G>;

interface TransitionsBase<G, C> {
  transitionCss: TransitionCSSProps<C>;
  transitionGroup?: TransitionCSSGroupProps<G>;
}

type Transitions<G, C> = C extends CSSTransitionProps
  ? Partial<TransitionsBase<G, C>>
  : TransitionsBase<G, C>;

export default function withTransition<
  P,
  G extends Partial<TransitionGroupProps>,
  C extends Partial<CSSTransitionProps>
>(
  ComponentToWrap: ComponentType<P>,
  transitionGroupInitial?: G,
  transitionCssInitial?: C
) {
  type WithTransitionProps = Props<P> & Transitions<G, C>;

  return ({
    visible,
    transitionCss,
    transitionGroup,
    props,
  }: WithTransitionProps) => {
    const groupTransitionProps = mergeProps(
      transitionGroupInitial,
      transitionGroup
    );
    const cssTransitionProps = mergeProps(transitionCssInitial, transitionCss);

    const isVisible = isUndefined(visible) ? !!props : visible;

    return (
      <TransitionGroup {...groupTransitionProps}>
        {isVisible && props && (
          <CSSTransition {...cssTransitionProps}>
            <ComponentToWrap {...props} />
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  };
}

function mergeProps<I, P>(initial: I, props: P): (P & Omit<I, keyof P>) | P {
  return initial ? { ...initial, ...props } : props;
}
