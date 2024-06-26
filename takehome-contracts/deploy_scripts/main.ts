import "../hardhat.config";
import {ethers} from "hardhat";
import {ExPopulusCardGameLogic, ExPopulusCards, ExPopulusToken} from "../typechain";

export interface IDeployContractsOutput {
	exPopulusToken: ExPopulusToken;
	exPopulusCards: ExPopulusCards;
	exPopulusCardGameLogic: ExPopulusCardGameLogic;
}

export async function deployContracts(): Promise<IDeployContractsOutput> {

	const creator = (await ethers.getSigners())[0];

	const exPopulusTokenContract = await ethers.deployContract("ExPopulusToken",["ExPopToken","XPOP",creator.address], creator);
	await exPopulusTokenContract.deployed();

	const exPopulusCardsContract = await ethers.deployContract("ExPopulusCards",["ExPopCard","CARD"], creator);
	await exPopulusCardsContract.deployed();

	const exPopulusCardGameLogicContract = await ethers.deployContract("ExPopulusCardGameLogic",[exPopulusTokenContract.address,exPopulusCardsContract.address,creator.address],creator);
	await exPopulusCardGameLogicContract.deployed();

	return {
		exPopulusToken: exPopulusTokenContract as ExPopulusToken,
		exPopulusCards: exPopulusCardsContract as ExPopulusCards,
		exPopulusCardGameLogic: exPopulusCardGameLogicContract as ExPopulusCardGameLogic,
	};
}
