import { createContext, useContext, useEffect, useState } from "react";
import { CheckIfWalletConnected, connectWallet, connectingWithContract } from "../Utils/apiFeature"
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const DAP_NAME = "AUTO_MSG";
    // State Variables
    const [address, setAddress] = useState("");
    const [contractMembership, setContractMembership] = useState([]);
    const [freeMembershipTrail, setFreeMembershipTrail] = useState();
    const [userMembership, setUserMembership] = useState({});

    // Fetch Contract Data
    const fetchData = async () => {
        try {
            // load data from localstorage
            const freeTrial = localStorage.getItem("freeTrial");
            const free_membership_trail = JSON.parse(freeTrial);
            setFreeMembershipTrail(freeTrial);

            // Get the contract data
            const contractDetails = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAddress(connectAccount);

            // Memberships
            const oneYear = await contractDetails.getMemberships(1)
            const oneMonth = await contractDetails.getMemberships(2)
            const sixMonths = await contractDetails.getMemberships(3)
            contractMembership = [
                {
                    membership_id: oneYear?.id.toNumber(),
                    membership_name: oneYear?.name,
                    membership_cost: ethers.utils.formatUnits(oneYear?.cost.toString(), "ether"),
                    membership_date: oneYear?.date
                },
                {
                    membership_id: oneMonth?.id.toNumber(),
                    membership_name: oneMonth?.name,
                    membership_cost: ethers.utils.formatUnits(oneMonth?.cost.toString(), "ether"),
                    membership_date: oneMonth?.date
                },
                {
                    membership_id: sixMonths?.id.toNumber(),
                    membership_name: sixMonths?.name,
                    membership_cost: ethers.utils.formatUnits(sixMonths?.cost.toString(), "ether"),
                    membership_date: sixMonths?.date
                }
            ]
            console.log(contractMembership)
            setContractMembership(contractMembership)
            // Get user membership
            const currentUserMembership = await contractDetails.getUserMembership(connectAccount);
            userMembership = {
                userAddress: currentUserMembership.userAddress.toLowerCase(),
                expiredDate: currentUserMembership.expiredDate,
                cost: ethers.utils.formatUnits((currentUserMembership.cost).toString(), "ether"),
                userMembershipId: currentUserMembership.userMembershipId.toNumber(),
                userId: currentUserMembership.userId.toNumber()
            }
            setUserMembership(userMembership)

            // Set the userMembership details to loclstorage
            const proMember = JSON.stringify(userMembership);
            localStorage.setItem("proMemberDetail", proMember)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // List of Memberships
    const membershipList = async () => {
        const AMOUNT = 3;
        const MEMBERSHIP_NAME = "Six Months";
        const MEMBERSHIP_COST = ethers.utils.parseUnits(AMOUNT.toString(), "ether");
        const MEMBERSHIP_DATE = "September 13 2023";

        const contractDetails = await connectingWithContract();
        const listOfMembership = await contractDetails.listOfMembership(
            MEMBERSHIP_NAME,
            MEMBERSHIP_COST,
            MEMBERSHIP_DATE
        );
        await listOfMembership.wait();
    };

    // Buy Membership
    const buyMembership = async (membership_id) => {
        const contract = await connectingWithContract();
        const connectAccount = await connectWallet();
        setAddress(connectAccount);

        try {
            // for one year plan
            if (membership_id == 1) {
                const today = Date.now() + 1697176615000 * 12;
                let date = new Date(today);
                const expiredDate = date.toLocaleDateString("en-Us");
                const amount = ethers.utils.parseEther("5")

                const mintTransaction = await contract.mint(
                    membership_id,
                    connectAccount,
                    expiredDate.toString(),
                    {
                        value: amount.toString()
                    }
                )
                await mintTransaction.wait();
                const userMembershipDetails = JSON.stringify("Pro_Member");
                localStorage.setItem("freeTrial", userMembershipDetails);
                console.log("Taken Membership: ", mintTransaction);
                window.location.reload()
            } else if (membership_id == 2) {
                const today = Date.now() + 1697176615000;
                let date = new Date(today);
                const expiredDate = date.toLocaleDateString("en-Us");
                const amount = ethers.utils.parseEther("1")

                const mintTransaction = await contract.mint(
                    membership_id,
                    connectAccount,
                    expiredDate.toString(),
                    {
                        value: amount.toString()
                    }
                )
                await mintTransaction.wait();
                const userMembershipDetails = JSON.stringify("Pro_Member");
                localStorage.setItem("freeTrial", userMembershipDetails);
                console.log("Taken Membership: ", mintTransaction);
                window.location.reload()
            } else if (membership_id == 3) {
                const today = Date.now() + 1697176615000 * 6;
                let date = new Date(today);
                const expiredDate = date.toLocaleDateString("en-Us");
                const amount = ethers.utils.parseEther("3")

                const mintTransaction = await contract.mint(
                    membership_id,
                    connectAccount,
                    expiredDate.toString(),
                    {
                        value: amount.toString()
                    }
                )
                await mintTransaction.wait();
                const userMembershipDetails = JSON.stringify("Pro_Member");
                localStorage.setItem("freeTrial", userMembershipDetails);
                console.log("Taken Membership: ", mintTransaction);
                window.location.reload()
            } else {
                return 0
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <StateContext.Provider value={{ DAP_NAME, membershipList, buyMembership, freeMembershipTrail, address, contractMembership, userMembership }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)