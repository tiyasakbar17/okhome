import React from 'react'
import { connect } from 'react-redux';
import { deleteServices } from '../../redux/actions/services';

function Table({ data, counter, deleteServices }) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const { date, name, serviceId, clickDetail } = data;

    const deleteHandler = () => {
        deleteServices(serviceId);
    }
    return (
        <tr>
            <th scope="row">{counter}</th>
            <td>{new Date(date).toLocaleDateString("id-ID", options)}</td>
            <td style={{ cursor: "pointer" }} onClick={clickDetail} >{name}</td>
            <td>
                <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
            </td>
        </tr>
    )
}
const mapDispatchToProps = {
    deleteServices
}

export default connect(null, mapDispatchToProps)(Table)
