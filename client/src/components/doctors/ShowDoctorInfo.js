import { changeAvailability } from "../../actions/firebaseapi";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Descriptions, Image } from "antd";
const ShowDoctorInfo = ({ user }) => {
  const setAvailability = () => {
    const token = localStorage.getItem('token')
    try{
      changeAvailability(user.id,token,!user.available)
      .then((data) => {
        if(data.success){
          window.location.reload();
        }else{
          alert(data.message)
        }
      });
    }catch(err){
      console.log(err)
    }
  };
  return user ? (
    <Descriptions title="Account Information"
    bordered
    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
    <Descriptions.Item label="Name">Dr. {user.name}</Descriptions.Item>
    <Descriptions.Item label="Mobile No.">{user.phone}</Descriptions.Item>
    <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
    <Descriptions.Item label="State">{user.state}</Descriptions.Item>
    <Descriptions.Item label="District">{user.city}</Descriptions.Item>
    <Descriptions.Item label="Available"><input
    type="checkbox"
    checked={user.available}
    onChange={setAvailability}
  />
  </Descriptions.Item>
  <Descriptions.Item label="Click to Join">
  <Link to={`/join-room?host=true&name=${user.name}&userId=${user.id}`} ><Button>Host Meeting</Button></Link>
  </Descriptions.Item>
  <Descriptions.Item label="Profile Photo">
  <Image src={user.photo} width="200px" />
  </Descriptions.Item>
  <Descriptions.Item label="Qualification Proof">
  <Image src={user.proof} width="200px" />
  </Descriptions.Item>
    </Descriptions>
  ) : (
    <h1>No User Found</h1>
  );
};
export default ShowDoctorInfo;
