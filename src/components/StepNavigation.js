import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const StepNavigation = ({ currentStep, setCurrentStep, handleSaveAndNavigate }) => {
    const router = useRouter();

    const navigateToStep = async (step) => {
        if (currentStep !== step) {
            await handleSaveAndNavigate(step);
        }
    };

    return (
        <>
            <div className="primary-step primary-step-header">Teraz jesteś na etapie:</div>
            <div className="steps">
                <span className={`step ${currentStep === 'form' ? 'current' : ''}`}
                      onClick={() => navigateToStep('form')}>Pierwszych informacji</span>
                <span className={`step ${currentStep === 'details' ? 'current' : ''}`}
                      onClick={() => navigateToStep('details')}>Informacji o osobie zmarłej</span>
                <span className={`step ${currentStep === 'funeraldetails' ? 'current' : ''}`}
                      onClick={() => navigateToStep('funeraldetails')}>Organizacji pogrzebu</span>
                <span className={`step ${currentStep === 'assortment' ? 'current' : ''}`}
                      onClick={() => navigateToStep('assortment')}>Asortymentu</span>
            </div>
        </>
    );
};

StepNavigation.propTypes = {
    currentStep: PropTypes.string.isRequired,
    setCurrentStep: PropTypes.func.isRequired,
    handleSaveAndNavigate: PropTypes.func.isRequired,
};

export default StepNavigation;
