import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from '../../style.scss';
import ClassRow from './classrow'
import {Link} from "react-router-dom";
import {Modal,Button,InputGroup,FormControl,Form} from 'react-bootstrap';

class ClassIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            classes : null,
            classesDisplay:null,
            show:false,
            new:{
                nickname:"",
                title:"",
                instructor:"",
                starttime:"",
                endtime:""
            },
            errorMsg : ""
        }

        this.handleDelete = this.handleDelete.bind(this);

    }

    getAllClasses(){
        const url = "/server_classes/";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                classes:res,
                classesDisplay:res
            });
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount(){
        this.getAllClasses();
    }

    handleClose(e){
            this.setState({
                show:false,
                errorMsg:""
            })
    }

    handleOpen(e){
            this.setState({show:true})
    }

    handleChange(e,attr){
        this.state.new[attr] = e.target.value;
        this.setState({new:this.state.new});
    }

    postNewClass(){
        const data = {
            data : this.state.new
        }
        fetch('/server_classes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.state.classes.unshift(res);
            this.setState({classes:this.state.classes});
        })
        .catch(error => console.error('Error:', error));
    }

    handleDelete(class_id){
        location.reload();
    }

    checkSave(e){
        e.preventDefault();
        let details = this.state.new
        if(details.title === "" || details.instructor === "" || details.starttime === "" || details.endtime === "", details.nickname === ""){
            this.setState({errorMsg:"*Please fill in all fields before saving."})
        }else{
            this.handleClose();
            this.postNewClass();
        }
    }

    search(e){
        const input = e.target.value.toLowerCase();
        this.state.classesDisplay = this.state.classes.filter(x=>x.title.toLowerCase().includes(input) || x.instructor.toLowerCase().includes(input) || x.nickname.toLowerCase().includes(input)
            );
        this.setState({classesDisplay:this.state.classesDisplay});
    }



    render(){
        const classList = this.state.classesDisplay? this.state.classesDisplay.map(x=><ClassRow handleDelete={this.handleDelete} key={x.id} details={x}/>) : "";
        return(

                <div className={mainStyles.mainContainer}>
                    <h1 className={mainStyles.title}>Classes</h1>
                    <button className={mainStyles.btn} style={{margin:"0 auto"}} onClick={(e)=>{this.handleOpen(e)}}>Add New Class</button>
                    <div className={mainStyles.container}>
                      <input type="text" placeholder="Search..." onChange={(e)=>{this.search(e)}}
                      />
                      <div className={mainStyles.search}></div>
                    </div>
                    <div className={mainStyles.subContainer}>
                        {classList}
                    </div>
                    <Modal show={this.state.show} onHide={(e)=>{this.handleClose(e)}}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add New Class</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                            <p className={mainStyles.errorMsg}>{this.state.errorMsg}</p>
                                <InputGroup className="mb-3">
                                <FormControl
                                  placeholder="Class Title"
                                  onChange={(e)=>{this.handleChange(e,"title")}}
                                />
                              </InputGroup>
                              <InputGroup className="mb-3">
                                <FormControl
                                  placeholder="Instructor"
                                  onChange={(e)=>{this.handleChange(e,"instructor")}}
                                />
                              </InputGroup>
                              <InputGroup className="mb-3">
                                <FormControl
                                  placeholder="Start Time"
                                  onChange={(e)=>{this.handleChange(e,"starttime")}}
                                />
                                <FormControl
                                  placeholder="End Time"
                                  onChange={(e)=>{this.handleChange(e,"endtime")}}
                                />

                              </InputGroup>
                              <InputGroup className="mb-3">
                                <FormControl
                                  placeholder="Nick name of class eg. SEI - Morn"
                                  onChange={(e)=>{this.handleChange(e,"nickname")}}
                                />
                              </InputGroup>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={(e)=>{this.handleClose(e)}}>
                                Close
                              </Button>
                              <Button
                                variant="danger"
                                type="submit"
                                onClick={(e)=>{this.checkSave(e)}}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                    </Modal>


                </div>

            )
    }


}

export default ClassIndex;