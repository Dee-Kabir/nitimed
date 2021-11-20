import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { Container, Header } from "semantic-ui-react";
import { loginAdmin } from "../../actions/admin";
import LoadingComponent from "../../utilities/LoadingComponent";
import { connect } from "react-redux";
import { setUserLoggedIn } from "../../store/actions";
import { Helmet } from "react-helmet";
import { webName } from "../../Config";
const AdminLogin = (props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const onFinish = (values) => {
        try{
            setLoading(true)
            loginAdmin(values).then((data)=>{
                if(data.success){
                    localStorage.setItem("user", data.user.id);
                    localStorage.setItem("token",data.token)
                    props.setUserLoggedIn(data.user)
                    localStorage.setItem("userType", "admin");
                    props.history.push(`/admin/dashboard/${data.user.id}?show=info`)
                }else{
                    setError(data.message)
                }
                setLoading(false)
            })
        }catch(err){
            console.log(err);
            setError("Try again after sometime.")
            setLoading(false)
        }
    };
    return ( !loading ?
        <Container textAlign="center" style={{marginTop: "100px"}}>
        <Helmet>
        <title>{webName} | Admin</title>
        </Helmet>
        <Header>Login for Admin only</Header>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}

          >
            <Input name="username" placeholder="Enter your username" />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password name="password" placeholder="Enter password" />
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Container> : <LoadingComponent />
      );
        
}
export default connect(null,{setUserLoggedIn})(AdminLogin);