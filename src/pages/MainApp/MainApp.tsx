import "./mainApp.scss";

export default function MainApp() {
  return (
    <div className="container">
      <div className="tabs">
        <input type="radio" name="group" id="home" defaultChecked />
        <input type="radio" name="group" id="about" />
        <input type="radio" name="group" id="setting" />
        <input type="radio" name="group" id="security" />
        <div className="icon">
          <label htmlFor="home">1</label>
          <label htmlFor="about">2</label>
          <label htmlFor="setting">3</label>
          <label htmlFor="security">4</label>
          <div className="indicator"></div>
        </div>
        <div className="content">
          <div className="contentBx" data-for="home">
            <h2>Home</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
              eius ratione ipsum animi dolorem laudantium dicta distinctio
              repellendus, quidem est numquam labo
            </p>
          </div>
          <div className="contentBx" data-for="about">
            <h2>About</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
              eius ratione ipsum animi dolorem laudantium dicta distinctio
              repellendus, quidem est numquam laboriosam unde expedita vitae.{" "}
            </p>
          </div>
          <div className="contentBx" data-for="setting">
            <h2>Setting</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
              eius ratione ipsum animi dolorem laudantium dicta distinctio
              repellendus, quidem est numquam laboriosam unde expedita vitae.
              Officiis atque impedit asperiores consectetur.
            </p>
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
