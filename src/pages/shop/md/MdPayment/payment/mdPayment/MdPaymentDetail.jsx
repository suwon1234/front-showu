import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PaymentButton from "../mdTossPayment/PaymentButton";
import S from "./style";

const MdPaymentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const {
    userName = "",
    userEmail = "",
    userPhone = "",
    product = {},
    quantity = 0,
    name = "",
    totalAmount = 0,
    address = "",
    deliveryMessage = "", // 배송 메시지 추가
  } = state;

  const { currentUser } = useSelector((state) => state.user); // Redux에서 currentUser 가져오기
  const userId = currentUser ? currentUser._id : null;

  useEffect(() => {
    if (!userId) {
      console.error("userId가 없습니다. 로그인 상태를 확인하세요.");
    }
  }, [userId]);

  const { mdName } = product;

  console.log("MdPaymentDetail 데이터:", {
    userName,
    userEmail,
    userPhone,
    product,
    quantity,
    name,
    totalAmount,
    address,
    deliveryMessage, // 배송 메시지 로그 추가
    userId, // userId 로그 추가
  });

  const handlePaymentSuccess = () => {
    navigate("/shop/md/payment/toss-payment/success");
  };

  return (
    <S.Container>
      <S.Details>
        <p>상품 이름: {mdName}</p>
        {totalAmount !== undefined && (
          <p>가격: {totalAmount.toLocaleString()} 원</p>
        )}
        <p>수량: {quantity}</p>
        <p>사용자 이름: {userName}</p>
        <p>이메일: {userEmail}</p>
        <p>휴대전화: {userPhone}</p>
        <p>주소: {address}</p>
        <p>배송 메시지: {deliveryMessage}</p> {/* 배송 메시지 표시 */}
      </S.Details>
      <PaymentButton
        productPrice={totalAmount}
        orderName={mdName}
        productId={product._id}
        quantity={quantity}
        userName={userName}
        userEmail={userEmail}
        userPhone={userPhone}
        address={address}
        deliveryMessage={deliveryMessage}
        userId={userId} // userId 전달
        onPaymentSuccess={handlePaymentSuccess}
      />
    </S.Container>
  );
};

export default MdPaymentDetail;
