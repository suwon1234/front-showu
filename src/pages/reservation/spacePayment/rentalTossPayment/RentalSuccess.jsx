import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RentalSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const orderName = decodeURIComponent(searchParams.get("orderName"));
  const spaceId = searchParams.get("spaceId");
  const rentalPeriod = JSON.parse(
    decodeURIComponent(searchParams.get("rentalPeriod"))
  );
  const spaceLocation = decodeURIComponent(searchParams.get("spaceLocation"));
  const userId = searchParams.get("userId");

  const confirmPayment = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/reservation/rentalToss",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount,
            orderName,
            spaceId,
            rentalPeriod,
            spaceLocation,
            userId,
          }),
        }
      );

      if (response.ok) setIsConfirmed(true);
      else throw new Error("결제 확인 중 오류 발생");
    } catch (error) {
      console.error("결제 확인 중 오류 발생:", error);
      // navigate("/reservation/rental-toss-payment/failed");
    }
  }, [
    paymentKey,
    orderId,
    amount,
    orderName,
    spaceId,
    rentalPeriod,
    spaceLocation,
    userId,
  ]);

  useEffect(() => {
    if (paymentKey && orderId && amount) confirmPayment();
  }, [confirmPayment, paymentKey, orderId, amount]);

  return (
    <div>
      {isConfirmed ? (
        <div>
          <h2>결제를 완료했어요</h2>
          <br />
          <div>
            <span>상품 이름: {orderName}</span>
            <br />
            <br />
            <span>결제 금액: {amount}</span>
            <br />
            <br />
            <span>주문번호: {orderId}</span>
            <br />
            <br />
            <span>paymentKey: {paymentKey}</span>
            <br />
            <br />
            <span>대여 기간:</span>
            <ul>
              {rentalPeriod.map((period, index) => (
                <li key={index}>
                  {new Date(period.date).toLocaleDateString()} -{" "}
                  {period.timeSlots.join(", ")}시
                </li>
              ))}
            </ul>
          </div>
          <br />
          <a href="https://developers.tosspayments.com/sandbox">
            다시 테스트하기
          </a>
          <br />
          <br />
          <a
            href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
            target="_blank"
            rel="noopener noreferrer"
          >
            결제 연동 문서가기
          </a>
        </div>
      ) : (
        <div>
          <h2>결제 요청까지 성공했어요. 결제 승인하고 완료해보세요.</h2>
          <button onClick={confirmPayment}>결제 승인하기</button>
        </div>
      )}
    </div>
  );
};

export default RentalSuccess;
