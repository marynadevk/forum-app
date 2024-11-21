import moment from 'moment';

type Props = { date: string | Date };

const TimeAgo = ({ date }: Props) => {
  const timeAgo = moment(date).fromNow();
  return <div className="text-gray-500 text-sm mb-2">{timeAgo}</div>;
};

export default TimeAgo;
