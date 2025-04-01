import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout/Layout';
import Main from '../pages/main/Main';
import IndexContainer from '../pages/index/IndexContainer';
import LoginContainer from '../pages/login/LoginContainer';
import ReservationContainer from '../pages/reservation/ReservationContainer';
import VodContainer from '../pages/vod/VOD/VodContainer';
import JoinContainer from '../pages/join/JoinContainer';
import MyActiveContainer from '../pages/mypage/myActive/MyActiveContainer';
import MyGradeContainer from '../pages/mypage/myGrade/MyGradeContainer';
import MyInfoContainer from '../pages/mypage/myInfo/MyInfoContainer';
import MyPayContainer from '../pages/mypage/myPay/MyPayContainer';
import MyResContainer from '../pages/mypage/myRes/MyResContainer';
import MyTeamContainer from '../pages/mypage/myTeam/MyTeamContainer';
import FindIdContainer from '../pages/findId/FindIdContainer';
import MyVodContainer from '../pages/mypage/myVod/MyVodContainer';
import DetailContainer from '../pages/shop/md/MdDetail/DetailContainer';
import NewsMainContainer from '../pages/community/news/NewsMainContainer';
import FindPasswordContainer from '../pages/findPassword/FindPasswordContainer';
import CommunityInfoContainer from '../pages/community/main_info/CommunityInfoContainer';
import EditCommentsMainContainer from '../pages/community/editComment/EditCommentsMainContainer';
import EditCommentsContainer from '../pages/community/editComment/EditCommentsContainer';
import NotifyContainer from '../pages/community/comment/NotifyContainer';
import HistoryContainer from '../pages/community/writing/HistoryContainer';
import HistoryCheckContainer from '../pages/community/writing/HistoryCheckContainer';
import HistoryEditContainer from '../pages/community/writingEdit/HistoryEditContainer';
import HistoryEditActiveContainer from '../pages/community/writingEdit/HistoryEditActiveContainer';
import NewsContainer from '../pages/community/newsInfo/NewsContainer';
import ReportContainer from '../pages/community/report/ReportContainer';
import ReportsContainer from '../pages/community/reports/ReportsContainer';
import AuditionContainer from '../pages/community/audition/AuditionContainer';
import AuditionInfoContainer from '../pages/community/audition/AuditionInfoContainer';
import WriteContainer from '../pages/community/writing/WriteContainer';
import LikeLessonContainer from '../pages/mypage/myActive/likeLesson/LikeLessonContainer';
import LikeAuctionContainer from '../pages/mypage/myActive/likeAction/LikeAuctionContainer';
import LikeMdContainer from '../pages/mypage/myActive/likeMd/LikeMdContainer';
import LikePropContainer from '../pages/mypage/myActive/likeProp/LikePropContainer';
import LikeTicketContainer from '../pages/mypage/myActive/likeTicket/LikeTicketContainer';
import LikeSpaceContainer from '../pages/mypage/myActive/likeSpace/LikeSpaceContainer';
import MyActiveReviewContainer from '../pages/mypage/myActive/MyActiveReviewContainer';
import MyActivePostContainer from '../pages/mypage/myActive/MyActivePostContainer';
import MyActiveComContainer from '../pages/mypage/myActive/MyActiveComContainer';
import MyActiveReportContainer from '../pages/mypage/myActive/MyActiveReportContainer';
import MyResPropsContainer from '../pages/mypage/myRes/MyResPropsContainer';
import MyResReturnContainer from '../pages/mypage/myRes/MyResReturnContainer';
import MyResTicketContainer from '../pages/mypage/myRes/MyResTicketContainer';
import MyResCanceleContainer from '../pages/mypage/myRes/MyResCanceleContainer';
import MyResDetailContainer from '../pages/mypage/myRes/MyResDetailContainer';
import MyClassWatchContainer from '../pages/mypage/myClass/MyClassWatchContainer';
import MyClassCreateContainer from '../pages/mypage/myClass/MyClassCreateContainer';
import MyClassAdviceContainer from '../pages/mypage/myClass/MyClassAdviceContainer';
import MyVodSubscriptContainer from '../pages/mypage/myVod/MyVodSubscriptContainer';
import MyVodWatchContainer from '../pages/mypage/myVod/MyVodWatchContainer';
import CompleteIdContainer from '../pages/completeId/CompleteIdContainer';
import PlayContainer from '../pages/vod/video/mainpage/PlayContainer';
import CommunityContainer from '../pages/community/main/CommunityContainer';
import ReportsInfoContainer from '../pages/community/reports/ReportsInfoContainer';
import MainContainer from '../pages/shop/md/MdMain/MainContainer';
import CartContainer from '../pages/shop/md/MdCart/CartContainer';
// import PaymentContainer from '../pages/shop/md/MdPayment/PaymentContainer';
import InquiryContainer from '../pages/shop/md/MdInquiry/InquiryContainer';
import InquiryListContainer from '../pages/shop/md/MdInquiryList/InquiryListContainer';
import MyGradeUpdateContainer from '../pages/mypage/myGrade/update/MyGradeUpdateContainer';
import MainContainer2 from '../pages/shop/auction/AuctionMain/MainContainer2';
import DetailContainer2 from '../pages/shop/auction/AuctionDetail/DetailContainer2';
import MoreContainer from '../pages/vod/more/selectMore/MoreContainer'
import PopularContainer from '../pages/vod/more/popular/PopularContainer'
import MusicalContainer from '../pages/vod/musical/MusicalContainer2'
import NonLoginContainer from '../pages/vod/video/nonloginpage/NonLoginContainer'
import HotContainer from '../pages/hot/HotContainer';
import ShopContainer from '../pages/shop/ShopContainer';
import InquiryContainer2 from '../pages/shop/auction/AuctionInquiry/InquiryContainer2';
import PayInfoContainer from '../pages/shop/md/MdPayInfo/PayInfoContainer';
import NotFoundContainer from '../pages/notFound/NotFoundContainer';
import FAQContainer from '../pages/FAQ/FAQContainer';
import CommentsContainer from '../pages/community/editComment/CommentsContainer';
import MusicalContainer2 from '../pages/vod/musical/MusicalContainer2';
import MovieContainer from '../pages/vod/movie/MovieContainer';
import MusicContainer from '../pages/vod/music/MusicContainer'
import MyShowuContainer from '../pages/vod/showu/MyShowuContainer';
import ShowuVideoConatiner from '../pages/vod/video/showuvideopage/ShowuVideoContainer';
import ManagementContainer from '../pages/shop/auction/AuctionManagement/ManagementContainer';
// import PaymentContainer2 from '../pages/shop/auction/AuctionPayment/PaymentContainer2';
import RefundContainer from '../pages/shop/md/MdRefund/RefundContainer';
import RefundInfoContainer from '../pages/shop/md/MdRefundInfo/RefundInfoContainer';
import StateContainer from '../pages/shop/auction/AuctionState/StateContainer';
import InquiryListContainer2 from '../pages/shop/auction/AuctionInquiryList/InquiryListContainer2';
import InquiryDetailContainer from '../pages/shop/md/MdInquiryDetail/InquiryDetailContainer';
import InquiryDetailContainer2 from '../pages/shop/auction/AuctionInquiryDetail/InquiryDetailContainer2';
import PerformingShow from '../pages/reservation/performing/performingShow/PerformingShow';
import ShowDetail from '../pages/reservation/performing/showDetail/ShowDetail';
import SeatSelection from '../pages/reservation/performing/seatSelection/SeatSelection';
import TicketOpen from '../pages/reservation/ticket/ticketOpen/TicketOpen';
import OpenDetail from '../pages/reservation/ticket/openDetail/OpenDetail';
import SpaceRental from '../pages/reservation/space/spaceRental/SpaceRental';
import RentalDetail from '../pages/reservation/space/rentaldetail/RentalDetail';
import RentalSelection from '../pages/reservation/space/rentalSelection/RentalSelection';
// import Detail from '../pages/reservation/payment/Detail';
// import Failed from '../pages/reservation/payment/Failed';
// import Success from '../pages/reservation/payment/Success';
import Failed from "../pages/reservation/payment/tossPayment/Failed";
import Success from "../pages/reservation/payment/tossPayment/Success";
import AdminUpgradContainer from '../pages/admin/AdminUpgradContainer';
import TeamContainer from '../pages/showu/team/TeamContainer';
import TeamDetailContainer from '../pages/showu/team/teamDetail/TeamDetailContainer';
import TeamCreatedContainer from '../pages/showu/team/teamCreate/TeamCreatedContainer';
import TeamUpdateContainer from '../pages/mypage/myTeam/teamUpdate/TeamUpdateContainer';
import MyTeamApplyContainer from '../pages/mypage/myTeam/myTeamApply/MyTeamApplyContainer';
import TeamManagementContainer from '../pages/mypage/myTeam/teamManagement/TeamManagementContainer';
import TeamApplyUpdateContainer from '../pages/mypage/myTeam/myTeamApply/update/TeamApplyUpdateContainer';
import WriteUpdateContainer from '../pages/community/writingEdit/WriteUpdateContainer';
import ReportEditContainer from '../pages/community/reportEdit/ReportEditContainer';
import AdminTeamContainer from '../pages/admin/AdminTeamContainer';

