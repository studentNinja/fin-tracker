import React, { useState } from "react";
import { Category } from "../../../types/categoryTypes";

const CategoriesPart = (props: {
  categories: Array<{
    id: number;
    title: string;
    color: string;
    number: number;
  }>;
  selectCategory: (id: number) => void;
}) => {
  let [selectedCategory, setselectedCategory] = useState(0);
  function selectCategory(id: number) {
    setselectedCategory(id);
    props.selectCategory(id);
  }

  const spentNumber = props.categories.reduce(
    (res, curr) => (res += curr.number),
    0
  );

  return (
    <div className="categories-part">
      <div className="block-title">Категорії </div>
      <div
        className="categories-diagram-container"
        onClick={() => selectCategory(0)}
      >
        {props.categories.map((category) => {
          let percent = (category.number / spentNumber) * 100;
          if (category.number !== 0)
            return (
              <div
                key={category.id}
                style={{ width: `${percent}%` }}
                className={`categories-diagram-part ${category.color}`}
              ></div>
            );
        })}
      </div>
      <div className="list list-2">
        {props.categories.map((category) => {
          if (category.number !== 0)
            return (
              <div
                onClick={() => selectCategory(category.id)}
                key={category.id}
                className="list-elem cursor"
              >
                <div className="list-elem-start-block">
                  <div
                    className={`list-elem-line ${category.color} ${
                      selectedCategory === category.id
                        ? "list-elem-line-selected"
                        : " "
                    }`}
                  ></div>
                  <div className="list-elem-title">{category.title}</div>
                </div>
                <div className="list-elem-end-block padding-10">
                  {category.number.toLocaleString("uk-UA")}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default CategoriesPart;
