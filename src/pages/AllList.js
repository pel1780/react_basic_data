import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const AllList = ({ foodData }) => {
    const { kakao } = window;

    const KakaoMapScript = () => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
            mapOption = {
                center: new kakao.maps.LatLng(foodData[4].LAT, foodData[4].LNG), // 지도의 중심좌표
                level: 9 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커가 표시될 위치입니다 
        const markerPosition = new kakao.maps.LatLng(foodData[0]?.LAT, foodData[0]?.LNG);
        // var positions = [
        //     {
        //         title: '카카오',
        //         latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        //     },
        //     {
        //         title: '생태연못',
        //         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        //     },
        //     {
        //         title: '텃밭',
        //         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        //     },
        //     {
        //         title: '근린공원',
        //         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        //     }
        // ];

        var positions = foodData.map(it => {
            return { title: it.TITLE, latlng: new kakao.maps.LatLng(it.LAT, it.LNG) }
        });
        // console.log(positions2)

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

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
    }, [foodData])





    return (
        <div className='AllList'>
            <div id="map" style={{ height: "500px" }}></div>
            <ul className='list'>
                {
                    foodData.map(it => {
                        return (
                            <li key={it.UC_SEQ}>
                                <Link to={`/store/${it.TITLE}`}>
                                    <h3>[{it.GUGUN_NM}] {it.TITLE}</h3>
                                    <figure>
                                        <img src={it.MAIN_IMG_THUMB} alt="" />
                                    </figure>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default AllList;