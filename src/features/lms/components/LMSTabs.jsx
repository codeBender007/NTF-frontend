import { useState } from "react";

const defaultTabs = ["Test Papers", "Day 1", "Day 2"];

const LMSTabs = ({ tabs = defaultTabs, activeTab, onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    tabs[0] || defaultTabs[0]
  );

  const selectedTab = activeTab ?? internalActiveTab;

  const handleTabChange = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="flex min-w-max items-center gap-0 px-5">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`
                relative flex h-12 items-center px-5
                text-[12px] font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "font-semibold text-[#6F4AE7]"
                    : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {tab}

              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-[72px] -translate-x-1/2 rounded-t-full bg-[#6F4AE7]" />
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default LMSTabs;