import { Typography, Avatar, Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoneyCollectOutlined, HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";

import icon from "../images/icon.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(() => true);
  const [screenSize, setScreenSize] = useState(() => null);
  const handleResize = () => setScreenSize(() => window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    // the return function in the useEffect function is used to when the useEffect completes it's execution.
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize < 768) setActiveMenu(() => false);
    else setActiveMenu(() => true);
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoWorld</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(() => !activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptoCurrencies">Crypto Currencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
