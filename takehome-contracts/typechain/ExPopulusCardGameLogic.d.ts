/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ExPopulusCardGameLogicInterface extends ethers.utils.Interface {
  functions: {
    "REWARD_TOKEN()": FunctionFragment;
    "battle(uint256,uint256,uint256,uint256)": FunctionFragment;
    "claimRewards(uint256,uint256)": FunctionFragment;
    "createBattlefield(uint256)": FunctionFragment;
    "enterBattle(uint256,uint256,uint256,uint256)": FunctionFragment;
    "generateEnemyCards(uint256,uint256,uint256,uint256)": FunctionFragment;
    "getBattleDetails(uint256)": FunctionFragment;
    "getBattleField(uint256)": FunctionFragment;
    "getCardAddress()": FunctionFragment;
    "getPlayer(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "REWARD_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "battle",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimRewards",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createBattlefield",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "enterBattle",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "generateEnemyCards",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBattleDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBattleField",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCardAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlayer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "REWARD_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "battle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createBattlefield",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enterBattle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "generateEnemyCards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBattleDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBattleField",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCardAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPlayer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "BattleFieldCreated(uint256)": EventFragment;
    "EnemyCardsGenerated(uint256,uint256,uint256,uint256)": EventFragment;
    "EnteredBattle(uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PlayerEnteredBattle(uint256,uint256,uint256)": EventFragment;
    "RewardsClaimed(address,uint256)": EventFragment;
    "RoundFinished(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BattleFieldCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnemyCardsGenerated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EnteredBattle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PlayerEnteredBattle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardsClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoundFinished"): EventFragment;
}

export type BattleFieldCreatedEvent = TypedEvent<
  [BigNumber] & { fieldID: BigNumber }
>;

export type EnemyCardsGeneratedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber] & {
    card1: BigNumber;
    card2: BigNumber;
    card3: BigNumber;
    fieldID: BigNumber;
  }
>;

export type EnteredBattleEvent = TypedEvent<
  [BigNumber, BigNumber] & { fieldID: BigNumber; playerID: BigNumber }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type PlayerEnteredBattleEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber] & {
    fieldID: BigNumber;
    playerID: BigNumber;
    startTime: BigNumber;
  }
>;

export type RewardsClaimedEvent = TypedEvent<
  [string, BigNumber] & { player: string; amount: BigNumber }
>;

export type RoundFinishedEvent = TypedEvent<
  [BigNumber, BigNumber] & { fieldID: BigNumber; timestamp: BigNumber }
>;

