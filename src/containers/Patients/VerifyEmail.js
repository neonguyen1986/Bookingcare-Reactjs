import React, { Component } from 'react';
import { connect } from "react-redux";
// import './VerifyEmail.scss'
import { FormattedMessage } from 'react-intl';
import { postVerifyBookingAppointment } from '../../services/userService'
import HomeHeader from '../Auth/HomePage/HomeHeader';
import { LANGUAGE } from '../../utils';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from 'react-router-dom';

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookingStatus: false,
            isLoading: false,
        }
    }
    async componentDidMount() {
        if (this.props?.location?.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorid')
            console.log('check params', token, '       ', doctorId)

            // this.setState({
            //     doctorIdParam: doctorid,
            //     tokenParam: token,
            // })
            let res = ''
            setTimeout(async () => {
                res = await postVerifyBookingAppointment({
                    token,
                    doctorId,
                })
                console.log('>>>>check res', res)
                if (res && res.errCode === 0) {
                    this.setState({
                        bookingStatus: true,
                        isLoading: true
                    })
                } else if (res.errCode === 1 || res.errCode === 2) {
                    this.setState({
                        bookingStatus: false,
                        isLoading: true,
                    })
                }
            }, 1000)


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let language = this.props.language;
        let { bookingStatus, isLoading } = this.state;
        console.log('check state from VerifyEmail:', this.state)
        return (
            <>
                <HomeHeader
                    isShowBanner={false} />
                {isLoading === false
                    ? <div className='title'>
                        Loading data...
                    </div>
                    : <>
                        <div className='title'>
                            {bookingStatus === true
                                ? <FormattedMessage id='patient.verify.verify-success' />
                                : <FormattedMessage id='patient.verify.verify-fail' />
                            }
                        </div>
                        <button className='btn btn-info mx-auto d-block my-4'>
                            <Link to='/home' style={{ textDecoration: 'none', color: 'inherit', }}>
                                <FormattedMessage id='patient.verify.back-to-homepage' />
                            </Link>
                        </button>
                    </>
                }
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
