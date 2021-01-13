import React from 'react'
import { connect } from 'react-redux';
import { loadServices } from '../redux/actions/services'
import Table from "../components/second/Table"
import PopUpContainer from '../components/popUp/MainPop';
import NewService from '../components/second/NewService';
import DetailService from '../components/second/DetailService';

function Second({ loadServices, Services }) {
    React.useEffect(() => {
        loadServices()
    }, []);
    const initialState = {
        clicked: false,
        details: false,
        detailData: null,
        style: {
            maxWidth: "800px",
            height: "90%",
            overflow: "auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "5px",
            margin: "auto"
        }
    };
    const [state, setState] = React.useState(initialState);
    const clickAdd = () => {
        setState(prev => ({
            ...prev,
            clicked: !prev.clicked
        }))
    };
    const clickDetail = (data) => {
        setState(prev => ({
            ...prev,
            details: !prev.details,
            detailData: data
        }))
    };

    if (Services.loading) {
        return <div>LOADING.....</div>
    };
    return (
        <>
            {
                state.clicked ? <PopUpContainer onClick={clickAdd} style={state.style} item={<NewService closeClicker={clickAdd} />} /> : null
            }
            {
                state.details ? <PopUpContainer onClick={clickDetail} style={state.style} item={<DetailService data={Services.services.find(service => service.id === state.detailData)} closeClicker={clickDetail} />} /> : null
            }
            <div className="container">
                <div className="upperSecond flex">
                    <button onClick={clickAdd} className="btn btn-primary mb-3" >Add Service</button>
                </div>
                <div className="content column">
                    <table className="table ">
                        <thead className="thead-light">
                            <tr>
                                <th className="tableNumber">No</th>
                                <th>Tanggal</th>
                                <th>Service</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Services.services.map((service, i) => {
                                    i = i + 1;
                                    return <Table data={{ date: service.date, name: service.name, serviceId: service.id, clickDetail: () => clickDetail(service.id) }} counter={i} key={service.id} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    Services: state.Services
})

const mapDispatchToProps = {
    loadServices
}


export default connect(mapStateToProps, mapDispatchToProps)(Second)
