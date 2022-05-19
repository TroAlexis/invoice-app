import React, { ComponentType } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { TransitionGroupProps } from "react-transition-group/TransitionGroup";
import { isUndefined } from "utils/common";

type WithoutRef<T> = Omit<T, "ref">;

export default function withTransition<
  P,
  G extends Partial<TransitionGroupProps>,
  C extends Partial<CSSTransitionProps>
>(
  ComponentToWrap: ComponentType<P>,
  transitionGroupInitial?: G,
  transitionCssInitial?: C
) {
  type TransitionCSSProps = C extends CSSTransitionProps
    ? Partial<CSSTransitionProps>
    : CSSTransitionProps;
  type TransitionCSSGroupProps = WithoutRef<G>;

  interface TransitionsBase {
    transitionCss: TransitionCSSProps;
    transitionGroup?: TransitionCSSGroupProps;
  }

  type Transitions = C extends CSSTransitionProps
    ? Partial<TransitionsBase>
    : TransitionsBase;

  interface Props {
    visible?: boolean;
    props?: P;
  }

  return ({
    visible,
    transitionCss,
    transitionGroup,
    props,
  }: Props & Transitions) => {
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
