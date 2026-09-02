import React from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import FeaturedProjects from '../components/FeaturedProjects';
import PriceCalculatorPreview from '../components/PriceCalculatorPreview';
import ModularJourney from '../components/ModularJourney';
import Workshop from '../components/Workshop';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <>
            <Hero />
            <Expertise />
            <WhyChooseUs />
            <HowItWorks />
            <FeaturedProjects />
            <PriceCalculatorPreview />
            <ModularJourney />
            <Workshop />
            <Testimonials />
        </>
    );
};

export default Home;
