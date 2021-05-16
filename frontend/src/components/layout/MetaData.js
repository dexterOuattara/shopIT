import React, { Fragment} from "react";
import {Helmet} from "react-helmet";
import '../../App.css';

const MetaData = ({ title }) => {
    return (
        <helmet>
            <title>{`${title} - ShopIT`}</title>
        </helmet>
    )
}

export default MetaData