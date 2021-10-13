import { Alert } from "antd";
import { Fragment } from "react";
import { Table, Header, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import TableHeader from "../tableComponents/TableHeader";
import { connect } from "react-redux";
import {setSelectedDoctor} from '../../store/actions'
const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DoctorCard = ({ doctors, heading,setSelectedDoctor, searched = true }) => {
  const history = useHistory()

  const checkAvailability = (doctor) => {
    if (doctor.available) {
      console.log(week[new Date().getDay()],"weekday")
      if (doctor.jobType === "private") {
        
        if (doctor.weekdays.includes(week[new Date().getDay()])) {
          
          setSelectedDoctor(doctor)
          history.push(`/appointment/${doctor.id}`)
        } else {
          alert("Doctor Not Available");
        }
      } else {
        setSelectedDoctor(doctor)
        history.push(`/appointment/${doctor.id}`)
      }
    } else {
      alert("Doctor Not Available");
    }
  };
  return doctors && doctors.length > 0 ? (
    <Fragment>
      <Header>{heading}</Header>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Table celled>
        <TableHeader headerParams={["Sr No.","state","District","Doctor Name","Mobile Number","Email","Fee(Rs)","Appointment"]} />
          <Table.Body>
            {doctors.map((doc, _) => (
              <Table.Row key={doc.id}>
                <Table.Cell>{_ + 1}</Table.Cell>
                <Table.Cell>{doc.state}</Table.Cell>
                <Table.Cell>{doc.city}</Table.Cell>
                <Table.Cell>{doc.name}</Table.Cell>
                <Table.Cell>{doc.phone}</Table.Cell>
                <Table.Cell>{doc.email}</Table.Cell>
                <Table.Cell>{doc.fee}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => checkAvailability(doc)}>
                    Book Appointment
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Fragment>
  ) : (
    searched && (
      <Alert className="mt-4" type="info" message={`No ${heading} Found`} />
    )
  );
};

export default connect(null,{setSelectedDoctor})(DoctorCard)
