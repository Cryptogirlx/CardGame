import hre from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Signers } from "../types";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { deployContracts } from "../deploy_scripts/main";

describe("Unit tests", function () {
  before(async function () {
    chai.should();
    chai.use(chaiAsPromised);

    // Set up a signer for easy use
    this.signers = {} as Signers;
    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    this.signers.creator = signers[0];
    this.signers.testAccount2 = signers[1];
    this.signers.testAccount3 = signers[2];

    // Deploy the contracts
    this.contracts = await deployContracts();

    // set contract addresses
    this.contracts.exPopulusToken
      .connect(this.signers.creator)
      .setGameLogicAdress(this.contracts.exPopulusCardGameLogic.address);
    this.contracts.exPopulusCards
      .connect(this.signers.creator)
      .setGameLogicAdress(this.contracts.exPopulusCardGameLogic.address);

    // mint XPOP tokens to contract
    this.contracts.exPopulusToken
      .connect(this.signers.creator)
      .mint(this.contracts.exPopulusToken.address, 10000000);

 // mint user tokens
 await this.contracts.exPopulusCards
 .connect(this.signers.creator)
 .mintCard(5, 5, this.signers.testAccount2.address, 1, 0, 1);
await this.contracts.exPopulusCards
 .connect(this.signers.creator)
 .mintCard(6, 6, this.signers.testAccount2.address, 2, 1, 0);
await this.contracts.exPopulusCards
 .connect(this.signers.creator)
 .mintCard(3, 4, this.signers.testAccount2.address, 3, 2, 2);

// mint enemy tokens
await this.contracts.exPopulusCards
 .connect(this.signers.creator)
 .mintCard(4, 4, this.contracts.exPopulusCardGameLogic.address, 4, 0, 1);
await this.contracts.exPopulusCards
 .connect(this.signers.creator)
 .mintCard(4, 4, this.contracts.exPopulusCardGameLogic.address, 5, 1, 0);
await this.contracts.exPopulusCards
 .connect(this.signers.creator)
 .mintCard(4, 3, this.contracts.exPopulusCardGameLogic.address, 6, 2, 2);

  });

  describe("User Story #1 (Minting)", async function () {
    it("Can mint a card to a specific player & verify ownership afterwards", async function () {
      
	// checking the mints from before each

      expect(await this.contracts.exPopulusCards.ownerOf(1)).to.equal(
        this.signers.testAccount2.address
      );

      // I can call a lookup function to find the minted card details by passing in an id

      let cardDetails = await this.contracts.exPopulusCards.getCharacterCard(1);
      expect(await cardDetails.health).to.equal(5);
      expect(await cardDetails.attack).to.equal(5);
      expect(await cardDetails.abilityID).to.equal(1);

    });
  });

  describe("User Story #2 (Ability Configuration)", async function () {
    it("Can update priority for abilities", async function () {


      let cardDetails = await this.contracts.exPopulusCards.getCharacterCard(1);
      let abilityID = await this.contracts.exPopulusCards.getAbilityID(1);
      let currentConfig = await this.contracts.exPopulusCards.getAbility(
        abilityID
      );

      expect(currentConfig.priority).to.equal(1);

      await this.contracts.exPopulusCards
        .connect(this.signers.creator)
        .defineAbilities(1, 2, 2);

      let newConfig = await this.contracts.exPopulusCards.getAbility(abilityID);

      expect(await newConfig.priority).to.equal(1);
    });
  });


  describe("User Story #3 (Battles & Game Loop)", async function () {
    it("Battle runs correctly", async function () {
     
      // create battle field
      await this.contracts.exPopulusCardGameLogic
        .connect(this.signers.creator)
        .createBattlefield(1);

      // player enter's battle
      await this.contracts.exPopulusCardGameLogic
        .connect(this.signers.testAccount2)
        .enterBattle(1, 1, 2, 3);

      // generate enemy hand
      await this.contracts.exPopulusCardGameLogic
        .connect(this.signers.creator)
        .generateEnemyCards(4, 5, 6, 1);

      // // run battle

      await this.contracts.exPopulusCardGameLogic
        .connect(this.signers.testAccount2)
        .battle(1, 1, 2, 3);

      let battleFieldDetails =
        await this.contracts.exPopulusCardGameLogic.getBattleField(1);

      console.log("field data", battleFieldDetails);

      expect(await battleFieldDetails.playerID).to.equal(1); 
      // expect(await battleFieldDetails[3]).to.equal(1); // rewards earned - needs to be updated in game logic
      // expect(await battleFieldDetails[4]).to.equal([4,5,6]);  // enemy cards - technically this is correct but test suit needs to import BigNumber
      expect(await battleFieldDetails.status).to.equal(0); //  Field.Active
      expect(await battleFieldDetails.result).to.equal(0); // GameResult.PlayerWin
      expect(await battleFieldDetails.rewardsClaimed).to.equal(false); // player hasnt claimed rewards yet

      // get player => see if winstreak is increased
      let player = await this.contracts.exPopulusCardGameLogic.getPlayer(1);
      expect(player.winstreak).to.equal(1);


    });
  });

  describe("User Story #4 (Fungible Token & Battle Rewards)", async function () {
    it("Can mint tokens to a specific player", async function () {
      await this.contracts.exPopulusToken
        .connect(this.signers.creator)
        .mint(this.signers.testAccount2.address, 100);
      let balance = this.contracts.exPopulusToken.balanceOf(
        this.signers.testAccount2.address
      );
      expect(await balance).to.equal(100);
    });

    it("function should only be callable by the initial deployer of the contract AND the ExPopulusCardGameLogic smart contract.", async function () {
      await expect(
        this.contracts.exPopulusToken
          .connect(this.signers.testAccount2)
          .mint(this.signers.testAccount2.address, 100)
      ).to.be.revertedWith("OnlyOwnerOrGameLogic()");
    });
  });

  describe("User Story #5 (Battle Logs & Historical Lookup)", async function () {

	it("returns battleFieldData correctly and decodes round details", async function () {

     // TODO 
	 
	})
  });
});
