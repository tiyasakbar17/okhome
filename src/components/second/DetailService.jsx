import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { addInstance, deleteInstance, updateInstance } from '../../redux/actions/instance';

const DetailService = ({ data, updateInstance, deleteInstance, addInstance }) => {
    const initialValues = {
        name: ''
    }
    const [state, setState] = React.useState({
        click: false
    })
    const clickHandler = () => {
        setState(prev => ({
            ...prev,
            click: !prev.click
        }))
    }
    const actionHandler = (id, status) => {
        const data = {
            instanceId: id,
            status
        }
        updateInstance(data)
    };
    const deleteHandler = (id) => {
        deleteInstance(id)
    };
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <span className="h4">Service: <strong>{data.name}</strong></span>
            </div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Instance Name</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.instances.map((element, i) => {
                            i = i + 1;
                            return (
                                <Fragment key={i} >
                                    <tr>
                                        <th scope="row">{i}</th>
                                        <td>{element.name}</td>
                                        <td className={
                                            element.status === "waiting" ? "text-warning" :
                                                element.status === "done" ? "text-success" :
                                                    "text-danger"
                                        } >{element.status}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => actionHandler(element.id, "done")} disabled={element.status === "done" ? true : false} >Done</button>
                                            <button className="btn btn-warning ml-1" onClick={() => actionHandler(element.id, "missed")} disabled={element.status === "missed" ? true : false} >Missed</button>
                                            <button className="btn btn-danger ml-1" onClick={() => deleteHandler(element.id)} >delete</button>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    addInstance({
                        serviceId: data.id,
                        instanceName: values.name
                    }).then(() => {
                        clickHandler()
                    })
                }}
            >
                <Form>
                    {state.click ?
                        <>
                            <label htmlFor="name">New Instance</label>
                            <Field type="text" className="form-control mb-1" name="name"></Field>
                            <ErrorMessage name="name"></ErrorMessage>
                        </>
                        :
                        null}
                    <div>
                        {state.click ? <button className="btn btn-success" type="submit">submit</button> : null}
                        <button className={state.click ? "btn btn-danger ml-2" : "btn btn-primary"} onClick={clickHandler} type="button" >{state.click ? "cancel" : "add instance"}</button>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}


const mapDispatchToProps = {
    updateInstance,
    deleteInstance,
    addInstance
}


export default connect(null, mapDispatchToProps)(DetailService)
