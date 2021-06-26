import * as React from 'react';

import Category from '../components/Category';
import Footer from '../components/Footer';
import Header from '../components/Header';

import data from '../data/snow.json';

const SnowPage = () => {
    const { links, locations } = data;
    return (
        <>
            <Header />
            <main className="main-content">
                <Category links={links} locations={locations} />
            </main>
            <Footer />
        </>
    );
};

export default SnowPage;
