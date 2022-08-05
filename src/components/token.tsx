import { ReactComponent as NearLogo } from "~/assets/near.svg";

interface TokenIconProps {
  icon?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

const TokenIcon = (props: TokenIconProps) => {
  const { icon, width = 80, height = 80, className = "", onClick } = props;

  return (
    <div className={className} onClick={onClick} style={{ width, height }}>
      {icon ? (
        <img src={icon} style={{ width, height }} className="rounded-full" onClick={onClick} />
      ) : (
        <NearLogo style={{ width, height, filter: "invert(100%)" }} viewBox="0 0 35 35" />
      )}
    </div>
  );
};

export default TokenIcon;
