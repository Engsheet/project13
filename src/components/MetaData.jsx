import { React } from "react";

import { Helmet } from "react-helmet-async";
import { string, arrayOf, object } from "prop-types";

function MetaData({ props }) {
  const data = {
    title: "페이지 이름",
    image: "url",
    description: "",
    keywords: [""],
  };
  return (
    <>
      <Helmet>
        {/* 페이지 공통 */}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Best Place SiteNAme" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta name="author" content="13est" />

        {/* 페이지 개별 */}
        <title>{props.title}</title>
        <meta name="title" content={props.title} />
        <meta name="keywords" content={props.keywords} />
        <meta name="description" content={props.description} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.image} />
      </Helmet>
    </>
  );
}

MetaData.propTypes = {
  props: object,
  title: string,
  keywords: arrayOf(string),
  description: string,
  image: string,
};
export default MetaData;
