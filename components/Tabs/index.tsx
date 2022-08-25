import { Tab } from "@headlessui/react";
import classNames from "classnames";
import Icon, { IconType } from "components/Icon";
import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";

type TabsType = {
  name: string;
  icon: IconType;
};

type TabsProps = {
  tabs: TabsType[];
  children: ReactNode[];
  onClick?: (index: number) => void;
  selectedIndex?: number;
};

export default function Tabs({
  tabs,
  children,
  onClick,
  selectedIndex,
}: TabsProps) {
  return (
    <Tab.Group onChange={onClick} selectedIndex={selectedIndex}>
      <div className="border-b border-gray-200 mb-2">
        <Tab.List className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => {
            const { name, icon } = tab;

            return (
              <Tab as={Fragment} key={index}>
                {({ selected: isSelected }) => (
                  <button
                    className={classNames(
                      isSelected
                        ? "border-theme-6 text-theme-5"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={isSelected ? "page" : undefined}
                  >
                    <Icon
                      icon={icon}
                      className={classNames(
                        isSelected
                          ? "text-theme-5"
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-0.5 mr-2 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                    <span>{name}</span>
                  </button>
                )}
              </Tab>
            );
          })}
        </Tab.List>
      </div>
      <Tab.Panels as={Fragment}>
        {children.map((child, index) => (
          <Tab.Panel key={index}>{child}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
