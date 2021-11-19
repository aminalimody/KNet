import { useContractFunction, useEthers } from "@usedapp/core"
import KnowledgeFarm from "../chain-info/KnowledgeFarm.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/map.json"

/**
 * Expose { send, state } object to facilitate unstaking the user's tokens from the KnowledgeFarm contract
 */
export const useUnstakeTokens = () => {
  const { chainId } = useEthers()

  const { abi } = KnowledgeFarm
  const KnowledgeFarmContractAddress = chainId ? networkMapping[String(chainId)]["KnowledgeFarm"][0] : constants.AddressZero

  const KnowledgeFarmInterface = new utils.Interface(abi)

  const KnowledgeFarmContract = new Contract(
    KnowledgeFarmContractAddress,
    KnowledgeFarmInterface
  )

  return useContractFunction(KnowledgeFarmContract, "unstakeTokens", {
    transactionName: "Unstake tokens",
  })
}
