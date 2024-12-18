import React from 'react';
import './style.scss';

type TabItem = {
  title:   string | React.FC
  content: string | React.FC
};
type TabsProps = {
  data:       TabItem[]
  className?: string
  fullWidth?: false

};

const Tabs = (props: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div className={`ssrc-tabs ${props.className ?? ''}`}>
      <ul className={`ssrc-tabs_items ${props.fullWidth ? 'full-width' : ''}`}>
        {props?.data?.map((tab, index) => {
          return (
            <li key={index} className={`ssrc-tabs_item ${activeTab === index ? 'ssrc-tabs_item--active' : ''}`}>
              <button onClick={() => setActiveTab(index)}>
                {typeof tab.title === 'function' ? <tab.title /> : tab.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        {props?.data?.filter((_, index) => activeTab === index).map((tab, index) => {
          return (
            <div key={index} className="ssrc-tabs_content ssrc-tabs_content--active">
              {typeof tab.content === 'function' ? <tab.content /> : tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
