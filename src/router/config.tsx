import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("../pages/home/page"));
const ListingsPage = lazy(() => import("../pages/listings/page"));
const ProductDetailPage = lazy(() => import("../pages/product-detail/page"));
const EscrowPage = lazy(() => import("../pages/escrow/page"));
const ProfilePage = lazy(() => import("../pages/profile/page"));
const ReviewPage = lazy(() => import("../pages/review/page"));
const DAOPage = lazy(() => import("../pages/dao/page"));
const DAOSpacePage = lazy(() => import("../pages/dao-space/page"));
const ProposalDetailPage = lazy(() => import("../pages/proposal-detail/page"));
const CreateProposalPage = lazy(() => import("../pages/create-proposal/page"));
const SellerProfilePage = lazy(() => import("../pages/seller-profile/page"));
const TreasuryPage = lazy(() => import("../pages/treasury/page"));
const SellItemPage = lazy(() => import("../pages/sell-item/page"));
const QuestPage = lazy(() => import("../pages/quest/page"));
const BadgesPage = lazy(() => import("../pages/badges/page"));
const NotFound = lazy(() => import("../pages/NotFound"));
const EscrowSuccessPage = lazy(() => import("../pages/escrow-success/page"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/listings",
    element: <ListingsPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/escrow",
    element: <EscrowPage />,
  },
  {
    path: "/escrow-success",
    element: <EscrowSuccessPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/review",
    element: <ReviewPage />,
  },
  {
    path: "/dao",
    element: <DAOPage />,
  },
  {
    path: "/dao-space",
    element: <DAOSpacePage />,
  },
  {
    path: "/proposal/:id",
    element: <ProposalDetailPage />,
  },
  {
    path: "/create-proposal",
    element: <CreateProposalPage />,
  },
  {
    path: "/seller/:id",
    element: <SellerProfilePage />,
  },
  {
    path: "/treasury",
    element: <TreasuryPage />,
  },
  {
    path: "/sell",
    element: <SellItemPage />,
  },
  {
    path: "/quest/:id",
    element: <QuestPage />,
  },
  {
    path: "/badges",
    element: <BadgesPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
