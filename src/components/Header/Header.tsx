//package imports
import { IdcardOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const Header = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item icon={<IdcardOutlined />} key="1">
        Admin
      </Menu.Item>
      <Menu.Item key="2">Menu</Menu.Item>
    </Menu>
  );
};

export default Header;
