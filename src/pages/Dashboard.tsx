import {
  AccountBookOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';

import Totals from '../components/Totals';
import { currentDate, firstday, lastday } from '../constants/dates';
import { ACCOUNT_QUERY } from '../queries/accountQuery';
import { SESSION_QUERY } from '../queries/sessionQueries';
import { TRANSACTION_QUERY } from '../queries/transactionQuery';
import { Wrapper } from './style';

const { Header, Content, Sider, Footer } = Layout;
const DashBoardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [accountTotals, setAccountTotals] = useState<any>(0);
  const [transactionTotals, setTransactionTotals] = useState<any>(0);
  const [sessionTotals, setSessionTotals] = useState<any>(0);
  const { data: accountsData } = useQuery(ACCOUNT_QUERY);
  const { data: transactionsData } = useQuery(TRANSACTION_QUERY);
  const { data: sessionsData } = useQuery(SESSION_QUERY);
  const accounts = accountsData?.allAccounts;
  const transactions = transactionsData?.allTransactions;
  const sessions = sessionsData?.allSessions;
  useEffect(() => {
    console.log(firstday, lastday, currentDate);
    setAccountTotals(accounts?.length);
    setTransactionTotals(transactions?.length);
    setSessionTotals(sessions?.length);
  }, [accounts, transactions, sessions]);

  const totals = [
    {
      name: "Accounts",
      amount: accountTotals,
      url: "/accounts",
    },
    {
      name: "Transactions",
      amount: transactionTotals,
      url: "/transactions",
    },
    {
      name: "Sessions",
      amount: sessionTotals,
      url: "/sessions",
    },
  ];
  const sidebar = [
    { name: "Accounts", icon: <AccountBookOutlined />, key: "1" },
    { name: "Transactions", icon: <TransactionOutlined />, key: "2" },
    { name: "Sessions", icon: <GlobalOutlined />, key: "3" },
  ];
  const toggle = () => setCollapsed(!collapsed);

  const handleClick = ({key}: { key: string })=>console.log(key)
  return (
    <Wrapper>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} onClick={handleClick}>
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
              {totals.map((total: any) => (
                <Totals total={total} />
              ))}
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
