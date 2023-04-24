import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import AllList from "./pages/AllList";
import GuList from "./pages/GuList";
import Itm from "./pages/Itm";
import Nav from "./pages/Nav";

import './style/food.scss';

const App = () => {
    const [foodData, setFoodData] = useState([]);
    const [gugun, setGugun] = useState([]);
    const key = `5VJMYuvSkHiKvEY%2FJ15gNqS38A098VZAkvRWZ9zGn7jSoExXmbtxM6zZe9QIKZWRxO0a%2FxjsRgBYJUQxjHNrmw%3D%3D`
    const getfoodData = async () => {
        const r = await axios.get(`http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${key}&pageNo=1&numOfRows=150&resultType=json`);
        const d = await r.data.getFoodKr.item;
        setFoodData(d);
        const getGugun = d.map(it => it.GUGUN_NM);
        const gugunList = [...new Set(getGugun)];
        setGugun(gugunList);
    };
    useEffect(() => {
        getfoodData();
    }, []);

    const gangseo = foodData.filter(it => it.GUGUN_NM === '강서구');
    console.log(foodData)




    return (
        <Routes>
            <Route path="/" element={<Layout gugun={gugun} />}>
                <Route path="/" element={<AllList foodData={foodData} />}></Route>
                <Route path=":id" element={<GuList foodData={foodData} />} />
                <Route path="store/:itm" element={<Itm foodData={foodData} />} />
                {/* {
                    gugun.map((it, idx) => {
                        return <Route path={it} element={<div>{it}</div>} key={idx}></Route>
                    })
                } */}
            </Route>
        </Routes>
    )
}

export default App;