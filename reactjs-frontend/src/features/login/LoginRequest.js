import React, { Component } from 'react';
import axios from "axios";


class LoginRequest extends Component {

    state = { 
        details: [], 
    }; 

    componentDidMount() { 
        let data; 

        let params = {
            username: this.props.username,
            password: this.props.password
        }
  
        axios.post("http://localhost:8000/token/", params) 
            .then((res) => { 
                data = res.data;
                this.setState({ 
                    details: data['token'], 
                });
            }) 
            .catch((err) => {}); 
    }

    render() {
        console.log(this.state.details);
        return(<div></div>);
    }


}

export default LoginRequest;