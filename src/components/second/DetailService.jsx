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
        <div>
            <span>Service: <strong>{data.name}</strong></span>
            <table>
                <thead>
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
                                        <th>{i}</th>
                                        <td>{element.name}</td>
                                        <td>{element.status}</td>
                                        <td>
                                            <button onClick={() => actionHandler(element.id, "done")} disabled={element.status === "done" ? true : false} >Done</button>
                                            <button onClick={() => actionHandler(element.id, "missed")} disabled={element.status === "missed" ? true : false} >Missed</button>
                                            <button onClick={() => deleteHandler(element.id)} >delete</button>
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
                            <Field type="text" name="name"></Field>
                            <ErrorMessage name="name"></ErrorMessage>
                        </>
                        :
                        null}
                    <div>
                        {state.click ? <button type="submit">submit</button> : null}
                        <button onClick={clickHandler} type="button" >{state.click ? "cancel" : "add instance"}</button>
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
