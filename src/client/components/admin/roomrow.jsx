import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import mainStyles from '../../style.scss';

class RoomRow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            class_id:null
        }
    }

    componentDidMount(){
        this.setState({class_id:this.props.roomDetails.id})
    }

    onChangeHandler(e,column){
        this.props.updateRoomState(e.target.value,this.state.class_id,column);
    }

    render(){
        const details = this.props.roomDetails;
        const classes = this.props.allClasses.map(x=><option key={x.id}value={x.nickname}>{x.nickname}</option>)
        return(
                <div className={mainStyles.roomCard}>
                    <h3>Classroom {details.id}</h3>

                        <select>
                            <option value={details.nickname}>{details.nickname}</option>
                            {classes}
                            }
                        </select>

                        <input defaultValue={details.title} type="text" onChange={(e)=>{this.onChangeHandler(e,"title")}}/>
                        <input defaultValue={details.instructor} type="text" onChange={(e)=>{this.onChangeHandler(e,"instructor")}}/>
                        <div className={mainStyles.timingContainer}>
                            <input type="text" defaultValue={details.starttime} onChange={(e)=>{this.onChangeHandler(e,"starttime")}}/>
                            <p>-</p>
                            <input type="text" defaultValue={details.endtime} onChange={(e)=>{this.onChangeHandler(e,"endtime")}}/>
                        </div>


                </div>

            )
    }


}

export default RoomRow;