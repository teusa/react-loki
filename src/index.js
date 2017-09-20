import React, { Component } from 'react';

import LokiStep from './LokiStep';
import LokiStepContainer from './LokiStepContainer';

import './scss/index.scss';

class Loki extends Component {
    static defaultProps = {
        steps: [],
        backLabel: 'Back',
        nextLabel: 'Next',
        finishlabel: 'Finish',
    }

    state = {
        currentStep: 1,
    }

    _back() {
        this.setState({ currentStep: this.state.currentStep - 1 });
        this.props.onBack && this.props.onBack();
    }

    _next() {
        if (this.state.currentStep === this.props.steps.length) {
            return this.props.onFinish();
        }

        this.setState({ currentStep: this.state.currentStep + 1 });
        this.props.onNext && this.props.onNext();
    }

    _renderSteps() {
        if (this.props.renderSteps) {
            return this.props.renderSteps({ 
                currentStep: this.state.currentStep,
            });
        }

        const steps = this.props.steps.map((step, index) => (
            <LokiStep 
                key={index} 
                currentStep={this.state.currentStep} 
                totalSteps={this.props.steps.length} 
                step={{...step, index: index + 1}} />
        ));

        return <LokiStepContainer>{steps}</LokiStepContainer>;
    }

    _renderComponents() {
        if (this.props.renderComponents) {
            return this.props.renderComponents({
                currentStep: this.state.currentStep,
            });
        }

        const stepIndex = this.state.currentStep - 1;
        const cantBack = this.state.currentStep === 1;
        const isInFinalStep = this.state.currentStep === this.props.steps.length;
        const component = this.props.steps[stepIndex].component;

        if (this.props.noActions) {
            return React.cloneElement(component, {
                backLabel: this.props.backLabel,
                nextLabel: isInFinalStep ? this.props.finishlabel : this.props.nextLabel,
                cantBack,
                isInFinalStep,
                onBack: this._back.bind(this),
                onNext: this._next.bind(this),
            });
        }

        return component;
    }

    _renderActions() {
        // If we want custom actions we render them
        if (this.props.renderActions) { return this.props.renderActions(); }

        // If we don't want the buttons we do not render them
        if (this.props.noActions) { return; }

        const cantBack = this.state.currentStep === 1;
        const isInFinalStep = this.state.currentStep === this.props.steps.length;

        return (
            <div className="Loki-Actions">
                <button type="button" onClick={this._back.bind(this)} disabled={cantBack}>
                    {this.props.backLabel}
                </button>
                <button type="button" onClick={this._next.bind(this)}>
                    {isInFinalStep ? this.props.finishlabel : this.props.nextLabel}
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="Loki">
                {this._renderSteps()}
                {this._renderComponents()}
                {this._renderActions()}
            </div>
        );
    }
}

export {
    Loki as default,
    LokiStepContainer,
    LokiStep,
};