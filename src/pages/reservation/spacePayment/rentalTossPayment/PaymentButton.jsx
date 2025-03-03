import React, { useState } from "react";
import RentalTossPayment from "./RentalTossPayment";
import S from "./PaymentButtonStyle"; // 스타일 파일 가져오기

const PaymentButton = ({
  productPrice,
  orderName,
  spaceId,
  rentalPeriod,
  spaceLocation,
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
    spaceId,
    rentalPeriod,
    spaceLocation,
    userId,
  });

  return (
    <div>
      <S.TossPayButton onClick={toggleTossPayment}>결제하기</S.TossPayButton>
      {isTossPayment && (
        <RentalTossPayment
          productPrice={productPrice}
          orderName={orderName}
          spaceId={spaceId}
          rentalPeriod={rentalPeriod}
          spaceLocation={spaceLocation}
          userId={userId}
          onPaymentSuccess={onPaymentSuccess}
        />
      )}
    </div>
  );
};

export default PaymentButton;
