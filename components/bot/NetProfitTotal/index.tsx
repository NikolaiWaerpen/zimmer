import { gql, useQuery } from "@apollo/client";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import StatisticsBox from "../StatisticsBox";

const GET_NET_PROFIT = gql`
  query NetProfit($input: GetNetProfit!) {
    netProfit(input: $input) {
      netProfitTotal
      netProfitTotalNok
    }
  }
`;

type NetProfitType = {
  netProfitTotal: string;
  netProfitTotalNok: string;
};

export default function NetProfitTotal() {
  const { loading, error, data } = useQuery<{ netProfit: NetProfitType }>(
    GET_NET_PROFIT,
    {
      variables: {
        input: {
          address: "0x9570c76b22D0654F0c21903Be86a38e4eB5550B4",
        },
      },
    }
  );

  if (loading) return <Loader fullscreen />;
  if (error ?? !data) return <CustomError error={error} />;

  const { netProfit } = data;

  return (
    <StatisticsBox
      name="Net profit"
      stat={`${netProfit.netProfitTotalNok} (${netProfit.netProfitTotal})`}
    />
  );
}
