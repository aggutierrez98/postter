import banner from "public/no-banner.jpg";
import avatar from "public/user-template.svg";

const styles = ["#aaaaaa", "#808080"];

const convertImage = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="${styles[0]}" offset="20%" />
          <stop stop-color="${styles[1]}" offset="50%" />
          <stop stop-color="${styles[0]}" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${styles[0]}" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const defaultBanner = banner;
export const defaultAvatar = avatar;

export const defaultAvatarC = avatar.toString().replace(/[()]/g, "");
export const defaultBannerC = banner.toString().replace(/[()]/g, "");

export const blurAvatarSrc = `data:image/svg+xml;base64,${toBase64(
  convertImage(700, 475)
)}`;
export const blurBannerSrc = `data:image/svg+xml;base64,${toBase64(
  convertImage(700, 475)
)}`;
