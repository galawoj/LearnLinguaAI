import ButtonGenerator from "../../components/ButtonGenerator/ButtonGenerator";
import SelectModel from "../../components/SelectModel/SelectModel";
import { TextGenerator } from "../../components/TextGenerator/TextGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import "./mainApp.scss";
import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";

export default function MainApp() {
  return (
    <div className="container">
      <div className="tabs">
        <input type="radio" name="group" id="home" defaultChecked />
        <input type="radio" name="group" id="about" />
        <input type="radio" name="group" id="setting" />
        <input type="radio" name="group" id="security" />
        <div className="icon">
          <label htmlFor="home">
            <FontAwesomeIcon icon={faBookOpen} />
          </label>
          <label htmlFor="about">
            <FontAwesomeIcon icon={faClipboard} />
          </label>
          <label htmlFor="setting">
            <FontAwesomeIcon icon={faGear} />
          </label>
          <label htmlFor="security"></label>
          <div className="indicator"></div>
        </div>
        <div className="content">
          <div className="contentBx" data-for="home">
            <h2>Home</h2>

            <TextGenerator />
            <ButtonGenerator />
          </div>
          <div className="contentBx" data-for="about">
            <h2>Dictionary</h2>
            <p></p>
          </div>
          <div className="contentBx" data-for="setting">
            <h2>Setting</h2>
            <div>
              <SelectModel />
              <LanguageLevel />
            </div>
          </div>
          <div className="contentBx" data-for="security">
            <h2>Security</h2>
            <p>Lorem ipsum, dolor sit amet consectetur </p>
          </div>
        </div>
      </div>
    </div>
  );
}
