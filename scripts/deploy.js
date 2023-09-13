const hre = require("hardhat")

async function main() {
    const NAME = "Chat_GPT_Membership";
    const SYMBOL = "GPT_DAP";

    const GPTMembership = await hre.ethers.getContractFactory("GPTMembership");
    const gptMembership = await GPTMembership.deploy(NAME, SYMBOL)
    await gptMembership.deployed()

    console.log("GPTMembership: ", gptMembership.address);
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})