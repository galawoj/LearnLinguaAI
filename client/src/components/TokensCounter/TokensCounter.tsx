import { useEffect, useState } from "react";
import { useAppContext } from "../../store/app-context";
import { tokensPrice } from "../../data/tokensPrice";
import { type NumberOfTokensType } from "../../types/NumberOfTokensType";
import { type TokenPriceType } from "../../types/TokenPriceType";

export default function TokensCounter() {
  const {
    numberOfTokens: { input, output },
    GPTModel: gptModel,
  } = useAppContext();

  const [costOfTokens, setCostOfTokens] = useState<TokenPriceType>({
    modelType: gptModel,
    input: 0,
    output: 0,
  });

  const [sumOfTokens, setSumOfTokens] = useState<NumberOfTokensType>({
    input: 0,
    output: 0,
  });

  useEffect(() => {
    const selectedModelTokenPrice = tokensPrice.filter(
      (modelObject) => modelObject.modelType === gptModel
    );

    setSumOfTokens((e) => {
      const newSumOfTokens = {
        input: e.input + input,
        output: e.output + output,
      };
      return newSumOfTokens;
    });

    setCostOfTokens((e) => {
      const newCostOfTokens = {
        modelType: selectedModelTokenPrice[0].modelType,
        input: e.input + selectedModelTokenPrice[0].input * input,
        output: e.output + selectedModelTokenPrice[0].output * output,
      };
      return newCostOfTokens;
    });
  }, [input, output]);

  return (
    <>
      Wykorzystałeś <b>{sumOfTokens.input + sumOfTokens.output}</b> tokentów
      <br />
      input: <b>{sumOfTokens.input}</b> = {costOfTokens.input / 1000000}$ <br />
      output: <b>{sumOfTokens.output}</b> = {costOfTokens.output / 1000000}$
    </>
  );
}
