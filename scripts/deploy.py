from brownie import Fund, KnowledgeFarm, network, config, Asset
from scripts.helpful_scripts import get_account, get_contract, fund_with_link
import shutil
import os
import yaml
import json
from web3 import Web3

KEPT_BALANCE = Web3.toWei(100, "ether")

sample_token_uri = "https://ipfs.io/ipfs/{}?filename={}.json"
OPENSEA_URL = "https://testnets.opensea.io/assets/{}/{}"


def deploy_farm(update_front_end_flag=False):
    account = get_account()
    fund = Fund.deploy(1000000000000000000, {"from": account})

    # We want to be able to use the deployed contracts if we are on a testnet
    # Otherwise, we want to deploy some mocks and use those
    # Rinkeby
    asset = Asset.deploy(
        {"from": account},
    )
    # fund_with_link(asset.address)

    knowledge_farm = KnowledgeFarm.deploy(
        fund.address,
        asset.address,
        {"from": account},
        # publish_source=config["networks"][network.show_active()]["verify"],
    )
    # tx = fund.transfer(        knowledge_farm.address,        fund.totalSupply() - KEPT_BALANCE,        {"from": account},    )
    # tx.wait(1)
    # addTokens(fund, knowledge_farm, account)
    if update_front_end_flag:
        update_front_end()

    return knowledge_farm, fund, asset


def addTokens(fund, knowledge_farm, account):
    fau_token = get_contract("fau_token")
    weth_token = get_contract("weth_token")

    add_allowed_tokens(
        knowledge_farm,
        {
            fund: get_contract("dai_usd_price_feed"),
            fau_token: get_contract("dai_usd_price_feed"),
            weth_token: get_contract("eth_usd_price_feed"),
        },
        account,
    )


def create_Asset(name, account):
    asset = Asset[-1]
    kf = KnowledgeFarm[-1]
    asset_uri = sample_token_uri.format(
        asset.address, (name + str(asset.tokenCounter() - 1))
    )
    # creating_tx = kf.mintAsset(asset_uri, {"from": account})
    creating_tx = kf.mintAsset(asset_uri, {"from": account})
    creating_tx.wait(1)

    print(
        f"Awesome, you can view your NFT at {OPENSEA_URL.format(asset.address, asset.tokenCounter() - 1)}"
    )

    print("New token has been created!")

    return asset, creating_tx


def add_allowed_tokens(knowledge_farm, dict_of_allowed_token, account):
    for token in dict_of_allowed_token:
        knowledge_farm.addAllowedTokens(token.address, {"from": account})
        tx = knowledge_farm.setPriceFeedContract(
            token.address, dict_of_allowed_token[token], {"from": account}
        )
        tx.wait(1)
    return knowledge_farm


def update_front_end():
    print("Updating front end...")
    # The Build
    copy_folders_to_front_end("./build/contracts", "./front_end/src/chain-info")

    # The Contracts
    copy_folders_to_front_end("./contracts", "./front_end/src/contracts")

    # The ERC20
    copy_files_to_front_end(
        "./build/contracts/dependencies/OpenZeppelin/openzeppelin-contracts@4.3.2/ERC20.json",
        "./front_end/src/chain-info/ERC20.json",
    )
    # The ERC721
    copy_files_to_front_end(
        "./build/contracts/dependencies/OpenZeppelin/openzeppelin-contracts@4.3.2/ERC721.json",
        "./front_end/src/chain-info/ERC721.json",
    )
    # The ERC777
    copy_files_to_front_end(
        "./build/contracts/dependencies/OpenZeppelin/openzeppelin-contracts@4.3.2/ERC777.json",
        "./front_end/src/chain-info/ERC777.json",
    )
    # The ERC1155
    copy_files_to_front_end(
        "./build/contracts/dependencies/OpenZeppelin/openzeppelin-contracts@4.3.2/ERC1155.json",
        "./front_end/src/chain-info/ERC1155.json",
    )
    # The Map
    copy_files_to_front_end(
        "./build/deployments/map.json",
        "./front_end/src/chain-info/map.json",
    )

    # The Config, converted from YAML to JSON
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open(
            "./front_end/src/brownie-config-json.json", "w"
        ) as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")


def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def copy_files_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copyfile(src, dest)


def main():
    deploy_farm(update_front_end_flag=True)
