import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaDiscord,
  FaSlack,
  FaTiktok,
  FaSnapchat,
  FaPinterest,
  FaReddit,
} from "react-icons/fa";

const icons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  github: FaGithub,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  discord: FaDiscord,
  slack: FaSlack,
  tiktok: FaTiktok,
  snapchat: FaSnapchat,
  pinterest: FaPinterest,
  reddit: FaReddit,
};

export function IconSocial({ name, className = "", size = 24 }) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
}
