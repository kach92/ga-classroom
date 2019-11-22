import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import mainStyles from '../../style.scss';

class Classroom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details:null
        }
    }

    getData(){
        let fetchUrl = '/server_classroom/'+this.props.match.params.id;
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({details:res})
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const socket = socketIOClient(this.state.endpoint);
        socket.on('details updated', (value) => {
            if(value){
                this.getData()
            }

        })

        const details = this.state.details? this.state.details : "";
        return(
                <div className={mainStyles.displayContainer}>
                    <h2>{details.title}</h2>
                    <div className={mainStyles.horizontalLine}></div>
                    <div className={mainStyles.classroomContentContainer}>
                        <p>CLASSROOM {details.id}</p>
                        <p>{details.instructor}</p>
                        <p>{details.starttime} - {details.endtime}</p>
                    </div>
                    <div className={mainStyles.classroomFooterContainer}>
                        <img src="https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/9142/thumb_CMYK-Red_Small_GeneralAssembly-Cog.png" className={mainStyles.navImage}/>

                        <h3>GENERAL ASSEMBLY</h3>

                    </div>




                </div>
            )
    }


}

export default Classroom;