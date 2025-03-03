import React, { useState } from "react";
import TossPayment from "./TossPayment";
import S from "./PaymentButtonStyle";

const PaymentButton = ({
  productPrice,
  orderName,
  showId,
  date,
  time,
  seatNumbers,
  userId,
  onPaymentSuccess,
}) => {
  const [isTossPayment, setIsTossPayment] = useState(false);
  const toggleTossPayment = () => {
    setIsTossPayment(!isTossPayment);
  };

  console.log("PaymentButton 데이터:", {
    productPrice,
    orderName,
    showId,
    date,
    time,
    seatNumbers,
    userId,
  });

  return (
    <div>
      <S.TossPayButton onClick={toggleTossPayment}>결제하기</S.TossPayButton>
      {isTossPayment && (
        <TossPayment
          productPrice={productPrice}
          orderName={orderName}
          showId={showId}
          date={date}
          time={time}
          seatNumbers={seatNumbers}
          userId={userId}
          onPaymentSuccess={onPaymentSuccess}
        />
      )}
    </div>
  );
};

export default PaymentButton;
