import React from "react";
import { History as HistoryType } from "../util/history";
import styled from "styled-components";
import { getDateTime } from "../util/datetime";

const Wrapper = styled.div`
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 188px;
`;

const HistoryWrapper = styled.button`
  align-items: center;
  background-color: white;
  border: 1px solid silver;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 104px;
  margin: 4px;
  overflow: hidden;
  padding: 4px;
  width: 184px;
`;

const Thumbnail = styled.img`
  display: inline-block;
  height: 96px;
  margin: 4px 8px 4px 4px;
  object-fit: contain;
  width: 96px;
`;

const DateTimeWrapper = styled.div`
  display: inline-block;
`;

const DateText = styled.div`
  font-size: 11px;
  line-height: 20px;
`;

const TimeText = styled.div`
  font-size: 16px;
  line-height: 20px;
`;

interface Props {
  histories: HistoryType[];
  onSelect: (history: HistoryType) => void;
}

export const History: React.FC<Props> = (props) => {
  const { histories, onSelect } = props;

  return (
    <Wrapper>
      {histories.map((history) => {
        const { year, month, day, hour, minute, second } = getDateTime(new Date(history.datetime));

        return (
          <HistoryWrapper key={history.datetime} onClick={() => onSelect(history)}>
            <Thumbnail src={history.thumbnailDataUrl} />
            <DateTimeWrapper>
              <TimeText>
                {hour}:{minute}:{second}
              </TimeText>
              <DateText>
                {year}-{month}-{day}
              </DateText>
            </DateTimeWrapper>
          </HistoryWrapper>
        );
      })}
    </Wrapper>
  );
};
