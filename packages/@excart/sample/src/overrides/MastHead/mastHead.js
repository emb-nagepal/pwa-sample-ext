import React from 'react';
import { shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Link } from 'react-router-dom';
import Logo from '@magento/venia-ui/lib/components/Logo';
import defaultClasses from './masthead.css';
const Masthead = props => {
const classes = mergeClasses(defaultClasses, props.classes);
return (
    <>
    <Link className={classes.logo} to="/">
    <Logo />
   </Link>
<div className={classes.root}>

<img src="https://www.ubertheme.com/wp-content/themes/runaway/assets/img/walls/head-pd.jpg" />
<div className={classes.headcontent}>
<h2 className={classes.title}>Hello PWA!</h2>
<p className={classes.desc}>The Magento PWA Studio project is a set of developer tools that allow you to develop, deploy, and maintain a PWA storefront on top of Magento 2.</p>
</div>
</div>
</>
);
};

Masthead.propTypes = {
classes: shape({
root: string
})
};

export default Masthead;