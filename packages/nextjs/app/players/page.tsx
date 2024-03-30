"use client";

import Image from "next/image";
import type { NextPage } from "next";
import { BuildCard } from "~~/components/BuildCard";
import TrackedLink from "~~/components/TrackedLink";
import players from "~~/data/players.json";
import "~~/styles/test1.css";

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

const Players: NextPage = () => {
  return (
    <>
      {/* Stats */}
      <div className="bg-base-100">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-7xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="flex flex-col gap-8 md:flex-row justify-between items-start mt-4 lg:w-4/5">
            <div className="flex items-start gap-3">
              <Image src="/assets/diamond.svg" alt="diamon icon" width={40} height={40} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-secondary-content">100+ Ξ</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Rewards To Win</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/builders.svg" alt="builder icon" width={45} height={45} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-secondary-content">650+</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Players To Choose From</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/builds-uploaded.svg" alt="build icon" width={30} height={30} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-secondary-content">50+</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Matches To Simulate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Players */}
      <div className="bg-base-300">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="gap-4 flex flex-col items-center">
            <div className="flex items-baseline gap-1 md:gap-3">
              <Image src="/assets/ranking-featured-icon.svg" alt="rankings icons" width={40} height={40} />
              <h2 className="text-3xl lg:text-5xl font-semibold my-0">Featured Players</h2>
            </div>
            <p className="lg:w-3/5 text-center m-0">
              View all the players on FairPlayXI available for the IPL Season 2023
            </p>
          </div>
          {/* Card Container  */}
          <div className="flex gap-8 flex-wrap justify-center mt-8">
            {/* Card */}
            {players.slice(0, 21).map(player => (
              <BuildCard
                key={player.player_id}
                name={player.player_name}
                description={`${titleCase(player.batting_style)} | ${titleCase(player.bowling_style)} Bowl`}
                src={`/assets/players/${player.player_name}.jpg`}
                link={player.image_url}
              />
            ))}
          </div>
          <TrackedLink id="buidlguidl:projects" href="/players.json" className="link mt-8">
            View all players
          </TrackedLink>
        </div>
      </div>
    </>
  );
};

export default Players;
