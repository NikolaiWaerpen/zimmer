import { gql, useQuery } from "@apollo/client";
import CustomError from "components/CustomError";
import Loader from "components/Loader";

// TODO: LOOP THROUGH AND FETCH ALL OF THESE
// MOVE TO BACKEND
// DISPLAY IN A TABLE OR SOMETHING
// FILTER ON THE ONES FLIPPED VS THE ONES ONLY BOUGHT

const GET_GREETINGS = gql`
  query BotTrades($input: GetBotTrades!) {
    botTrades(input: $input) {
      tokenId
      collection
      link
      fees
      buy
      sell
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
  sell: string;
  profit: string;
};

export default function Bot() {
  const { loading, error, data } = useQuery<{ botTrades: BotTradesType[] }>(
    GET_GREETINGS,
    {
      variables: {
        input: {
          address: "0x1022E8731677efC814b937FB0d1AFc83D9773b20",
        },
      },
    }
  );

  if (loading) return <Loader fullscreen />;
  if (error ?? !data) return <CustomError error={error} />;

  const { botTrades } = data;

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Bot trades</h1>
            <p className="mt-2 text-sm text-gray-700">All trades by bot</p>
          </div>
        </div>
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
                        Sell
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
                        Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {botTrades.map(
                      ({
                        tokenId,
                        collection,
                        fees,
                        link,
                        buy,
                        sell,
                        profit,
                      }) => (
                        <tr key={tokenId}>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {collection}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            <a href={link} target="_blank" rel="noreferrer">
                              {tokenId}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            {fees}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {buy}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {sell}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {profit}
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
