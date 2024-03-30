"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { NextPage } from "next";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import {
  ArrowRightCircleIcon,
  BanknotesIcon,
  CalculatorIcon,
  LockClosedIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Player from "~~/components/Player";
import { Spinner } from "~~/components/Spinner";
import { EtherInput } from "~~/components/scaffold-eth";
import players from "~~/data/match_players.json";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import "~~/styles/test1.css";
import {  keccak256,
  encodePacked,
  encodeAbiParameters,
  parseAbiParameters,
  hexToBytes, } from "viem";


const AnonAadhaarProvider = dynamic(() => import("@anon-aadhaar/react").then(module => module.AnonAadhaarProvider), {
  ssr: false,
});
const LogInWithAnonAadhaar = dynamic(() => import("@anon-aadhaar/react").then(module => module.LogInWithAnonAadhaar), {
  ssr: false,
});

const PlayMatch: NextPage = ({ params, searchParams }: { params: { id: string }; searchParams: string }) => {
  const batsmen_options = players[Number(params.id.split("M")[1]) - 1].batsmen;
  const bowler_options = players[Number(params.id.split("M")[1]) - 1].bowlers;
  const { address } = useAccount();
  const animatedComponents = makeAnimated();

  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(2);
  const [batsman, setBatsman] = useState({ batsmen: [] });
  const [bowler, setBowler] = useState({ bowlers: [] });
  const [wk, setWk] = useState({ wks: [] });
  const [captain, setCaptain] = useState({ captains: [] });
  const [selectedPlayers, setSelectedPlayers] = useState({ players: [] });
  const [savedPlayers, setSavedPlayers] = useState(null);
  const [betAmount, setBetAmount] = useState("0");

  const [anonAadhaarStatus, setAnonAadhaarStatus] = useState(false);

  const { writeAsync: writeAsync1, isLoading: isLoading1 } = useScaffoldContractWrite({
    contractName: "Protocol",
    functionName: "submitOracle",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: writeAsync2, isLoading: isLoading2 } = useScaffoldContractWrite({
    contractName: "Protocol",
    functionName: "submitSquad",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  function computeMerkleRoot(points) {
    const hashedValues = points.map((point) =>
      keccak256(`0x${point.toString(16)}`)
    );
    console.log(hashedValues);
  
    function recursiveMerkleRoot(hashes) {
      if (hashes.length === 1) {
        return hashes[0];
      }
  
      const nextLevelHashes = [];
  
      // Combine adjacent hashes and hash them together
      for (let i = 0; i < hashes.length; i += 2) {
        const left = hashes[i];
        const right = i + 1 < hashes.length ? hashes[i + 1] : "0x";
        const combinedHash = keccak256(
          encodePacked(["bytes32", "bytes32"], [left, right])
        );
        nextLevelHashes.push(combinedHash);
      }
  
      // Recur for the next level
      return recursiveMerkleRoot(nextLevelHashes);
    }
  
    // Start the recursive computation
    return recursiveMerkleRoot(hashedValues);
  }
  
  function padArrayWithZeros(array) {
    const paddedLength = Math.pow(2, Math.ceil(Math.log2(array.length)));
    return array.concat(
      Array.from({ length: paddedLength - array.length }, () => 0)
    );
  }

  useEffect(() => {
    const localStatus = localStorage.getItem("anonAadhaar");
    if (localStatus) {
      if (JSON.parse(localStatus).status === "logged-in") {
        setAnonAadhaarStatus(true);
      }
    }

    const match = localStorage.getItem(params.id);
    if (match) {
      const savedStep = localStorage.getItem("step_" + params.id);
      setStep(savedStep);
      const saved_players = JSON.parse(match) || [];
      setSavedPlayers(saved_players);
      setIsLoading(false);
    } else {
      setStep(1);
      setIsLoading(false);
    }
  }, []);

  const lockTeam = () => {
    const final_players = wk.wks.concat(batsman.batsmen, bowler.bowlers);
    setSelectedPlayers({ ...selectedPlayers, players: final_players });
    setSavedPlayers(final_players);
    localStorage.setItem(params.id, JSON.stringify(final_players));
    localStorage.setItem("step_" + params.id, 3);
    setStep(3);
  };

  const registerAndBet = async () => {
    // const api_url = `https://puce-smoggy-clam.cyclic.app/scores/${params.id.split("M")[1]}/${savedPlayers
    //   .map(savedPlayer => savedPlayer.player_id)
    //   .join("P")}`;
    // await writeAsync1({ args: [api_url] });
    // await writeAsync2({ args: [], value: parseEther(betAmount) });
    // localStorage.setItem("step_" + params.id, 4);
    // setStep(4);
    
    console.log(savedPlayers.map(savedPlayer => savedPlayer.player_id));
    var merkleRoot = computeMerkleRoot(padArrayWithZeros(savedPlayers.map(savedPlayer => savedPlayer.player_id)));
    console.log(merkleRoot);
    console.log(address);
    var timeconst = keccak256(`0x${Date.now().toString(16)}`);
    localStorage.setItem("timestamp_" + params.id, timeconst);
    const finalHash = keccak256(
      encodePacked(["bytes20", "bytes32","bytes32"], [address, merkleRoot, timeconst])
    );
    console.log(timeconst)
    console.log(finalHash)
    

  
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-base-200">
        <Spinner />
      </div>
    );
  }

  return (
    <AnonAadhaarProvider>
      <div className="bg-base-200">
        <div className="mb-4 mt-12 flex justify-center items-center w-full">
          <div>
            <h1 className="text-4xl">{searchParams.title}</h1>
          </div>
        </div>
        <div className="mb-4 mt-12 flex justify-center items-center w-full">
          <div>
            <ul className="steps steps-vertical lg:steps-horizontal">
              <li id="game-step-1" className={`step ${step >= 1 ? "step-accent" : ""}`}>
                Prove Identity using Anon Aadhar
              </li>
              <li id="game-step-2" className={`step ${step >= 2 ? "step-accent" : ""}`}>
                Build Your Strong Squad
              </li>
              <li id="game-step-3" className={`step ${step >= 3 ? "step-accent" : ""}`}>
                Register Your Fully Private Squad
              </li>
              <li id="game-step-4" className={`step ${step >= 4 ? "step-accent" : ""}`}>
                Receive The Match Results
              </li>
            </ul>
          </div>
        </div>

        {/* Step 1 */}

        {step == 1 && (
          <div className="container max-w-[100%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
            <div className="space-y-6 lg:max-w-[55%] flex flex-col items-center lg:items-start">
              <div className="text-center px-1 max-w-lg lg:max-w-none lg:w-11/12 lg:px-0 lg:text-left">
                <h1 className="m-0 mb-3 text-3xl">Prove Your Identity</h1>
                <p className="m-0 mb-3">
                  The <span className="font-bold">FairPlayXI Platform</span> is{" "}
                  <span className="font-bold">Sybil-Resistant</span>, thanks to{" "}
                  <span className="font-bold">Anon Aadhar</span>. This allows us to{" "}
                  <span className="font-bold">prevent bots</span> from competing with real players.
                </p>
                <p className="m-0 mb-10">
                  Prove your <span className="font-bold">human identity</span> and continue for your{" "}
                  <span className="font-bold">fair play!</span>
                </p>
                <div className="m-0 mb-10">
                  <LogInWithAnonAadhaar nullifierSeed={1234} />
                </div>
                {anonAadhaarStatus && (
                  <div className="m-0 mb-10">
                    <button className="btn btn-accent" onClick={() => setStep(2)}>
                      Proceed To Step 2
                      <ArrowRightCircleIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="max-w-md relative">
                <Image src="/assets/Untitled design.png" alt="developers list" width={900} height={900} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}

        {step == 2 && (
          <div className="container max-w-[100%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0 mb-10">
            <div className="space-y-6 lg:max-w-[55%] flex flex-col items-center lg:items-start">
              <div className="text-center px-1 max-w-lg lg:max-w-none lg:w-11/12 lg:px-0 lg:text-left">
                <h1 className="m-0 mb-3 text-3xl">Build Your Squad</h1>
                <p className="m-0 mb-3">The rules for building a squad are as follows</p>
                <p className="m-0 mb-3">
                  You have to build a team with{" "}
                  <span className="font-bold">exactly 1 Wicket Keeper, 5 Batsmen and 5 Bowlers</span> from any of the 2
                  competing teams. You can choose <span className="font-bold">any one</span> of these 11 selected
                  players as your <span className="font-bold">Captain</span>.
                </p>
                <div className="m-0 mb-3 mt-10">
                  <h2 className="m-0 mb-3 text-xl">Select WK</h2>
                  <div className="m-0 mb-3">
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      onChange={o => {
                        setWk({ ...wk, wks: o });
                      }}
                      isOptionDisabled={() => wk.wks.length == 1}
                      options={batsmen_options}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          color: "#000000",
                          width: "100%",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: !state.isDisabled ? "#000000" : "#FFFFFF",
                        }),
                      }}
                    />
                  </div>
                  <div className="m-0 mb-3 mt-10">
                    <h2 className="m-0 mb-3 text-xl">Select Batsmen</h2>
                    <div className="m-0 mb-3">
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={o => {
                          setBatsman({ ...batsman, batsmen: o });
                        }}
                        isOptionDisabled={() => batsman.batsmen.length == 5}
                        options={batsmen_options}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            color: "#000000",
                            width: "100%",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            color: !state.isDisabled ? "#000000" : "#FFFFFF",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className="m-0 mb-3 mt-10">
                    <h2 className="m-0 mb-3 text-xl">Select Bowlers</h2>
                    <div className="m-0 mb-3">
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={o => {
                          setBowler({ ...bowler, bowlers: o });
                        }}
                        isOptionDisabled={() => bowler.bowlers.length == 5}
                        options={bowler_options}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            color: "#000000",
                            width: "100%",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            color: !state.isDisabled ? "#000000" : "#FFFFFF",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className="m-0 mb-3 mt-10">
                    <h2 className="m-0 mb-3 text-xl">Select Captain</h2>
                    <div className="m-0 mb-3">
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={o => {
                          setCaptain({ ...captain, captains: o });
                        }}
                        isOptionDisabled={() => captain.captains.length == 1}
                        options={wk.wks.concat(bowler.bowlers, batsman.batsmen)}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            color: "#000000",
                            width: "100%",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            color: !state.isDisabled ? "#000000" : "#FFFFFF",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div className="m-0 mb-3 mt-10">
                    <div
                      className="text-center lg:text-left tooltip tooltip-right tooltip-warning"
                      data-tip="Warning! This will LOCK your team. You won't be able to edit it after this"
                    >
                      <button
                        className="btn btn-accent"
                        disabled={
                          wk.wks.length + bowler.bowlers.length + batsman.batsmen.length + captain.captains.length != 12
                        }
                        onClick={() => lockTeam()}
                      >
                        Lock Team
                        <LockClosedIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-md relative">
                <Image src="/assets/Untitled design.png" alt="developers list" width={900} height={900} />
                {/* Wicket Keeper */}

                <div className="absolute top-0 left-40">
                  <Player name={wk.wks[0]?.value} position="WK" />
                </div>

                {/* Row 1 */}

                <div className="absolute top-24 left-0">
                  <Player name={batsman.batsmen[0]?.value} position="Bat" />
                </div>
                <div className="absolute top-24 left-40">
                  <Player name={batsman.batsmen[1]?.value} position="Bat" />
                </div>
                <div className="absolute top-24 left-80">
                  <Player name={batsman.batsmen[2]?.value} position="Bat" />
                </div>

                {/* Row 2 */}

                <div className="absolute top-48 left-0">
                  <Player name={batsman.batsmen[3]?.value} position="Bat" />
                </div>
                <div className="absolute top-48 left-40">
                  <Player name={batsman.batsmen[4]?.value} position="Bat" />
                </div>
                <div className="absolute top-48 left-80">
                  <Player name={bowler.bowlers[0]?.value} position="Bowl" />
                </div>

                {/* Row 3 */}

                <div className="absolute top-72 left-0">
                  <Player name={bowler.bowlers[1]?.value} position="Bowl" />
                </div>
                <div className="absolute top-72 left-40">
                  <Player name={bowler.bowlers[2]?.value} position="Bowl" />
                </div>
                <div className="absolute top-72 left-80">
                  <Player name={bowler.bowlers[3]?.value} position="Bowl" />
                </div>

                {/* Last */}

                <div className="absolute bottom-0 left-40">
                  <Player name={bowler.bowlers[4]?.value} position="Bowl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}

        {step == 3 && (
          <div className="container max-w-[100%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0 mb-10">
            <div className="space-y-6 lg:max-w-[55%] flex flex-col items-center lg:items-start">
              <div className="text-center px-1 max-w-lg lg:max-w-none lg:w-11/12 lg:px-0 lg:text-left">
                <h1 className="m-0 mb-3 text-3xl">Register The Squad</h1>
                <p className="m-0 mb-3">
                  To ensure that you do not modify the squad after locking, you must submit{" "}
                  <span className="font-bold">the squad hash</span>. The squad hash we calculate{" "}
                  <span className="font-bold">does not reveal</span> your built team to other players.
                </p>
                <p className="m-0 mb-3">
                  Additionally, you must <span className="font-bold">bet some amount</span> in order to participate.
                  Note that this game is <span className="font-bold">addictive & includes financial risks</span>. Please
                  play with caution.
                </p>
                <div className="m-0 mb-3 mt-10">
                  <div className="m-0 mb-3 mt-10 flex items-center justify-evenly w-full">
                    <div>
                      <EtherInput placeholder="0" value={betAmount} onChange={e => setBetAmount(e)} />
                    </div>
                    <div
                      className="text-center lg:text-left tooltip tooltip-bottom tooltip-info"
                      data-tip="This does not reveal your squad to other players. Note that the money you bet might be lost!"
                    >
                      <button
                        className="btn btn-accent"
                        disabled={betAmount === "" || betAmount === "0" || betAmount === "0."}
                        onClick={() => registerAndBet()}
                      >
                        Register Squad & Bet
                        <BanknotesIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-md relative">
                <Image src="/assets/Untitled design.png" alt="developers list" width={900} height={900} />
                {/* Wicket Keeper */}

                <div className="absolute top-0 left-40">
                  <Player name={savedPlayers[0]?.value} position="WK" />
                </div>

                {/* Row 1 */}

                <div className="absolute top-24 left-0">
                  <Player name={savedPlayers[1]?.value} position="Bat" />
                </div>
                <div className="absolute top-24 left-40">
                  <Player name={savedPlayers[2]?.value} position="Bat" />
                </div>
                <div className="absolute top-24 left-80">
                  <Player name={savedPlayers[3]?.value} position="Bat" />
                </div>

                {/* Row 2 */}

                <div className="absolute top-48 left-0">
                  <Player name={savedPlayers[4]?.value} position="Bat" />
                </div>
                <div className="absolute top-48 left-40">
                  <Player name={savedPlayers[5]?.value} position="Bat" />
                </div>
                <div className="absolute top-48 left-80">
                  <Player name={savedPlayers[6]?.value} position="Bowl" />
                </div>

                {/* Row 3 */}

                <div className="absolute top-72 left-0">
                  <Player name={savedPlayers[7]?.value} position="Bowl" />
                </div>
                <div className="absolute top-72 left-40">
                  <Player name={savedPlayers[8]?.value} position="Bowl" />
                </div>
                <div className="absolute top-72 left-80">
                  <Player name={savedPlayers[9]?.value} position="Bowl" />
                </div>

                {/* Last */}

                <div className="absolute bottom-0 left-40">
                  <Player name={savedPlayers[10]?.value} position="Bowl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}

        {step == 4 && (
          <div className="container max-w-[100%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0 mb-10">
            <div className="space-y-6 lg:max-w-[55%] flex flex-col items-center lg:items-start">
              <div className="text-center px-1 max-w-lg lg:max-w-none lg:w-11/12 lg:px-0 lg:text-left">
                <h1 className="m-0 mb-3 text-3xl">View Your Results</h1>
                <p className="m-0 mb-3">
                  We verify that you have not modified the team you are now revealing for calculating the points. We do
                  this using <span className="font-bold">the squad hash</span> you previously submitted using{" "}
                  <span className="font-bold">Zero Knowledge Proof</span>.
                </p>
                <p className="m-0 mb-3">
                  The points are calculated via a <span className="font-bold">Decentralized Oracle Network</span> to
                  ensure <span className="font-bold">transparency</span> in the scoring process.
                </p>
                <div className="m-0 mb-3 mt-10">
                  <div className="m-0 mb-3 mt-10 flex items-center justify-evenly w-full">
                    <div className="text-center lg:text-left">
                      <button className="btn btn-accent">
                        Verify Squad & Calculate Points
                        <CalculatorIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-center lg:text-left">
                      <button className="btn btn-accent">
                        Claim Rewards
                        <TrophyIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center px-1 max-w-lg lg:max-w-none lg:w-11/12 lg:px-0 lg:text-left">
                <div className="mockup-browser bg-accent">
                  <div className="mockup-browser-toolbar">
                    <div className="input">Logs</div>
                  </div>
                  <div className="px-4 py-4 bg-neutral text-secondary h-52">
                    <div>test</div>
                    <div>test</div>
                    <div>test</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="max-w-md relative">
                <Image src="/assets/Untitled design.png" alt="developers list" width={900} height={900} />
                {/* Wicket Keeper */}

                <div className="absolute top-0 left-40">
                  <Player name={savedPlayers[0]?.value} position="WK" />
                </div>

                {/* Row 1 */}

                <div className="absolute top-24 left-0">
                  <Player name={savedPlayers[1]?.value} position="Bat" />
                </div>
                <div className="absolute top-24 left-40">
                  <Player name={savedPlayers[2]?.value} position="Bat" />
                </div>
                <div className="absolute top-24 left-80">
                  <Player name={savedPlayers[3]?.value} position="Bat" />
                </div>

                {/* Row 2 */}

                <div className="absolute top-48 left-0">
                  <Player name={savedPlayers[4]?.value} position="Bat" />
                </div>
                <div className="absolute top-48 left-40">
                  <Player name={savedPlayers[5]?.value} position="Bat" />
                </div>
                <div className="absolute top-48 left-80">
                  <Player name={savedPlayers[6]?.value} position="Bowl" />
                </div>

                {/* Row 3 */}

                <div className="absolute top-72 left-0">
                  <Player name={savedPlayers[7]?.value} position="Bowl" />
                </div>
                <div className="absolute top-72 left-40">
                  <Player name={savedPlayers[8]?.value} position="Bowl" />
                </div>
                <div className="absolute top-72 left-80">
                  <Player name={savedPlayers[9]?.value} position="Bowl" />
                </div>

                {/* Last */}

                <div className="absolute bottom-0 left-40">
                  <Player name={savedPlayers[10]?.value} position="Bowl" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-[url(/assets/sre-path.png)] bg-repeat-x h-32 relative bg-[35%_top]"></div>
      </div>
    </AnonAadhaarProvider>
  );
};

export default PlayMatch;
