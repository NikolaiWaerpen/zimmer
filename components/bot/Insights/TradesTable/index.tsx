import {
  faChevronDown,
  faChevronUp,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BotTradesType } from "..";
import { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import stringToFloatString from "utils/string-to-floatstring";
import Pagination from "components/Pagination";
import Input from "components/Input";
import classNames from "classnames";

type TradesTableProps = {
  botTrades: BotTradesType[];
};

const columns = [
  {
    Header: "Collection",
    accessor: "collection",
  },
  {
    Header: "Token ID",
    accessor: "tokenId",
  },
  {
    Header: "Fees",
    accessor: "fees",
  },
  {
    Header: "Buy",
    accessor: "buy",
  },
  {
    Header: "Sell",
    accessor: "sell",
  },
  {
    Header: "Profit",
    accessor: "profit",
  },
  {
    Header: "Profit Margin",
    accessor: "profitMargin",
  },
];

const INITIAL_PAGE_SIZE = 20;

export default function TradesTable({ botTrades }: TradesTableProps) {
  const [reactPage, setReactPage] = useState(1);
  // const [reactPageSize, setReactPageSize] = useState(INITIAL_PAGE_SIZE);

  useEffect(() => {
    gotoPage(reactPage - 1);
  }, [reactPage]);

  const data = useMemo(
    () =>
      botTrades.map(
        ({
          collection,
          tokenId,
          fees,
          buy,
          buyDate,
          sell,
          sellDate,
          profit,
          profitMargin,
        }) => {
          return {
            collection,
            tokenId,
            fees,
            buy: stringToFloatString(buy),
            sell: sell ? stringToFloatString(sell) : "N/A",
            profit: profit ? stringToFloatString(profit) : "N/A",
            profitMargin: profitMargin
              ? stringToFloatString(profitMargin)
              : "N/A",
          };
        }
      ),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // @ts-ignore
    page,
    prepareRow,
    // @ts-ignore
    gotoPage,
    state,
    // TODO: DYNAMICALLY SET PAGE SIZE
    // @ts-ignore
    setPageSize,
  } = useTable(
    // @ts-ignore
    { columns, data, initialState: { pageSize: INITIAL_PAGE_SIZE } },
    useSortBy,
    usePagination
  );

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-300"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          // @ts-ignore
                          column.getSortByToggleProps()
                        )}
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        <a className="inline-flex">
                          {column.render("Header")}
                          <span className=" ml-2 flex-none rounded text-gray-400">
                            <FontAwesomeIcon
                              icon={
                                // @ts-ignore
                                column.isSorted
                                  ? // @ts-ignore
                                    column.isSortedDesc
                                    ? faChevronDown
                                    : faChevronUp
                                  : faSort
                              }
                              className="ml-2 h-5 w-5 flex-none rounded text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="divide-y divide-gray-200 bg-white"
              >
                {page.map((row: any, idx: number) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={classNames(
                        idx % 2 === 0 ? undefined : "bg-gray-50",
                        "hover:bg-gray-100 transition ease-in duration-75"
                      )}
                    >
                      {row.cells.map((cell: any) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-500 pl-6"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-end mt-4">
            <Input
              label="Set page size"
              value={reactPageSize}
              onChange={(event) => {
                event.preventDefault();
                setReactPageSize(+event.target.value);
              }}
            />
          </div> */}
        </div>
      </div>
      <Pagination
        page={reactPage}
        pageSize={INITIAL_PAGE_SIZE}
        setPage={setReactPage}
        totalLength={botTrades.length}
      />
    </div>
  );
}
