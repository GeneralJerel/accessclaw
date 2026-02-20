import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Architecture from '../components/Architecture';
import TargetUser from '../components/TargetUser';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <main>
                <Hero />
                <Features />
                <Architecture />
                <TargetUser />
            </main>

            <Footer />
        </>
    );
}

export default Home;
