import React, {useState} from 'react';

const CategoriesPart = (props:{selectCategory: (id: number) => void}) => {

    const [arrayCategories ] = useState([
        {id:1, title:"Постійні витрати", color:"blue", number:4500},
        {id:2, title:"Краса та одяг",color:"green", number:2000},
        {id:3, title:"Кафе та ресторани",color:"orange", number:4500},
        {id:4, title:"Розваги",color:"purple", number:5000},
        {id:5, title:"Медицина",color:"yellow", number:2400},
        {id:6, title:"Продукти",color:"pink", number:10000},
        {id:7, title:"Транспорт", color:"yellow-green",number:10000},
        {id:8, title:"Інше",color:"grey", number:1400}
    ])

    let [selectedCategory, setselectedCategory]= useState(0)
    function selectCategory(id:number){
        setselectedCategory(id)
        props.selectCategory(id)
    }

    const spentNumber=arrayCategories.reduce((res,curr)=> res+=curr.number,0)

    return (
        <div className="categories-part">
            <div className="block-title">Категорії </div>
            <div className="categories-diagram-container" onClick={()=>selectCategory(0)}>
                {arrayCategories.map((category)=> {
                    let percent=category.number/spentNumber*100
                    if (category.number !== 0)
                        return  <div key={category.id} style={{width:`${percent}%`}} className={`categories-diagram-part ${category.color}`}></div>
                })}

            </div>
            <div className="list list-2">
                {arrayCategories.map((category)=> {
                        if (category.number !== 0)
                        return <div onClick={() => selectCategory(category.id)} key={category.id} className="list-elem cursor">
                                <div className="list-elem-start-block">
                                    <div className={`list-elem-line ${category.color} ${selectedCategory===category.id?"list-elem-line-selected":" "}`}></div>
                                    <div className="list-elem-title">
                                        {category.title}
                                    </div>
                                </div>
                                <div
                                    className="list-elem-end-block padding-10">{category.number.toLocaleString('uk-UA')}</div>
                            </div>
                    }
                    )}

            </div>

        </div>
    );
};

export default CategoriesPart;