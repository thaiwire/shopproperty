"use client";
import React from "react";
import { Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import Basic from "./basic";
import Location from "./location";
import Media from "./media";
import Amenities from "./amenities";
import Contact from "./contact";

export interface PropertiesFormStepProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  finalValues: any;
  setFinalValues: (values: any) => void;
}

function PropertiesForm() {
  const [finalValues, setFinalValues] = React.useState({
    basic: {},
    location: {},
    amenities: {},
    media: {},
    contact: {},
  });
  const [currentStep = 0, setCurrentStep] = React.useState(0);
  const commonPropsForSteps = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
  };

  const steps = [
    {
      title: "Basic",
      content: <Basic {...commonPropsForSteps} />,
    },
    {
      title: "Location",
      content: <Location {...commonPropsForSteps} />,
    },

    {
      title: "Amenities",
      content: <Amenities {...commonPropsForSteps} />,
    },
    {
      title: "Media",
      content: <Media {...commonPropsForSteps} />,
    },
    {
      title: "Contact",
      content: <Contact {...commonPropsForSteps} />,
    },
  ];

  return (
    <div>
      <Steps current={currentStep} items={steps} />
      <div className="mt-8">{steps[currentStep].content}</div>
    </div>
  );
}

export default PropertiesForm;
