import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "../tossPayment/PaymentButton";
import S from "./style";

const TicketPaymentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  // 상태가 없을 경우 메인 페이지로 리디렉션
  if (!state) {
    navigate("/"); // 메인 페이지로 리디렉션
    return null;
  }

  const {
    productPrice,
    orderName,
    showId,
    date,
    time,
    seatNumbers,
    userId,
    customerName,
    customerEmail,
  } = state;

  console.log("TicketPaymentDetail 데이터:", {
    productPrice,
    orderName,
    showId,
    date,
    time,
    seatNumbers,
    userId,
  });

  const handlePaymentSuccess = () => {
    navigate("/reservation/payment/success");
  };

  return (
    <S.Container>
      <S.Details>
        <p>공연 이름: {orderName}</p>
        <p>가격: {productPrice.toLocaleString()} 원</p>
        <p>공연 일자: {new Date(date).toLocaleDateString()}</p>
        <p>시간: {time}</p>
        <p>좌석 번호: {seatNumbers.join(", ")}</p>
        <p>사용자 이름: {customerName}</p>
        <p>이메일: {customerEmail}</p>
      </S.Details>
      <PaymentButton
        productPrice={productPrice}
        orderName={orderName}
        showId={showId}
        date={date}
        time={time}
        seatNumbers={seatNumbers}
        userId={userId}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </S.Container>
  );
};

export default TicketPaymentDetail;
