import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import { CheckboxState, ItemState } from "../Tree/Tree";
import styles from "./checkboxlist.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export type Item = {
  id: number;
  name: string;
  parentId: number;
};

type CheckboxListProps = {
  items: Item[];
  idsToRender?: number[];
  indentLevel?: number;
  onClick?: (id: number) => void;
  getStateForId: (id: number) => CheckboxState;
  handleDeleteItem: (id: number) => void;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  getStateForId,
  idsToRender = [],
  indentLevel = 0,
  onClick = () => {},
  handleDeleteItem
}) => {
  if (!idsToRender.length) {
    idsToRender = items.filter((i) => !i.parentId).map((i) => i.id);
  }

  const getChildNodes = (parentId: number) => {
    const nodeItems = items.filter((i) => i.parentId === parentId);
    if (!nodeItems.length) return null;
    return (
      <CheckboxList
        items={items}
        idsToRender={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
        onClick={onClick}
        getStateForId={getStateForId}
        handleDeleteItem = {handleDeleteItem}
      />
    );
  };
 
  return (
    <ul className={styles.list} style={{ paddingLeft: indentLevel * 20 }}>
      {idsToRender.map((id) => {
        const item = items.find((i) => i.id === id);
        if(!item) return null
        const checkboxState = getStateForId(id);
        return (
          <React.Fragment key={item.id}>
            <li>
              <Checkbox
                onClick={() => onClick(item.id)}
                isChecked={checkboxState === CheckboxState.CHECKED}
                isIndeterminate={checkboxState === CheckboxState.INDETERMINATE}
              />
              {item.name+" "}
             
              <FontAwesomeIcon onClick={()=>handleDeleteItem(item.id)} icon={faTrashAlt}/>
            </li>
            {getChildNodes(item.id)}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default CheckboxList;
