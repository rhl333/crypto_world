import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../services/CryptoAPI";
import millify from "millify";

const columns = [
  {
    title: "Exchange",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "24H Trade Volume ",
    dataIndex: "24hVolume",
    key: "24hVolume",
    render: (data) => millify(data),
  },
  {
    title: "Total Market Cap",
    dataIndex: "marketCap",
    key: "marketCap",
    render: (data) => millify(data),
  },
  {
    title: "Change",
    dataIndex: "change",
    key: "change",
    render: (data) => `${data}%`,
  },
];

const Exchanges = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  let coins = useSelector((state) => state.users.users.coins);
  return (
    <div>
      {!coins ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={coins} />
      )}
    </div>
  );
};

export default Exchanges;
