import React from "react";
import { Container } from "react-bootstrap";
import ProfileWizard from "../Forms/ProfileWizard";

export default function ProfileWizardPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <ProfileWizard />
    </Container>
  );
}
