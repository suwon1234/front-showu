import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import S from "./style";


const SeatSelection = () => {
  const { state } = useLocation();
  const { selectedDate, selectedTime, showId, showName, price } = state;
  const { currentUser } = useSelector((state) => state.user);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const seats = [];

  const navigate = useNavigate();

  for (let i = 0; i < 100; i++) {
    const row = Math.floor(i / 10) + 1;
    const col = (i % 10) + 1;
    const seatType = row <= 3 ? "S" : "R";
    seats.push({
      row,
      col,
      type: seatType,
      price: seatType === "S" ? price.S : price.R,
    });
  }

  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const formattedDate = encodeURIComponent(
          new Date(selectedDate).toISOString()
        );
        const response = await fetch(
          `http://localhost:8000/reservation/reservedSeats?showId=${showId}&date=${formattedDate}&time=${selectedTime}`
        );
        if (!response.ok) {
          throw new Error("예약된 좌석을 가져오는 중 오류 발생");
        }
        const fetchedData = await response.json();
        setReservedSeats(fetchedData);
      } catch (error) {
        console.error("예약된 좌석을 가져오는 중 오류 발생:", error);
      }
    };

    const fetchAvailableSeats = async () => {
      try {
        const formattedDate = encodeURIComponent(
          new Date(selectedDate).toISOString()
        );
        const response = await fetch(
          `http://localhost:8000/reservation/availableSeats?showId=${showId}&date=${formattedDate}&time=${selectedTime}`
        );
        if (!response.ok) {
          throw new Error("잔여 좌석을 가져오는 중 오류 발생");
        }
        const fetchedData = await response.json();
        setAvailableSeats(fetchedData);
      } catch (error) {
        console.error("잔여 좌석을 가져오는 중 오류 발생:", error);
      }
    };

    fetchReservedSeats();
    fetchAvailableSeats();
  }, [showId, selectedDate, selectedTime]);

  const handleSeatClick = (seat) => {
    const seatId = `${seat.row}-${seat.col}`;
    if (
      reservedSeats.some((reservedSeat) =>
        reservedSeat.seatNumbers.includes(seatId)
      )
    )
      return;

    if (
      selectedSeats.some(
        (selectedSeat) =>
          selectedSeat.row === seat.row && selectedSeat.col === seat.col
      )
    ) {
      setSelectedSeats(
        selectedSeats.filter(
          (selectedSeat) =>
            selectedSeat.row !== seat.row || selectedSeat.col !== seat.col
        )
      );
    } else if (selectedSeats.length < 2) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const seatNumbers = selectedSeats.map(
        (seat) => `${seat.row}-${seat.col}`
      );
      const dateObj = new Date(selectedDate);
      dateObj.setUTCHours(0, 0, 0, 0); // 시간을 UTC로 설정하여 시간 부분 제거
      const formattedDate = dateObj.toISOString(); // 전체 ISO 형식 유지

      const response = await fetch(
        "http://localhost:8000/reservation/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // JWT 인증을 사용하도록 설정
          },
          body: JSON.stringify({
            showId,
            date: formattedDate, // ISO 형식으로 변환된 날짜 사용
            time: selectedTime,
            seatNumbers,
            userId: currentUser._id, // 사용자 ID 추가
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "좌석 예약 중 오류 발생");
      }

      alert("좌석 예약이 완료되었습니다!");

      navigate("/reservation/ticket-payment", {
        state: {
          productPrice: selectedSeats.reduce(
            (total, seat) => total + parseInt(seat.price.replace(/,/g, ""), 10),
            0
          ),
          orderName: `좌석 예약 - ${showName}`,
          showId: showId,
          date: formattedDate,
          time: selectedTime,
          seatNumbers: selectedSeats.map((seat) => `${seat.row}-${seat.col}`),
          userId: currentUser._id,
          customerName: currentUser.name,
          customerEmail: currentUser.email,
        },
      });
    } catch (error) {
      console.error("좌석 예약 중 오류 발생:", error);
      alert(error.message); // 서버의 오류 메시지를 alert으로 표시
    }
  };


  return (
    <S.SeatSelectionContainer>
      <S.Title>좌석 선택</S.Title>
      <S.SelectedDateTimeInfo>
        <p>공연 이름: {showName || "선택되지 않음"}</p>
        <br />
        <p>
          공연 일자:{" "}
          {selectedDate
            ? format(new Date(selectedDate), "yyyy-MM-dd")
            : "선택되지 않음"}
        </p>
        <br />
        <p>시간: {selectedTime || "선택되지 않음"}</p>
        <br />
        <p>
          가격: {price ? `R석: ${price.R} / S석: ${price.S}` : "가격 정보 없음"}
        </p>{" "}
        <br />
        <p style={{ color: "#ffd400" }}>1인당 최대 2매 예매 가능</p>
      </S.SelectedDateTimeInfo>
      <S.ContentWrapper>
        <S.SeatGrid>
          {seats.map((seat, index) => {
            const seatId = `${seat.row}-${seat.col}`;
            const isReserved = reservedSeats.some((reservedSeat) =>
              reservedSeat.seatNumbers.includes(seatId)
            );
            const isCurrentUserReserved = reservedSeats.some(
              (reservedSeat) =>
                reservedSeat.seatNumbers.includes(seatId) &&
                reservedSeat.userId === currentUser?._id
            );

            return (
              <S.Seat
                key={index}
                onClick={() => handleSeatClick(seat)}
                selected={selectedSeats.some(
                  (selectedSeat) =>
                    selectedSeat.row === seat.row &&
                    selectedSeat.col === seat.col
                )}
                reserved={isReserved}
                disabled={isReserved && !isCurrentUserReserved}
                type={seat.type}
                style={{
                  backgroundColor: isReserved ? "gray" : "",
                  cursor: isReserved ? "not-allowed" : "pointer",
                }}
              >
                {seat.row}-{seat.col}
              </S.Seat>
            );
          })}
        </S.SeatGrid>

        {selectedSeats.length > 0 && (
          <S.SelectedSeatInfo>
            <p>
              선택된 좌석:{" "}
              {selectedSeats
                .map((seat) => `${seat.row}행 ${seat.col}열 (${seat.type}석)`)
                .join(", ")}
            </p>
            <p>
              가격:{" "}
              {selectedSeats
                .reduce(
                  (total, seat) =>
                    total + parseInt(seat.price.replace(/,/g, ""), 10),
                  0
                )
                .toLocaleString()}
              원
            </p>
            <S.BookingButton onClick={handleBooking}>결제하기</S.BookingButton>
          </S.SelectedSeatInfo>
        )}
      </S.ContentWrapper>
    </S.SeatSelectionContainer>
  );
};

export default SeatSelection;
