import { useContractCall, useEthers } from "@usedapp/core"
import KnowledgeFarm from "../chain-info/KnowledgeFarm.json"
import { utils, BigNumber, constants } from "ethers"
import networkMapping from "../chain-info/map.json"

/**
 * Get the staking balance of a certain token by the user in our KnowledgeFarm contract
 * @param address - The contract address of the token
 */
export const useStakingBalance = (address: string): BigNumber | undefined => {
  const { account, chainId } = useEthers()

  const { abi } = KnowledgeFarm
  const KnowledgeFarmContractAddress = chainId ? networkMapping[String(chainId)]["KnowledgeFarm"][0] : constants.AddressZero

  const KnowledgeFarmInterface = new utils.Interface(abi)

  const [stakingBalance] =
    useContractCall({
      abi: KnowledgeFarmInterface,
      address: KnowledgeFarmContractAddress,
      method: "stakingBalance",
      args: [address, account],
    }) ?? []

  return stakingBalance
}
