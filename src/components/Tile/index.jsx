import React from "react";
import { toShortNumber } from "../../utils";
import {
  ShareHolder,
  AddButton,
  RemoveButton,
  Variable,
  VariablesWrapper,
  Result,
  Data,
  Title,
  UserInputNumber,
  UserInteractionWrapper
} from "./skin";
import { SmallText, Input } from "../../skin";

const Tile = ({
  title,
  shares,
  payout: { liquidationPreference, paricipation, isCapReached },
  invested,
  cap,
  multiplier,
  participating,
  shareholders,
  setShareholders,
  currentStakeholder,
  toggle,
  setToggle
}) => {
  const isFounders = title === "Founders";
  return (
    <ShareHolder>
      <Title>{title}</Title>
      <Result>
        <span>Shareholding:</span> <Data>{shares.toFixed(2)}%</Data>
      </Result>

      {!isFounders && (
        <Result>
          <span>Investment:</span> <Data>{toShortNumber(invested)}</Data>
        </Result>
      )}
      {!isFounders && (
        <Result>
          <span>Liquidation Preference:</span>
          <Data color={liquidationPreference < invested ? "danger" : "success"}>
            {toShortNumber(liquidationPreference)}
          </Data>
        </Result>
      )}
      <Result>
        <span>Paricipation:</span>
        <Data>
          {toShortNumber(paricipation)}
          {isCapReached && <SmallText>(Capped) </SmallText>}
        </Data>
      </Result>
      <hr />
      <VariablesWrapper>
        {!isFounders && (
          <Variable>
            <span>Cap:</span>
            <UserInteractionWrapper>
              <RemoveButton
                isDisabled={cap < 1}
                onClick={() => {
                  shareholders[currentStakeholder].cap = cap - 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                -
              </RemoveButton>
              <UserInputNumber>{cap}</UserInputNumber>
              <AddButton
                onClick={() => {
                  shareholders[currentStakeholder].cap = cap + 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                +
              </AddButton>
            </UserInteractionWrapper>
          </Variable>
        )}
        {!isFounders && (
          <Variable>
            <span>multiplier:</span>
            <UserInteractionWrapper>
              <RemoveButton
                isDisabled={multiplier < 1}
                onClick={() => {
                  shareholders[currentStakeholder].multiplier = multiplier - 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                -
              </RemoveButton>
              <UserInputNumber>{multiplier}</UserInputNumber>
              <AddButton
                onClick={() => {
                  shareholders[currentStakeholder].multiplier = multiplier + 1;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
              >
                +
              </AddButton>
            </UserInteractionWrapper>
          </Variable>
        )}
        {!isFounders && (
          <Variable>
            <span>participating:</span>
            <div>
              <input
                type="radio"
                onChange={e => {
                  shareholders[currentStakeholder].participating = true;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
                name={`participating-${currentStakeholder}`}
                checked={participating}
              />
              <label>Yes</label>
              <input
                type="radio"
                onChange={e => {
                  shareholders[currentStakeholder].participating = false;
                  setShareholders(shareholders);
                  setToggle(!toggle);
                }}
                name={`participating-${currentStakeholder}`}
                checked={!participating}
              />
              <label>No</label>
            </div>
          </Variable>
        )}
      </VariablesWrapper>
    </ShareHolder>
  );
};

export default Tile;
