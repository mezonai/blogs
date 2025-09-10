export default function Hashtags({
  hashtags,
}: {
  hashtags: { name: string }[];
}) {
  if (!hashtags || hashtags.length === 0) return null;
  return (
    <div className="mt-4 font-bold text-[17px]">
      {hashtags.map((tag, index) => (
        <span key={index} className="mr-2">
          #{tag.name}
        </span>
      ))}
    </div>
  );
}
