import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground px-2">
          Data from{" "}
          <Link
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Rick and Morty API
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
