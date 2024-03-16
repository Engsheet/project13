import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TIMEOUT = 3;

function DontAccess() {
  const [timer, setTimer] = useState(TIMEOUT);
  const navigate = useNavigate();

  useEffect(() => {
    const clearId = setTimeout(() => setTimer(timer - 1), 1000);
    return () => {
      clearTimeout(clearId);
    };
  }, [timer]);

  useEffect(() => {
    const clearId = setTimeout(() => {
      navigate("/");
    }, TIMEOUT * 1000);

    return () => {
      clearTimeout(clearId);
    };
  }, [navigate]);

  return (
    <div className="p-10">
      <h2>로그인 하지 않은 사용자 접근 감지!</h2>
      <p>
        <b>{timer}초</b> 뒤 로그인 페이지로 이동합니다.
      </p>
      <Link to="/">로그인 페이지로 바로 이동</Link>
    </div>
  );
}

export default DontAccess;
