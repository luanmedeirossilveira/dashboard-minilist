import { Time } from '../Time';

export const Info: React.FC = (props: IInfoProps) => {
  return (
    <div id={props.id} className="info">
      <Time />
    </div>
  );
};
