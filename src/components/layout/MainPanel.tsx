import { useParams } from '@solidjs/router';
import classNames from 'classnames';
import { JSX } from 'solid-js';

type MainPanelProps = {
  children: JSX.Element;
  width?: string;
};

export function MainPanel({ children, width = 'w-9/12' }: MainPanelProps) {
  const params = useParams();

  return (
    <main
      class={classNames(
        { '-mr-4 w-[100%]': !params.number, [width]: !!params.number },
        'flex flex-col gap-4 h-[100%] transition-width transform duration-150',
      )}
    >
      {children}
    </main>
  );
}
