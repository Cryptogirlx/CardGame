// function battle(uint fieldID, uint card1, uint card2, uint card3) external {
//         uint playerID = _enterBattle(fieldID, card1, card2, card3);
//         if (battlefields[fieldID].status != FieldStatus.Active)
//             revert InactiveOrPausedBattleField();
//         uint[] memory enemyCards = battlefields[fieldID].enemyCards;
//         if (enemyCards.length < 3) revert NotEnoughEnemyCards();

//         uint[] memory playerCards = players[playerID].cardsInHand;

//         uint playerAbility;
//         int playerAttack;
//         int playerHealth;

//         uint enemyAbility;
//         int enemyAttack;
//         int enemyHealth;

//         unchecked {
//             roundCount++;
//         }

//        for (uint i = 0; i < 3; i++) {
//             for (uint i = 0; i < playerCards.length; i++) {
//                 playerAbility = exPoPulusCards.getAbilityID(playerCards[i]);
//                 playerAttack = exPoPulusCards.getAttack(playerCards[i]);
//                 playerHealth = exPoPulusCards.getHealth(playerCards[i]);
//             }

//             for (uint i = 0; i < enemyCards.length; i++) {
//                 enemyAbility = exPoPulusCards.getAbilityID(enemyCards[i]);
//                 enemyAttack = exPoPulusCards.getAttack(enemyCards[i]);
//                 enemyHealth = exPoPulusCards.getHealth(enemyCards[i]);
//             }

//             if (enemyAttack[i] > playerHealth[i]) {
//                 rounds[roundCount].playerHealth = playerHealth - enemyAttack;

//                 if (rounds[roundCount].playerHealth <= 0) {
//                     rounds[roundCount].playerDeath = true;
//                     battlefields[fieldID].result = GameResult.EnemyWin;
// 					battlefields[fieldID].battleEndTime = block.timestamp;
// 					players[playerID].winstreak = 0;
//                     break;
//                 }
//             }

//             if (playerAttack > enemyHealth) {
//                 rounds[roundCount].playerHealth = enemyHealth - playerAttack;

//                 if (rounds[roundCount].enemyHealth <= 0) {
//                     rounds[roundCount].enemyDeath = true;
//                     battlefields[fieldID].result = GameResult.PlayerWin;
// 					players[playerID].winstreak += 1;
//                     break;
//                 }
//             }

//             if (playerCards.length == 0 && enemyCards.length == 0) {
//                 battlefields[fieldID].result = GameResult.Draw;
//                 break;
//             }
//             // // persist battle details

//             Round memory newRound = Round(
//                 rounds[roundCount].enemyHealth,
//                 rounds[roundCount].enemyDeath,
//                 rounds[roundCount].playerHealth,
//                 rounds[roundCount].playerDeath,
//                 block.timestamp
//             );

//             bytes32 battleDetails = keccak256(abi.encode(roundCount, newRound));

//             battlefields[fieldID].roundDetails.push(battleDetails);

//             emit RoundFinished(fieldID, block.timestamp);

// 			// delete cards after round so they can't be reused

//             for (uint i = 0; i < playerCards.length; i++) {
//                 delete playerCards[playerCards.length - 1];
//             }

//             for (uint i = 0; i < 3; i++) {
//                 delete enemyCards[enemyCards.length - 1];
//             }
//         }
//     }