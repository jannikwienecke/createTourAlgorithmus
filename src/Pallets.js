import React, { useState, useEffect } from "react";

import { LoadingZone, PalleteWrapper, LKW } from "./styles";
import { DIMENSIONS } from "./constants";
import { compare, copy } from "./helper";
import { validate } from "./algorithmus";

const Pallets = ({ delivery }) => {
  const [trucks, setTrucks] = useState(null);
  const [rerender, setRerender] = useState(null);
  const [palletFocus, setPalletFocus] = useState(null);

  useEffect(() => {
    getTrucks();
  }, [delivery]);

  const switchSpaces = (index, indexLkw, p1) => {
    trucks[indexLkw].pallets[index] = copy(palletFocus.pallet);
    trucks[palletFocus.indexLkw].pallets[palletFocus.index] = copy(p1);
    setTrucks(trucks);
    setPalletFocus(null);
    setRerender(true);
    setTimeout(() => {
      setRerender(false);
    }, 5);
  };

  const isSamePallet = (indexLkw, index) => {
    if (
      palletFocus &&
      index === palletFocus.index &&
      indexLkw === palletFocus.indexLkw
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClickFreeSpace = (indexLkw, index, freeSpace) => {
    // console.log("CLICK FREE SPACE...", indexLkw, index, freeSpace);

    if (palletFocus) {
      const { width, height } = DIMENSIONS[palletFocus.pallet.type];
      if (width <= freeSpace.width && height <= freeSpace.height) {
        switchSpaces(index, indexLkw, freeSpace);
      }
    }
  };

  const setFocus = (index, indexLkw) => {
    setPalletFocus({
      pallet: JSON.parse(JSON.stringify(trucks[indexLkw].pallets[index])),
      index,
      indexLkw
    });
  };

  const handleClickPallete = (indexLkw, index, pallet) => {
    // console.log("CLICK PALLETE...", indexLkw, index, pallet);

    if (isSamePallet(indexLkw, index)) {
      setPalletFocus(null);
    } else if (!palletFocus) {
      setFocus(index, indexLkw);
    } else {
      switchSpaces(index, indexLkw, pallet);
    }
  };

  const renderTrucks = () => {
    if (!trucks) return <h1>Loading..</h1>;
    return trucks.map((loading, indexLkw) => {
      const { pallets, lkw } = loading;
      return (
        <LKW key={indexLkw} count={indexLkw + 1} width={lkw.max_width}>
          <LoadingZone
            onClick={() => console.log("CLICK ON ME")}
            width={lkw.max_loading}
          >
            {pallets.map((pallete, index) => {
              pallete.isSelected = false;

              if (palletFocus && pallete.id === palletFocus.pallet.id) {
                pallete.isSelected = true;
              }

              if (!pallete.position) {
                return (
                  <PalleteWrapper
                    onClick={() => handleClickPallete(indexLkw, index, pallete)}
                    type={pallete.type}
                    isSelected={pallete.isSelected}
                  >
                    {pallete.type} - Ort: {pallete.factory}
                    ID - {pallete.id}
                  </PalleteWrapper>
                );
              } else {
                return (
                  <PalleteWrapper
                    onClick={() =>
                      handleClickFreeSpace(indexLkw, index, pallete)
                    }
                    type={pallete.type}
                    isFree
                    isSelected={pallete.isSelected}
                  />
                );
              }
            })}
          </LoadingZone>
        </LKW>
      );
    });
  };

  const getTrucks = () => {
    const sorted = delivery.sort(compare);
    const loadings = validate(sorted);
    setTrucks(loadings);
  };

  console.log(trucks);

  return <>{renderTrucks()}</>;
};

export default Pallets;
