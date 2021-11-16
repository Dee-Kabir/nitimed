import { Table } from "semantic-ui-react";

const TableHeader = ({headerParams}) => {
    return(
        <Table.Header>
            <Table.Row>
            {
                headerParams.map(param => param ? <Table.HeaderCell key={param}>{param}</Table.HeaderCell> : null)
            }
            </Table.Row>
          </Table.Header>
    )
}
export default TableHeader;