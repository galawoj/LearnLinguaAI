import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type typeProps = {
  htmlFor: "home" | "dictionary" | "setting" | "profil";
  icon: IconDefinition;
};

export default function Label({ htmlFor, icon }: typeProps) {
  return (
    <label htmlFor={htmlFor}>
      <FontAwesomeIcon icon={icon} />
    </label>
  );
}
