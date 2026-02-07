import { BsHouseCheckFill } from "react-icons/bs";

function DashPath({ path }) {
  return (
    <div className="flex items-center gap-1 text-[14px]">
        <BsHouseCheckFill className="text-[14px]" />
        &gt; Minha Conta {path}
      </div>
  )
}

export default DashPath;
