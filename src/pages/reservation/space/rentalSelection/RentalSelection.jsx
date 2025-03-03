import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  format,
  addDays,
  startOfDay,
  differenceInCalendarDays,
  getDay,
  getHours,
  addMonths,
  isSameDay,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  addHours,
  isSameHour,
  startOfMonth,
  endOfMonth,
  isAfter,
} from "date-fns";
import { S } from "./style";

const RentalSelection = () => {
  const { state } = useLocation();
  const {
    spaceId,
    name,
    location: rentalLocation,
    pricePerHour,
    pricePerDay,
    img,
  } = state; // state에서 필요한 값들을 받아옴
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showPrices, setShowPrices] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("Space ID from state:", spaceId); // state에서 spaceId 확인
  }, [spaceId]);

  const handleDateChange = async (date) => {
    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 1);
    if (isBefore(date, tomorrow)) return; // 오늘 날짜와 이전 날짜 선택 방지

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setTotalPrice(pricePerDay);
    } else if (isBefore(date, selectedStartDate)) {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
      setSelectedTimes([]);
      if (differenceInCalendarDays(date, selectedStartDate) > 0) {
        setTotalPrice(
          (differenceInCalendarDays(date, selectedStartDate) + 1) * pricePerDay
        );
      } else {
        setTotalPrice(pricePerDay);
      }
    }

    // 선택한 날짜에 대한 예약된 시간대 가져오기
    const reservedTimes = await fetchReservedTimes(date);
    setReservedTimes(reservedTimes); // 예약된 시간대 설정
    setShowPrices(true); // 시간대 표시하기 위해 설정
  };


  const previousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleTimeClick = (time) => {
    let updatedTimes;
    if (selectedTimes.some((t) => isSameHour(t, time))) {
      updatedTimes = selectedTimes.filter((t) => !isSameHour(t, time));
    } else {
      updatedTimes = [...selectedTimes, time];
    }
    setSelectedTimes(updatedTimes);

    if (updatedTimes.length === 0) {
      setTotalPrice(0);
    } else if (updatedTimes.length === 15) {
      setTotalPrice(pricePerDay);
    } else {
      setTotalPrice(updatedTimes.length * pricePerHour);
    }
  };

  const handleAllDayClick = () => {
    if (selectedTimes.length === 15) {
      setSelectedTimes([]);
      setTotalPrice(0);
    } else {
      const allDayTimes = [];
      for (let i = 8; i <= 22; i++) {
        const time = setHours(setMinutes(new Date(selectedStartDate), 0), i);
        allDayTimes.push(time);
      }
      setSelectedTimes(allDayTimes);
      setTotalPrice(pricePerDay);
    }
  };


 const handleReserveClick = async () => {
   const token = localStorage.getItem("jwtToken");

   const rentalPeriod = [];
   let startDate = new Date(selectedStartDate);
   let endDate = selectedEndDate ? new Date(selectedEndDate) : startDate;

   for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
     const date = startOfDay(d);
     let timeSlots = selectedTimes
       .filter((time) => isSameDay(time, d))
       .map((time) => getHours(time));

     if (selectedTimes.length === 0) {
       timeSlots = [];
       for (let i = 8; i <= 22; i++) {
         timeSlots.push(i);
       }
     }

     rentalPeriod.push({
       date,
       timeSlots,
     });
   }

   if (rentalPeriod.length === 0) {
     alert("선택한 날짜에 예약 가능한 시간대가 없습니다.");
     return;
   }

   const reservationData = {
     userId: currentUser._id,
     spaceId,
     name,
     location: rentalLocation,
     rentalPeriod,
     img,
     totalPrice,
     customerName: currentUser.name,
     customerEmail: currentUser.email,
   };

   console.log("Reservation Data:", reservationData);

   try {
     const response = await fetch(
       "http://localhost:8000/reservation/reservations",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(reservationData),
       }
     );

     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || "예약 생성 중 오류 발생");
     }

     alert("공간 대여 예약이 완료되었습니다!");

     navigate("/reservation/space-payment", { state: reservationData });
   } catch (error) {
     console.error("예약 생성 중 오류 발생:", error);
     alert(error.message);
   }
 };




  const fetchReservedTimes = async (date) => {
    const token = localStorage.getItem("jwtToken");
    const formattedDate = encodeURIComponent(date.toISOString());
    try {
      const response = await fetch(
        `http://localhost:8000/reservation/reservedTimes?spaceId=${spaceId}&date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("예약된 시간대 조회 중 오류 발생");
      }

      const reservedTimes = await response.json();
      console.log("프론트엔드에서 받은 예약된 시간대:", reservedTimes); // 로그 출력 추가
      return reservedTimes.map((time) => new Date(time));
    } catch (error) {
      console.error("예약된 시간대 조회 중 오류 발생:", error);
      return [];
    }
  };


  const renderCalendar = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const dateArray = [];
    const today = startOfDay(new Date()); // 현재 날짜 정의 추가
    const tomorrow = addDays(today, 1); // 내일 정의 추가
    let currentDate = start;

    while (currentDate <= end) {
      dateArray.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    const daysInWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const firstDayOfMonth = getDay(start);

    return (
      <S.CalendarGrid>
        {daysInWeek.map((day) => (
          <S.CalendarHeader key={day}>{day}</S.CalendarHeader>
        ))}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <S.CalendarDay key={`empty-${index}`} />
          ))}
        {dateArray.map((date) => (
          <S.CalendarDay
            key={date}
            onClick={() => handleDateChange(date)}
            selected={
              isSameDay(date, selectedStartDate) ||
              isSameDay(date, selectedEndDate) ||
              (selectedStartDate &&
                selectedEndDate &&
                isBefore(selectedStartDate, date) &&
                isBefore(date, selectedEndDate))
            }
            isSelected={
              selectedStartDate &&
              selectedEndDate &&
              isBefore(date, selectedEndDate) &&
              isAfter(date, selectedStartDate)
            } // 연속된 날짜의 배경을 검은색으로 표시
            disabled={isBefore(date, tomorrow)} // 내일 이전 날짜 선택 방지
          >
            {format(date, "d")}
          </S.CalendarDay>
        ))}
      </S.CalendarGrid>
    );
  };

 

  const renderTimeButtons = () => {
    if (!selectedStartDate || selectedEndDate) return null;

    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 1);
    if (!showPrices || isBefore(selectedStartDate, tomorrow)) return null;

    const timeButtons = [];
    const price = Number(pricePerHour);

    console.log("예약된 시간대:", reservedTimes); // 예약된 시간대 로그 출력
    for (let i = 8; i <= 22; i++) {
      const time = setHours(
        setMinutes(startOfDay(new Date(selectedStartDate)), 0),
        i
      );
      const isReserved = reservedTimes.some(
        (t) =>
          t.getHours() === time.getHours() && t.getDate() === time.getDate()
      );
      const isSelected = selectedTimes.some((t) => isSameHour(t, time));
      timeButtons.push(
        <S.TimeButton
          key={i}
          onClick={() => handleTimeClick(time)}
          selected={isSelected}
          isReserved={isReserved} // 스타일 적용을 위해 isReserved 설정
        >
          {`${format(time, "HH:mm")} ~ ${format(addHours(time, 1), "HH:mm")}`}
          <br />
          {`${price.toLocaleString()}원`}
        </S.TimeButton>
      );
    }
    return timeButtons;
  };


  const renderSelectedDates = () => {
    if (selectedStartDate && selectedEndDate) {
      // 날짜 범위 선택 시 기간 표시
      return `${format(selectedStartDate, "yyyy년 MM월 dd일")} ~ ${format(
        selectedEndDate,
        "yyyy년 MM월 dd일"
      )}`;
    } else if (selectedStartDate && selectedTimes.length > 0) {
      // 선택한 시간 표시
      const selectedDate = format(selectedStartDate, "yyyy년 MM월 dd일");
      const selectedHours = selectedTimes
        .map((time) => format(time, "HH:mm"))
        .join(", ");
      return `${selectedDate} (${selectedHours})`;
    } else {
      return "선택된 날짜가 없습니다.";
    }
  };

  return (
    <S.Container>
      <S.InnerContainer>
        <S.MainTitle>예약접수</S.MainTitle>
        <S.HorizontalLine />
        <S.DetailContainer>
          <S.InfoWrapper>
            <S.SubTitle>
              희망일정
              <S.SubContent>
                세팅과 철수 시간을 포함한 희망 사용기간을 선택해 주세요.
              </S.SubContent>
            </S.SubTitle>
            <S.MonthNavigation>
              <S.NavButton onClick={previousMonth}>{"<"}</S.NavButton>
              <S.MonthTitle>{format(currentMonth, "yyyy년 MM월")}</S.MonthTitle>
              <S.NavButton onClick={nextMonth}>{">"}</S.NavButton>
            </S.MonthNavigation>
            <S.Calendar>{renderCalendar()}</S.Calendar>
            {selectedStartDate && (
              <S.AllDayButton onClick={handleAllDayClick}>
                종일권
              </S.AllDayButton>
            )}
            <S.TimeSelectionWrapper>
              <S.TimeButtonsContainer>
                {renderTimeButtons()}
              </S.TimeButtonsContainer>
            </S.TimeSelectionWrapper>
          </S.InfoWrapper>
          <S.PriceInfo>
            <S.Img src={img} alt={name} />
            <S.Name>{name}</S.Name>
            <S.Location>{rentalLocation}</S.Location>
            <S.SelectedDates>{renderSelectedDates()}</S.SelectedDates>
            <S.TotalPrice>
              {selectedStartDate && selectedEndDate
                ? `${totalPrice.toLocaleString()}원 (${
                    differenceInCalendarDays(
                      selectedEndDate,
                      selectedStartDate
                    ) + 1
                  }일)`
                : `${totalPrice.toLocaleString()}원 (${
                    selectedTimes.length
                  }시간)`}
            </S.TotalPrice>
            <S.ReserveButton onClick={handleReserveClick}>
              예약하기
            </S.ReserveButton>
          </S.PriceInfo>
        </S.DetailContainer>
      </S.InnerContainer>
    </S.Container>
  );
};

export default RentalSelection;
