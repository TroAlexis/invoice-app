import { CSSProperty } from "components/ui/Select/styles";
import { spring } from "react-flip-toolkit";

interface Animation {
  onComplete?: () => void;
  reverse?: boolean;
}

export type AnimationValues = [number, number];
export type AnimationValuesMap = Record<CSSProperty, AnimationValues>;

const fadeInUpValues: AnimationValuesMap = {
  opacity: [0, 1],
  translate: [100, 0],
};

export function animateFadeInUp(
  element: HTMLElement,
  { reverse, onComplete }: Animation = {},
  values: AnimationValuesMap = fadeInUpValues
) {
  const { opacity, translate } = values;

  return spring({
    values: {
      opacity: getValues(opacity, reverse),
      translate: getValues(translate, reverse),
    },
    onUpdate: (snapshot) => {
      if (typeof snapshot === "object") {
        requestAnimationFrame(() => {
          element.style.opacity = `${snapshot.opacity}`;
          element.style.transform = `translate3d(0, ${snapshot.translate}%, 0)`;
        });
      }
    },
    onComplete,
  });
}

function getValues(
  values: AnimationValues,
  reverse?: boolean
): AnimationValues {
  return reverse ? ([...values].reverse() as AnimationValues) : values;
}
