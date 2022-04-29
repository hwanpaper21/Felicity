
import Calen from "../CalenDoctor";
import moment from "moment";
const { CalenderBox, PatientContainer, PatientElementContainer, SymptomsContainer, SymptomsBubble, PatientElement, PatientInfoContainer, PatientImage, Column, Patient, Time, Bio, Divider, Title, Btn } = require("./styles");
var isEmpty = true;

const TimeCompare = (date, time, past) => {
    var today = new Date();
    var today_date;
    if (today.getMonth() < 10)
        today_date = '0'
    today_date = today_date + (today.getMonth()+1) + '-';
    if (today.getDate() < 10)
        today_date = today_date + '0';
    today_date = today_date + today.getDate() + '-' + today.getFullYear();

    console.log(today_date);
    console.log(date);
    //today_date = "02-05-2022"
    var today_time;
    if (today.getHours() < 10)
        today_date = '0'
    today_date = today_date + today.getHours() + '-';
    if (today.getMinutes() < 10)
        today_date = today_date + '0';
    today_date = today_date + today.getMinutes();;

    if (!past) {
        if (date > today_date) {
            isEmpty = false;
            return true; }
        else if (date < today_date)
            return false;
        else
            if (time > today_time)
                return true;
            else   
                return false;}
    else {
        if (date < today_date) {
            isEmpty = false;
            return true;}
        else if (date > today_date)
            return false;
        else
            if (time < today_time)
                return true;
            else   
                return false;}
}

const PatientsList = (props) => {

    isEmpty = true;

    return (
        <PatientContainer>
            <CalenderBox>
                <Calen data = {props.data}/>
            </CalenderBox>
            {!props.past && <Title>Upcoming Patients</Title>}
            {props.past && <Title>Past Patients</Title>}
            <Divider />
            <PatientElementContainer>
                {props.data.map((data, i) => (
                    <>
                    {TimeCompare(data.reserved_date, data.reserved_time, props.past) && (
                    <Column>
                        <PatientElement onClick={({ target }) =>  props.setFunction(props.data[i])}>
                            
                            <PatientImage img = {data.img} />
                            <Column>
                                <PatientInfoContainer>
                                    <Patient>{data.patient_firstName} {data.patient_lastName}</Patient>
                                    <Bio>{data.sex}, {data.birthday}</Bio>
                                </PatientInfoContainer>
                                <Time>Meeting time: {data.reserved_date} {data.reserved_time}</Time>
                                <SymptomsContainer>
                                    {props.symptoms([data.a, data.b, data.c, data.d, data.e, data.f, data.g, data.h, data.i, data.j, data.k, data.l]).map((symptom) => (
                                        <SymptomsBubble>{symptom}</SymptomsBubble>
                                    ))}
                                </SymptomsContainer>
                            </Column>
                           
                                    
                        </PatientElement>
                        <Divider />
                    </Column>
                          
                            )}  </>         
                                    
                ))}
                {isEmpty && <Column>There is no appointment left</Column>}
            </PatientElementContainer>
        </PatientContainer>
    );
}

export default PatientsList;
