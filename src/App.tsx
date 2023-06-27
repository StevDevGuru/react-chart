/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import Prefectures from "./features/prefectures";
import initAxiosGlobalConfigs from "./utils/axiosConfg";
import { Container } from "./components/Layout";

const ignoreIt = (
  <div style={{ marginTop: 30, float: "right" }}>
    <p>Test assessment</p>
  </div>
);

function App() {
  initAxiosGlobalConfigs();
  return (
    <Container>
      <section>
        <Prefectures />
        {ignoreIt}
      </section>
    </Container>
  );
}

export default App;
