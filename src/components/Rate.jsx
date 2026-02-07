import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function Rate({ rate }) {
  switch (true) {
    case rate == 50:
      return (
        <p className="text-gray-800 text-sm flex items-center">
          <span className="mr-1 relative bottom-[0.4px]">{rate}</span>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </p>
      );
    case rate <= 49 && rate >= 40:
      return (
        <p className="text-gray-800 text-sm flex items-center">
          <span className="mr-1 relative bottom-[0.4px]">{rate}</span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
        </p>
      );
    case rate <= 39 && rate >= 30:
      return (
        <p className="text-gray-800 text-sm flex items-center">
          <span className="mr-1 relative bottom-[0.4px]">{rate}</span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
        </p>
      );
    case rate <= 29 && rate >= 20:
      return (
        <p className="text-gray-800 text-sm flex items-center">
          <span className="mr-1 relative bottom-[0.4px]">{rate}</span>
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />          
        </p>
      );
    case rate <= 19 && rate >= 10:
      return (
        <p className="text-gray-800 text-sm flex items-center">
          <span className="mr-1 relative bottom-[0.4px]">{rate}</span>
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
        </p>
      );
    case rate <= 9 && rate >= 0:
      return (
        <p className="text-gray-800 text-sm flex items-center">
          <span className="mr-1 relative bottom-[0.4px]">{rate}</span>
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
        </p>
      );
  }
}

export default Rate;
