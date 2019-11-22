import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import {Link} from "react-router-dom";
import mainStyles from '../../style.scss';
import {Modal,Button,InputGroup,FormControl,Form} from 'react-bootstrap';

class RoomRow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            errorMsg:""
        }
    }

    handleClose(e){
            this.setState({
                show:false,
            })
    }

    handleOpen(e){
            this.setState({show:true})
    }

    delete(e,class_id){
        const url = '/server_class/'+class_id
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res === false){
                this.setState({errorMsg:"*A classroom is using this class!"});
            }else{
                this.props.handleDelete(res.id);
                this.handleClose();
            }

        })
        .catch(error => console.error('Error:', error));
    }


    render(){
        const details = this.props.details
        return(
                <div className={mainStyles.classCard}>
                    <div className={mainStyles.nicknameContainer}>
                       <h4>{details.nickname}</h4>
                       <div className={mainStyles.editDeleteContainer}>
                            <i className={`bx bxs-edit ${mainStyles.editBtn}`}></i>
                            <i className={`bx bx-trash ${mainStyles.deleteBtn}`} onClick={(e)=>{this.handleOpen(e)}}></i>
                       </div>

                    </div>
                    <div className={mainStyles.classCardContentContainer}>
                        <p className={mainStyles.courseTitle}>{details.title}</p>
                        <p>{details.instructor}</p>
                        <p>{details.starttime} - {details.endtime}</p>
                    </div>
                    <Modal show={this.state.show} onHide={(e)=>{this.handleClose(e)}} >
                        <Modal.Header closeButton>
                          <Modal.Title>Delete this class?</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <table className={mainStyles.deleteTable}>
                                    <tbody>
                                        <tr>
                                            <th scope="column">
                                                Nick name
                                            </th>
                                            <td>
                                                {details.nickname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="column">
                                                Title
                                            </th>
                                            <td>
                                                {details.title}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="column">
                                                Instructor
                                            </th>
                                            <td>
                                                {details.instructor}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="column">
                                                Timing
                                            </th>
                                            <td>
                                                {details.starttime} - {details.endtime}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <p className={mainStyles.errorMsg}>{this.state.errorMsg}</p>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={(e)=>{this.handleClose(e)}}>
                                Close
                              </Button>
                              <Button
                                variant="danger"
                                type="submit"
                                onClick={(e)=>{this.delete(e,details.id)}}>
                                Delete
                              </Button>
                            </Modal.Footer>
                    </Modal>



                </div>

            )
    }


}

export default RoomRow;