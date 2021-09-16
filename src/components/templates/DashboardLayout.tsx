import {
    AccountBookOutlined,
    GlobalOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TransactionOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

import { Wrapper } from './style';

const { Header, Content, Sider, Footer } = Layout;

export interface AggregateI {
  name: string;
  amount: number;
  url: string;
}

const DashBoardLayout: React.FunctionComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebar = [
    { name: "Accounts", icon: <AccountBookOutlined />, key: "1" },
    { name: "Transactions", icon: <TransactionOutlined />, key: "2" },
    { name: "Sessions", icon: <GlobalOutlined />, key: "3" },
  ];
  const toggle = () => setCollapsed(!collapsed);

  const handleClick = ({ key }: { key: string }) => console.log(key);
  return (
    <Wrapper>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={handleClick}
          >
            {sidebar.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
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
