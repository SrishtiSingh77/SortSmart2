// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract WasteLogger {
    event WasteLogged(uint indexed classID, string wasteType, address indexed user);
    event RewardGiven(address indexed user, uint rewardAmount);

    struct Log {
        uint classID;
        string wasteType;
        address user;
    }

    Log[] public logs;

    // Mapping to store user reward balances
    mapping(address => uint) public userRewards;

    // Set reward amount per waste logged (e.g., 10 points)
    uint public constant REWARD_PER_LOG = 10;

    function logWaste(uint classID, string memory wasteType) public {
        logs.push(Log(classID, wasteType, msg.sender));
        emit WasteLogged(classID, wasteType, msg.sender);

        // Give reward
        userRewards[msg.sender] += REWARD_PER_LOG;
        emit RewardGiven(msg.sender, REWARD_PER_LOG);
    }

    function getLogsCount() public view returns (uint) {
        return logs.length;
    }

    function getMyRewardBalance() public view returns (uint) {
        return userRewards[msg.sender];
    }

    function getUserRewardBalance(address user) public view returns (uint) {
        return userRewards[user];
    }
}
