import React, { Fragment, Suspense } from 'react';
import { useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useAccountTrigger } from '@magento/peregrine/lib/talons/Header/useAccountTrigger';
import { useStyle } from '@magento/venia-ui/lib/classify';

import AccountChip from './AccountChip/accountChip';

import defaultClasses from './accountTrigger.module.css';
import { Components } from 'antd/lib/date-picker/generatePicker';

const AccountMenu = React.lazy(() => import('./AccountMenu/accountMenu'));

/**
 * The AccountTrigger component is the call to action in the site header
 * that toggles the AccountMenu dropdown.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 */
const Pincode = props => {
    const talonProps = useAccountTrigger();
    const {
        accountMenuIsOpen,
        accountMenuRef,
        accountMenuTriggerRef,
        setAccountMenuIsOpen,
        handleTriggerClick
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = accountMenuIsOpen ? classes.root_open : classes.root;
    const { formatMessage } = useIntl();

    return (
        <Fragment>
            <div className={rootClassName} ref={accountMenuTriggerRef}>
                <button
                    aria-label={formatMessage({
                        id: 'accountTrigger.ariaLabel',
                        defaultMessage: 'Toggle My Account Menu'
                    })}
                    className={classes.trigger}
                    onClick={handleTriggerClick}
                    data-cy="AccountTrigger-trigger"
                >
                    <AccountChip
                        fallbackText={formatMessage({
                            id: 'accountTrigger.buttonFallback',
                            defaultMessage: 'PinCode'
                        })}
                        shouldIndicateLoading={true}
                    />
                </button>
            </div>
            <Suspense fallback={null}>
                <AccountMenu
                    ref={accountMenuRef}
                    accountMenuIsOpen={accountMenuIsOpen}
                    setAccountMenuIsOpen={setAccountMenuIsOpen}
                />
            </Suspense>
        </Fragment>
    );
};

export default Pincode;

Pincode.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        trigger: string
    })
};

// import React, { useState } from "react";
// import "./pincode.module.css";
// import { useAccountTrigger } from '@magento/peregrine/lib/talons/Header/useAccountTrigger';
// import { useStyle } from '@magento/venia-ui/lib/classify';
// import defaultClasses from './accountTrigger.module.css';

// const AccountMenu = React.lazy(() => import('./AccountMenu/accountMenu'));

// const pincode = (props) => {
//   // const [isOpen, setIsOpen] = useState(true);
//   const talonProps = useAccountTrigger();
//   const {
//     handleTriggerClick
// } = talonProps;
// const classes = useStyle(defaultClasses, props.classes);

//   // function toggleModal() {
//   //   console.log("Heee");
//   //   setIsOpen(!isOpen);
    
//   // }

//   return (
//     <div>
//     {/* <button onClick={toggleModal}>Open modal</button> */}

//     {/* <Modal 
//       isOpen={isOpen}
//       onRequestClose={toggleModal}
//       contentLabel="My dialog"
//       className="modal"
//     >
//       <div>My modal dialog.</div>
//       <button onClick={toggleModal}>Close modal</button>
//     </Modal> */}

//               <button

//                     className={classes.trigger}
//                     onClick={handleTriggerClick}
//                 >Dialog</button>
    
//   </div>
    
//   );
// }


// export default pincode
  