import React from 'react'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { addServices } from '../../redux/actions/services';


function NewService({ addServices, closeClicker }) {
    const [state, setState] = React.useState({
        count: 0,
        instanceNames: []
    })
    const onSubmit = (values) => {
        const data = {
            ...values,
            instanceNames: state.instanceNames
        };
        addServices(data).then(() => {
            closeClicker()
        });
    };
    const initialValues = {
        serviceName: "",
        date: '',
    };
    const validationSchema = Yup.object({
        serviceName: Yup.string().required(),
        date: Yup.date().required()
    });
    const countHandler = (e) => {
        setState(() => ({ [e.target.name]: e.target.value, instanceNames: [] }))
    };
    const loopInput = () => {
        const inputDate = [];
        for (let index = 0; index < state.count; index++) {
            inputDate.push(<input type="text" key={index} name={`${index}`} onChange={inputHandler} className="form-control mb-1" />)
        }
        return inputDate
    };
    const inputHandler = (e) => {
        const index = parseInt(e.target.name);
        const copyDate = [...state.instanceNames];
        copyDate[index] = e.target.value
        setState(prev => ({
            ...prev,
            instanceNames: copyDate
        }))
    }
    return (
        <div className="container">
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema} >
                <Form>
                    <div className="column mb-3">
                        <label htmlFor="serviceName">Service Name</label>
                        <Field type="text" className="form-control" name="serviceName"></Field>
                        <ErrorMessage name="serviceName" ></ErrorMessage>
                    </div>
                    <div className="column mb-3">
                        <label htmlFor="date">Date</label>
                        <Field type="date" className="form-control" name="date"></Field>
                        <ErrorMessage name="date" ></ErrorMessage>
                    </div>
                    <div className="column mb-3">
                        <label htmlFor="date">Instances</label>
                        <input type="text" className="form-control" name="count" value={state.count} onChange={countHandler} />
                        <div className="column">
                            {
                                state.count > 0 ? <span>Instance Name</span> : null
                            }
                            {
                                state.count > 0 ? loopInput() : null
                            }
                        </div>
                    </div>
                    <div className="flex">
                        <button className="btn btn-success" type="submit" >Submit</button>
                        <button onClick={closeClicker} className="btn btn-danger ml-2" >Cancel</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

const mapDispatchToProps = {
    addServices
}


export default connect(null, mapDispatchToProps)(NewService)
