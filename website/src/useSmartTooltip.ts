/** @flow */

import { useLayoutEffect, useRef } from 'react';

const TOOLTIP_OFFSET = 4;

export default function useSmartTooltip({
  mouseX,
  mouseY,
}: {
  mouseX: number,
  mouseY: number,
}) {
  // $FlowFixMe Flow generics syntax causes a compilation error with the current Babel version
  const ref = useRef(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (element != null) {
      // Let's check the vertical position.
      if (
        mouseY + TOOLTIP_OFFSET + element.offsetHeight >=
        window.innerHeight
      ) {
        // The tooltip doesn't fit below the mouse cursor (which is our
        // default strategy). Therefore we try to position it either above the
        // mouse cursor or finally aligned with the window's top edge.
        if (mouseY - TOOLTIP_OFFSET - element.offsetHeight > 0) {
          // We position the tooltip above the mouse cursor if it fits there.
          element.style.top = `${mouseY -
            element.offsetHeight -
            TOOLTIP_OFFSET}px`;
        } else {
          // Otherwise we align the tooltip with the window's top edge.
          element.style.top = '0px';
        }
      } else {
        element.style.top = `${mouseY + TOOLTIP_OFFSET}px`;
      }

      // Now let's check the horizontal position.
      if (mouseX + TOOLTIP_OFFSET + element.offsetWidth >= window.innerWidth) {
        // The tooltip doesn't fit at the right of the mouse cursor (which is
        // our default strategy). Therefore we try to position it either at the
        // left of the mouse cursor or finally aligned with the window's left
        // edge.
        if (mouseX - TOOLTIP_OFFSET - element.offsetWidth > 0) {
          // We position the tooltip at the left of the mouse cursor if it fits
          // there.
          element.style.left = `${mouseX -
            element.offsetWidth -
            TOOLTIP_OFFSET}px`;
        } else {
          // Otherwise, align the tooltip with the window's left edge.
          element.style.left = '0px';
        }
      } else {
        element.style.left = `${mouseX + TOOLTIP_OFFSET}px`;
      }
    }
  });

  return ref;
}
