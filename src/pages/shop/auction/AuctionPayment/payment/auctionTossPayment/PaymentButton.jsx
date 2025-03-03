import React, { useState } from "react";
import { useSelector } from "react-redux";
import AuctionTossPayment from "./AuctionTossPayment";
import S from "./PaymentButtonStyle";

const PaymentButton = ({
  productPrice,
  orderName,
  productId,
  quantity,
  userName,
  userEmail,
  userPhone,
  address,
  deliveryMessage,
  onPaymentSuccess,
  userId,
}) => {
  const [isTossPayment, setIsTossPayment] = useState(false);
  const { currentUser } = useSelector((state) => state.user); // Redux에서 currentUser 가져오기

  const toggleTossPayment = () => {
    setIsTossPayment(!isTossPayment);
  };

  console.log("PaymentButton 데이터:", {
    productPrice,
    orderName,
    productId,
    quantity,
    userName,
    userEmail,
    userPhone,
    address,
    deliveryMessage,
    userId: userId || currentUser?._id, // Redux 상태에서 가져온 userId
  });

  return (
    <div>
      <S.TossPayButton onClick={toggleTossPayment}>결제하기</S.TossPayButton>
      {isTossPayment && currentUser?._id && (
        <AuctionTossPayment
          productPrice={productPrice}
          orderName={orderName}
          productId={productId}
          quantity={quantity}
          userName={userName}
          userEmail={userEmail}
          userPhone={userPhone}
          address={address}
          deliveryMessage={deliveryMessage}
          userId={userId || currentUser?._id} // Redux 상태에서 가져온 userId 전달
          onPaymentSuccess={onPaymentSuccess}
        />
      )}
    </div>
  );
};

export default PaymentButton;
