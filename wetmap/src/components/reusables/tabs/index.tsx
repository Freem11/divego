import React from 'react';
import './style.scss';

type TabItem = {
  key?:    string
  title:   string | React.FC
  content: string | React.FC
};
type TabsProps = {
  data:       TabItem[]
  className?: string
  fullWidth?: false
  onChange?:  (tab: TabItem, index: number) => void
};

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(props.data[index], index);
    }
  };

  return (
    <div className={`ssrc-tabs ${props.className ?? ''}`}>
      <ul className={`ssrc-tabs_items ${props.fullWidth ? 'full-width' : ''}`}>
        {props?.data?.map((tab, index) => {
          return (
            <li key={index} className={`ssrc-tabs_item ${activeTab === index ? 'ssrc-tabs_item--active' : ''}`}>
              <button onClick={() => handleClick(index)}>
                {typeof tab.title === 'function' ? <tab.title /> : tab.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        {props?.data?.map((tab, index) => {
          const className = `ssrc-tabs_content ${activeTab === index ? 'ssrc-tabs_content--active' : ''}`;
          return             (
            <div key={index} className={className}>
              {typeof tab.content === 'function' ? <tab.content /> : tab.content}
            </div>
          );
        })}
        {/* {props?.data?.filter((_, index) => activeTab === index).map((tab, index) => {
          return (
            <div key={index} className="ssrc-tabs_content ssrc-tabs_content--active">
              {typeof tab.content === 'function' ? <tab.content /> : tab.content}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Tabs;
