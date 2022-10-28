import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    filter: blur(8px);
  }
  to {
    opacity: 1;
    filter: blur(0px);

  }
`;

export const HomePageWrapper = styled.main`
  margin-bottom: 30px;

  .header_img-wrapper {
    position: relative;
    max-width: 100%;
    height: calc(100vh - var(--header-height));

    video {
      width: 100%;
      height: calc(100vh - var(--header-height));

      object-fit: cover;
    }

    .header_img-header {
      position: absolute;
      bottom: 20%;
      right: 50%;
      width: 100%;
      transform: translateX(50%);
      color: #fff;
      font-size: 40px;
      font-family: "Charmonman", cursive;
      text-align: center;
      text-shadow: 0 0 10px #262626;
      animation: ${fadeIn} 8s ease;
      z-index: 2;
    }

    .header_img-slogan {
      position: absolute;
      bottom: 10%;
      right: 50%;
      width: 100%;
      transform: translateX(50%);
      color: #fff;
      font-size: 40px;
      font-family: "Charmonman", cursive;
      text-align: center;
      text-shadow: 0 0 10px #262626;
      animation: ${fadeIn} 6s ease;
      animation-fill-mode: forwards;
      animation-delay: 2s;
      opacity: 0;

      z-index: 2;
    }

    .header-img-action {
      position: absolute;
      bottom: 20px;
      right: 50%;
      transform: translateX(50%);
      padding: 8px 16px;
      font-size: 16px;
      background-color: var(--button-color);
      color: #fff;
      border: none;
      text-transform: uppercase;
      border-radius: 10px;
      animation: ${fadeIn} 3s ease;
      animation-fill-mode: forwards;
      animation-delay: 4s;
      opacity: 0;

      cursor: pointer;
      z-index: 2;
    }

    .overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50%;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.8)
      );
      z-index: 1;
    }

    @media (max-width: 576px) {
      .header_img-header {
        font-size: 28px;
        bottom: 50%;
      }

      .header_img-slogan {
        bottom: 35%;
        font-size: 28px;
      }

      .header-img-action {
        bottom: 25%;
      }
    }
  }

  @media (max-width: 868px) {
    .header_img-wrapper {
      max-width: 100%;

      img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
      }

      video {
        width: 100%;
        height: 100vh;
        object-fit: cover;
      }
    }
  }

  .men_products-section {
    display: flex;
    height: 100%;
    margin: 80px 0;

    .men_products-banner-img {
      width: 50%;
      position: relative;

      img {
        width: 100%;
      }
    }

    .men_products-list {
      width: 50%;
    }

    @media (max-width: 868px) {
      flex-direction: column;

      .men_products-banner-img {
        width: 100%;
        position: relative;

        img {
          width: 100%;
        }
      }

      .men_products-list {
        width: 100%;
      }
    }
  }

  .women_products-section {
    display: flex;
    flex-direction: row-reverse;

    .women_products-banner-img {
      position: relative;
      width: 50%;

      img {
        width: 100%;
      }
    }

    .women_products-list {
      width: 50%;
    }

    @media (max-width: 868px) {
      flex-direction: column;

      .women_products-banner-img {
        width: 100%;
        position: relative;

        img {
          width: 100%;
        }
      }

      .women_products-list {
        width: 100%;
      }
    }
  }

  .product_banner-title {
    position: absolute;
    top: 10%;
    right: 50%;
    transform: translateX(50%);
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 4px #262626;

    @media (max-width: 868px) {
      top: unset;
      bottom: 20%;
      margin-bottom: 12px;
      font-size: 20px;
    }
  }

  .product_banner-btn {
    position: absolute;
    top: 20%;
    right: 50%;
    transform: translateX(50%);
    padding: 8px 12px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 10px;
    background-color: var(--button-color);
    box-shadow: 0 0 4px #262626;
    transition: all 0.3s ease;
    cursor: pointer;

    :hover {
      box-shadow: 0 0 8px #262626;
      background-color: #a8071a;
    }

    @media (max-width: 868px) {
      top: unset;
      bottom: 10%;
      font-size: 16px;
    }
  }
`;