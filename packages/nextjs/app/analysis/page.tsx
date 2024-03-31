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
  const [match, setMatch] = useState("");
  const [ranklist, setRanklist] = useState([]);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [u1matches, setU1matches] = useState(0);
  const [u2matches, setU2matches] = useState(0);
  const [u1wins, setU1wins] = useState(0);
  const [u2wins, setU2wins] = useState(0);
  const [u1bets, setU1bets] = useState(0);
  const [u2bets, setU2bets] = useState(0);
  const [u1rewards, setU1rewards] = useState(0);
  const [u2rewards, setU2rewards] = useState(0);

  const noOfMatches = async () => {
    const query1 = JSON.stringify({
      query: `
          query MyQuery {
          squadRegistereds(where: {user_address: "${address1}"}) {
            betAmount
          }
        }
    `,
    });

    const response1 = await fetch("https://api.studio.thegraph.com/query/41844/fairplay/version/latest", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: query1,
    });

    const response1Json = await response1.json();
    console.log(response1Json);
    setU1matches(response1Json.data.squadRegistereds.length);
    setU1bets(
      response1Json.data.squadRegistereds.reduce(
        (accumulator, currentValue) => accumulator + currentValue.betAmount,
        0,
      ),
    );

    const query2 = JSON.stringify({
      query: `
          query MyQuery {
          squadRegistereds(where: {user_address: "${address2}"}) {
            betAmount
          }
        }
    `,
    });

    const response2 = await fetch("https://api.studio.thegraph.com/query/41844/fairplay/version/latest", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: query2,
    });

    const response2Json = await response2.json();
    setU2matches(response2Json.data.squadRegistereds.length);
    setU2bets(
      response2Json.data.squadRegistereds.reduce(
        (accumulator, currentValue) => accumulator + currentValue.betAmount,
        0,
      ),
    );
  };

  const noOfWins = async () => {
    const query1 = JSON.stringify({
      query: `
          query MyQuery {
          rewardsClaimeds(where: {user_address: "${address1}"}) {
            amount
          }
        }
    `,
    });

    const response1 = await fetch("https://api.studio.thegraph.com/query/41844/fairplay/version/latest", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: query1,
    });

    const response1Json = await response1.json();
    setU1wins(response1Json.data.rewardsClaimeds.length);
    setU1rewards(
      response1Json.data.rewardsClaimeds.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0),
    );

    const query2 = JSON.stringify({
      query: `
          query MyQuery {
          rewardsClaimeds(where: {user_address: "${address2}"}) {
            amount
          }
        }
    `,
    });

    const response2 = await fetch("https://api.studio.thegraph.com/query/41844/fairplay/version/latest", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: query2,
    });

    const response2Json = await response2.json();
    setU2wins(response2Json.data.rewardsClaimeds.length);
    setU2rewards(
      response2Json.data.rewardsClaimeds.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0),
    );
  };

  const leaderboardFetch = async id => {
    // console.log(Number(id.split(" ")[1]));
    const query = JSON.stringify({
      query: `
          query MyQuery {
            squadRegistereds(
              where: {match_id: "${Number(id.split(" ")[1])}"}
              orderBy: total_points
              orderDirection: desc
            ) {
              betAmount
              total_points
              squadHash
              match_id
              user_address
            }
          }
    `,
    });

    const response = await fetch("https://api.studio.thegraph.com/query/41844/fairplay/version/latest", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: query,
    });

    const responseJson = await response.json();
    setRanklist(responseJson.data.squadRegistereds);
  };

  const calculateStats = async () => {
    await noOfMatches();
    await noOfWins();
  };

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
              <select
                className="select select-accent w-full max-w-xs"
                value={match}
                onChange={e => {
                  setMatch(e.target.value);
                  leaderboardFetch(e.target.value);
                }}
              >
                <option disabled selected>
                  Select Match
                </option>
                {matches.map(match => (
                  <option key={match.matchName}>{match.matchName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="max-w-[400px] lg:max-w-none">
              {match && (
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
                      {ranklist.map((rank, i) => (
                        <tr>
                          <th>{i + 1}</th>
                          <td>
                            <Address address={rank.user_address} />
                          </td>
                          <td>{rank.total_points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparisons */}
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
            <div className="text-center lg:text-left">
              <button
                id="compare-now"
                className="btn btn-outline lg:self-start px-8 hover:opacity-100"
                onClick={() => {
                  calculateStats();
                }}
              >
                Compare
              </button>
            </div>
          </div>
          {/* Card Container  */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center items-center mt-8">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <AddressInput onChange={setAddress1} value={address1} placeholder="Input First Player's Address" />
                <ul>
                  <li className="m-2">
                    <span className="font-bold">No. Of Matches</span>: {u1matches}
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Total Bets Summed</span>: {u1bets}
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Total Wins</span>: {u1wins}
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Total Rewards Claimed</span>: {u1rewards}
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
                    <span className="font-bold">No. Of Matches</span>: {u2matches}
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Total Bets Summed</span>: {u2bets}
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Total Wins</span>: {u2wins}
                  </li>
                  <li className="m-2">
                    <span className="font-bold">Total Rewards Claimed</span>: {u2rewards}
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
