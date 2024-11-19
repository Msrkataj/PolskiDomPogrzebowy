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
                <span className={`step ${currentStep === 'formularz-pierwszy' ? 'current' : ''}`}
                      onClick={() => navigateToStep('formularz-pierwszy')}>Pierwszych informacji</span>
                <span className={`step ${currentStep === 'formularz-drugi' ? 'current' : ''}`}
                      onClick={() => navigateToStep('formularz-drugi')}>Informacji o osobie zmarłej</span>
                <span className={`step ${currentStep === 'formularz-trzeci' ? 'current' : ''}`}
                      onClick={() => navigateToStep('formularz-trzeci')}>Organizacji pogrzebu</span>
                <span className={`step ${currentStep === 'assortyment' ? 'current' : ''}`}
                      onClick={() => navigateToStep('assortyment')}>Asortymentu</span>
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
