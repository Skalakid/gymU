import React, { useCallback, useMemo, useRef } from 'react';

type CardData = {
  translationX: number;
  direction: number;
};

type CardSwitcherContextProviderProps = { children: React.ReactNode };

type CardSwitcherContexttType = {
  cardData: React.MutableRefObject<CardData[]>;
  addCardData: (index: number, translationX: number, direction: number) => void;
  removeCardData: (index: number) => void;
};

const CardSwitcherContextt = React.createContext<CardSwitcherContexttType>({
  cardData: { current: [] },
  addCardData: () => null,
  removeCardData: () => null,
});

function CardSwitcherContexttProvider({
  children,
}: CardSwitcherContextProviderProps) {
  const cardData = useRef<CardData[]>([]);

  const addCardData = useCallback(
    (index: number, translationX: number, direction: number) => {
      if (cardData.current[index]) {
        cardData.current[index] = { translationX, direction };
      } else {
        cardData.current.push({ translationX, direction });
      }
    },
    [],
  );

  const removeCardData = useCallback((index: number) => {
    cardData.current = cardData.current.filter((_, i) => i !== index);
  }, []);

  const value = useMemo(
    () => ({ cardData, addCardData, removeCardData }),
    [addCardData, removeCardData],
  );
  return (
    <CardSwitcherContextt.Provider value={value}>
      {children}
    </CardSwitcherContextt.Provider>
  );
}

function useCardSwitcherContextt() {
  const context = React.useContext(CardSwitcherContextt);
  if (context === undefined) {
    throw new Error(
      'useCardSwitcherContextt must be used within a CardSwitcherContexttProvider',
    );
  }
  return context;
}

export { CardSwitcherContexttProvider, useCardSwitcherContextt };
