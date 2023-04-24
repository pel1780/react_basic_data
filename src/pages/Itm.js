import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Itm = ({ foodData }) => {
    const { itm } = useParams();
    const r = foodData.find(it => it.TITLE === itm);
    const [store, getStore] = useState({});
    useEffect(() => {
        getStore(r)
    }, [r]);


    const { kakao } = window;

    const KakaoMapScript = () => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(store.LAT, store.LNG),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);

        // 마커가 표시될 위치입니다 
        const markerPosition = new kakao.maps.LatLng(store.LAT, store.LNG);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

    }
    useEffect(() => {
        store && KakaoMapScript();
    }, [store])



    return (
        <div className='itm inner'>
            {store &&
                <div>
                    <div id="map" style={{ height: "500px" }}></div>
                    <div className="case">
                        <div className="desc">
                            <h3>[{store.GUGUN_NM}] {store.TITLE}</h3>
                            <p>{store.ITEMCNTNTS}</p>
                            <strong>{store.RPRSNTV_MENU}</strong>
                            <span>{store.USAGE_DAY_WEEK_AND_TIME}</span>
                        </div>

                        <figure>
                            <img src={store.MAIN_IMG_THUMB} alt="" />
                        </figure>
                    </div>
                </div>}
        </div>
    )
}






export default Itm;