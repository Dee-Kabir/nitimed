import { Descriptions } from "antd"
import React from "react"
import { Header } from "semantic-ui-react"

const AdminInfo = (props) => {
    return(
        <div>
        <Header>Zone Information</Header>
        <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
        <Descriptions.Item label="State">{props.user.state}</Descriptions.Item>
        <Descriptions.Item label="District">{props.user.district}</Descriptions.Item>
        </Descriptions>
        </div>
    )
}
export default AdminInfo;