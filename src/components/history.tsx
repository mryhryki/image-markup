import React from "react";
import { History as HistoryType } from "../util/history";
import styled from "styled-components";

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

const pad = (num: number): string => `0${num}`.substr(-2, 2);

export const History: React.FC<Props> = (props) => {
  const { histories, onSelect } = props;

  return (
    <Wrapper>
      {histories.map((history) => {
        const datetime = new Date(history.datetime);
        const date = `${datetime.getFullYear()}-${pad(datetime.getMonth() + 1)}-${pad(datetime.getDate())}`;
        const time = `${pad(datetime.getHours())}:${pad(datetime.getMinutes())}:${pad(datetime.getSeconds())}`;

        return (
          <HistoryWrapper key={history.datetime} onClick={() => onSelect(history)}>
            <Thumbnail src={history.thumbnailDataUrl} />
            <DateTimeWrapper>
              <TimeText>{time}</TimeText>
              <DateText>{date}</DateText>
            </DateTimeWrapper>
          </HistoryWrapper>
        );
      })}
    </Wrapper>
  );
};
