import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "../rentalTossPayment/PaymentButton";
import S from "./style";

const RentalPaymentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const {
    totalPrice = 0,
    name = "",
    spaceId = "",
    rentalPeriod = [],
    location: spaceLocation = "",
    userId = "",
    customerName = "",
    customerEmail = "",
  } = state;

  console.log("RentalPaymentDetail 데이터:", {
    totalPrice,
    name,
    spaceId,
    rentalPeriod,
    spaceLocation,
    userId,
    customerName,
    customerEmail,
  });

  const handlePaymentSuccess = () => {
    navigate("/reservation/payment/success");
  };

  return (
    <S.Container>
      <S.Details>
        <p>공간 이름: {name}</p>
        {totalPrice !== undefined && (
          <p>가격: {totalPrice.toLocaleString()} 원</p>
        )}
        <p>대여 장소: {spaceLocation}</p>
        <p>
          {rentalPeriod.length > 0 ? (
            rentalPeriod.map((period, index) => (
              <div key={index}>
                <p>대여 날짜: {new Date(period.date).toLocaleDateString()}</p>
                <p>시간: {period.timeSlots.join(", ")}시</p>
              </div>
            ))
          ) : (
            <span>정보가 없습니다.</span>
          )}
        </p>
        <br />
        <p>사용자 이름: {customerName}</p>
        <p>이메일: {customerEmail}</p>
      </S.Details>
      <PaymentButton
        productPrice={totalPrice}
        orderName={name}
        spaceId={spaceId}
        rentalPeriod={rentalPeriod}
        spaceLocation={spaceLocation}
        userId={userId}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </S.Container>
  );
};

export default RentalPaymentDetail;
