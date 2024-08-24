"use client";
import React, { useCallback, useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import Input from "./Input";

export default function Simple() {
  const [comp, setComp] = useState("");
  const [name, setName] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const handleComplete = () => {
    console.log("From completed");
  };
  const tabChanged = ({
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number;
    nextIndex: number;
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };
  return (
    <>
      <FormWizard
        onComplete={handleComplete}
        onTabChange={tabChanged}
        color="#404040"
      >
        <FormWizard.TabContent title="Personal details" icon="ti-user">
          <select>
            <option>...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>

          <Input
            label="Company"
            onChange={(ev: any) => setComp(ev.target.value)}
            id="Company"
            type="Company"
            value={comp}
          />
          <Input
            label="Name"
            onChange={(ev: any) => setName(ev.target.value)}
            id="Name"
            type="Name"
            value={name}
          />
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Additional Info" icon="ti-settings">
          <h3>Secand Tab</h3>
          <p>Some content for the secand tab</p>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Last step" icon="ti-check">
          <h3>Last Tab</h3>
          <p>Some content for the last tab</p>
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Camera" icon="ti-camera">
          <h3>Camera</h3>
          <p>Some content for the last tab</p>
        </FormWizard.TabContent>
      </FormWizard>
      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </>
  );
}