export class ExPopulusCardGameLogic extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ExPopulusCardGameLogicInterface;

  functions: {
    REWARD_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    battle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimRewards(
      fieldID: BigNumberish,
      playerID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createBattlefield(
      playerID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    enterBattle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    generateEnemyCards(
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      fieldID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBattleDetails(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[void]>;

    getBattleField(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber[],
          string[],
          number,
          number,
          boolean
        ] & {
          playerID: BigNumber;
          battleStartTime: BigNumber;
          battleEndTime: BigNumber;
          enemyCards: BigNumber[];
          roundDetails: string[];
          status: number;
          result: number;
          rewardsClaimed: boolean;
        }
      ]
    >;

    getCardAddress(overrides?: CallOverrides): Promise<[string]>;

    getPlayer(
      playerID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [string, BigNumber, boolean, BigNumber[], BigNumber, BigNumber] & {
          wallet: string;
          battleFieldID: BigNumber;
          isActive: boolean;
          cardsInHand: BigNumber[];
          winstreak: BigNumber;
          rewardsEarned: BigNumber;
        }
      ]
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  REWARD_TOKEN(overrides?: CallOverrides): Promise<string>;

  battle(
    fieldID: BigNumberish,
    card1: BigNumberish,
    card2: BigNumberish,
    card3: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimRewards(
    fieldID: BigNumberish,
    playerID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createBattlefield(
    playerID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  enterBattle(
    fieldID: BigNumberish,
    card1: BigNumberish,
    card2: BigNumberish,
    card3: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  generateEnemyCards(
    card1: BigNumberish,
    card2: BigNumberish,
    card3: BigNumberish,
    fieldID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBattleDetails(
    fieldID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<void>;

  getBattleField(
    fieldID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber[],
      string[],
      number,
      number,
      boolean
    ] & {
      playerID: BigNumber;
      battleStartTime: BigNumber;
      battleEndTime: BigNumber;
      enemyCards: BigNumber[];
      roundDetails: string[];
      status: number;
      result: number;
      rewardsClaimed: boolean;
    }
  >;

  getCardAddress(overrides?: CallOverrides): Promise<string>;

  getPlayer(
    playerID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, boolean, BigNumber[], BigNumber, BigNumber] & {
      wallet: string;
      battleFieldID: BigNumber;
      isActive: boolean;
      cardsInHand: BigNumber[];
      winstreak: BigNumber;
      rewardsEarned: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    REWARD_TOKEN(overrides?: CallOverrides): Promise<string>;

    battle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    claimRewards(
      fieldID: BigNumberish,
      playerID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createBattlefield(
      playerID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    enterBattle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    generateEnemyCards(
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getBattleDetails(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getBattleField(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber[],
        string[],
        number,
        number,
        boolean
      ] & {
        playerID: BigNumber;
        battleStartTime: BigNumber;
        battleEndTime: BigNumber;
        enemyCards: BigNumber[];
        roundDetails: string[];
        status: number;
        result: number;
        rewardsClaimed: boolean;
      }
    >;

    getCardAddress(overrides?: CallOverrides): Promise<string>;

    getPlayer(
      playerID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, boolean, BigNumber[], BigNumber, BigNumber] & {
        wallet: string;
        battleFieldID: BigNumber;
        isActive: boolean;
        cardsInHand: BigNumber[];
        winstreak: BigNumber;
        rewardsEarned: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BattleFieldCreated(uint256)"(
      fieldID?: null
    ): TypedEventFilter<[BigNumber], { fieldID: BigNumber }>;

    BattleFieldCreated(
      fieldID?: null
    ): TypedEventFilter<[BigNumber], { fieldID: BigNumber }>;

    "EnemyCardsGenerated(uint256,uint256,uint256,uint256)"(
      card1?: null,
      card2?: null,
      card3?: null,
      fieldID?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        card1: BigNumber;
        card2: BigNumber;
        card3: BigNumber;
        fieldID: BigNumber;
      }
    >;

    EnemyCardsGenerated(
      card1?: null,
      card2?: null,
      card3?: null,
      fieldID?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        card1: BigNumber;
        card2: BigNumber;
        card3: BigNumber;
        fieldID: BigNumber;
      }
    >;

    "EnteredBattle(uint256,uint256)"(
      fieldID?: null,
      playerID?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { fieldID: BigNumber; playerID: BigNumber }
    >;

    EnteredBattle(
      fieldID?: null,
      playerID?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { fieldID: BigNumber; playerID: BigNumber }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "PlayerEnteredBattle(uint256,uint256,uint256)"(
      fieldID?: null,
      playerID?: null,
      startTime?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber],
      { fieldID: BigNumber; playerID: BigNumber; startTime: BigNumber }
    >;

    PlayerEnteredBattle(
      fieldID?: null,
      playerID?: null,
      startTime?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber],
      { fieldID: BigNumber; playerID: BigNumber; startTime: BigNumber }
    >;

    "RewardsClaimed(address,uint256)"(
      player?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { player: string; amount: BigNumber }
    >;

    RewardsClaimed(
      player?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { player: string; amount: BigNumber }
    >;

    "RoundFinished(uint256,uint256)"(
      fieldID?: null,
      timestamp?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { fieldID: BigNumber; timestamp: BigNumber }
    >;

    RoundFinished(
      fieldID?: null,
      timestamp?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { fieldID: BigNumber; timestamp: BigNumber }
    >;
  };

  estimateGas: {
    REWARD_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    battle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimRewards(
      fieldID: BigNumberish,
      playerID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createBattlefield(
      playerID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    enterBattle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    generateEnemyCards(
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      fieldID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBattleDetails(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBattleField(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCardAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayer(
      playerID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    REWARD_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    battle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimRewards(
      fieldID: BigNumberish,
      playerID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createBattlefield(
      playerID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    enterBattle(
      fieldID: BigNumberish,
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    generateEnemyCards(
      card1: BigNumberish,
      card2: BigNumberish,
      card3: BigNumberish,
      fieldID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBattleDetails(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBattleField(
      fieldID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCardAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPlayer(
      playerID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
