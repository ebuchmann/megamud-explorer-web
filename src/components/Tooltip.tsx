import { JSX, onCleanup, onMount } from 'solid-js';
import { Tooltip as TWETooltip, initTWE } from 'tw-elements';

type TooltipProps = {
  content: JSX.Element;
  children: JSX.Element;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

export function Tooltip(props: TooltipProps) {
  onMount(() => {
    initTWE({ Tooltip: TWETooltip }, { allowReinits: true });
  });
  onCleanup(() => {
    document.querySelector('[data-twe-tooltip-inner-ref]')?.remove();
  });

  return (
    <span
      data-twe-toggle="tooltip"
      data-twe-html="true"
      data-twe-placement={props.placement || 'top'}
      title={props.content?.outerHTML}
    >
      {props.children}
    </span>
  );
}
