import React from "react";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import "./List.scss";
import removeSvg from "../../assets/img/remove.svg";
import axios from 'axios';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
  const removeList = (item) => {
    if (window.confirm("Удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: activeItem && activeItem.id === item.id })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}
          {item.tasks && 123 && `(${item.tasks.length})`}</span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="Remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
export default List;
