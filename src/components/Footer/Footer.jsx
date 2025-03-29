import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { SlSocialYoutube } from "react-icons/sl";
import useFetch from "../../hook/useFetch";
const Footer = () => {
  const { data, isLoading } = useFetch(
    "https://server-scdd.onrender.com/footer",
    ""
  );

  if (isLoading) {
    return null;
  }

  const socialIcons = [
    { Icon: FaInstagram, hoverColor: "hover:text-pink-500" },
    { Icon: FiTwitter, hoverColor: "hover:text-blue-400" },
    { Icon: BiLogoFacebook, hoverColor: "hover:text-blue-600" },
    { Icon: SlSocialYoutube, hoverColor: "hover:text-red-500" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-6 mt-24 sm:mt-48">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        {data.map(({ title, items }) => (
          <div key={title} className="text-center">
            <h2 className="font-semibold sm:text-xl text-lg border-b-2 border-yellow-400 pb-4">
              {title}
            </h2>
            <div className="mt-8 space-y-1 text-white/80">
              {items.map((item) => (
                <p key={item} className="footer-text mb-3">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <h3 className="font-semibold text-lg border-b-2 border-yellow-400 pb-4">
            Follow Us
          </h3>
          <div className="flex justify-center gap-3 text-white/80 mt-8">
            {socialIcons.map(({ Icon, hoverColor }, index) => (
              <span
                key={index}
                className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-700 transition-all duration-300 ease-in-out"
              >
                <Icon
                  className={`${hoverColor} hover:scale-150 transition-all duration-300 ease-in-out`}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
