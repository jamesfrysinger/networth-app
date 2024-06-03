import { FC } from "react";
import CurrencyFormat from "react-currency-format";

interface IAccountCard {
  data: {
    id: number;
    vendor: string;
    name: string;
    type: string;
    balance: number;
  };
}
const AccountCard: FC<IAccountCard> = ({ data }) => {
  return (
    <div className="flex justify-between items-center font-normal">
      <div>
        <p className="text-xs">{data.vendor}</p>
        <p>{data.name}</p>
      </div>
      <div>
        <p>
          <CurrencyFormat
            value={data.balance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
          />
        </p>
      </div>
    </div>
  );
};
export default AccountCard;
