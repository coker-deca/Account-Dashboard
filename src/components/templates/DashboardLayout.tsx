import {
  AccountBookOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { DatePicker, Layout, Menu, Select } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import getDates from '../../constants/dates';
import { Wrapper } from './style';

const { Header, Content, Sider, Footer } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;
export interface AggregateI {
  name: string;
  amount: number;
  url: string;
}

const DashBoardLayout: React.FunctionComponent<{
  useValue: (value: any) => void;
  clickedKeys: string[];
  executeDateRequest?: (start: string, end: string) => void;
}> = ({ clickedKeys, children, useValue, executeDateRequest }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string | string[]>([]);
  const history = useHistory();

  const sidebar = [
    { name: "Accounts", icon: <AccountBookOutlined />, key: "1" },
    { name: "Transactions", icon: <TransactionOutlined />, key: "2" },
    { name: "Sessions", icon: <GlobalOutlined />, key: "3" },
  ];
  const toggle = () => setCollapsed(!collapsed);

  const handleChangeTab = ({ key }: { key: string }) => {
    const url =
      key === "1" ? "/accounts" : key === "2" ? "/transactions" : "/sessions";
    history.push(url);
  };

  const handleChange = (value: any) => {
    if (value === "7days") {
      const last7 = getDates();
      setSelectedDates(last7);
      executeDateRequest && executeDateRequest(last7[0], last7[1]);
    }
  };

  const onChange = (date: any, dateString: string | string[]) => {
    if (Array.isArray(dateString) && dateString.length > 1) {
      setSelectedDates(dateString);
      executeDateRequest && executeDateRequest(dateString[0], dateString[1]);
    };
  }
  useValue(selectedDates);

  return (
    <Wrapper>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={clickedKeys || ["1"]}
          >
            {sidebar.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={handleChangeTab}
              >
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{ padding: 0 }}
            className="site-layout-sub-header-background"
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div>
              <Select
                defaultValue="None"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="None" disabled>Pick A Date Range</Option>
                <Option value="7days">Last 7 Days</Option>
                <Option value="custom">
                  <RangePicker onChange={onChange} />
                </Option>
              </Select>
            </div>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Tosin Coker ©2021 Created using Ant Design
          </Footer>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

export default DashBoardLayout;
