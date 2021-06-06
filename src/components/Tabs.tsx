import { PropsWithChildren, ReactChild, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TabScroller, { TabScrollerProps } from "./TabScroller";
import Tab, { TabPropsWithoutChildren } from './Tab';
import React from 'react';

interface TabsProps {
  index?: string,
  currentIndex?: number,
  onChange: (index: string) => any,
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

interface ScrollerProps {
  x: number,
  width: number,
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

const Tabs = function({ index = '0', children, onChange }: PropsWithChildren<TabsProps>) {
  const [processedChildren, setProcessedChildren] = useState<React.ReactNode>([]);
  const [indexes, setIndexes] = useState<string[]>([]);
  const [scrollerProps, setScrollerProps] = useState<TabScrollerProps>({});
  const [tabsSize, setTabsSize] = useState<TabsInfo>({});
  const tabsRef = useRef<HTMLUListElement>(null);

  const handleScrollerMove = useCallback((x: number, width: number) => {
    setScrollerProps({ x, width });
  }, [tabsSize]);
  
  const onTabClick = useCallback((index: string) => {
    onChange(index);
  }, [onChange]);

  useEffect(() => {
    if (!tabsRef.current || !tabsRef.current.children) return;

    const extractedIndexes: string[] = [];
    const processedChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) return null;
      if (child.type !== Tab) return null;

      let childIndex = '0';

      if ((child.props as TabPropsWithoutChildren).index) childIndex = child.props.index;

      extractedIndexes.push(childIndex);

      return React.cloneElement(child,  { onClick: onTabClick, active: (index === childIndex) });
    })
    setProcessedChildren(processedChildren);
    setIndexes(extractedIndexes);
  }, [children, onTabClick]);

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

    handleScrollerMove(tabInfo.position.x, tabInfo.dimentions.width);

  }, [index]);

  useEffect(() => {
    const childIndex = indexes.indexOf(index);

    if (childIndex === -1 || !tabsSize[index]) return;

    const x = tabsSize[index].position.x;
    const width = tabsSize[index].dimentions.width;

    handleScrollerMove(x, width);
  }, [index, handleScrollerMove, indexes, tabsSize]);

  return(
  <TabScroller {...scrollerProps}>
    <List ref={tabsRef}>
    { processedChildren }
    </List>
  </TabScroller>
  )
}

export default Tabs;