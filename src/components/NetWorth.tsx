import { useAppContext } from "contexts/AppProvider";
import { FC } from "react";
import CurrencyFormat from "react-currency-format";

interface INetWorth {}
const NetWorth: FC<INetWorth> = () => {
  const { state } = useAppContext();

  return (
    <div className="mt-14 mb-10">
      <CurrencyFormat
        value={state.netWorth}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        className="font-medium text-4xl"
      />
      <span className="pl-2 text-sm font-medium">Net Worth</span>
    </div>
  );
};

export default NetWorth;
