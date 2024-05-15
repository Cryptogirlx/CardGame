// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ExPopulusCards is ERC721 {
    //-------------------------------------------------------------
    // STORAGE
    //-------------------------------------------------------------

    address public deployer;
    address public gameLogicAddress;
    uint public cardCount;
    uint public abilityCount;

    struct CharacterCard {
        int8 attack;
        int8 health;
        uint abilityID;
    }

    struct Ability {
        uint8 priority;
        specialPower power;
        bool abilityUsed;
    }

    enum specialPower {
        Shield,
        Freeze,
        Roulette
    }

    // card id => CharacterCard struct
    mapping(uint => CharacterCard) cards;

    // ability id => Ability struct
    mapping(uint => Ability) abilities;

    // address => if an address is whitelisted to access
    mapping(address => bool) accessWhitelist;

    //token id => if a card is being used on the battlefield
    mapping(uint => bool) isInGamePlay;

    //------------------------------------------------------------
    // CUSTOM ERRORS
    //------------------------------------------------------------

    error OnlyWhitelistedAddress();
    error InvalidValue();
    error CardIsInBattle();
    error OnlyGameLogic();

    //------------------------------------------------------------
    // EVENTS
    //------------------------------------------------------------

    event CardIsInGame(uint tokenID, bool status);
    event CardMinted(
        int8 _health,
        int8 _attack,
        uint _ability,
        address to,
        uint tokenID
    );
    event AddressWhitelisted(address _address);

    //-------------------------------------------------------------
    // CONSTRUCTOR
    //-------------------------------------------------------------

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        deployer = msg.sender;
    }

    //------------------------------------------------------------
    // MODIFIERS
    //------------------------------------------------------------

    modifier onlyWhitelistedAddress() {
        if (msg.sender == deployer && accessWhitelist[msg.sender])
            revert OnlyWhitelistedAddress();
        _;
    }

    modifier onlyGameLogic() {
        if (msg.sender == gameLogicAddress) revert OnlyGameLogic();
        _;
    }

    //------------------------------------------------------------
    // STATE-MODIFYING FUNCTIONS
    //------------------------------------------------------------

    function setGameLogicAdress(
        address _gameLogicAddress
    ) external onlyWhitelistedAddress {
        gameLogicAddress = _gameLogicAddress;
    }

    function mintCard(
        int8 _health,
        int8 _attack,
        address to,
        uint tokenID,
        specialPower _power,
        uint8 _priority
    ) external onlyWhitelistedAddress returns (uint) {
        // TODO - cant mint with negative health and attack

        cardCount = tokenID;

        cards[cardCount].attack = _attack;
        cards[cardCount].health = _health;

        uint abilityID = defineAbilities(tokenID, _power, _priority);

        cards[cardCount].abilityID = abilityID;

        _mint(to, tokenID);

        emit CardMinted(_health, _attack, abilityID, to, tokenID);

        return cardCount;
    }

    function defineAbilities(
        uint tokenID,
        specialPower _power,
        uint8 _priority
    ) public onlyWhitelistedAddress returns (uint) {
        // TODO can't define ablility on a non-existent token

        unchecked {
            abilityCount++;
        }

        if (_power == specialPower.Shield) {
            abilities[abilityCount].power = specialPower.Shield;
            abilities[abilityCount].priority = _priority;
        }

        if (_power == specialPower.Freeze) {
            abilities[abilityCount].power = specialPower.Freeze;
            abilities[abilityCount].priority = _priority;
        }

        if (_power == specialPower.Freeze) {
            abilities[abilityCount].power = specialPower.Roulette;
            abilities[abilityCount].priority = _priority;
        }

        cards[tokenID].abilityID = abilityCount;

        return abilityCount;
    }

    function cardInGamePlay(uint tokenID, bool status) external onlyGameLogic {
        isInGamePlay[tokenID] = status;

        emit CardIsInGame(tokenID, status);
    }

    function addOrRemoveFromWhiteList(
        address _address,
        bool status
    ) external onlyWhitelistedAddress {
        accessWhitelist[_address] = status;

        emit AddressWhitelisted(_address);
    }

    // *** OVERRIDES *** //

    function transferFrom(
        address from,
        address to,
        uint256 tokenID
    ) public virtual override {
        if (isInGamePlay[tokenID]) revert CardIsInBattle();
        if (to == address(0)) {
            revert ERC721InvalidReceiver(address(0));
        }
        // Setting an "auth" arguments enables the `_isAuthorized` check which verifies that the token exists
        // (from != 0). Therefore, it is not needed to verify that the return value is not 0 here.
        address previousOwner = _update(to, tokenID, _msgSender());
        if (previousOwner != from) {
            revert ERC721IncorrectOwner(from, tokenID, previousOwner);
        }
    }

    //------------------------------------------------------------
    // VIEW FUNCTIONS
    //------------------------------------------------------------

    function getCharacterCard(
        uint cardID
    ) public view returns (CharacterCard memory) {
        return cards[cardID];
    }

    function getAbility(uint abilityID) public view returns (Ability memory) {
        return abilities[abilityID];
    }

    function getAbilityID(uint tokenID) public view returns (uint) {
        return cards[tokenID].abilityID;
    }

    function getHealth(uint tokenID) public view returns (int) {
        return cards[tokenID].health;
    }

    function getAttack(uint tokenID) public view returns (int) {
        return cards[tokenID].attack;
    }

    function isInGame(uint tokenID) public view returns (bool) {
        return isInGamePlay[tokenID];
    }

    function getPriority(uint abilityID) public view returns (uint) {
        return abilities[abilityID].priority;
    }
}
