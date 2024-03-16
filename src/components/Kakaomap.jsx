import { array } from "prop-types";
import { useEffect } from "react";

function Kakaomap({ items }) {
  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const mapTypeControl = new window.kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    const bounds = new window.kakao.maps.LatLngBounds();

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new window.kakao.maps.services.Geocoder();

    items?.forEach((el) => {
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(el.address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new window.kakao.maps.Marker({
            map,
            position: coords,
          });

          marker.setMap(map);

          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(coords);

          // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
          // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
          map.setBounds(bounds);

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="font-size:12px;width:150px;line-height:24px;text-align:center;padding:4px;">${el.title}</div>`,
          });
          infowindow.open(map, marker);
        }
      });
    });
  }, [items]);

  return <div id="map"></div>;
}

Kakaomap.propTypes = {
  items: array,
};

export default Kakaomap;
