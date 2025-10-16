import { getTileColors } from "../utils/helper";

export default function Block({ block }) {
  const { bgColor, textColor } = getTileColors(block);

  return (
    <div
      style={{
        backgroundColor: block === 0 ? "rgba(139, 92, 246, 0.4)" : bgColor,
        color: block === 0 ? "white" : textColor,
      }}
      className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl font-bold shadow-md xl:h-20 xl:w-20"
    >
      {block !== 0 && block}
    </div>
  );
}
