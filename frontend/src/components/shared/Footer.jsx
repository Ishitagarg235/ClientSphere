const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">ClientSphere</h3>
          <p className="text-gray-400 mb-4">
            Building exceptional digital experiences
          </p>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ClientSphere. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;