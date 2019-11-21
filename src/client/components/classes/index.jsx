import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from '../../style.scss';
import ClassRow from './classrow'

class ClassIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            classes : null
        }

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
            this.setState({classes:res});
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount(){
        this.getAllClasses();
    }



    render(){
        const classList = this.state.classes? this.state.classes.map(x=><ClassRow key={x.id} details={x}/>) : "";
        return(
                <div className={mainStyles.mainContainer}>
                    <h1 className={mainStyles.title}>Classes</h1>
                    {classList}
                </div>
            )
    }


}

export default ClassIndex;