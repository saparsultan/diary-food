import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ABOUT,
  BLOGS,
  FAVORITES,
  HOME,
  LOGIN,
  MEASURING,
  PRODUCTS,
  RECIPES,
} from "../utils/consts";
import logoLanding from "../assets/images/logo-landing.svg";
import favoritesSvg from "../assets/images/favorites.svg";
import bgHero from "../assets/images/bg-hero.jpg";

const Landing = () => {
  let activeClassName = "nav__link--active";
  return (
    <div className="landing">
      <div className="landing-header">
        <img src={logoLanding} alt="Логотип" />
        <div className="lh-action">
          <Link to={FAVORITES} className="lh-action__favorites">
            <img src={favoritesSvg} alt="Избранное" />
          </Link>
          <div className="lh-action__line"></div>
          <Link to={LOGIN} className="lh-action__login">
            Войти
          </Link>
        </div>
      </div>
      <div className="landing-main">
        <ul className="lh-nav nav">
          <li className="nav__item">
            <NavLink to={ABOUT} className="nav__link">
              {({ isActive }) => (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.479 19.3958C8.64567 19.3958 7.11428 18.781 5.88484 17.5516C4.65595 16.3227 4.0415 14.7916 4.0415 12.9583V6.02075C4.0415 5.54853 4.20484 5.14909 4.5315 4.82242C4.85762 4.49631 5.25678 4.33325 5.729 4.33325C5.89567 4.33325 6.03456 4.36797 6.14567 4.43742C6.25678 4.50686 6.34706 4.59714 6.4165 4.70825V3.52075C6.4165 3.04853 6.57956 2.64909 6.90567 2.32242C7.23234 1.99631 7.63178 1.83325 8.104 1.83325C8.27067 1.83325 8.4165 1.85742 8.5415 1.90575C8.6665 1.95464 8.77067 2.0277 8.854 2.12492C8.93734 1.63881 9.11789 1.2602 9.39567 0.989085C9.67345 0.71853 10.0346 0.583252 10.479 0.583252C10.9234 0.583252 11.3054 0.722141 11.6248 0.999919C11.9443 1.2777 12.1318 1.62492 12.1873 2.04159V2.52075C12.2568 2.43742 12.3507 2.37131 12.469 2.32242C12.5868 2.27409 12.7151 2.24992 12.854 2.24992C13.3401 2.24992 13.7429 2.41297 14.0623 2.73909C14.3818 3.06575 14.5415 3.4652 14.5415 3.93742V7.39575C14.6248 7.27075 14.729 7.18047 14.854 7.12492C14.979 7.06936 15.104 7.04159 15.229 7.04159C15.7012 7.04159 16.1004 7.20464 16.4265 7.53075C16.7532 7.85742 16.9165 8.25686 16.9165 8.72909V12.9583C16.9165 14.7916 16.3018 16.3227 15.0723 17.5516C13.8434 18.781 12.3123 19.3958 10.479 19.3958ZM10.479 18.1458C11.2151 18.1458 11.8993 18.0105 12.5315 17.7399C13.1632 17.4688 13.7118 17.1041 14.1773 16.6458C14.6423 16.1874 15.0068 15.6421 15.2707 15.0099C15.5346 14.3783 15.6665 13.6944 15.6665 12.9583V8.72909C15.6665 8.60409 15.6248 8.49992 15.5415 8.41659C15.4582 8.33325 15.354 8.29159 15.229 8.29159C15.104 8.29159 14.9965 8.33325 14.9065 8.41659C14.8159 8.49992 14.7707 8.60409 14.7707 8.72909V12.2291L14.4582 12.2708C13.7915 12.3958 13.2465 12.6944 12.8232 13.1666C12.3993 13.6388 12.1457 14.2083 12.0623 14.8749H10.6665C10.7359 13.986 11.0068 13.2221 11.479 12.5833C11.9512 11.9444 12.5554 11.4721 13.2915 11.1666V3.93742C13.2915 3.81242 13.2498 3.70825 13.1665 3.62492C13.0832 3.54159 12.979 3.49992 12.854 3.49992C12.729 3.49992 12.6215 3.54159 12.5315 3.62492C12.4409 3.70825 12.3957 3.81242 12.3957 3.93742V9.35409H10.9373V2.27075C10.9373 2.14575 10.8923 2.04159 10.8023 1.95825C10.7118 1.87492 10.604 1.83325 10.479 1.83325C10.354 1.83325 10.2498 1.87492 10.1665 1.95825C10.0832 2.04159 10.0415 2.14575 10.0415 2.27075V9.35409H8.56234V3.52075C8.56234 3.39575 8.51734 3.29159 8.42734 3.20825C8.33678 3.12492 8.229 3.08325 8.104 3.08325C7.979 3.08325 7.87484 3.12492 7.7915 3.20825C7.70817 3.29159 7.6665 3.39575 7.6665 3.52075V10.1874H6.18734V6.02075C6.18734 5.89575 6.14567 5.79159 6.06234 5.70825C5.979 5.62492 5.86789 5.58325 5.729 5.58325C5.604 5.58325 5.49984 5.62492 5.4165 5.70825C5.33317 5.79159 5.2915 5.89575 5.2915 6.02075V12.9583C5.2915 13.6944 5.42345 14.3783 5.68734 15.0099C5.95123 15.6421 6.31567 16.1874 6.78067 16.6458C7.24623 17.1041 7.79511 17.4688 8.42734 17.7399C9.059 18.0105 9.74289 18.1458 10.479 18.1458Z"
                      fill="#DBF1E7"
                    />
                  </svg>

                  <span className={isActive ? activeClassName : undefined}>
                    О нас
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={HOME}>
              {({ isActive }) => (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5625 0C7.03485 0 6.55274 0.199375 6.1875 0.526454C5.82226 0.199375 5.34015 0 4.8125 0C4.28485 0 3.80274 0.199375 3.4375 0.526454C3.07226 0.199375 2.59016 0 2.0625 0C0.925201 0 0 0.925201 0 2.0625V7.5625C0 9.22213 0.874156 10.0963 1.57644 10.7985C2.23231 11.4546 2.75 11.9721 2.75 13.0625V19.9375C2.75 21.0748 3.6752 22 4.8125 22C5.9498 22 6.875 21.0748 6.875 19.9375V13.0625C6.875 11.9721 7.39269 11.4546 8.04856 10.7985C8.75085 10.0963 9.625 9.22213 9.625 7.5625V2.0625C9.625 0.925201 8.6998 0 7.5625 0ZM8.25 7.5625C8.25 8.65287 7.73231 9.17043 7.07644 9.82648C6.37416 10.5287 5.5 11.4029 5.5 13.0625V19.9375C5.5 20.3176 5.19251 20.625 4.8125 20.625C4.43249 20.625 4.125 20.3176 4.125 19.9375V13.0625C4.125 11.4029 3.25085 10.5287 2.54856 9.82648C1.89269 9.17043 1.375 8.65287 1.375 7.5625V2.0625C1.375 1.68249 1.68249 1.375 2.0625 1.375C2.44251 1.375 2.75 1.68249 2.75 2.0625V6.1875C2.75 6.56751 3.05749 6.875 3.4375 6.875C3.81751 6.875 4.125 6.56751 4.125 6.1875V2.0625C4.125 1.68249 4.43249 1.375 4.8125 1.375C5.19251 1.375 5.5 1.68249 5.5 2.0625V6.1875C5.5 6.56751 5.80749 6.875 6.1875 6.875C6.56751 6.875 6.875 6.56751 6.875 6.1875V2.0625C6.875 1.68249 7.18249 1.375 7.5625 1.375C7.94251 1.375 8.25 1.68249 8.25 2.0625V7.5625ZM20.4236 11.2014C19.7677 10.5454 19.25 10.0279 19.25 8.9375V2.0625C19.25 0.925201 18.3248 0 17.1875 0C16.0502 0 15.125 0.925201 15.125 2.0625V8.9375C15.125 10.0279 14.6074 10.5454 13.9514 11.2014C13.2491 11.9037 12.375 12.7779 12.375 14.4375C12.375 14.7463 12.4294 22 17.1875 22C21.9457 22 22 14.7463 22 14.4375C22 12.7779 21.1259 11.9037 20.4236 11.2014ZM17.1875 20.625C13.7997 20.625 13.75 14.5047 13.75 14.4375C13.75 13.3471 14.2677 12.8296 14.9236 12.1736C15.6259 11.4713 16.5 10.5971 16.5 8.9375V2.0625C16.5 1.68249 16.8075 1.375 17.1875 1.375C17.5676 1.375 17.875 1.68249 17.875 2.0625V8.9375C17.875 10.5971 18.7491 11.4713 19.4514 12.1736C20.1073 12.8296 20.625 13.3471 20.625 14.4375C20.625 14.4992 20.5855 20.625 17.1875 20.625Z"
                      fill="#019852"
                    />
                  </svg>
                  <span className={isActive ? activeClassName : undefined}>
                    Дневник питания
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={RECIPES}>
              {({ isActive }) => (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.3673 1.28905H19.4133C19.7694 1.28905 20.0578 1.00053 20.0578 0.64453C20.0578 0.288527 19.7694 0 19.4133 0H4.57033C3.2633 0 2.2 1.06331 2.2 2.3705V19.6296C2.2 20.9367 3.2633 22 4.57033 22H17.6873C18.9943 22 20.0578 20.9367 20.0578 19.6296V5.82225C20.0578 5.17118 19.7939 4.58069 19.3675 4.15185V1.28905H19.3673ZM4.57033 1.28905H18.0783V3.48466C17.951 3.46352 17.8205 3.45193 17.6873 3.45193H4.57033C3.97413 3.45193 3.48906 2.96686 3.48906 2.3705C3.48906 1.77413 3.97413 1.28905 4.57033 1.28905ZM18.7688 19.6296C18.7688 20.2258 18.2837 20.7109 17.6873 20.7109H4.57033C3.97413 20.7109 3.48906 20.2258 3.48906 19.6296V4.47966C3.8135 4.64667 4.18109 4.74099 4.57033 4.74099H17.6873C17.9197 4.74099 18.1351 4.81501 18.3117 4.94023C18.3272 4.95298 18.3431 4.96507 18.3597 4.97631C18.6088 5.17454 18.7688 5.48002 18.7688 5.82225V19.6296Z"
                      fill="#019852"
                    />
                    <path
                      d="M13.545 8.21475C13.4853 8.21475 13.4251 8.21659 13.3651 8.22011C12.7899 7.6058 11.9794 7.24829 11.1289 7.24829C10.2784 7.24829 9.46788 7.60563 8.89282 8.22011C8.83256 8.21659 8.77247 8.21475 8.71272 8.21475C7.02485 8.21475 5.65187 9.58787 5.65187 11.2755C5.65187 12.7423 6.68882 13.9712 8.06819 14.2682V17.5579C8.06819 17.914 8.35672 18.2024 8.71272 18.2024H13.5452C13.901 18.2024 14.1897 17.914 14.1897 17.5579V14.2682C15.5689 13.9714 16.6061 12.7423 16.6061 11.2755C16.6061 9.58787 15.2329 8.21475 13.545 8.21475ZM9.35724 16.9134V16.1314H12.9007V16.9134H9.35724ZM13.545 13.0474C13.1892 13.0474 12.9005 13.3359 12.9005 13.6919V14.8423H9.35706V13.6919C9.35706 13.3359 9.06854 13.0474 8.71255 13.0474C7.73568 13.0474 6.94092 12.2524 6.94092 11.2755C6.94092 10.2987 7.73568 9.50391 8.71255 9.50391C8.82232 9.50391 8.93427 9.51454 9.04521 9.53553C9.29124 9.58201 9.54241 9.48163 9.68861 9.27804C10.0215 8.8143 10.5599 8.53735 11.1289 8.53735C11.6979 8.53735 12.2363 8.8143 12.5691 9.27804C12.7154 9.48181 12.9664 9.58219 13.2126 9.53553C13.3235 9.51454 13.4354 9.50391 13.5452 9.50391C14.522 9.50391 15.3169 10.2987 15.3169 11.2755C15.3169 12.2524 14.522 13.0474 13.545 13.0474Z"
                      fill="#019852"
                    />
                  </svg>
                  <span className={isActive ? activeClassName : undefined}>
                    Все рецепты
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={MEASURING} className="nav__link">
              {({ isActive }) => (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7143 0H6.28572C4.61864 0 3.01985 0.662242 1.84104 1.84104C0.662239 3.01984 0 4.61863 0 6.2857V19.6428C0 20.268 0.248342 20.8675 0.69039 21.3096C1.13244 21.7517 1.732 22 2.35714 22H19.6429C20.268 22 20.8676 21.7517 21.3096 21.3096C21.7517 20.8675 22 20.268 22 19.6428V6.2857C22 4.61863 21.3378 3.01984 20.159 1.84104C18.9801 0.662242 17.3814 0 15.7143 0ZM20.4286 19.6428C20.4286 19.8512 20.3458 20.0511 20.1984 20.1984C20.0512 20.3458 19.8512 20.4285 19.6429 20.4285H2.35714C2.14876 20.4285 1.94892 20.3458 1.80156 20.1984C1.65422 20.0511 1.57143 19.8512 1.57143 19.6428V6.2857C1.57143 5.0354 2.06812 3.83631 2.95222 2.95221C3.83632 2.06811 5.03542 1.57143 6.28572 1.57143H15.7143C16.9646 1.57143 18.1637 2.06811 19.0478 2.95221C19.9319 3.83631 20.4286 5.0354 20.4286 6.2857V19.6428Z"
                      fill="#019852"
                    />
                    <path
                      d="M13.0002 7.44791L11.8034 11.2344C11.772 11.3339 11.7601 11.4381 11.7685 11.5412C11.7769 11.6443 11.8054 11.7442 11.8523 11.8351C11.8992 11.9262 11.9638 12.0065 12.0421 12.0716C12.1204 12.1366 12.211 12.1852 12.3089 12.2145C12.47 12.2626 12.6436 12.2563 12.8036 12.1967C12.9184 12.1537 13.0223 12.0847 13.1073 11.995C13.1923 11.9053 13.2559 11.7974 13.2929 11.6799L14.4897 7.89328C14.5533 7.69243 14.5357 7.47634 14.4409 7.29256C14.3461 7.10878 14.1819 6.97235 13.9843 6.91329C13.8866 6.88404 13.7835 6.87468 13.6811 6.88571C13.5787 6.89676 13.479 6.928 13.3875 6.97764C13.203 7.0779 13.0636 7.24707 13.0002 7.44791Z"
                      fill="#019852"
                    />
                    <path
                      d="M3.73162 6.66498L3.19692 6.09078C2.96588 6.32347 2.89859 6.68117 3.02826 6.98726L3.73162 6.66498ZM10.8269 4.17831L10.8523 4.97721C11.2667 4.96295 11.5956 4.60948 11.5956 4.17831H10.8269ZM6.3715 12.8965L5.66815 13.2188C5.75376 13.4208 5.91593 13.5771 6.1162 13.6504C6.31646 13.7239 6.53699 13.7077 6.72545 13.6061L6.3715 12.8965ZM10.9895 11.6522L11.007 10.8531C10.9955 10.8527 10.984 10.8527 10.9725 10.853L10.9895 11.6522ZM15.5054 12.8965L15.1452 13.6027C15.3347 13.7072 15.5578 13.7247 15.7603 13.6506C15.9628 13.5766 16.1263 13.4177 16.2112 13.2128L15.5054 12.8965ZM18.0867 6.66499L18.7925 6.98124C18.9175 6.67927 18.8521 6.32844 18.6275 6.09707L18.0867 6.66499ZM11.1563 4.17858H10.3877C10.3877 4.60932 10.7158 4.96257 11.1297 4.97744L11.1563 4.17858ZM11.1563 4.17238H11.9249C11.9249 3.73091 11.5808 3.37305 11.1563 3.37305V4.17238ZM10.9895 4.17398L10.9755 4.97317C10.9848 4.97335 10.994 4.97335 11.0034 4.97318L10.9895 4.17398ZM10.8269 4.17238V3.37305C10.4024 3.37305 10.0583 3.73092 10.0583 4.17238H10.8269ZM4.2663 7.23919C5.0628 6.43699 6.24987 5.87737 7.51272 5.51337C8.76373 5.15277 10.0116 5.00616 10.8523 4.97721L10.8015 3.37942C9.85976 3.41184 8.48877 3.5731 7.10216 3.97278C5.72737 4.36904 4.25803 5.02208 3.19692 6.09078L4.2663 7.23919ZM7.07486 12.5742L4.43497 6.34271L3.02826 6.98726L5.66815 13.2188L7.07486 12.5742ZM10.9725 10.853C8.89016 10.9009 6.82938 11.7489 6.01757 12.187L6.72545 13.6061C7.41038 13.2365 9.23624 12.492 11.0066 12.4513L10.9725 10.853ZM10.9722 12.4513C12.6962 12.4918 14.477 13.234 15.1452 13.6027L15.8656 12.1904C15.0702 11.7515 13.0503 10.901 11.007 10.8531L10.9722 12.4513ZM16.2112 13.2128L18.7925 6.98124L17.3807 6.34874L14.7995 12.5802L16.2112 13.2128ZM18.6275 6.09707C17.5891 5.02747 16.1512 4.37307 14.8055 3.97573C13.4489 3.57511 12.1069 3.4129 11.1829 3.37973L11.1297 4.97744C11.9507 5.00691 13.167 5.15378 14.3857 5.51362C15.6156 5.87676 16.7704 6.43424 17.5457 7.23292L18.6275 6.09707ZM10.3877 4.17238V4.17858H11.9249V4.17238H10.3877ZM11.0034 4.97318C11.0566 4.97218 11.1077 4.97171 11.1563 4.97171V3.37305C11.0981 3.37305 11.0379 3.37361 10.9757 3.37477L11.0034 4.97318ZM11.0036 3.37477C10.9428 3.37362 10.8839 3.37305 10.8269 3.37305V4.97171C10.874 4.97171 10.9236 4.97219 10.9755 4.97317L11.0036 3.37477ZM10.0583 4.17238V4.17831H11.5956V4.17238H10.0583Z"
                      fill="#019852"
                    />
                  </svg>
                  <span className={isActive ? activeClassName : undefined}>
                    Вес и параметры
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={BLOGS} className="nav__link">
              {({ isActive }) => (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.09998 2.04295C1.09998 1.52223 1.52211 1.1001 2.04283 1.1001C4.51918 1.1001 6.97129 1.58785 9.25915 2.53551C11.547 3.48317 13.6258 4.87217 15.3769 6.62323C17.1279 8.37428 18.5169 10.4531 19.4646 12.741C20.4122 15.0287 20.9 17.4809 20.9 19.9573C20.9 20.4779 20.4778 20.9001 19.9572 20.9001C19.4364 20.9001 19.0142 20.4779 19.0142 19.9573C19.0142 17.7285 18.5752 15.5216 17.7224 13.4626C16.8695 11.4035 15.6194 9.53257 14.0435 7.95663C12.4675 6.38068 10.5966 5.13057 8.53752 4.27769C6.47845 3.42479 4.27155 2.98582 2.04283 2.98582C1.52211 2.98582 1.09998 2.56368 1.09998 2.04295Z"
                      fill="#019852"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.09998 8.32934C1.09998 7.80861 1.52211 7.38647 2.04283 7.38647C3.69373 7.38647 5.32847 7.71165 6.85371 8.34342C8.37895 8.97519 9.76481 9.9012 10.9322 11.0686C12.0995 12.2359 13.0255 13.6218 13.6574 15.147C14.2891 16.6723 14.6142 18.307 14.6142 19.9579C14.6142 20.4786 14.1922 20.9008 13.6714 20.9008C13.1507 20.9008 12.7285 20.4786 12.7285 19.9579C12.7285 18.5546 12.4522 17.1651 11.9152 15.8686C11.3782 14.5722 10.591 13.3942 9.59877 12.402C8.60652 11.4097 7.42853 10.6226 6.13208 10.0856C4.83563 9.54859 3.4461 9.27219 2.04283 9.27219C1.52211 9.27219 1.09998 8.85006 1.09998 8.32934Z"
                      fill="#019852"
                    />
                    <path
                      d="M6.75713 17.5994C6.75713 18.9012 5.7018 19.9566 4.39999 19.9566C3.09818 19.9566 2.04285 18.9012 2.04285 17.5994C2.04285 16.2975 3.09818 15.2422 4.39999 15.2422C5.7018 15.2422 6.75713 16.2975 6.75713 17.5994Z"
                      fill="#019852"
                    />
                  </svg>
                  <span className={isActive ? activeClassName : undefined}>
                    Статьи
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to={PRODUCTS} className="nav__link nav__link--products">
              {({ isActive }) => (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.0625 2.75H3.333C3.8005 2.75 4.20842 3.06442 4.32942 3.51542L4.6805 4.83267M6.875 13.0625C6.14565 13.0625 5.44618 13.3522 4.93046 13.868C4.41473 14.3837 4.125 15.0832 4.125 15.8125H18.5625M6.875 13.0625H17.1582C18.1857 10.9542 19.0832 8.76883 19.8385 6.51933C14.8884 5.25722 9.78692 4.68956 4.6805 4.83267M6.875 13.0625L4.6805 4.83267M5.5 18.5625C5.5 18.7448 5.42757 18.9197 5.29864 19.0486C5.1697 19.1776 4.99484 19.25 4.8125 19.25C4.63016 19.25 4.4553 19.1776 4.32636 19.0486C4.19743 18.9197 4.125 18.7448 4.125 18.5625C4.125 18.3802 4.19743 18.2053 4.32636 18.0764C4.4553 17.9474 4.63016 17.875 4.8125 17.875C4.99484 17.875 5.1697 17.9474 5.29864 18.0764C5.42757 18.2053 5.5 18.3802 5.5 18.5625V18.5625ZM17.1875 18.5625C17.1875 18.7448 17.1151 18.9197 16.9861 19.0486C16.8572 19.1776 16.6823 19.25 16.5 19.25C16.3177 19.25 16.1428 19.1776 16.0139 19.0486C15.8849 18.9197 15.8125 18.7448 15.8125 18.5625C15.8125 18.3802 15.8849 18.2053 16.0139 18.0764C16.1428 17.9474 16.3177 17.875 16.5 17.875C16.6823 17.875 16.8572 17.9474 16.9861 18.0764C17.1151 18.2053 17.1875 18.3802 17.1875 18.5625V18.5625Z"
                      stroke="#019852"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={isActive ? activeClassName : undefined}>
                    Список покупок
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
        <div className="lh-content">
          <div className="lh-content__left hero-text">
            <h1 className="hero-text__title">
              Крепкое <span>здоровье</span> начинается с того, что вы едите.
            </h1>
            <p className="hero-text__desc">
              Хотите есть более осознанно? Отслеживайте приемы пищи, узнавайте о
              своих привычках и достигайте своих целей с My Food Diary.
            </p>
            <NavLink to={RECIPES} className="hero-text__btn btn btn--one">
              Все рецепты
            </NavLink>
          </div>
          <div className="lh-content__right">
            <img src={bgHero} alt="" />
          </div>
        </div>
        <div className="lh-footer">
          <div className="lh-footer__copy">© 2023 My Food Diary.</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
