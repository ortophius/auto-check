import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TabScroller, { TabScrollerProps } from "./TabScroller";
import Tab, { TabPropsWithoutChildren } from './Tab';
import React from 'react';

interface TabsProps {
  index?: string,
  currentIndex?: number,
  onChange: (index: number) => any,
}

interface TabInfo {
  position: {
    x: number,
    y: number,
  }
  dimentions: {
    width: number,
  }
}

interface TabsInfo {
  [key: string]: TabInfo
}

const List = styled.ul`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  list-style-type: none;
  padding-left: 0;
  z-index: 1;
`;

const Scroller = styled.span`

`;

const Tabs = function({ index = '0', children, onChange }: PropsWithChildren<TabsProps>) {
  // todo: add onClick handlers via React.CloneElement()
  const [indexes, setIndexes] = useState<number[]>([]);
  const [scrollerProps, setScrollerProps] = useState<TabScrollerProps>({});
  const [tabsSize, setTabsSize] = useState<TabsInfo>({});
  const tabsRef = useRef<HTMLUListElement>(null);
  const onTabClick = useCallback((index: number) => {

  }, []);

  useEffect(() => {
    if (!tabsRef.current || !tabsRef.current.children) return;

    const tabsContainer = tabsRef.current;
    const containerRect = tabsContainer.getBoundingClientRect();
    const extractedIndexes: number[] = [];
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) return null;
      if (child.type !== Tab) return null;

      let index = 0;

      if ((child.props as TabPropsWithoutChildren).index) index = child.props.index;

      extractedIndexes.push(index);
    })
    setIndexes(extractedIndexes);
  }, [children]);

  useEffect(() => {
    if (!tabsRef.current || !indexes[0]) return;
    const tabsContainer = tabsRef.current;
    const tabElems = Array.from(tabsContainer.children);
    const containerRect = tabsContainer.getBoundingClientRect();
    const newTabsSize: TabsInfo = {};
    tabElems.forEach((tab, i) => {
      const tabRect = tab.getBoundingClientRect();
      const indexString = indexes[i];
      newTabsSize[indexString] = {
        position: {
          x: tabRect.left - containerRect.left,
          y: tabRect.top - containerRect.top,
        },
        dimentions: {
          width: tabRect.width,
        },
      }
    });
    setTabsSize(newTabsSize);

  }, [tabsRef, indexes]);

  useEffect(() => {
    if (Object.keys(tabsSize).indexOf(index) === -1) return;
    
    const tabInfo = tabsSize[index];
    
    setScrollerProps({
      x: tabInfo.position.x,
      width: tabInfo.dimentions.width,
    });

  }, [index, indexes, tabsSize]);

  return(
  <TabScroller {...scrollerProps}>
    <List ref={tabsRef}>
    { children }
    </List>
  </TabScroller>
  )
}

export default Tabs;