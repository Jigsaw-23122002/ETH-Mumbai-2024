//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
// player ids []
// match id eg "12" ie string of a num

//tot points , individual_points[]
// import "hardhat/console.sol";
// import { Chainlink, ChainlinkClient } from "https://github.com/smartcontractkit/chainlink/blob/master/contracts/src/v0.8/ChainlinkClient.sol";
// import { ConfirmedOwner } from "https://github.com/smartcontractkit/chainlink/blob/master/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
// import { LinkTokenInterface } from "https://github.com/smartcontractkit/chainlink/blob/master/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

import { Chainlink, ChainlinkClient } from "@chainlink/contracts@1.0.0/src/v0.8/ChainlinkClient.sol";
import { ConfirmedOwner } from "@chainlink/contracts@1.0.0/src/v0.8/shared/access/ConfirmedOwner.sol";
import { LinkTokenInterface } from "@chainlink/contracts@1.0.0/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract Protocol is ChainlinkClient, ConfirmedOwner {
	using Chainlink for Chainlink.Request;
	bytes32 private jobId;
	uint256 private fee;
	int256 public total_scores_players;

	constructor() ConfirmedOwner(msg.sender) {
		_setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
		_setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
		jobId = "fcf4140d696d44b687012232948bdd5d";
		fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
	}

	struct MatchUserSquad {
		address user_address;
		int256 total_points;
		bytes32 squadHash;
	}

	struct WinnerData {
		int256 matchWinnerPoints;
		address matchWinner;
		uint256 matchPrizePool;
		bytes32 squadHash;
	}

	// match id to winner
	mapping(string => WinnerData) matchWinnerData;
	mapping(string => MatchUserSquad) matchUserData;

	//events
	event SquadRegistered(
		string match_id,
		string uuid,
		address user_address,
		int256 total_points,
		bytes32 squadHash
	);
	event rewardsClaimed(string match_id, uint256 amount);
	event test(bytes32 indexed requestId, int256 _total);

	//functions
	function submitOracle(string memory api) public payable {
		Chainlink.Request memory req = _buildChainlinkRequest(
			jobId,
			address(this),
			this.fulfill.selector
		);
		req._add("get", api);
		req._add("path", "total_score");
		req._addInt("times", 1);
		_sendChainlinkRequest(req, fee);
	}

	function submitSquad(
		string memory match_id,
		string memory uuid,
		address user_address,
		bytes32 squadHash
	) public payable {
		matchUserData[uuid] = MatchUserSquad(
			user_address,
			total_scores_players,
			squadHash
		);
		if (
			matchWinnerData[match_id].matchWinnerPoints < total_scores_players
		) {
			matchWinnerData[match_id].matchWinnerPoints = total_scores_players;
			matchWinnerData[match_id].matchWinner = user_address;
			matchWinnerData[match_id].squadHash = squadHash;
		}
		matchWinnerData[match_id].matchPrizePool += msg.value;
		emit SquadRegistered(
			match_id,
			uuid,
			user_address,
			total_scores_players,
			squadHash
		);
	}

	function fulfill(
		bytes32 _requestId,
		int256 _total_scores_players
	) public recordChainlinkFulfillment(_requestId) {
		emit test(_requestId, _total_scores_players);
		total_scores_players = _total_scores_players;
	}

	function getMatchUserSquad(
		string memory uuid
	) public view returns (MatchUserSquad memory) {
		return matchUserData[uuid];
	}

	function isWinner(string memory match_id) public view returns (bool) {
		return matchWinnerData[match_id].matchWinner == msg.sender;
	}

	function claimRewards(
		string memory match_id,
		bytes32 squadHash,
		bytes32[] memory merklePath
	) public {
		//verification using squadHash, merklePath

		// if verified
		if (
			matchWinnerData[match_id].matchWinner == msg.sender &&
			matchWinnerData[match_id].squadHash == squadHash
		) {
			uint256 amount = matchWinnerData[match_id].matchPrizePool;
			payable(msg.sender).transfer(amount);
			emit rewardsClaimed(match_id, amount);
		}
	}
}
