import Page from "@/app/sign-in/[[...sign-in]]/page";
import PageTitle from "@/components/page-title";
import React from "react";
import PropertiesForm from "../../_components/properties-form";

function EditPropertyPage() {
  return (
    <div>
      <PageTitle title="Edit Property" />
      <PropertiesForm />
    </div>
  );
}

export default EditPropertyPage;
