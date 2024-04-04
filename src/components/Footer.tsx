const Footer = () => {
  return (
    <footer className="flex justify-center items-end md:justify-between px-6 border-blue-900 border p-3 rounded-t-xl w-1/3">
      <a
        href="https://github.com/claire2d2/poke-project"
        className="text-blue-900 hover:text-orange-600 font-bold"
      >
        GitHub Repo
      </a>

      <a
        href="https://www.linkedin.com/in/claireyuansong/"
        target="_blank"
        className="text-blue-900 hover:text-orange-600 font-medium border-r pr-4"
      >
        Claire Song
      </a>
      <a
        href="https://www.linkedin.com/in/ivanpstoyanov/"
        target="_blank"
        className="text-blue-800 hover:text-orange-600 font-medium border-r pr-4"
      >
        Ivan Stoyanov
      </a>
      <a
        href="https://www.linkedin.com/in/simonraphael/"
        target="_blank"
        className="text-blue-800 hover:text-orange-600 font-medium"
      >
        Raphaël Simon
      </a>
    </footer>
  );
};

export default Footer;
