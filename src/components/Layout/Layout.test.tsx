import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Container, Row, Col } from "./index";

describe("Grid", () => {
  test("Container renders children correctly", () => {
    render(
      <Container>
        <div>Child Element</div>
      </Container>
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });

  test("Row renders children correctly", () => {
    render(
      <Row>
        <div>Child Element</div>
      </Row>
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });

  test("Col renders children correctly", () => {
    render(
      <Col span={6} sm={3}>
        <div>Child Element</div>
      </Col>
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });
});
