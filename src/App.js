import React, { useState, useEffect, useReducer, Fragment } from "react";
import { Row } from "styled-bootstrap-grid";
import uuid from "uuid";
import { ResetData, Input, ContentCenter, Container } from "./skin";
import Tile from "./components/Tile";
import Footer from "./components/Footer";
import Summary from "./components/Summery";
import { shareholdersReducer } from "./reducers";
import {
  defaultShareHoldersData,
  initialState,
  defaultExitValue
} from "./constants";

const App = () => {
  const [state, dispatch] = useReducer(shareholdersReducer, initialState);
  const [callPreferredStock, setCallPreferredStock] = useState(false);
  const [callThree, setCallThree] = useState(false);
  const { exitValue, cappedInvestors, commonStockSum, shareholders } = state;
  console.log(">>> RETURN FROM DISPATCH ", { ...state });
  useEffect(
    () => {
      dispatch({ type: "preferredStock", payload: { ...state } });
      // dispatch({ type: "theThree", payload: { ...state } });
    },
    [exitValue]
  );

  useEffect(
    () => {
      // console.log("second one... ", commonStockSum);
      dispatch({ type: "theThree", payload: { ...state } });
    },
    [commonStockSum]
  );

  console.log("capped pariticpation ", cappedInvestors);
  const cappedParticipation = cappedInvestors.reduce((accumlator, i) => {
    return accumlator + i.payout.participation;
  }, 0);

  return (
    <Fragment>
      <Container>
        <ContentCenter alignItem="center">
          <Input
            value={exitValue}
            step={1000000}
            type="number"
            onChange={e =>
              dispatch({ type: "exitValue", payload: e.target.value })
            }
            placeholder="Exit value"
          />
          <ResetData
            onClick={() => {
              dispatch({
                type: "shareholders",
                payload: defaultShareHoldersData
              });
              dispatch({
                type: "cappedInvestors",
                payload: []
              });
              dispatch({
                type: "exitValue",
                payload: defaultExitValue
              });
            }}
          >
            Reset
          </ResetData>
        </ContentCenter>
        <ContentCenter>
          <Summary
            exitValue={exitValue}
            commonStockSum={commonStockSum}
            cappedParticipation={cappedParticipation}
          />
        </ContentCenter>
        <Row>
          <ContentCenter>
            {shareholders.map(s => {
              // If there are any capped investor, to disable
              // all but the capped ones.
              console.log("hey there!!!! ", s);
              const props = {
                currentShareHolder: s,
                cappedInvestors,
                dispatch,
                callPreferredStock,
                setCallPreferredStock
              };
              return <Tile key={uuid()} {...props} />;
            })}
          </ContentCenter>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default App;
