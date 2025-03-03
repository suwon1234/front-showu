import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PaymentButton from "../auctionTossPayment/PaymentButton";
import S from "./style";

const AuctionPaymentDetail = () => {
  const location = useLocation();
  const state = location.state || {};

  const {
    userName = "",
    userEmail = "",
    userPhone = "",
    auctionProduct = {},
    quantity = 1,
    totalAmount = auctionProduct.finalPrice || 0,
    address = "",
    deliveryMessage = "",
  } = state;

  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser ? currentUser._id : null;

  const name = auctionProduct.auctionName;
  const productId = auctionProduct._id;

  console.log("AuctionPaymentDetail 데이터:", {
    userName,
    userEmail,
    userPhone,
    auctionProduct,
    quantity,
    name,
    totalAmount,
    address,
    deliveryMessage,
    userId,
    productId,
  });

  return (
    <S.Container>
      <S.Details>
        <p>상품 이름: {name}</p>
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
        orderName={name}
        productId={productId}
        quantity={quantity}
        userName={userName}
        userEmail={userEmail}
        userPhone={userPhone}
        address={address}
        deliveryMessage={deliveryMessage}
        userId={userId}
      />
    </S.Container>
  );
};

export default AuctionPaymentDetail;
