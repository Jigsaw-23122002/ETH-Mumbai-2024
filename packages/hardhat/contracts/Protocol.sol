//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Protocol is ChainlinkClient {
	using Chainlink for Chainlink.Request;
	bytes32 private jobId;
	uint256 private fee;
	int256 public total_scores_players;
	address private immutable oracle;

	constructor() {
		// setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
		_setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);

		_setChainlinkToken(0xfaFedb041c0DD4fA2Dc0d87a6B0979Ee6FA7af5F);

		oracle = 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7;

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
	mapping(string => WinnerData) public matchWinnerData;
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
	function submitOracle(string memory api) public {
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
		bytes32 squadHash
	) public payable {
		matchUserData[uuid] = MatchUserSquad(
			msg.sender,
			total_scores_players,
			squadHash
		);
		if (
			matchWinnerData[match_id].matchWinnerPoints < total_scores_players
		) {
			matchWinnerData[match_id].matchWinnerPoints = total_scores_players;
			matchWinnerData[match_id].matchWinner = msg.sender;
			matchWinnerData[match_id].squadHash = squadHash;
		}
		matchWinnerData[match_id].matchPrizePool += msg.value;
		emit SquadRegistered(
			match_id,
			uuid,
			msg.sender,
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
		if (matchWinnerData[match_id].matchWinner == msg.sender) {
			return true;
		} else {
			return false;
		}
	}

	function claimRewards(string memory match_id, bytes32 squadHash) public {
		//verification using squadHash, merklePath

		// if verified
		if (
			address(matchWinnerData[match_id].matchWinner) ==
			address(msg.sender) &&
			matchWinnerData[match_id].squadHash == squadHash
		) {
			uint256 amount = matchWinnerData[match_id].matchPrizePool;
			payable(msg.sender).transfer(amount);
			total_scores_players = 0;

			emit rewardsClaimed(match_id, amount);
		}
	}
}
