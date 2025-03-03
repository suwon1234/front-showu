import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const orderName = searchParams.get("orderName");
  const showId = searchParams.get("showId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const seatNumbers = JSON.parse(searchParams.get("seatNumbers"));
  const userId = searchParams.get("userId");

  async function confirmPayment() {
    try {
      const response = await fetch("http://localhost:8000/reservation/toss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
          orderName,
          showId,
          date,
          time,
          seatNumbers,
          userId,
        }),
      });

      if (response.ok) setIsConfirmed(true);
      else throw new Error("결제 확인 중 오류 발생");
    } catch (error) {
      console.error("결제 확인 중 오류 발생:", error);
      // navigate("/payment/failed");
    }
  }

  useEffect(() => {
    if (paymentKey && orderId && amount) confirmPayment();
  }, [paymentKey, orderId, amount]);

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

export default Success;
