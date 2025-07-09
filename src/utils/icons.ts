import { FC } from "react";
import { SvgProps } from "react-native-svg";

import ShopIcon from "../assets/images/category-icons/shop-category-icon.svg";
import EducationIcon from "../assets/images/category-icons/education-category-icon.svg";
import ExtraIncomeIcon from "../assets/images/category-icons/extraincome-category-icon.svg";
import HealthIcon from "../assets/images/category-icons/health-category-icon.svg";
import HomeIcon from "../assets/images/category-icons/home-category-icon.svg";
import InvestmentIcon from "../assets/images/category-icons/investments-category-icon.svg";
import SubscriptionsIcon from "../assets/images/category-icons/subscriptions-category-icon.svg";
import TransportIcon from "../assets/images/category-icons/transport-category-icon.svg";
import TravelIcon from "../assets/images/category-icons/travel-category-icon.svg";
import WageIcon from "../assets/images/category-icons/wage-category-icon.svg";
import LeisureIcon from "../assets/images/category-icons/leisure-category-icon.svg";

export const iconMap: Record<string, FC<SvgProps>> = {
  food: ShopIcon,
  transport: TransportIcon,
  home: HomeIcon,
  leisure: LeisureIcon,
  wage: WageIcon,
  extraincome: ExtraIncomeIcon,
  travel: TravelIcon,
  investment: InvestmentIcon,
  education: EducationIcon,
  subscriptions: SubscriptionsIcon,
  health: HealthIcon,
};
