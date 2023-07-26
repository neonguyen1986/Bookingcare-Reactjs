import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

import { createNewUser } from '../../services/userService'

class UserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: 0,
            roleId: 0,
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset child state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: 0,
                roleId: 0,
            })
        })
    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }

    //================CREATE================
    handleOnChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    ////good way to write setState  
    // handleOnChangeInput = (e) => {
    //     let copyState = {...this.state}
    //     copyState[e.target.name] = e.target.value
    //     this.setState({
    //         ...copyState
    //     })
    // }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            //Call API
            //truyền this.state từ con sang cha
            this.props.createNewUserDad(this.state);
        }
    }


    render() {
        // console.log('>>>check props:', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
                centered={true}>
                <ModalHeader toggle={() => this.toggle}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container' >
                            <label>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={this.state.email}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Password</label>
                            <input type='password'
                                name='password'
                                value={this.state.password}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>First Name</label>
                            <input type='text'
                                name='firstName'
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Last Name</label>
                            <input type='text'
                                name='lastName'
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Address</label>
                            <input type='text'
                                name='address'
                                value={this.state.address}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Phone Number</label>
                            <input type='email'
                                name='phoneNumber'
                                value={this.state.phoneNumber}
                                onChange={(e) => this.handleOnChangeInput(e)} />
                        </div>
                        <div className='input-container' >
                            <label>Gender</label>
                            <select name="gender" className="form-control" defaultValue='1'>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select name="roleId" className="form-control" defaultValue='1'>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='btn px-2'
                        color="primary"
                        onClick={() => this.handleAddNewUser()}>
                        Save Changes
                    </Button>{' '}
                    <Button className='btn px-2' color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>

                </ModalFooter>
            </Modal>
        )
    }
}



const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);



