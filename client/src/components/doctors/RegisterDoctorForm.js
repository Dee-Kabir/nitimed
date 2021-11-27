import { Fragment, useRef } from "react";
import { Button, Form, Grid, Image } from "semantic-ui-react";
import SearchInput from "../search/SearchInput";
import classes from "../../pages/doctors/RegisterDoctor.module.css";
const week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const RegisterDoctorForm = ({handleSubmit,handleChange,setValues,values,handlePlaces,doctorPhoto,handleImageChange,qualificationProof,loading,edit = false,addDoctor=false,formData}) => {
    const {name,email,phone,qualification,jobType,servingType,workTime,weekdays,address,state,city,fee,speciality,timing,registrationNumber,aadharNumber}=values
    const photoInputRef = useRef(null);
    const proofInputRef = useRef(null);
    return(
      <Grid className="m-2" style={{width: '100%'}}>
        <Form  onSubmit={handleSubmit} style={{width: '100%'}}>
        <Form.Input label="Name" className={classes.RegisterForm_HInput} 
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleChange}
            required
          />
        <Form.Input label="Email" className={classes.RegisterForm_HInput}
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={handleChange}
            required
          />
          {
            !edit && <Fragment>
            <Form.Input label="Registration Number" className={classes.RegisterForm_HInput}
            type="text"
            name="registrationNumber"
            placeholder="Enter Your registration number"
            value={registrationNumber}
            onChange={handleChange}
            required
          />
          <Form.Input label="Aadhar number" className={classes.RegisterForm_HInput}
            type="text"
            name="aadharNumber"
            placeholder="Enter Your Aadhar number"
            value={aadharNumber}
            onChange={handleChange}
            pattern="[0-9]{12}"
            required
          />
            </Fragment>
          }
        <Form.Input label="Mobile Number" className={classes.RegisterForm_HInput}
            type="number"
            name="phone"
            placeholder="Enter Your 10 digit Mobile Number"
            pattern="[1-9]{1}[0-9]{9}"
            value={phone}
            required
            readOnly={!addDoctor}
            onChange={handleChange}
          />
        <Form.Input label="Qualification" className={classes.RegisterForm_HInput}
         type="text" 
         name="qualification" 
         placeholder="Enter your Qualification" 
         value={qualification} 
         required 
         onChange={handleChange} 
         />
       
        <Form.Group className={`${classes.RegisterForm_HInput} inline`} >
        <label>Serving Sector</label>
        <Form.Radio label="Public" checked={jobType==="public"} onChange={()=>{ !edit && !addDoctor && formData.set('jobType','public') 
        setValues({...values,jobType:"public"})}} />
        <Form.Radio label="Private" checked={jobType==="private"} onChange={()=>{ !edit && !addDoctor && formData.set('jobType','private') 
        setValues({...values,jobType:"private"})}} />
        </Form.Group>
        <Form.Group  className={`${classes.RegisterForm_HInput} inline`} >
        <label>Serving Type</label>
        <Form.Radio label="Serving" checked={servingType==="serving"} onChange={()=>{ !edit && !addDoctor && formData.set('servingType','serving') 
        setValues({...values,servingType:"serving"})}} />
        <Form.Radio label="Retired" checked={servingType==="retired"} onChange={()=>{ !edit && !addDoctor && formData.set('servingType','retired') 
        setValues({...values,servingType:"retired"})}} />
        </Form.Group>
        <Form.Group className={`${classes.RegisterForm_HInput} inline`}  >
        <label>Work Type</label>
        <Form.Radio label="Full-Time" checked={workTime==="fullTime"} onChange={()=>{ !edit && !addDoctor && formData.set('workTime','fullTime') 
        setValues({...values,workTime:"fullTime"})}} />
        <Form.Radio label="Part-Time" checked={workTime==="partTime"} onChange={()=>{ !edit && !addDoctor && formData.set('workTime','partTime') 
        setValues({...values,workTime:"partTime"})}} />
        </Form.Group>
        <Form.Input type="text" label="Timing" name="timing" onChange={handleChange} value={timing} placeholder="timing hint: 9:00 to 13:00" className={classes.RegisterForm_HInput} />

        <div className={`${classes.RegisterForm_HInput} fields inline`} >
        <label>Available on days</label>
        {
          week && week.map((w,_)=>(
            <div key={w} style={{display:'flex',margin:'0 4px'}} className="">
            <label>{w}</label>
            <input  type="checkbox" className={`${classes.Checkbox_label_input} ui radio checkbox `} checked={weekdays ? weekdays.includes(w): false} onChange={()=>{
                let days = weekdays ? [...weekdays] : []
                if(days.includes(w)){
                  days.splice(days.indexOf(w),1)
                }else{
                  days.push(w)
                }
                !edit && !addDoctor && formData.set('weekdays',[...days])
                setValues({...values,weekdays:[...days]})
              }}/>
       
            </div>
          ))
        }
        </div>
        <Form.Input label="Speciality" className={classes.RegisterForm_HInput}
            type="text"
            name="speciality"
            placeholder="Enter doctor's Speciality"
            value={speciality}
            onChange={handleChange}
            required
          />
        <Form.Input label="Fee" className={classes.RegisterForm_HInput}
            type="number"
            name="fee"
            placeholder="Enter doctor's fee"
            value={fee}
            onChange={handleChange}
          />
      
        <Form.Input label="Address" className={classes.RegisterForm_HInput}
            type="text"
            name="address"
            placeholder="Enter doctor's Address"
            value={address}
            onChange={handleChange}
            required
          />
       
        <div className={`${classes.RegisterForm_HInput} required field`}>
          <label>State</label>
          <div style={{ width: "100%" }}>
            <SearchInput
              category="states"
              value={state}
              name="state"
              handlePlaces={handlePlaces}
              placeholder="select State"
            />
          </div>
        </div>
        <div className={`${classes.RegisterForm_HInput} required field`}>
          <label>District</label>
          <div style={{ width: "100%" }}>
            <SearchInput
              category={state}
              value={city}
              name="city"
              handlePlaces={handlePlaces}
              placeholder="select City"
            />
          </div>
        </div>
        
        {!addDoctor && !edit && <div className={`${classes.RegisterForm_HInput} field required`}>
          <label>Photo</label>
          <Image
            width="100px"
            height="100px"
            src={doctorPhoto}
            className={classes.Image_form_add_doctor}
          />
          <Button
            inverted
            primary
            type="button"
            content="Image"
            icon="file"
            onClick={() => photoInputRef.current.click()}
            className={classes.add_doctor_img_btn}
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            hidden={true}
            onChange={handleImageChange}
            ref={photoInputRef}
          />
        </div>
          }
        {
          !addDoctor && !edit && <div className={`${classes.RegisterForm_HInput} field required`}>
          <label>Qualification Proof</label>
          <Image
            width="100px"
            height="100px"
            src={qualificationProof}
            className={classes.Image_form_add_doctor}
          />
            <Button
            inverted
            primary
            type="button"
            content="Image"
            icon="file"
            onClick={() => proofInputRef.current.click()}
            className={classes.add_doctor_img_btn}
          />
          <input
            type="file"
            name="proof"
            accept="image/*"
            hidden={true}
            onChange={handleImageChange}
            ref={proofInputRef}
          />
        </div>
        }
        <div style={{textAlign:"right"}}>
          <Button
          primary
          size="large"
            disabled={loading}
            loading={loading}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
      </Grid>
    )
}
export default RegisterDoctorForm;