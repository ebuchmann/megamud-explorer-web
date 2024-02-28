import { JSX } from 'solid-js';

type ScrollContainerProps = {
  children: JSX.Element;
};

export function ScrollContainer({ children }: ScrollContainerProps) {
  return <div class="overflow-auto flex-1 h-[100%]">{children}</div>;
}
