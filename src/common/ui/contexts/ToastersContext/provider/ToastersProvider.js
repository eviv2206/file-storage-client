import PropTypes from 'prop-types';
import { ToastersContext } from '../ToastersContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from '../styles/Toaster.module.scss';


const ToastersProvider = (props) => {
    const showToasterError = (message) => {
        toast(message, { className: s.toast_error });
    };

    const showToasterNotification = (message) => {
        toast(message, { className: s.toaster_notification });
    };

    const showToasterSuccess = (message) => {
        toast(message, { className: s.toast_success });
    };


    return (
        <ToastersContext.Provider value={{ showToasterError, showToasterNotification, showToasterSuccess }}>
            {props.children}
            <ToastContainer
                className={s.toaster_container}
                hideProgressBar={true}
                bodyClassName={s.toaster_body}
                position={toast.POSITION.BOTTOM_RIGHT}
                limit={6}
                autoClose={5000}/>
        </ToastersContext.Provider>
    );

};

ToastersProvider.propTypes = {
    children: PropTypes.element
};

export default ToastersProvider;