import * as React from 'react';
import { navigate } from 'gatsby';

import '../styles/containers/Layout.scss';

const ErrorPage = () => {
    const currentMonth = new Date().getMonth();

    // set it to snow if we're October - March, otherwise default to surf
    if (currentMonth > 8 || currentMonth < 3) {
        navigate(`/snow`);
    } else {
        navigate(`/surf`);
    }

    return <></>;
};

export default ErrorPage;
