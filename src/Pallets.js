import React, { useState, useEffect } from "react";

import { LoadingZone, PalleteWrapper, LKW } from "./styles";
import { DIMENSIONS } from "./constants";
import { compare, copy, findIndexPalletInArr } from "./helper";
import { validate, reorderLoadings } from "./algorithmus";
import { render } from "react-dom";

const Pallets = ({ delivery }) => {
  const [trucks, setTrucks] = useState(null);
  const [rerender, setRerender] = useState(null);
  const [palletFocus, setPalletFocus] = useState(null);

  useEffect(() => {
    getTrucks();
  }, [delivery]);

  const render_ = () => {
    setTrucks(trucks);
    setPalletFocus(null);
    setRerender(true);
    setTimeout(() => {
      setRerender(false);
    }, 5);
  };

  const switchSpaces = (index, indexLkw, pallet) => {
    const swapValues = (index1, index2, lkw1, lkw2) => {
      var temp_pallet = null;

      temp_pallet = trucks[lkw1].arr[index1[0]][index1[1]];
      trucks[lkw1].arr[index1[0]][index1[1]] =
        trucks[lkw2].arr[index2[0]][index2[1]];

      trucks[lkw2].arr[index2[0]][index2[1]] = temp_pallet;
    };

    const switchPositionArr = () => {
      var indexPallet = findIndexPalletInArr(trucks[lkwPallet], idPallet);
      var indexFocus = findIndexPalletInArr(trucks[lkwFocus], idFocus);

      swapValues(indexPallet, indexFocus, lkwPallet, lkwFocus);
    };

    const lkwPallet = indexLkw;
    const idPallet = pallet.id;
    const lkwFocus = palletFocus.indexLkw;
    const idFocus = palletFocus.pallet.id;

    switchPositionArr();
    reorderLoadings(trucks);
    render_();
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
    console.log("CLICK FREE SPACE...", indexLkw, index, freeSpace);
    const { column, row } = freeSpace.position;
    if (palletFocus) {
      const { width, height } = DIMENSIONS[palletFocus.pallet.type];

      if (width <= freeSpace.width && height <= freeSpace.height) {
        var indexPallet = findIndexPalletInArr(
          trucks[palletFocus.indexLkw],
          palletFocus.pallet.id
        );

        if (trucks[indexLkw].arr[column]) {
          trucks[indexLkw].arr[column][row] = palletFocus.pallet;
        } else {
          trucks[indexLkw].arr.push([palletFocus.pallet]);
        }
        trucks[palletFocus.indexLkw].arr[indexPallet[0]].splice(
          indexPallet[1],
          1
        );

        reorderLoadings(trucks);
      }
      render_();
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
        <LKW key={indexLkw} count={indexLkw + 1} width={lkw.maxWidth}>
          <LoadingZone width={lkw.maxLoading}>
            {pallets.map((pallete, index) => {
              pallete["isSelected"] = false;

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
                    isSelected={pallete.isSelected}
                    width={pallete.width}
                    height={pallete.height}
                    freeSpaceType={pallete.freeSpaceType}
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

  console.log("STATUS TRUCKS : ", trucks);

  return <>{renderTrucks()}</>;
};

export default Pallets;
