const Footer = () => {
  return (
    <footer className="bg-transparent">
      <div className="text-center p-3 border rounded-t-2xl fixed bottom-0 left-0 bg-white">
        <a
          href="https://github.com/claire2d2/poke-project"
          className="text-blue-900 hover:text-orange-600 font-medium"
        >
          GitHub Repo
        </a>
      </div>

      <div className="flex  text-center items-center gap-3 p-3 border rounded-t-2xl fixed bottom-0 right-0 bg-white">
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
      </div>
    </footer>
  );
};

export default Footer;
