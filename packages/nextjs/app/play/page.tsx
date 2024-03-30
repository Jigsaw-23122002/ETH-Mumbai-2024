"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import "~~/styles/test1.css";

const Play: NextPage = () => {
  return (
    <>
      {/* Start Using FairPlayXI */}
      <div className="bg-base-100" id="start-using-fairplayxi">
        <div className="container max-w-[90%] lg:max-w-6xl m-auto py-12 lg:py-20 lg:px-12 flex flex-col lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl lg:w-3/4 text-center lg:text-left">
              Please Select A Match To Start FairPlayXI
            </h2>
            <ul className="list-disc list-inside flex flex-col space-y-3 m-auto lg:mx-0 max-w-[300px] lg:max-w-none">
              <li>
                <span className="font-bold">Fully Private Teams</span> - No more teams leaking before the match
              </li>
              <li>
                <span className="font-bold">Sybil-Resistant</span> - No bots competing with unfair teams
              </li>
              <li>
                <span className="font-bold">Fully Decentralized</span> - No concerns about transparency regarding
                scoring
              </li>
            </ul>
            <div className="text-center lg:text-left">
              <Link id="play-now" href="/matches" className="btn btn-outline lg:self-start px-8 hover:opacity-100">
                Select Match!
              </Link>
            </div>
          </div>
          <div className="max-w-[300px] lg:max-w-none">
            <Image src="/logo.svg" alt="hero" width={500} height={500} />
          </div>
        </div>
        <div className="bg-[url(/assets/sre-path.png)] bg-repeat-x h-32 relative bg-[35%_top]"></div>
      </div>
    </>
  );
};

export default Play;