import TicketPaymentDetail from "../pages/reservation/payment/ticketPayment/TicketPaymentDetail";
import TossPaymentContianer from "../pages/reservation/payment/tossPayment/TossPaymentContianer";
import RentalPaymentDetail from "../pages/reservation/spacePayment/rentalPayment/RentalPaymentDetail";
import RentalTossPaymentContainer from "../pages/reservation/spacePayment/rentalTossPayment/RentalTossPaymentContainer";
import RentalSuccess from "../pages/reservation/spacePayment/rentalTossPayment/RentalSuccess";
import RentalFailed from "../pages/reservation/spacePayment/rentalTossPayment/RentalFailed";
import MdPaymentDetail from "../pages/shop/md/MdPayment/payment/mdPayment/MdPaymentDetail";
import MdPaymentContainer from "../pages/shop/md/MdPayment/_component/MdPaymentContainer";
import MdTossPaymentContainer from "../pages/shop/md/MdPayment/payment/mdTossPayment/MdTossPaymentContainer";
import MdSuccess from "../pages/shop/md/MdPayment/payment/mdTossPayment/MdSuccess";
import MdFailed from "../pages/shop/md/MdPayment/payment/mdTossPayment/MdFailed";
import AuctionPaymentContainer from "../pages/shop/auction/AuctionPayment/_component/AuctionPaymentContainer";
import AuctionPaymentDetail from "../pages/shop/auction/AuctionPayment/payment/auctionPayment/AuctionPaymentDetail";
import AuctionTossPaymentContainer from "../pages/shop/auction/AuctionPayment/payment/auctionTossPayment/AuctionTossPaymentContainer";
import AuctionSuccess from "../pages/shop/auction/AuctionPayment/payment/auctionTossPayment/AuctionSuccess";
import AuctionFailed from "../pages/shop/auction/AuctionPayment/payment/auctionTossPayment/AuctionFailed";
import TeamApplyContainer from '../pages/showu/team/teamApply/TeamApplyContainer';
import SearchContainer from '../pages/search/SearchContainer'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexContainer />,
      },
      {
        path: "/main",
        element: <Main />,
      },
      {
        path: "/admin",
        element: <AdminUpgradContainer />, //관리자 페이지 등급업 관리
      },
      {
        path: "/admin/team",
        element: <AdminTeamContainer />, //관리자 페이지 팀 개설 관리
      },
      {
        path: "/community",
        element: <CommunityContainer />, // 커뮤니티 메인 페이지
      },
      {
        path: "/community/communityInfo/:id",
        element: <CommunityInfoContainer />, // 커뮤니티 세부 페이지
      },
      {
        path: "/community/communityInfo/Comments/:id",
        element: <CommentsContainer />, // 커뮤니티 댓글 상세 페이지
      },
      {
        path: "/community/communityInfo/editCommentsMain/:id",
        element: <EditCommentsMainContainer />, // 커뮤니티 댓글 수정 메인 페이지
      },
      {
        path: "/community/communityInfo/editComments/:id",
        element: <EditCommentsContainer />, // 커뮤니티 댓글 수정 세부 페이지
      },
      {
        path: "/community/communityInfo/Notify",
        element: <NotifyContainer />, // 커뮤니티 댓글 신고 페이지
      },
      {
        path: "/community/write",
        element: <WriteContainer />, // 커뮤니티 글쓰기 페이지
      },
      {
        path: "/community/write/update/:id",
        element: <WriteUpdateContainer />, // 커뮤니티 글쓰기 수정 페이지
      },
      {
        path: "/community/writing/history",
        element: <HistoryContainer />, // 커뮤니티 글쓰기 내역 페이지
      },
      {
        path: "/community/write/history/check/:id",
        element: <HistoryCheckContainer />, // 커뮤니티 글쓰기 내역 확인 페이지
      },
      {
        path: "/community/write/history/edit",
        element: <HistoryEditContainer />, // 커뮤니티 글쓰기 내역 수정/삭제 메인 페이지
      },
      {
        path: "/community/write/history/edit/active/:id",
        element: <HistoryEditActiveContainer />, // 커뮤니티 글쓰기 내역 수정/삭제 페이지
      },
      {
        path: "/community/newsMain",
        element: <NewsMainContainer />, // 뉴스 메인 페이지
      },
      {
        path: "/community/newsMain/news/:id", // 뉴스 세부 페이지
        element: <NewsContainer />,
      },
      {
        path: "/community/report",
        element: <ReportContainer />, // 제보하기 페이지
      },
      {
        path: "/community/report/edit/:id",
        element: <ReportEditContainer />, // 제보하기 수정 페이지
      },
      {
        path: "/community/reports",
        element: <ReportsContainer />, // 제보내역 페이지
      },
      {
        path: "/community/reports/:id",
        element: <ReportsInfoContainer />, // 제보내역 상세 페이지
      },
      {
        path: "/community/audition",
        element: <AuditionContainer />, // 오디션 메인 페이지
      },
      {
        path: "/community/audition/:id",
        element: <AuditionInfoContainer />, // 오디션 세부 페이지
      },
      {
        path: "/my-active/like/my-team",
        element: <MyActiveContainer />, //찜 - 팀 매칭 페이지
      },
      {
        path: "/my-active/like/my-class",
        element: <LikeLessonContainer />, //찜 - 레슨 페이지
      },
      {
        path: "/my-active/like/space",
        element: <LikeSpaceContainer />, //찜 - 공간 페이지
      },
      {
        path: "/my-active/like/prop",
        element: <LikePropContainer />, //찜 - 소품 페이지
      },
      {
        path: "/my-active/like/tickets",
        element: <LikeTicketContainer />, //찜 - 티켓 페이지
      },
      {
        path: "/my-active/like/md",
        element: <LikeMdContainer />, //찜 - md 페이지
      },
      {
        path: "/my-active/like/auction",
        element: <LikeAuctionContainer />, //찜 - 경매 페이지
      },
      {
        path: "/my-active/reviews",
        element: <MyActiveReviewContainer />, //후기관리 페이지
      },
      {
        path: "/my-active/posts",
        element: <MyActivePostContainer />, //작성한 글 관리 페이지
      },
      {
        path: "/my-active/comments",
        element: <MyActiveComContainer />, //작성한 댓글 관리 페이지
      },
      {
        path: "/my-active/reports",
        element: <MyActiveReportContainer />, //제보 관리 페이지
      },
      {
        path: "/my-res/props",
        element: <MyResPropsContainer />, //소품 대여 페이지
      },
      {
        path: "/my-res/space",
        element: <MyResContainer />, //공간 대여 페이지
      },
      {
        path: "/my-res/returns",
        element: <MyResReturnContainer />, //반납 내역 페이지
      },
      {
        path: "/my-res/ticket",
        element: <MyResTicketContainer />, //티켓 내역 페이지
      },
      {
        path: "/my-res/ticket/cancele",
        element: <MyResCanceleContainer />, //티켓 내역 페이지
      },
      {
        path: "/my-res/ticket/detail/:id",
        element: <MyResDetailContainer />, //티켓 상세 페이지 페이지
      },
      {
        path: "/my-class/watching",
        element: <MyClassWatchContainer />, //수강중인 레슨 정보
      },
      {
        path: "/my-class/created",
        element: <MyClassCreateContainer />, //개설한 레슨 정보
      },
      {
        path: "/my-class/advice",
        element: <MyClassAdviceContainer />, //상담 신청 내역 페이지
      },
      {
        path: "/my-vod/subscriptions",
        element: <MyVodSubscriptContainer />, //구독한 vod 페이지
      },
      {
        path: "/my-vod/watching",
        element: <MyVodWatchContainer />, //시청중인 컨텐츠 페이지
      },
      {
        path: "/up-grade",
        element: <MyGradeContainer />, //등급 정보
      },
      {
        path: "/mypage",
        element: <MyInfoContainer />, //회원 정보
      },
      {
        path: "/mypage/up-grade/update",
        element: <MyGradeUpdateContainer />, //회원 정보
      },
      {
        path: "/my-pay",
        element: <MyPayContainer />, //결제 정보
      },
      {
        path: "/my-team",
        element: <MyTeamContainer />, //팀매칭 정보
      },
      {
        path: "/my-team/management",
        element: <TeamManagementContainer />, //팀원 관리
      },
      {
        path: "/my-team/apply",
        element: <MyTeamApplyContainer />, // 지원한 팀 관리
      },
      {
        path: "/my-vod",
        element: <MyVodContainer />, //VOD 정보
      },
      {
        path: "/reservation",
        element: <ReservationContainer />,
      },
      {
        path: "/shop",
        element: <ShopContainer />, // Shop 메인
      },
      {
        path: "/shop/md",
        element: <MainContainer />, // MD 메인
      },
      {
        path: "/shop/md/detail/:id",
        element: <DetailContainer />, // MD 상세
      },
      {
        path: "/shop/md/cart",
        element: <CartContainer />, // MD 장바구니
      },
      {
        path: "/shop/md/payment",
        element: <MdPaymentContainer />, // 수정
      },
      {
        path: "/shop/md/payment/toss",
        element: <MdPaymentDetail />, // 수정
      },
      {
        path: "/shop/md/payment/toss-payment", // 토스 페이 결제 경로 - 수정
        element: <MdTossPaymentContainer />,
        children: [
          { path: "success", element: <MdSuccess /> },
          { path: "failed", element: <MdFailed /> },
        ],
      },
      // {
      //   path: "/shop/md/payment",
      //   element: <PaymentContainer />, // MD 주문/결제
      // },
      {
        path: "/shop/md/payment/info",
        element: <PayInfoContainer />, // MD 주문 정보
      },
      {
        path: "/shop/md/inquiry",
        element: <InquiryContainer />, // MD 문의
      },
      {
        path: "/shop/md/inquiry/list",
        element: <InquiryListContainer />, // MD 문의목록
      },
      {
        path: "/shop/md/inquiry/:id",
        element: <InquiryDetailContainer />, // MD 문의 상세글
      },
      {
        path: "/shop/md/refund",
        element: <RefundContainer />, // MD 반품
      },
      {
        path: "/shop/md/refund/info",
        element: <RefundInfoContainer />, // MD 반품 정보
      },
      {
        path: "/shop/auction",
        element: <MainContainer2 />, // 경매 메인
      },
      {
        path: "/shop/auction/detail/:id",
        element: <DetailContainer2 />, // 경매 상세
      },
      {
        path: "/shop/auction/inquiry",
        element: <InquiryContainer2 />, // 경매 문의 양식
      },
      {
        path: "/shop/auction/inquiry/list",
        element: <InquiryListContainer2 />, // 경매 문의 목록
      },
      {
        path: "/shop/auction/inquiry/:id",
        element: <InquiryDetailContainer2 />, // 경매 문의 상세글
      },
      {
        path: "/shop/auction/payment",
        element: <AuctionPaymentContainer />, // 경매 입찰 - 수정
      },
      {
        path: "/shop/auction/payment/toss", // 수정
        element: <AuctionPaymentDetail />,
      },
      {
        path: "/shop/auction/payment/toss-payment", // 수정
        element: <AuctionTossPaymentContainer />,
        children: [
          { path: "success", element: <AuctionSuccess /> },
          { path: "failed", element: <AuctionFailed /> },
        ],
      },
      {
        path: "/shop/auction/management",
        element: <ManagementContainer />, // 경매 관리
      },
      {
        path: "/shop/auction/state",
        element: <StateContainer />, // 경매 구매 상태
      },
      {
        path: "/showu/team",
        element: <TeamContainer />, //team 메인
      },
      {
        path: "/showu/team/detail/:id",
        element: <TeamDetailContainer />, //team 상세 페이지
      },
      {
        path: "/showu/team/create",
        element: <TeamCreatedContainer />, //team 개설 페이지
      },
      {
        path: "/showu/team/up-date/:id",
        element: <TeamUpdateContainer />, // team 수정 페이지
      },
      {
        path: "/showu/team/apply/:id",
        element: <TeamApplyContainer />, //team 지원 페이지
      },
      {
        path: "/showu/team/apply/up-date/:id",
        element: <TeamApplyUpdateContainer />, //team 지원 페이지
      },
      {
        path : "/search",
        element : <SearchContainer/>
      },
      {
        path: "/vod",
        element: <VodContainer />,
      },
      {
        path: "/vod/play/:id",
        element: <NonLoginContainer />,
      },
      {
        path: "vod/play/start",
        element: <PlayContainer />,
      },
      {
        path: "/vod/more/rec",
        element: <MoreContainer />,
      },
      {
        path: "/vod/more/rec/pop",
        element: <PopularContainer />,
      },
      {
        path: "/vod/more/rec/musical",
        element: <MusicalContainer />,
      },
      {
        path: "/hot",
        element: <HotContainer />,
      },
      {
        path: "/*",
        element: <NotFoundContainer />,
      },
      {
        path: "/faq",
        element: <FAQContainer />,
      },
      {
        path: "/vod/musical",
        element: <MusicalContainer2 />,
      },
      {
        path: "/vod/movie",
        element: <MovieContainer />,
      },
      {
        path: "/vod/music",
        element: <MusicContainer />,
      },
      {
        path: "/vod/my-ShowU",
        element: <MyShowuContainer />,
      },
      {
        path: "/vod/my-ShowU/video/:id",
        element: <ShowuVideoConatiner />,
      },
      {
        path: "/reservation",
        element: <ReservationContainer />,
      },
      {
        path: "/reservation/performing-show",
        element: <PerformingShow />,
      },
      {
        path: "/reservation/performing-show/showDetail/:id",
        element: <ShowDetail />,
      },
      {
        path: "/reservation/performing-show/seat-selection",
        element: <SeatSelection />,
      },
      {
        path: "/reservation/ticket-open",
        element: <TicketOpen />,
      },
      {
        path: "/reservation/ticket-open/openDetail/:id",
        element: <OpenDetail />,
      },
      {
        path: "/reservation/space/space-rental",
        element: <SpaceRental />,
      },
      {
        path: "/reservation/space/rentalDetail/:id",
        element: <RentalDetail />,
      },
      {
        path: "/reservation/space/rental-selection",
        element: <RentalSelection />,
      },
      {
        path: "/reservation/ticket-payment", // ticketPaymentDetail 경로 추가 - 수정
        element: <TicketPaymentDetail />,
      },
      {
        path: "/reservation/space-payment", // RentalPaymentDetail 경로 추가 - 수정
        element: <RentalPaymentDetail />,
      },
      {
        path: "/reservation/toss-payment", // 토스 페이 api - 수정
        element: <TossPaymentContianer />,
        children: [
          { path: "success", element: <Success /> },
          { path: "failed", element: <Failed /> },
        ],
      },
      {
        path: "/reservation/rental-toss-payment", // 토스 페이 api - 수정
        element: <RentalTossPaymentContainer />,
        children: [
          { path: "rental-success", element: <RentalSuccess /> },
          { path: "rental-failed", element: <RentalFailed /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginContainer />,
  },
  {
    path: "/join",
    element: <JoinContainer />,
  },
  {
    path: "/find-id",
    element: <FindIdContainer />,
  },
  {
    path: "/verify",
    element: <CompleteIdContainer />, //비밀번호 변경 전 확인 페이지
  },
  {
    path: "/reset-password",
    element: <FindPasswordContainer />, //비밀번호 변경 페이지
  },
]);



export default router;