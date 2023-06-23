import React from "react";
import styled from "styled-components";
import { stringToColour } from "../utils";
import { useHoveredItem } from "./contexts/HoverItem";
import { useTimeLine } from "./contexts/TimeLineContext";

type TimelineItemProps = {
  name: string;
  children: React.ReactNode;
  from: string;
  to: string;
  color?: string;
};

type StyledTimelineItemProps = {
  name: string;
  from: Date;
  to: Date;
  startFrom: number;
  endTo: number;
  color: string;
};

const getGridRow = (time: Date, endTo: number, start = false) => {
  if (start) {
    return 12 - (time.getMonth() + 1) + (endTo - time.getFullYear()) * 12;
  } else {
    return 12 - time.getMonth() + (endTo - time.getFullYear()) * 12;
  }
};

const StyledTimelineItem = styled.div`
  background: ${({ name, color }: StyledTimelineItemProps) =>
    color || stringToColour(name)};
  border-radius: 0.5rem;
  grid-auto-rows: 2fr;
  box-shadow: 0 0 9px -3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column-start: 1;
  grid-column-end: 2;
  justify-content: space-between;
  /* grid-area: ${({ name }: StyledTimelineItemProps) => name}; */
  grid-row-start: ${({ to, endTo }: StyledTimelineItemProps) =>
    getGridRow(to, endTo, true)};
  grid-row-end: ${({ from, endTo }: StyledTimelineItemProps) => {
    return getGridRow(from, endTo);
  }};
`;

const TimelineItem = (props: TimelineItemProps) => {
  const { children, name, from, to, color } = props;
  const { from: startFrom, to: endTo } = useTimeLine();
  const { setHovered } = useHoveredItem();
  return (
    <StyledTimelineItem
      onMouseOut={() => {
        setHovered({
          start: 0,
          end: 0
        });
      }}
      onMouseOver={() => {
        setHovered({
          start: getGridRow(new Date(to), endTo, true),
          end: getGridRow(new Date(from), endTo)
        });
      }}
      startFrom={startFrom}
      endTo={endTo}
      from={new Date(from)}
      to={new Date(to)}
      name={name}
      color={color}
    >
      <div></div>
      <div>{children}</div>
      <div></div>
    </StyledTimelineItem>
  );
};

export default TimelineItem;
