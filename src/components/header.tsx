import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaMedium } from "@react-icons/all-files/fa/FaMedium";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

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
      <div className="flex gap-2 ml-auto">
        <a href="https://discord.gg/gUWBKy9Vur" target="_blank" rel="noreferrer">
          <FaDiscord />
        </a>
        <a href="https://twitter.com/burrowcash" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://burrowcash.medium.com/" target="_blank" rel="noreferrer">
          <FaMedium />
        </a>
        <a href="https://github.com/burrowfdn" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
      </div>
    </header>
  );
}
