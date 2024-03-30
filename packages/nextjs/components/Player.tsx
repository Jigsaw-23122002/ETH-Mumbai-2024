import Image from "next/image";

const Player = ({ name = "Select", position, points }: { name: string; position: string; points: number }) => {
  return (
    <div className="stat bg-base-300 bg-opacity-30 p-1.5 m-0 rounded-xl">
      <div className="stat-value text-lg">{name.split(" ")[0]}</div>
      <div className="stat-title text-sm font-bold">{position}</div>
      <div className="stat-figure text-secondary">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Image
              src={name !== "Select" ? `/assets/players/${name}.jpg` : "/assets/player-default.png"}
              alt={name}
              width={90}
              height={90}
            />
          </div>
        </div>
      </div>
      {points && <div className="stat-desc text-base font-black">{points}</div>}
    </div>
  );
};

export default Player;
