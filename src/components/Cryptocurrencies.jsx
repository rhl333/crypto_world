import React, { useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Col, Row, Input, Spin } from "antd";

import { useSelector, useDispatch } from "react-redux";

import { fetchUsers } from "../services/CryptoAPI";
import { useState } from "react";

const Cryptocurrencies = (props) => {
  let { simplified } = props;
  let count = simplified ? 10 : 100;

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers(count));
  }, []);
  let coins = useSelector((state) => state.users.users.coins);
  // console.log(coins);

  let [value, setValue] = useState(() => "");

  let filtered = coins?.filter((currency) => {
    return currency.name.toLowerCase().includes(value.toLowerCase());
  });
  return (
    <>
      {simplified ? (
        ""
      ) : (
        <div className="search-crypto">
          <Input placeholder="Search Here" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {!filtered ? (
          <Spin size="large" style={{ margin: "0 auto" }} />
        ) : (
          filtered?.map((currency) => {
            return (
              <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                <Link to={`/crypto/${currency.uuid}`}>
                  <Card title={` ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt="" />} hoverable>
                    <p>Price : {millify(currency.price)}</p>
                    <p>MarketCap : {millify(currency.marketCap)}</p>
                    <p>Daily Change : {millify(currency.change)}%</p>
                  </Card>
                </Link>
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
