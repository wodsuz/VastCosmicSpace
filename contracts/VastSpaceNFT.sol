    // SPDX-License-Identifier: MIT
    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "@openzeppelin/contracts/utils/math/SafeMath.sol";
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
    
    pragma solidity ^0.8.4;
    pragma abicoder v2;
    
    contract VastSpacePlanets is ERC721, Ownable, ERC721Enumerable {
      using SafeMath for uint256;
      using Strings for uint256;
    
      uint256 public constant tokenPrice = 0.001 ether ; // 0.001 ETH 
      uint256 public constant setalite_price = 0.0005 ether; // 0.0005 
      uint256 public constant maxTokenPurchase = 100;
      uint256 public constant MAX_TOKENS = 1000000;
    
      string public baseURI = ""; // IPFS URI WILL BE SET AFTER ALL TOKENS SOLD OUT
      // uint256[3] public memory BaseURI_array = []
    
      bool public saleIsActive = false;
      bool public presaleIsActive = false;
      bool public isRevealed = false;
    
      mapping(address => bool) private _presaleList;
      mapping(address => uint256) private _presaleListClaimed;
      uint public iden = 0;
    
      uint256 public presaleMaxMint = 100;
      uint256 public devReserve = 64;
    
      event EmojiMinted(uint256 tokenId, address owner);
    
      constructor() ERC721("VastSpacePlanets", "VSP") {}
    
      function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
      }
    
      function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
      }
    
      function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{ value: address(this).balance }("");
        require(os);
      }
    
      function reveal() public onlyOwner {
        isRevealed = true;
      }
    
      function reserveTokens(address _to, uint256 _reserveAmount)
        external
        onlyOwner
            {
                require(
                _reserveAmount > 0 && _reserveAmount <= devReserve,
                "Not enough reserve left for team"
                );
                for (uint256 i = 0; i < _reserveAmount; i++) {
                uint256 id = totalSupply();
                _safeMint(_to, id);
                }
                devReserve = devReserve.sub(_reserveAmount);
            }
    
      function toggleSaleState() external onlyOwner {
        saleIsActive = !saleIsActive;
      }
    
      function togglePresaleState() external onlyOwner {
        presaleIsActive = !presaleIsActive;
      }
    
      function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
      {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
          // Return an empty array
          return new uint256[](0);
        } else {
          uint256[] memory result = new uint256[](tokenCount);
          uint256 index;
          for (index = 0; index < tokenCount; index++) {
            result[index] = tokenOfOwnerByIndex(_owner, index);
          }
          return result;
        }
      }
    
      function mintPlanet(uint256 numberOfTokens,uint256 identifier ) external payable {
        require(identifier>0, "Must choose one of the 3 planets to mint");
        require(saleIsActive, "Sale must be active to mint Token");
        require(
          numberOfTokens > 0 && numberOfTokens <= maxTokenPurchase,
          "Can only mint one or more tokens at a time"
        );
        require(
          totalSupply().add(numberOfTokens) <= MAX_TOKENS,
          "Purchase would exceed max supply of tokens"
        );
        require(
          msg.value >= tokenPrice.mul(numberOfTokens),
          "Ether value sent is not correct"
        );
        if (identifier<2)  iden = 1;
        else if (identifier<3)  iden = 9;
        else if (identifier<4)  iden = 11;
        else require(identifier>3,"You must choose one of the first 3 planets ");

        for (uint256 i = 0; i < numberOfTokens; i++) {
          uint256 id = totalSupply().add(1);
          if (totalSupply() < MAX_TOKENS) {
            _safeMint(msg.sender, id);
            emit EmojiMinted(id, msg.sender);
          }
        }
      }
      function createSetalite(uint256 identifier) external payable {
          // check if user has at leats one item - false escape
          // check if at least one is planet
          // check if user paid enough amount 
          // Add new setalite on user NFTS
          // Remove planet from users NFTS
        require(identifier>0, "Must choose one of the 3 planets to create setalitte ");
        require(saleIsActive, "Sale must be active to create setalite Token");
        if (identifier<2)  iden = 22;
        else if (identifier<3)  iden = 25;
        else if (identifier<4)  iden = 26;
        else require(identifier>3,"You must choose one of the 3 planets ");
        uint256 id = totalSupply().add(1);
        if (totalSupply() < MAX_TOKENS) {
            _safeMint(msg.sender, id);
            emit EmojiMinted(id, msg.sender);
        }
      }
    
      function presaleEmoji(uint256 numberOfTokens) external payable {
        require(presaleIsActive, "Presale is not active");
        require(_presaleList[msg.sender], "You are not on the Presale List");
        require(
          totalSupply().add(numberOfTokens) <= MAX_TOKENS,
          "Purchase would exceed max supply of token"
        );
        require(
          numberOfTokens > 0 && numberOfTokens <= presaleMaxMint,
          "Cannot purchase this many tokens"
        );
        require(
          _presaleListClaimed[msg.sender].add(numberOfTokens) <= presaleMaxMint,
          "Purchase exceeds max allowed"
        );
        require(
          msg.value >= tokenPrice.mul(numberOfTokens),
          "Ether value sent is not correct"
        );
    
        for (uint256 i = 0; i < numberOfTokens; i++) {
          uint256 id = totalSupply().add(1);
          if (totalSupply() < MAX_TOKENS) {
            _presaleListClaimed[msg.sender] += 1;
            _safeMint(msg.sender, id);
            emit EmojiMinted(id, msg.sender);
          }
        }
      }
    
      function addToPresaleList(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
          require(addresses[i] != address(0), "Can't add the null address");
    
          _presaleList[addresses[i]] = true;
        }
      }
    
      function removeFromPresaleList(address[] calldata addresses)
        external
        onlyOwner
        {
          for (uint256 i = 0; i < addresses.length; i++) {
            require(addresses[i] != address(0), "Can't add the null address");
      
            _presaleList[addresses[i]] = false;
          }
        }
    
      function setPresaleMaxMint(uint256 maxMint) external onlyOwner {
        presaleMaxMint = maxMint;
      }
    
      function onPreSaleList(address addr) external view returns (bool) {
        return _presaleList[addr];
      }
    
      function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
          {
            require(
              _exists(tokenId),
              "ERC721Metadata: URI query for nonexistent token"
            );
        
            string memory currentBaseURI = _baseURI();
        
            if (isRevealed == false) {
              return
                " ://QmYGAp3Gz1m5UmFhV4PVRRPYE3HL1AmCwEKFPxng498vfb/hidden.json";
            }
    
        return
          bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, iden.toString() , ".json"))
            // ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
            : "";
            
      }
    
      function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
      ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
      }
    
      function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
      {
        return super.supportsInterface(interfaceId);
      }
    }
