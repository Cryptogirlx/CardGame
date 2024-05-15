pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ExPopulusCards.sol";

contract ExPopulusCardGameLogic is Ownable {
    //-------------------------------------------------------------
    // STORAGE
    //-------------------------------------------------------------
    ExPopulusCards exPoPulusCards;
    IERC20 public REWARD_TOKEN;

    uint fieldCount;
    uint playerCount;
    uint roundCount;

    struct BattleField {
        uint playerID;
        uint battleStartTime;
        uint battleEndTime;
        uint[] enemyCards;
        bytes32[] roundDetails;
        FieldStatus status;
        GameResult result;
        bool rewardsClaimed;
    }

    enum FieldStatus {
        Active,
        Inactive,
        Paused
    }

    enum GameResult {
        PlayerWin,
        EnemyWin,
        Draw
    }

    struct Player {
        address wallet;
        uint battleFieldID;
        bool isActive;
        uint[] cardsInHand;
        uint winstreak;
        uint rewardsEarned;
    }

    struct Round {
        int enemyHealth;
        bool enemyDeath;
        bool enemyAbilityUsed;
        int playerHealth;
        bool playerDeath;
        bool playerAbilityUsed;
        uint timestamp;
    }

    mapping(uint => Player) players;
    mapping(uint => BattleField) battlefields;
    // playerID => win streaks
    mapping(uint => uint) winstreaks;
    //roundCount => Rounds
    mapping(uint => Round) rounds;

    //------------------------------------------------------------
    // EVENTS
    //------------------------------------------------------------

    event BattleFieldCreated(uint fieldID);
    event EnteredBattle(uint fieldID, uint playerID);
    event PlayerEnteredBattle(uint fieldID, uint playerID, uint startTime);
    event EnemyCardsGenerated(uint card1, uint card2, uint card3, uint fieldID);
    event RoundFinished(uint fieldID, uint timestamp);
    event RewardsClaimed(address player, uint amount);

    //------------------------------------------------------------
    // CUSTOM ERRORS
    //------------------------------------------------------------

    error OnlyCardOwner();
    error InactiveOrPausedBattleField();
    error NotEnoughEnemyCards();
    error CantClaimRewards();
    error RewardsClaimedAlready();
    error CantUseTheSameCardTwice();

    //-------------------------------------------------------------
    // CONSTRUCTOR
    //-------------------------------------------------------------

    constructor(
        address _rewardTokenAddres,
        address _cardContractAddress,
        address _initialOwner
    ) Ownable(_initialOwner) {
        REWARD_TOKEN = IERC20(_rewardTokenAddres);
        exPoPulusCards = ExPopulusCards(_cardContractAddress);
    }

    //-------------------------------------------------------------
    // STATE - MODIFIING FUNCTIONS
    //-------------------------------------------------------------

    function createBattlefield(
        uint playerID
    ) external onlyOwner returns (uint) {
        // the owner can create multiple battlefields where players can play

        unchecked {
            fieldCount++;
        }

        battlefields[fieldCount].status = FieldStatus.Active;

        emit BattleFieldCreated(fieldCount);

        return fieldCount;
    }

    function battle(uint fieldID, uint card1, uint card2, uint card3) external {
        uint playerID = battlefields[fieldID].playerID;
        if (battlefields[fieldID].status != FieldStatus.Active)
            revert InactiveOrPausedBattleField();
        uint[] memory enemyCards = battlefields[fieldID].enemyCards;
        if (enemyCards.length < 3) revert NotEnoughEnemyCards();

        uint[] memory playerCards = players[playerID].cardsInHand;

        int playerHealth;
        int playerAttack;

        int enemyHealth;
        int enemyAttack;

        uint playerIndex = 0;
        uint enemyIndex = 0;

        unchecked {
            roundCount++;
        }

        while (
            playerIndex < playerCards.length && enemyIndex < enemyCards.length
        ) {
            uint playerCard = playerCards[playerIndex];
            uint enemyCard = enemyCards[enemyIndex];

            // Get player card attributes
            playerAttack = exPoPulusCards.getAttack(playerCard);
            playerHealth = exPoPulusCards.getHealth(playerCard);

            // Get enemy card attributes
            enemyAttack = exPoPulusCards.getAttack(enemyCard);
            enemyHealth = exPoPulusCards.getHealth(enemyCard);

            // Abilities (only used once)
            if (!rounds[roundCount].playerAbilityUsed) {
                uint playerAbility = exPoPulusCards.getAbilityID(playerCard);
                // Process player ability here
                rounds[roundCount].playerAbilityUsed = true;
            }

            if (!rounds[roundCount].enemyAbilityUsed) {
                uint enemyAbility = exPoPulusCards.getAbilityID(enemyCard);
                // Process enemy ability here
                rounds[roundCount].enemyAbilityUsed = true;
            }

            // Basic attacks
            playerHealth -= enemyAttack;
            enemyHealth -= playerAttack;

            // Death handling
            if (playerHealth <= 0 && enemyHealth <= 0) {
                playerIndex++;
                enemyIndex++;

                if (
                    playerIndex >= playerCards.length &&
                    enemyIndex >= enemyCards.length
                ) {
                    battlefields[fieldID].result = GameResult.Draw;
                    break;
                }
            } else if (playerHealth <= 0) {
                playerIndex++;
                if (playerIndex >= playerCards.length) {
                    battlefields[fieldID].result = GameResult.EnemyWin;
                    battlefields[fieldID].battleEndTime = block.timestamp;
                    players[playerID].winstreak = 0;
                    break;
                }
            } else if (enemyHealth <= 0) {
                enemyIndex++;
                if (enemyIndex >= enemyCards.length) {
                    battlefields[fieldID].result = GameResult.PlayerWin;
                    players[playerID].winstreak += 1;
                    break;
                }

                // Persist battle details
                Round memory newRound = Round(
                    rounds[roundCount].enemyHealth,
                    rounds[roundCount].enemyDeath,
                    rounds[roundCount].enemyAbilityUsed,
                    rounds[roundCount].playerHealth,
                    rounds[roundCount].playerDeath,
                    rounds[roundCount].playerAbilityUsed,
                    block.timestamp
                );

                bytes32 battleDetails = keccak256(
                    abi.encode(roundCount, newRound)
                );
                battlefields[fieldID].roundDetails.push(battleDetails);

                emit RoundFinished(fieldID, block.timestamp);

          
            }

			    playerIndex++;
                enemyIndex++;
        }
    }

    function generateEnemyCards(
        uint card1,
        uint card2,
        uint card3,
        uint fieldID
    ) public onlyOwner {
        // this function assumes that the randomization of the cards happens off chain
        //for true randomization oracle integration is necessary
        // ideally this function should be an internal function being called in battle

        uint[] storage enemyCards = battlefields[fieldID].enemyCards;

        enemyCards.push(card1);
        enemyCards.push(card2);
        enemyCards.push(card3);

        emit EnemyCardsGenerated(card1, card2, card3, fieldID);
    }

    function enterBattle(
        uint fieldID,
        uint card1,
        uint card2,
        uint card3
    ) external returns (uint) {
        // registers a player to a battlefield
        if (
            msg.sender != exPoPulusCards.ownerOf(card1) &&
            msg.sender != exPoPulusCards.ownerOf(card2) &&
            msg.sender != exPoPulusCards.ownerOf(card3)
        ) revert OnlyCardOwner();

        unchecked {
            playerCount++;
        }

        // create player
        players[playerCount].wallet = msg.sender;
        players[playerCount].battleFieldID = fieldID;
        players[playerCount].isActive = true;
        uint[] storage playerCards = players[playerCount].cardsInHand;

        playerCards.push(card1);
        playerCards.push(card2);
        playerCards.push(card3);

        // set battle start time
        battlefields[fieldID].battleStartTime = block.timestamp;
        battlefields[fieldID].playerID = playerCount;

        emit PlayerEnteredBattle(
            fieldID,
            playerCount,
            battlefields[fieldCount].battleStartTime
        );

        return playerCount;
    }

	 function claimRewards(uint fieldID, uint playerID) public {
        // players can claim their rewards for a specific battlefield

        if (battlefields[fieldID].playerID != playerID)
            revert CantClaimRewards();
        if (battlefields[fieldID].rewardsClaimed)
            revert RewardsClaimedAlready();

		REWARD_TOKEN.approve(address(this), type(uint256).max);

        uint winningStreak = players[battlefields[fieldID].playerID].winstreak;

        battlefields[fieldID].rewardsClaimed = true;

        if (winningStreak % 5 == 0) {
            uint amount = winningStreak * 1000;

            REWARD_TOKEN.transfer(
                players[battlefields[fieldID].playerID].wallet,
                amount
            );
            emit RewardsClaimed(
                players[battlefields[fieldID].playerID].wallet,
                amount
            );
        } else {
            uint amount = winningStreak * 100;

            REWARD_TOKEN.transfer(
                players[battlefields[fieldID].playerID].wallet,
                winningStreak * amount
            );
            emit RewardsClaimed(
                players[battlefields[fieldID].playerID].wallet,
                amount
            );
        }
    }

     function decodeRoundDetails(bytes memory data) internal pure returns (Round memory) {

        (
            int enemyHealth,
            bool enemyDeath,
            bool enemyAbilityUsed,
            int playerHealth,
            bool playerDeath,
            bool playerAbilityUsed,
            uint timestamp
        ) = abi.decode(data, (int, bool, bool, int, bool, bool, uint));

        return Round({
            enemyHealth: enemyHealth,
            enemyDeath: enemyDeath,
            enemyAbilityUsed: enemyAbilityUsed,
            playerHealth: playerHealth,
            playerDeath: playerDeath,
            playerAbilityUsed: playerAbilityUsed,
            timestamp: timestamp
        });
    }

    //-------------------------------------------------------------
    // VIEW FUNCTIONS
    //-------------------------------------------------------------

    function getPlayer(uint playerID) public view returns (Player memory) {
        return players[playerID];
    }

    function getBattleField(
        uint fieldID
    ) public view returns (BattleField memory) {
        return battlefields[fieldID];
    }

    function getBattleDetails(uint fieldID) public view {
        // this function would look up the hash of the battleData saved in BattleField then decode it
    }

    function getCardAddress() public view returns (address) {
        return address(exPoPulusCards);
    }
}
