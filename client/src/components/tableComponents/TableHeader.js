import { Table } from "semantic-ui-react";

const TableHeader = ({headerParams}) => {
    return(
        <Table.Header>
            <Table.Row>
            {
                headerParams.map(param => <Table.HeaderCell key={param}>{param}</Table.HeaderCell>)
            }
            </Table.Row>
          </Table.Header>
    )
}
export default TableHeader;