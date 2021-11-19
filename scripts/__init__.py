from scripts.deploy import deploy_farm, create_Asset
from scripts.helpful_scripts import (
    get_account,
    get_contract,
    fund_with_link,
)
from brownie import Asset, network, config
from web3 import Web3


def main():
    # deploy_token_farm_and_dapp_token(update_front_end_flag=True)
    (token_farm, fund, asset) = deploy_farm(False)
    create_Asset(
        "test",
        get_account(),
    )
