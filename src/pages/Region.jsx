import { pb, read, update } from "@/api/pocketbase";
import RegionSaveButton from "@/components/Region/RegionSaveButton";
import SearchRegion from "@/components/Region/SearchRegion";
import SelectedRegionList from "@/components/Region/SelectedRegionList";
import SuggestRegion from "@/components/Region/SuggestRegion";
import ScrollToTop from "@/components/ScrollTop";
import { useEffect, useState } from "react";
import { GoX } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import PopularRegion from "./../components/Region/PopularRegion";
import { alertMessage } from "@u";
import MetaData from "@c/MetaData";

//@ 관심지역 설정 컴포넌트
function Region() {
  const userInfo = pb.authStore.model;
  const navigate = useNavigate();
  const [checkedRegionList, setCheckedRegionList] = useState([]);
  const [isFocusSearchBar, setIsFocusSearchBar] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function fetchUserData() {
      let data = await read("users", "", userInfo.id);
      setUserData(data);
      setCheckedRegionList(data.regions);
    }

    fetchUserData();
  }, []);

  // 상태변수(checkedRegionList) 변경 이벤트 핸들러
  const handleUpdateRegionList = (region) => {
    setCheckedRegionList(region);
  };

  // 상태변수(checkedRegionList) 삭제 이벤트 핸들러
  const handleRemoveRegionList = () => {
    setCheckedRegionList([]);
  };

  // 검색 상태 변수 제어 이벤트 핸들러
  const handleFocusSearchBar = (isFocus) => {
    setIsFocusSearchBar(isFocus);
  };

  // 관심지역 설정 서버에 등록
  const setRegionList = () => {
    update("users", userInfo.id, { regions: checkedRegionList });
    alertMessage("관심지역이 설정되었습니다.");
    navigate("/");
  };
  
  const metaData = {
      title: "Best Place - 관심지역",
      description: "피드에 표시할 리뷰에 지역 필터링을 추가합니다",
      keywords: ["지역", "전국", "지방"],
      image: "public/logo.svg",
  };
  
  return (
    <>
      <MetaData props={metaData} />
      <ScrollToTop />
      <Header />
      <main className="mx-auto max-w-3xl px-3">
        <div className="sticky top-[-4px] z-10 bg-gradient-to-b from-white from-80% to-white/10 to-90% pb-8">
          {isFocusSearchBar || (
            <div>
              {/* 창 닫기 */}
              <Link to="/" className="float-right mr-1 group" title="설정 닫기">
                <GoX className="mt-3 text-3xl hover:text-primary group-focus:text-primary" />
              </Link>
              {/* 제목 */}
              <h2 className="mb-3 pt-8 text-2xl font-bold">관심지역을 설정해주세요!</h2>
            </div>
          )}
          {/* 검색바 */}
          <SearchRegion
            checkedRegionList={checkedRegionList}
            isFocusSearchBar={isFocusSearchBar}
            onFocus={handleFocusSearchBar}
            onUpdate={handleUpdateRegionList}
          />
        </div>
        {isFocusSearchBar || (
          <div className="flex flex-col gap-8 px-1">
            {/* 내 관심지역 */}
            <SelectedRegionList
              checkedRegionList={checkedRegionList}
              onUpdate={handleUpdateRegionList}
              onRemove={handleRemoveRegionList}
            />
            {/* '이런 지역 어때요' 리스트 */}
            <SuggestRegion
              userData={userData}
              checkedRegionList={checkedRegionList}
              onUpdate={handleUpdateRegionList}
            />
            {/* '요즘 많이 찾아봐요' 리스트 */}
            <PopularRegion checkedRegionList={checkedRegionList} onUpdate={handleUpdateRegionList} />
            {/* 저장하기 버튼 */}
            <RegionSaveButton onClick={setRegionList} />
          </div>
        )}
      </main>
    </>
  );
}

export default Region;
