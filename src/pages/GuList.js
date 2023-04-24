import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const GuList = ({ foodData }) => {
    const { id } = useParams();
    const list = foodData.filter(it => it.GUGUN_NM === id);

    const { kakao } = window;

    const KakaoMapScript = () => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
            mapOption = {
                center: new kakao.maps.LatLng(list[0].LAT, list[0].LNG), // 지도의 중심좌표
                level: 5 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커가 표시될 위치입니다 
        const markerPosition = new kakao.maps.LatLng(list[0]?.LAT, list[0]?.LNG);

        var positions = list.map(it => {
            return {
                title: it.TITLE,
                latlng: new kakao.maps.LatLng(it.LAT, it.LNG),
                image: it.MAIN_IMG_THUMB
            }
        });
        // console.log(positions2)

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(50, 'auto');

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(positions[i].image, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });
        }

    }


    useEffect(() => {
        foodData.length > 0 && KakaoMapScript()
    }, [foodData, id])


    return (
        <div className='guList'>
            <div id="map" style={{ height: "500px" }}></div>
            <ul className='list'>

                {
                    list.map(it => <li key={it.UC_SEQ}>
                        <Link to={`/store/${it.TITLE}`}>
                            <h3>[{it.GUGUN_NM}] {it.TITLE}</h3>
                            <figure>
                                <img src={it.MAIN_IMG_THUMB} alt="" />
                            </figure>
                        </Link>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default GuList;