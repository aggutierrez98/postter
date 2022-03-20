import Link from "next/link";

interface Props {
  hashtag: string;
  count?: number;
}

export const HashtagCard = ({ hashtag, count }: Props) => {
  return (
    <Link href={`/explore/${hashtag}`}>
      <a>
        <div className="text px-4 py-2">
          <h3 className="text-custom-text font-bold">{hashtag}</h3>
          <p className="text-custom-placeholder leading-[20px]">
            {count} Postwitts
          </p>
        </div>
      </a>
    </Link>
  );
};
