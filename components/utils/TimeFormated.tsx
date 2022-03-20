import { useDateTimeFormat, useTimeAgo } from "hooks";

interface Props {
  time?: Date;
}

export const TimeFormated = ({ time, ...props }: Props) => {
  const timeAgo = useTimeAgo(time);
  const timeFormated = useDateTimeFormat(time);

  return (
    <span
      {...props}
      title={timeFormated ? timeFormated : new Date().toString()}
    >
      {timeAgo}
    </span>
  );
};
