import { useParams } from '@solidjs/router';
import classNames from 'classnames';
import { JSX } from 'solid-js';

type SidePanelProps = {
  children: JSX.Element;
  width?: string;
};

export function SidePanel({ children, width = 'w-3/12' }: SidePanelProps) {
  const params = useParams();

  return (
    <aside
      class={classNames(
        {
          [width]: !!params.number,
          'w-0 overflow-hidden': !params.number,
        },
        'transition-width transform duration-150',
      )}
    >
      <div
        class={classNames(
          {
            'translate-x-full': !params.number,
            'translate-x-0': !!params.number,
          },
          'transition-translate duration-150 overflow-auto h-[100%]',
        )}
      >
        {children}
      </div>
    </aside>
  );
}
