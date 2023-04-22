import React, { useState } from "react";
import {Swapp} from "../../utils/addresses";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import EscrowAbi from "../../utils/EscrowAbi.json";
import IndividualAdds from "./individualAdds";



export default function AllAdds(props) {
    const { contractAddress, anotherProp } = props;
    const [buyOrders, setBuyOrders] = useState();
  const [sellOrders, setSellOrders] = useState();


    const {
    data: displayBuyData,
    isError: isErrorDisplayBuy,
    isLoading: isLoadingDisplayBuy,
  } = useContractRead({
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "displayBuyAdds",
    args: [contractAddress],
    onSuccess(displayBuyData) {
      console.log("Success", displayBuyData);
      setBuyOrders(displayBuyData);
      console.log(`another Prop ${anotherProp}`);
    },
  });

  const {
    data: displaySellData,
    isError: displaySellIsError,
    isLoading: displaySellIsLoading,
  } = useContractRead({
    address: Swapp(),
    abi: EscrowAbi,
    functionName: "displaySellAdds",
    args: [contractAddress],
    onSuccess(displaySellData) {
      console.log("Success", displaySellData);
      setSellOrders(displaySellData);
      console.log(`another Prop ${anotherProp}`);

    },
  });

return (
    <div>
      {anotherProp ? (
        buyOrders?.map((order) => (
        //   <OrderItem key={order.id} order={order} type="buy" />
        <div key={order.id}>
            <IndividualAdds escrowId={order} type={true}/>
        </div>
        ))
      ) : anotherProp == false ?(
        sellOrders?.map((order) => (
        //   <OrderItem key={order.id} order={order} type="sell" />
        <div key={order.id}>
            <IndividualAdds escrowId={order} type={false} />
        </div>
        ))
      ) : null }
    </div>
  );


}