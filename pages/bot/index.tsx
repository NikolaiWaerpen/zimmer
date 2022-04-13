import { gql, useQuery } from "@apollo/client";
import TradesTable from "components/bot/NetProfitTotal/TradesTable";
import StatisticsBox from "components/bot/StatisticsBox";
import CustomError from "components/CustomError";
import Loader from "components/Loader";

const GET_TRADES = gql`
  query BotTrades($input: GetBotTrades!) {
    botTrades(input: $input) {
      tokenId
      collection
      link
      fees
      buy
      buyDate
      sell
      sellDate
      profit
    }
  }
`;

export type BotTradesType = {
  tokenId: string;
  collection: string;
  link: string;
  fees: string;
  buy: string;
  buyDate: string;
  sell: string | null;
  sellDate: string | null;
  profit: string | null;
};

export default function Bot() {
  const { loading, error, data } = useQuery<{ botTrades: BotTradesType[] }>(
    GET_TRADES,
    {
      variables: {
        input: {
          addresses: [
            // "0x1022E8731677efC814b937FB0d1AFc83D9773b20",
            "0x9570c76b22D0654F0c21903Be86a38e4eB5550B4",
            // "0xCeeeB66C5b2DDbA1f581f2D62fa5FE6eA90Aaa14",
            // "0x52B775cA78d703a3a1c5fC09aE1812cf34DE40d7",
            // "0x50Fc27c8B7D554E4aB56435e0D5F88A44bB65212",
            // "0x82108750050F84707359D9285E65A43C7C430f24",
          ],
        },
      },
    }
  );

  if (loading) return <Loader fullscreen />;
  if (error ?? !data) return <CustomError error={error} />;

  const { botTrades } = data;

  const netProfit = botTrades
    .map(({ profit }) => profit)
    .reduce((accumulator, current) => {
      if (current) accumulator += +current;
      return accumulator;
    }, 0)
    .toFixed(3);

  return (
    <div className="pt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Bot trades</h1>
          <p className="mt-2 text-sm text-gray-700">All trades by bots</p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatisticsBox name="Net profit" stat={netProfit + " ETH"} />
        <StatisticsBox name="Some cool stat" stat={"0"} />
        <StatisticsBox name="Another cool stat" stat={"0"} />
      </dl>

      <TradesTable botTrades={botTrades} />
    </div>
  );
}
