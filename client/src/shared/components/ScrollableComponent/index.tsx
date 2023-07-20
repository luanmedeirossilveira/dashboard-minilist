import classNames from 'classnames';
import * as React from 'react';

const defaultPosition = (): IPosition => ({
  left: 0,
  x: 0,
});

export const ScrollableComponent: React.FC<IScrollableComponentProps> = (
  props: IScrollableComponentProps,
) => {
  const ref: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const [state, setStateTo] = React.useState<IScrollableComponentState>({
    grabbing: false,
    position: defaultPosition(),
  });

  const handleOnMouseDown = (e: any): void => {
    setStateTo({
      ...state,
      grabbing: true,
      position: {
        x: e.clientX,
        left: ref?.current?.scrollLeft ? ref.current.scrollLeft : 0,
      },
    });
  };

  const handleOnMouseMove = (e: any): void => {
    if (state.grabbing) {
      const left: number = Math.max(
        0,
        state.position.left + (state.position.x - e.clientX),
      );

      if (ref.current) ref.current.scrollLeft = left;
    }
  };

  const handleOnMouseUp = (): void => {
    if (state.grabbing) {
      setStateTo({ ...state, grabbing: false });
    }
  };

  return (
    <div
      ref={ref}
      className={classNames('scrollable-component', props.className)}
      id={props.id}
      onMouseDown={handleOnMouseDown}
      onMouseMove={handleOnMouseMove}
      onMouseUp={handleOnMouseUp}
      onMouseLeave={handleOnMouseUp}
      aria-hidden="true"
    >
      {props.children}
    </div>
  );
};
