import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

let { Title } = Typography;
const Home = () => {
  let users = useSelector((state) => state.users);

  return (
    <>
      <Title level={2} className="heading">
        Global CryptoCurrency Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total CryproCurrencies" value={users.loading ? "loading" : users.users.stats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={users.loading ? "loading" : millify(users.users.stats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={users.loading ? "loading" : millify(users.users.stats.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24H Volume" value={users.loading ? "loading" : millify(users.users.stats.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={users.loading ? "loading" : millify(users.users.stats.totalMarkets)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Crypto Currencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified={true} />
    </>
  );
};

export default Home;
