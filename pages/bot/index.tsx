import { gql, useQuery } from "@apollo/client";
import NetProfitTotal from "components/trade/NetProfitTotal";
import StatisticsBox from "components/trade/StatisticsBox";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import formatDate from "utils/format-date";

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

type BotTradesType = {
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
            "0x9570c76b22D0654F0c21903Be86a38e4eB5550B4",
            "0x1022E8731677efC814b937FB0d1AFc83D9773b20",
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

      <div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Collection
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Token ID
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Fees
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Buy
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Sell
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {botTrades.map(
                      (
                        {
                          tokenId,
                          collection,
                          fees,
                          link,
                          buy,
                          buyDate,
                          sell,
                          sellDate,
                          profit,
                        },
                        idx
                      ) => (
                        <tr
                          key={tokenId}
                          className={idx % 2 === 0 ? "" : "bg-gray-50"}
                        >
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {collection}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-500">
                            <a href={link} target="_blank" rel="noreferrer">
                              {tokenId}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-500">
                            {fees}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {buy} ({formatDate({ date: new Date(buyDate) })})
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {sell ? sell : "N/A"}
                            {sellDate && (
                              <span>
                                {" "}
                                ({formatDate({ date: new Date(sellDate) })})
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                            {profit ? profit : "N/A"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
