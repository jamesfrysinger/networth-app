import { ACTION_NETWORTH } from "actions";
import AccountCard from "components/Accounts/AccountCard";
import NetWorth from "components/NetWorth";
import { useAppContext } from "contexts/AppProvider";
import { mockData } from "mockdata/accounts-mockdata";
import { FC, useEffect } from "react";
import CurrencyFormat from "react-currency-format";

interface IAccounts {}
const Accounts: FC<IAccounts> = () => {
  const { state, dispatch } = useAppContext();

  const netWorth =
    state.netWorth ||
    mockData
      .map((account) =>
        account.accounts
          .map((balance) => balance.balance)
          .reduce((acc, cur) => acc + cur, 0)
      )
      .reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    dispatch({
      type: ACTION_NETWORTH,
      payload: { ...state, netWorth },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NetWorth />
      {mockData.map((account, index) => {
        return (
          <section className="my-8" key={index}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium mb-2">
                {account.accountType}
              </h2>
              <p className="font-extrabold">
                <CurrencyFormat
                  value={account.accounts
                    .map((balance) => balance.balance)
                    .reduce((acc, cur) => acc + cur, 0)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                />
              </p>
            </div>
            {account.accounts.map((accountDetails, index) => {
              return (
                <div key={index}>
                  {index !== 0 && (
                    <hr className="my-2 border-[0.5px] border-red-400 opacity-20" />
                  )}
                  <AccountCard data={accountDetails} />
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
};

export default Accounts;
