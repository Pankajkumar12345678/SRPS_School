import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Header from "./components/Header.jsx";
import AcademicPage from "./pages/AcademicPage.jsx";

import AdmissionsPage from "./pages/AdmissionsPage.jsx";

import Footer from "./components/Footer.jsx";
import MandatoryDisclosure from "./pages/MandatoryDisclosure.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import PhotoGalleryPage from "./pages/PhotoGalleryPage.jsx";
import VideoGalleryPage from "./pages/VideoGalleryPage.jsx";
import NCCPage from "./pages/NCC.jsx";

// New School Nav Pages
import VisionMissionPage from "./pages/VisionMissionPage.jsx";
import AimsPage from "./pages/AimsPage.jsx";
import RulesRegulationsPage from "./pages/RulesRegulationsPage.jsx";
import MessageForParentsPage from "./pages/MessageForParentsPage.jsx";
import MessageForStudentsPage from "./pages/MessageForStudentsPage.jsx";
import ImportantProcedurePage from "./pages/ImportantProcedurePage.jsx";
import SchoolAnthemPage from "./pages/SchoolAnthemPage.jsx";
import FormerHeadmistressPage from "./pages/FormerHeadmistressPage.jsx";
import RetiredTeachersPage from "./pages/RetiredTeachersPage.jsx";

// About Us Inner Pages
import ManagementCommitteePage from "./pages/ManagementCommitteePage.jsx";
import ParentsTeachersAssociationPage from "./pages/ParentsTeachersAssociationPage.jsx";
import AwardsAchievementsPage from "./pages/AwardsAchievementsPage.jsx";
import AffiliationDetailsPage from "./pages/AffiliationDetailsPage.jsx";
import AnnualReportPage from "./pages/AnnualReportPage.jsx";
import SuccessStoriesPage from "./pages/SuccessStoriesPage.jsx";
import AchieversPage from "./pages/AchieversPage.jsx";
import FacilitiesPage from "./pages/FacilitiesPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import InfrastructurePage from "./pages/InfrastructurePage.jsx";
import PrincipalDeskPage from "./pages/PrincipalDeskPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import AdminPanelPage from "./pages/AdminPanelPage.jsx";
import NoticeBoardPage from "./pages/NoticeBoardPage.jsx";
import HolidayListPage from "./pages/HolidayListPage.jsx";
import AcademicCalendarPage from "./pages/AcademicCalendarPage.jsx";
import SchoolTimingsPage from "./pages/SchoolTimingsPage.jsx";
import SchoolUniformPage from "./pages/SchoolUniformPage.jsx";
import DownloadsPage from "./pages/DownloadsPage.jsx";
import TransferCertificatePage from "./pages/TransferCertificatePage.jsx";
import OnlineStudyMaterialsPage from "./pages/OnlineStudyMaterialsPage.jsx";
import MartialArtsPage from "./pages/MartialArtsPage.jsx";
import AnnualSportsPage from "./pages/AnnualSportsPage.jsx";
import ExhibitionsPage from "./pages/ExhibitionsPage.jsx";
import CelebrationsPage from "./pages/CelebrationsPage.jsx";
import CompetitionsPage from "./pages/CompetitionsPage.jsx";
import StaffActivityPage from "./pages/StaffActivityPage.jsx";
import ExtraCurricularPage from "./pages/ExtraCurricularPage.jsx";
import QuizPage from "./pages/Quiz.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academic" element={<AcademicPage />} />

        <Route path="/admissions" element={<AdmissionsPage />} />

        <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/ncc" element={<NCCPage />} />
        <Route path="/gallery" element={<PhotoGalleryPage />} />
        <Route path="/photo-gallery" element={<PhotoGalleryPage />} />
        <Route path="/video-gallery" element={<VideoGalleryPage />} />

        {/* School Nav Inner Pages */}
        <Route path="/vision-mission" element={<VisionMissionPage />} />
        <Route path="/aims" element={<AimsPage />} />
        <Route path="/rules-regulations" element={<RulesRegulationsPage />} />
        <Route path="/message-parents" element={<MessageForParentsPage />} />
        <Route path="/message-students" element={<MessageForStudentsPage />} />
        <Route
          path="/important-procedure"
          element={<ImportantProcedurePage />}
        />
        <Route path="/school-anthem" element={<SchoolAnthemPage />} />
        <Route
          path="/former-headmistress"
          element={<FormerHeadmistressPage />}
        />
        <Route path="/retired-teachers" element={<RetiredTeachersPage />} />

        {/* About Us Inner Pages */}
        <Route
          path="/management-committee"
          element={<ManagementCommitteePage />}
        />
        <Route
          path="/parents-teachers-association"
          element={<ParentsTeachersAssociationPage />}
        />
        <Route
          path="/awards-achievements"
          element={<AwardsAchievementsPage />}
        />
        <Route
          path="/affiliation-details"
          element={<AffiliationDetailsPage />}
        />
        <Route path="/annual-report" element={<AnnualReportPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/achievers" element={<AchieversPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/principal-desk" element={<PrincipalDeskPage />} />
        <Route path="/notice-board" element={<NoticeBoardPage />} />
        <Route path="/holiday-list" element={<HolidayListPage />} />
        <Route path="/academic-calendar" element={<AcademicCalendarPage />} />
        <Route path="/school-timings" element={<SchoolTimingsPage />} />
        <Route path="/school-uniform" element={<SchoolUniformPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route
          path="/transfer-certificate"
          element={<TransferCertificatePage />}
        />
        <Route
          path="/online-study-materials"
          element={<OnlineStudyMaterialsPage />}
        />
        <Route path="/martial-arts" element={<MartialArtsPage />} />
        <Route path="/annual-sports" element={<AnnualSportsPage />} />
        <Route path="/exhibitions" element={<ExhibitionsPage />} />
        <Route path="/celebrations" element={<CelebrationsPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/staff-activity" element={<StaffActivityPage />} />
        <Route path="/extra-curricular" element={<ExtraCurricularPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
