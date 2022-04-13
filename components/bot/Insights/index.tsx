import { gql, useQuery } from "@apollo/client";
import TradesTable from "./TradesTable";
import StatisticsBox from "components/bot/Insights/StatisticsBox";
import CustomError from "components/CustomError";
import Input from "components/Input";
import Loader from "components/Loader";
import { useState } from "react";
import stringToFloatString from "utils/string-to-floatstring";

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
      profitMargin
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
  profitMargin: string | null;
};

type InsightsProps = {
  addresses: string[];
};

export default function Insights({ addresses }: InsightsProps) {
  const { loading, error, data } = useQuery<{ botTrades: BotTradesType[] }>(
    GET_TRADES,
    {
      variables: {
        input: {
          addresses,
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
    }, 0);

  const successfulTrades = botTrades.filter(({ profit }) => profit);

  const medianProfitMargin =
    botTrades
      .map(({ profitMargin }) => profitMargin)
      .reduce((sum, value) => {
        if (value) sum = sum + +value;
        return sum;
      }, 0) / botTrades.length;

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatisticsBox
          name="Net profit"
          stat={stringToFloatString(netProfit + "") + " ETH"}
        />
        <StatisticsBox
          name="Successful trades"
          stat={"" + successfulTrades.length}
        />
        <StatisticsBox
          name="Median profit margin"
          stat={stringToFloatString(medianProfitMargin + "")}
        />
      </dl>

      <TradesTable botTrades={botTrades} />
    </div>
  );
}
