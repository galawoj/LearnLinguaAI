import { useAppContext } from "../../store/app-context";

export default function TokensCounter() {
  const {
    numberOfTocens: { input, output },
  } = useAppContext();

  return (
    <>
      Wykorzystałeś <b>{input + output}</b> tokentów
      <br />
      input: <b>{input}</b> = {(input / 1000000) * 0.5}$ <br />
      output: <b>{output}</b> = {(output / 1000000) * 1.5}$
    </>
  );
}
