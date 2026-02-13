import React from "react";
import "./style.scss";

type TabItem = {
  key?: string;
  title: string | React.FC;
  content: string | React.FC;
  className?: string;
};
type TabsProps = {
  data: TabItem[];
  className?: string;
  fullWidth?: false;
  onChange?: (tab: TabItem, index: number) => void;
  onTabContentChange?: (content: string | React.FC, tab: TabItem, index: number) => void;
};

const ContentSelector = (props: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(0);

  React.useEffect(() => {
    if (props.onTabContentChange) {
      const tab = props.data[activeTab];
      props.onTabContentChange(tab.content, tab, activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleClick = (index: number) => {
    setActiveTab(index);
    if (props.onChange && typeof props.onChange === "function") {
      props.onChange(props.data[index], index);
    }
    if (props.onTabContentChange) {
      const tab = props.data[index];
      props.onTabContentChange(tab.content, tab, index);
    }
  };

  return (
    <div className={`ssrc-tabs ${props.className ?? ""}`}>
      <ul className={`ssrc-tabs_items ${props.fullWidth ? "full-width" : ""}`}>
        {props?.data?.map((tab, index) => {
          return (
            <li key={index} className={`ssrc-tabs_item ${activeTab === index ? "ssrc-tabs_item--active" : ""}`}>
              <button onClick={() => handleClick(index)}>{typeof tab.title === "function" ? <tab.title /> : tab.title}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContentSelector;
