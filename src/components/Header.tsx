import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { FC } from "react";
import Logo from "./common/Logo";

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <IconButton className="size-[40px] bg-red-400 dark:bg-red-300">
        <MoreVertIcon className="text-red-400 dark:text-red-300"></MoreVertIcon>
      </IconButton>
    </header>
  );
};

export default Header;
