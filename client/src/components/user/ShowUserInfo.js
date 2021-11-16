import { Descriptions } from "antd";

const ShowUserInfo = ({ user }) => {
  return user ? (
    <Descriptions title="Account Information"
    bordered
    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
    <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
    <Descriptions.Item label="Aadhar number">{user.aadharNumber}</Descriptions.Item>
    <Descriptions.Item label="Mobile No.">{user.phone}</Descriptions.Item>
    <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
    <Descriptions.Item label="State">{user.state}</Descriptions.Item>
    <Descriptions.Item label="District">{user.city}</Descriptions.Item>
    </Descriptions>
  ) : (
    <h1>No User Found</h1>
  );
};
export default ShowUserInfo;
