export default function Footer() {
  return (
    <footer className="flex justify-between p-2 text-xs">
      <div>&copy; 2022 All rights reserved</div>
      <div className="flex gap-2">
        <a
          href="https://docs.burrow.cash"
          target="_blank"
          rel="noreferrer"
          className="hover:underline underline-offset-4"
        >
          Terms of Service
        </a>
        <span>|</span>
        <a
          href="https://docs.burrow.cash"
          target="_blank"
          rel="noreferrer"
          className="hover:underline underline-offset-4"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
