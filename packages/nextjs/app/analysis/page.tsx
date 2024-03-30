"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { BuildCard } from "~~/components/BuildCard";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import matches from "~~/data/matches.json";
import "~~/styles/test1.css";

const Analysis: NextPage = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  return (
    <>
      {/* Leaderboard */}
      <div className="bg-base-200">
        <div className="container max-w-[90%] lg:max-w-6xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-5xl lg:w-3/4 text-center lg:text-left">
              Check The Leaderboard For A Match
            </h2>
            <div className="text-center lg:text-left">
              <select className="select select-accent w-full max-w-xs">
                <option disabled selected>
                  Select Match
                </option>
                {matches.map(match => (
                  <option>{match.matchName}</option>
                ))}
              </select>
            </div>
            <div className="text-center lg:text-left">
              <div id="select-match" className="btn btn-outline lg:self-start px-8 hover:opacity-100">
                View Leaderboard
                <Image src="/assets/ranking-featured-icon.svg" alt="rankings icons" width={20} height={20} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="max-w-[400px] lg:max-w-none">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Address/ENS</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>2</th>
                      <td>
                        <Address address="0x34aA3F359A9D614239015126635CE7732c18fDF2" />
                      </td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>
                        <Address address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
                      </td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <th>1</th>
                      <td>
                        <Address address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
                      </td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Builds */}
      <div className="bg-base-300">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="gap-4 flex flex-col items-center">
            <div className="flex items-baseline gap-1 md:gap-3">
              <h2 className="text-3xl lg:text-5xl font-semibold my-0">Head-To-Head Comparison</h2>
            </div>
            <p className="lg:w-3/5 text-center m-0">
              Select 2 players and view a head-to-head showdown between the them. View competitive analysis between the
              players.
            </p>
          </div>
          {/* Card Container  */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center items-center mt-8">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <AddressInput onChange={setAddress1} value={address1} placeholder="Input First Player's Address" />
                <ul>
                  <li className="m-2">
                    <span className="font-bold">Attribute 1</span>: Stat 1
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Attribute 1</span>: Stat 1
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Attribute 1</span>: Stat 1
                  </li>
                </ul>
              </div>
            </div>
            <div className="vertical-align">v/s</div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <AddressInput onChange={setAddress2} value={address2} placeholder="Input Second Player's Address" />
                <ul>
                  <li className="m-2">
                    <span className="font-bold">Attribute 1</span>: Stat 1
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Attribute 1</span>: Stat 1
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Attribute 1</span>: Stat 1
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default Analysis;
