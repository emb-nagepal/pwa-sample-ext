import React , {useState } from 'react';
import { shape, string } from 'prop-types';
import { useAccountMenu } from '@magento/peregrine/lib/talons/Header/useAccountMenu';

import { useStyle } from '@magento/venia-ui/lib/classify';
// import CreateAccount from '../CreateAccount';
// import SignIn from '../SignIn/signIn';
// import AccountMenuItems from './accountMenuItems';
// import ForgotPassword from '../ForgotPassword';
import defaultClasses from './accountMenu.module.css';


const AccountMenu = React.forwardRef((props, ref) => {
    const { accountMenuIsOpen, setAccountMenuIsOpen } = props;
    const talonProps = useAccountMenu({
        accountMenuIsOpen,
        setAccountMenuIsOpen
    });
    const {
        view,
        // username,
        // handleAccountCreation,
        // handleSignOut,
        // handleForgotPassword,
        // handleCancel,
        // handleCreateAccount,
        // updateUsername
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = accountMenuIsOpen ? classes.root_open : classes.root;
    const contentsClass = accountMenuIsOpen
        ? classes.contents_open
        : classes.contents;

    let dropdownContents = null;

    const [input, setInput] = useState('');
    const modalStyle ={
        backgroundColor: "purple",
        boxSizing: "border-box",
        padding:" 7px 12px 5px",
        lineHeight: "2.5rem",
        outline: "none",
        border: "1px solid #e8e8e8",
        width: "100%",
        textAlign: "left",
        maxHeight: "81vh",
        overflow: "auto",
        position: "relative",
        margin: "0.5rem auto",
        // maxWidth: "30vw",
        // top: "10vh",
        // transform: "translateX(-100%)",
        
    }

    const textStyle = {
        color: "white",
        padding: "10px",
        fontFamily: "Bold",
        fontSize: "2rem",
      };
      const inputStyle={
          border: "black ",
          padding:" 5px 10px 5px 10px",
          borderRadius:"2rem"

      }
      
      const h3Style= {
        color: "white",
        padding: "10px",
        fontFamily: "Bold",
        fontSize: "1.5rem",
      }

      const btnStyle ={
        background: "#fa9322",
        color: "#000",
        borderRadius: "10px",
        margin:" 0 5px",
        width: "5rem",
        fontFamily: "Bold",
        fontSize: "1rem",
      }

    switch (view) {
        // case 'ACCOUNT': {
        //     dropdownContents = <AccountMenuItems onSignOut={handleSignOut} />;

        //     break;
        // }
        // case 'FORGOT_PASSWORD': {
        //     dropdownContents = (
        //         <ForgotPassword
        //             initialValues={{ email: username }}
        //             onCancel={handleCancel}
        //         />
        //     );

        //     break;
        // }
        // case 'CREATE_ACCOUNT': {
        //     dropdownContents = (
        //         <CreateAccount
        //             classes={{ root: classes.createAccount }}
        //             initialValues={{ email: username }}
        //             isCancelButtonHidden={false}
        //             onSubmit={handleAccountCreation}
        //             onCancel={handleCancel}
        //         />
        //     );

        //     break;
        // }
        // case 'SIGNIN':
        default: {
            dropdownContents = (
                // <SignIn
                //     classes={{
                //         modal_active: classes.loading
                //     }}
                //     setDefaultUsername={updateUsername}
                //     showCreateAccount={handleCreateAccount}
                //     showForgotPassword={handleForgotPassword}
                // />
                <div id='modal' style={modalStyle}>
                    <div style={textStyle }>
                    <h1>ITC BRANDS.</h1>
                    <h1>TOUCHING YOUR LIFE.</h1>
                    <h1> EVERYDAY.</h1>
                    
                    </div>
                    <h3 style={h3Style }>Where would you like us to deliver?</h3>
                    <input type='text' placeholder="Enter the Pincode" value={input} onInput={e => setInput(e.target.value)} style={inputStyle }/>
                    <button style={btnStyle} >Proceed</button>
                </div>
            );

            break;
        }
    }

    return (
        <aside className={rootClass} data-cy="AccountMenu-root">
            <div ref={ref} className={contentsClass}>
                {accountMenuIsOpen ? dropdownContents : null}
            </div>
        </aside>
    );
});

export default AccountMenu;

AccountMenu.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        link: string,
        contents_open: string,
        contents: string
    })
};
