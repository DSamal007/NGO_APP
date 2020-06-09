import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        axios.delete('http://localhost:3025/users/logout')
            .then((response) => {
                console.log(response)
                if (response.data.error) {
                    swal(response.data.error)
                }
                else {                    
                    const confirmRemove = window.confirm('Are you Sure')
                    if (confirmRemove) {
                        const token = response.data.token
                        localStorage.removeItem('authToken', token)
                        
                        swal('Succssfully logged out')
                        this.props.history.push('/users/login')
                        window.location.reload()
                        
                        
                    } 
                    if(!confirmRemove){
                        this.props.history.push('/')
                    }

                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>

            </div>
        )
    }

}