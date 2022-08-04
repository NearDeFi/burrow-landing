import { ReactComponent as LogoSvg } from "~/assets/logo.svg";

export default function Header() {
  return (
    <header className="text-sm flex gap-6 p-4 bg-bgblue text-white h-[60px] items-center">
      <span className="pb-1">
        <LogoSvg />
      </span>
      <a
        href="https://docs.burrow.cash/product-docs/how-burrow-works/governance"
        target="_blank"
        rel="noreferrer"
        className="hover:border-b-2 pb-1 hover:border-texthighlight"
      >
        Governance
      </a>
      <a
        href="https://docs.burrow.cash"
        target="_blank"
        rel="noreferrer"
        className="hover:border-b-2 pb-1 hover:border-texthighlight"
      >
        Docs
      </a>
    </header>
  );
}
