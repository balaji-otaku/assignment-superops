import { useCallback, useState } from "react";
import itemsList from "../../data/items.json";
import CheckboxList, { Item } from "../CheckboxList/CheckboxList";
import { updateItemStates } from "./updateItemStates";
import { Input } from "antd";

const { Search } = Input;

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type ItemState = {
  id: number;
  state: CheckboxState;
};

const Tree = () => {
  const [items, setDefaultItems] = useState(itemsList);
  const defaultItemStates: ItemState[] = items.map((i) => ({
    id: i.id,
    state: CheckboxState.CHECKED,
  }));

  const [itemStates, setItemStates] = useState<ItemState[]>(defaultItemStates);
  const getStateForId = useCallback(
    (id: number) => {
      return itemStates.find((i) => i.id === id).state;
    },
    [itemStates]
  );
  const handleDelete = (id: number) => {
    const newState = items.filter((item) => {
      return item.id !== id;
    });
    setDefaultItems(newState);
  };
  const clickHandler = useCallback(
    (id) => setItemStates(updateItemStates(itemStates, items, id)),
    [itemStates]
  );
  const addParents = (newState: Item[]) => {
    let newStateWithParents = newState;
    for (const item of newState) {
      if (item.parentId !== 0) {
        const parents = itemsList.filter(
          (newItem) => item.parentId === newItem.id
        );

        newStateWithParents = [...newStateWithParents, ...parents];
      }
    }
    return newStateWithParents;
  };

  const removeDuplicate = (newState: Item[]) => {
    const unqiueElements = [];
    for (const element of newState) {
      const isAlreadyPresent = unqiueElements.some(
        (ele) => ele.id === element.id
      );
      if (!isAlreadyPresent) {
        unqiueElements.push(element);
      }
    }
    return unqiueElements;
  };

  const processFilter = (newState: Item[]) => {
    let newStateWithParents = newState;
    for (let i = 0; i < 5; i++) {
      newStateWithParents = addParents(newStateWithParents);
    }

    const duplicateRemoved = removeDuplicate(newStateWithParents);

    return duplicateRemoved;
  };

  const onSearchHandler = (searchText) => {
    const newState = items.filter((item) => {
      const found =
        item.name.toLowerCase().search(searchText.toLowerCase()) !== -1;
      return found;
    });

    const processFilterData = processFilter(newState);
    setDefaultItems(processFilterData);
  };
  const onChangeHandler = (ele) => {
    const searchText = ele.target.value || "";
    if (searchText.length === 0) {
      setDefaultItems(itemsList);
    } else {
      onSearchHandler(searchText);
    }
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearchHandler}
        onChange={onChangeHandler}
        enterButton
        allowClear
      />

      <CheckboxList
        items={items}
        onClick={clickHandler}
        getStateForId={getStateForId}
        handleDeleteItem={handleDelete}
      />
    </div>
  );
};

export default Tree;
