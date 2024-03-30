"use client";

import type { NextPage } from "next";
import { Card } from "~~/components/MatchCard";
import matches from "~~/data/matches.json";
import "~~/styles/test1.css";

const Matches: NextPage = () => {
  return (
    <>
      {/* Select Match */}
      <div className="bg-base-100 -mt-16">
        <div className="container max-w-[90%] lg:max-w-6xl m-auto py-16 lg:py-28 lg:px-12">
          <div className="bg-[url(/assets/bm.png)] bg-no-repeat bg-right-bottom lg:bg-right-top bg-[length:50px] lg:bg-auto max-w-[680px] pb-10">
            <div className="mt-6 lg:mt-0">
              <h2 className="text-3xl lg:text-5xl text-center lg:text-left lg:max-w-lg">Ready To Play?</h2>
              <p className="text-center lg:text-left lg:w-3/4">
                Test your fantasy cricket skills by selecting any match and playing it
              </p>
            </div>
          </div>
          {/* Cards container */}
          <div className="flex gap-8 flex-wrap justify-center lg:max-w-5xl">
            {/* Card */}
            {matches.map((match, i) => (
              <Card
                key={`I23M${i + 1}`}
                num={i + 1}
                name={match.matchName}
                src={`/assets/matches/I23M${i + 1}.jpg`}
                description={`${match.references[0].title} | ${new Date(match.date).toLocaleDateString("en-GB")}`}
                link={`/play/I23M${i + 1}?title=${match.matchName}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Matches;
